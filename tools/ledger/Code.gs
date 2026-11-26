/**
 * CA Lucky Draw & Cart Leads — ledger for the Orderla store theme.
 * Web app (Execute as: me, Who has access: Anyone). All calls are GET with ?action=...
 * Tabs: Leads (one row per phone), Draw (one row per phone that played).
 * Read by: Wasapbot chat (1-hour WhatsApp sender), Voucher Checker (order check).
 * Owner chat: JO - Menu System Setting › Orderla theme chat.
 */
var LEAD_HDR = ['phone','name','store','total','items','stage','ordered','first_seen','last_update','reminded_at','token','note'];
var DRAW_HDR = ['phone','played_at','prize','prize_label','hold_until','token','status','store','order_ref','note'];
var EV_HDR = ['ts','day','vid','sid','store','type','item','value','device','source','new'];
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
        case 'stats':        out = stats_(p); break;
        case 'stock':        out = stockGet_(); break;
        default:             out = {ok:false, error:'unknown action'};
      }
    } finally { lock.releaseLock(); }
  } catch (err) { out = {ok:false, error:String(err)}; }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}


/* store event batches (navigator.sendBeacon, text/plain JSON) */
function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.action === 'stock_sold_v1') {
      var lk = LockService.getScriptLock(); lk.waitLock(20000); var res;
      try { res = stockSold_(body); } finally { lk.releaseLock(); }
      return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
    }
    if (body.action === 'ev' && body.events && body.events.length) {
      var lock = LockService.getScriptLock(); lock.waitLock(10000);
      try { saveEvents_(body); } finally { lock.releaseLock(); }
    }
  } catch (err) {}
  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}
function saveEvents_(b) {
  var sh = sheet_('Events', EV_HDR), rows = [], tz = 'Asia/Kuala_Lumpur';
  var evs = b.events.slice(0, 60);
  for (var i = 0; i < evs.length; i++) {
    var ev = evs[i], ts = new Date(Number(ev.t) || Date.now());
    rows.push([ts, Utilities.formatDate(ts, tz, 'yyyy-MM-dd'), clip_(b.vid,20), clip_(b.sid,20), clip_(b.store,60), clip_(ev.k,24), clip_(ev.i,90), Number(ev.v)||'', clip_(b.dev,10), clip_(b.src,24), b.isNew ? 1 : '']);
  }
  if (rows.length) sh.getRange(sh.getLastRow()+1, 1, rows.length, EV_HDR.length).setValues(rows);
}

/* summary for the Orderla Analytics page: ?action=stats&days=7&key=... */
function stats_(p) {
  var key = PropertiesService.getScriptProperties().getProperty('STATS_KEY');
  if (!key || p.key !== key) return {ok:false, error:'no access'};
  var days = Math.min(Math.max(Number(p.days)||7, 1), 120), since = Date.now() - days*864e5;
  var ev = sheet_('Events', EV_HDR), n = ev.getLastRow(), data = n > 1 ? ev.getRange(2,1,n-1,EV_HDR.length).getValues() : [];
  var out = {ok:true, days:days, generated:Date.now(), events:[]};
  for (var i = 0; i < data.length; i++) { var r = data[i]; var t = new Date(r[0]).getTime(); if (t < since) continue;
    out.events.push([t, r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10]]); }
  var dr = sheet_('Draw', DRAW_HDR), dn = dr.getLastRow(); out.draw = dn > 1 ? dr.getRange(2,1,dn-1,8).getValues().filter(function(r){ return r[0] && new Date(r[1]).getTime() >= since; }).map(function(r){ return [new Date(r[1]).getTime(), r[2], r[6], r[7]]; }) : [];
  var ld = sheet_('Leads', LEAD_HDR), ln = ld.getLastRow(); out.leads = ln > 1 ? ld.getRange(2,1,ln-1,LEAD_HDR.length).getValues().filter(function(r){ return r[0] && new Date(r[8]).getTime() >= since; }).map(function(r){ return [new Date(r[7]).getTime(), new Date(r[8]).getTime(), r[2], Number(r[3])||0, r[5], r[6]===true, r[9] ? 1 : 0]; }) : [];
  return out;
}

function sheet_(name, hdr) {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(hdr); sh.setFrozenRows(1); }
  return sh;
}
function phone_(v) { var d = String(v||'').replace(/\D/g,''); if (/^65[3689]\d{7}$/.test(d)) return d; if (d.indexOf('60')===0) d=d.slice(2); if (d.indexOf('0')===0) d=d.slice(1); return /^1\d{8,9}$/.test(d) ? '60'+d : ''; }
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

function setup() { sheet_('Leads', LEAD_HDR); sheet_('Draw', DRAW_HDR); sheet_('Events', EV_HDR); var s = SpreadsheetApp.getActive().getSheetByName('Sheet1'); if (s && s.getLastRow()===0) SpreadsheetApp.getActive().deleteSheet(s); }

/* ===== STOCK (one stock count for single cakes AND Build Your Own Box picks) =====
 * Tab Stock: staff type today's count in column "stock". Paid Orderla orders count it down.
 * Tab StockLog: one row per item taken off (order_code makes each order count once).
 * Store reads ?action=stock (public, counts only). Voucher Checker POSTs stock_sold_v1 with the shared key
 * (Script Property STOCK_KEY in both scripts; never written in a sheet or chat).
 */
var STOCK_HDR = ['item','stock','sold_online','updated','note'];
var SLOG_HDR = ['ts','order_code','store','item','qty','before','after','source'];
function norm_(s){ return String(s||'').toLowerCase().replace(/\s+/g,' ').trim(); }
function stockGet_() {
  var c = CacheService.getScriptCache(), hit = c.get('stock1'); if (hit) return JSON.parse(hit);
  var sh = sheet_('Stock', STOCK_HDR), n = sh.getLastRow(), out = {ok:true, t:Date.now(), items:{}};
  if (n > 1) sh.getRange(2,1,n-1,2).getValues().forEach(function(r){ if (r[0] !== '' && r[1] !== '' && r[1] !== null) out.items[norm_(r[0])] = Number(r[1]); });
  c.put('stock1', JSON.stringify(out), 30);
  return out;
}
/* body: {action, key, order_code, store, items:[{name, qty, options:[{name, qty}]}]} - send once the order is PAID */
function stockSold_(b) {
  var key = PropertiesService.getScriptProperties().getProperty('STOCK_KEY');
  if (!key || b.key !== key) return {ok:false, error:'no access'};
  var code = clip_(b.order_code, 40); if (!code) return {ok:false, error:'no order_code'};
  var log = sheet_('StockLog', SLOG_HDR);
  if (find_(log, 2, code)) return {ok:true, duplicate:true};
  var sh = sheet_('Stock', STOCK_HDR), n = sh.getLastRow(), rows = n > 1 ? sh.getRange(2,1,n-1,3).getValues() : [], idx = {};
  rows.forEach(function(r,i){ idx[norm_(r[0])] = i; });
  var take = {};
  (b.items || []).forEach(function(it){
    var q = Math.max(Number(it.qty)||1, 1), nm = norm_(it.name);
    if (idx[nm] !== undefined) take[nm] = (take[nm]||0) + q;
    (it.options || []).forEach(function(o){ var on = norm_(o.name); if (idx[on] !== undefined) take[on] = (take[on]||0) + q*Math.max(Number(o.qty)||1,1); });
  });
  var logRows = [], now = now_(), done = [];
  Object.keys(take).forEach(function(nm){
    var i = idx[nm], before = Number(rows[i][1])||0, after = before - take[nm];
    sh.getRange(i+2, 2, 1, 3).setValues([[after, (Number(rows[i][2])||0) + take[nm], now]]);
    logRows.push([now, code, clip_(b.store,60), rows[i][0], take[nm], before, after, 'orderla']); done.push(rows[i][0]+' -'+take[nm]);
  });
  if (!logRows.length) logRows.push([now, code, clip_(b.store,60), '(no stock items)', 0, '', '', 'orderla']);
  log.getRange(log.getLastRow()+1, 1, logRows.length, SLOG_HDR.length).setValues(logRows);
  CacheService.getScriptCache().remove('stock1');
  return {ok:true, taken:done};
}
/* run once from the editor: makes the tabs and a STOCK_KEY (shown only in the Script Properties page) */
function stockSetup() {
  sheet_('Stock', STOCK_HDR); sheet_('StockLog', SLOG_HDR);
  var pr = PropertiesService.getScriptProperties();
  if (!pr.getProperty('STOCK_KEY')) pr.setProperty('STOCK_KEY', Utilities.getUuid().replace(/-/g,''));
}
