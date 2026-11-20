/**
 * CA Lucky Draw & Cart Leads — ledger for the Orderla store theme.
 * Web app (Execute as: me, Who has access: Anyone). All calls are GET with ?action=...
 * Tabs: Leads (one row per phone), Draw (one row per phone that played).
 * Read by: Wasapbot chat (1-hour WhatsApp sender), Voucher Checker (order check).
 * Owner chat: JO - Menu System Setting › Orderla theme chat.
 */
var LEAD_HDR = ['phone','name','store','total','items','stage','ordered','first_seen','last_update','reminded_at','token','note'];
var DRAW_HDR = ['phone','played_at','prize','prize_label','hold_until','token','status','store','order_ref','note'];
var LABEL = {rm20:'RM20 off', rm2:'RM2 off', half:'Next cake 50% off', petit:'RM6.99 surprise cake', cookie:'Free cookie', kit:'Free birthday kit'};

function doGet(e) {
  var p = (e && e.parameter) || {};
  var out;
  try {
    var lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      switch (p.action) {
        case 'cart_lead_v1': out = saveLead(p); break;
        case 'draw_check':   out = drawCheck(p); break;
        case 'draw_win':     out = drawWin(p); break;
        case 'lead_get':     out = leadGet(p); break;
        case 'ping':         out = {ok:true}; break;
        default:             out = {ok:false, error:'unknown action'};
      }
    } finally { lock.releaseLock(); }
  } catch (err) { out = {ok:false, error:String(err)}; }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function sheet_(name, hdr) {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(hdr); sh.setFrozenRows(1); }
  return sh;
}
function phone_(v) { var d = String(v||'').replace(/\D/g,''); if (d.indexOf('60')===0) d=d.slice(2); if (d.indexOf('0')===0) d=d.slice(1); return /^1\d{8,9}$/.test(d) ? '60'+d : ''; }
function find_(sh, col, val) { var n = sh.getLastRow(); if (n<2) return 0; var v = sh.getRange(2,col,n-1,1).getValues(); for (var i=0;i<v.length;i++) if (String(v[i][0])===String(val)) return i+2; return 0; }
function now_() { return new Date(); }
function clip_(s, n) { return String(s||'').slice(0, n); }

/* store reports the cart (no secrets; phone is the key) */
function saveLead(p) {
  var ph = phone_(p.phone); if (!ph) return {ok:false, error:'bad phone'};
  var sh = sheet_('Leads', LEAD_HDR), r = find_(sh, 1, ph);
  var items = clip_(p.items, 900), ordered = p.ordered==='1' || p.ordered==='true';
  if (!r) { sh.appendRow([ph, clip_(p.name,60), clip_(p.store,80), Number(p.total)||0, items, clip_(p.stage,20), ordered, now_(), now_(), '', '', '']); return {ok:true, new:true}; }
  var row = sh.getRange(r,1,1,LEAD_HDR.length).getValues()[0];
  if (p.name) row[1] = clip_(p.name,60);
  row[2] = clip_(p.store,80) || row[2];
  if (p.total !== undefined && p.total !== '') row[3] = Number(p.total)||0;
  if (items) row[4] = items;
  row[5] = clip_(p.stage,20) || row[5];
  if (ordered) row[6] = true;
  else if (p.stage==='start' && row[6]===true) { row[6] = false; row[9] = ''; } /* a new shopping round */
  row[8] = now_();
  sh.getRange(r,1,1,LEAD_HDR.length).setValues([row]);
  return {ok:true};
}

/* has this number played? */
function drawCheck(p) {
  var ph = phone_(p.phone); if (!ph) return {ok:false, error:'bad phone'};
  var sh = sheet_('Draw', DRAW_HDR), r = find_(sh, 1, ph);
  if (!r) return {ok:true, played:false};
  var row = sh.getRange(r,1,1,DRAW_HDR.length).getValues()[0];
  return {ok:true, played:true, prize:row[2], hold_until:row[4] ? new Date(row[4]).getTime() : 0, status:row[6], token:row[5]};
}

/* record a win (first game only) */
function drawWin(p) {
  var ph = phone_(p.phone); if (!ph) return {ok:false, error:'bad phone'};
  if (!LABEL[p.prize]) return {ok:false, error:'bad prize'};
  var sh = sheet_('Draw', DRAW_HDR), r = find_(sh, 1, ph);
  if (r) { var row = sh.getRange(r,1,1,DRAW_HDR.length).getValues()[0]; return {ok:true, already:true, prize:row[2], hold_until:row[4]?new Date(row[4]).getTime():0, status:row[6], token:row[5]}; }
  var token = Utilities.getUuid().replace(/-/g,'').slice(0,12);
  var hold = new Date(Date.now() + 10*60*1000);
  sh.appendRow([ph, now_(), p.prize, LABEL[p.prize], hold, token, 'won', clip_(p.store,80), '', '']);
  var lsh = sheet_('Leads', LEAD_HDR), lr = find_(lsh, 1, ph); if (lr) lsh.getRange(lr, 11).setValue(token);
  return {ok:true, prize:p.prize, hold_until:hold.getTime(), token:token};
}

/* reopen link ?ld=token */
function leadGet(p) {
  var t = String(p.t||''); if (!/^[a-f0-9]{12}$/.test(t)) return {ok:false, error:'bad token'};
  var sh = sheet_('Draw', DRAW_HDR), r = find_(sh, 6, t);
  if (!r) return {ok:false, error:'not found'};
  var row = sh.getRange(r,1,1,DRAW_HDR.length).getValues()[0];
  var lsh = sheet_('Leads', LEAD_HDR), lr = find_(lsh, 1, row[0]), name = lr ? lsh.getRange(lr,2).getValue() : '';
  return {ok:true, phone:String(row[0]), name:name, prize:row[2], hold_until:row[4]?new Date(row[4]).getTime():0, status:row[6], store:row[7]};
}

/* For the WhatsApp sender (Wasapbot chat): call after sending the gift reminder — gift held 10 hours from now. */
function markReminded(phone) {
  var ph = phone_(phone), lsh = sheet_('Leads', LEAD_HDR), lr = find_(lsh, 1, ph);
  if (lr) lsh.getRange(lr, 10).setValue(now_());
  var sh = sheet_('Draw', DRAW_HDR), r = find_(sh, 1, ph);
  if (r && sh.getRange(r,7).getValue()==='won') sh.getRange(r,5).setValue(new Date(Date.now() + 10*60*60*1000));
}

function setup() { sheet_('Leads', LEAD_HDR); sheet_('Draw', DRAW_HDR); var s = SpreadsheetApp.getActive().getSheetByName('Sheet1'); if (s && s.getLastRow()===0) SpreadsheetApp.getActive().deleteSheet(s); }
