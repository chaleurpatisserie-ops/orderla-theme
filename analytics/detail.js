(function () {
  var fmt = d3.format(','), rm = d3.format(',.2f');
  var ORDER = ['view', 'open', 'lead', 'add', 'cart', 'details', 'summary', 'order'];
  var ACT = Object.assign({}, OA.act, {stay: 'Active on the page', scroll: 'Scrolled down', geo: 'Area found', postcode: 'Typed delivery postcode', device: 'Phone / app', who: 'Recognised'});
  OA.pick = null; OA.visit = null;
  function each(sel, f) { var n = document.querySelectorAll(sel); for (var i = 0; i < n.length; i++) f(n[i]); }
  function inW(s) { var w = OA.window(OA.days()); return s.start >= w.from && s.start < w.to; }
  function period() { var d = OA.days(); return d === 1 ? 'today' : 'last ' + d + ' days'; }
  function t(ts) { var d = new Date(ts + 8 * 36e5).toISOString(); return d.slice(8, 10) + '/' + d.slice(5, 7) + ' ' + d.slice(11, 19); }
  function secs(v) { v = Math.round(v || 0); return v < 60 ? v + 's' : Math.floor(v / 60) + 'm ' + (v % 60) + 's'; }
  function hms(ms) { var v = Math.max(0, Math.round(ms / 1000)), h = Math.floor(v / 3600), m = Math.floor(v % 3600 / 60), s = v % 60; return (h ? h + 'h ' : '') + (h || m ? m + 'm ' : '') + s + 's'; }
  function dmy(s) { return s ? String(s).slice(8, 10) + '/' + String(s).slice(5, 7) + '/' + String(s).slice(0, 4) : ''; }
  function area(s) { return s.postcode ? 'Postcode ' + s.postcode : (s.city || s.country || ''); }
  function result(s) { return s.ordered ? 'Ordered' + (s.value ? ' RM' + rm(s.value) : '') : s.types.indexOf('cart') >= 0 ? 'Left cart' + (s.value ? ' RM' + rm(s.value) : '') : s.bounce ? 'Left straight away' : 'Browsed'; }
  function sync() { each('#detail-back', function (b) { b.hidden = !(OA.visit && OA.pick && !OA.pick.visit); }); }
  function cell(tr, txt) { var td = document.createElement('td'); td.textContent = txt == null ? '' : txt; tr.appendChild(td); }
  function sKey(s) { return s.phone || ('dev:' + s.vid); }
  function retData() { var d = dash.data('returning'); return d.status === 'ok' && d.data ? d.data : []; }
  function retKeys(f) { var k = {}; retData().forEach(function (x) { if (f(x)) k[x.key] = 1; }); return k; }

  OA.open = function (p) {
    OA.pick = p; OA.visit = p.visit || null; sync();
    each('#detail', function (d) { if (!d.open) { try { d.showModal(); } catch (e) { d.setAttribute('open', ''); } } });
    dash.draw('detail'); dash.draw('detail-title');
  };
  var all = function () { return true; };
  var CARDS = {
    'k-visitors': {title: 'All visits', fn: all}, 'k-sessions': {title: 'All visits', fn: all},
    'k-new': {title: 'Visits by new visitors', fn: function (s) { return s.isNew; }},
    'k-ret': {title: 'Visits by returning visitors', fn: function (s) { return !s.isNew; }},
    'k-orders': {title: 'Visits that sent an order', fn: function (s) { return s.ordered; }},
    'k-conv': {title: 'Visits that sent an order', fn: function (s) { return s.ordered; }},
    'k-sales': {title: 'Orders sent, biggest first', fn: function (s) { return s.ordered; }, sort: function (s) { return s.value; }},
    'k-aov': {title: 'Orders sent, biggest first', fn: function (s) { return s.ordered; }, sort: function (s) { return s.value; }},
    'k-leads': {title: 'Visits that gave a WhatsApp number', fn: function (s) { return s.lead; }},
    'k-active': {title: 'On the store in the last 5 minutes', all: true, fn: function (s) { return Date.now() - s.end < 5 * 6e4; }},
    'k-act30': {title: 'Active in the last 30 minutes', all: true, fn: function (s) { return Date.now() - s.end < 30 * 6e4; }},
    'k-stay': {title: 'Visits, longest stay first', fn: all, sort: function (s) { return s.stay; }},
    'k-mstay': {title: 'Visits, longest stay first', fn: all, sort: function (s) { return s.stay; }},
    'k-taps': {title: 'Visits, most clicks first', fn: all, sort: function (s) { return s.taps.length; }},
    'k-apv': {title: 'Visits, most clicks first', fn: all, sort: function (s) { return s.taps.length; }},
    'k-bounce': {title: 'Visits that left without tapping anything', fn: function (s) { return s.bounce; }},
    'k-scroll': {title: 'Visits, furthest scroll first', fn: all, sort: function (s) { return s.scroll; }},
    'k-aband': {title: 'Carts left without ordering', fn: function (s) { return s.types.indexOf('cart') >= 0 && !s.ordered; }, sort: function (s) { return s.value; }},
    'r-ret': {title: 'People who came back', keys: function (x) { return x.returning; }},
    'r-ol': {title: 'Visits by past Orderla customers', keys: function (x) { return x.orderla; }},
    'r-shop': {title: 'Visits by shop members', keys: function (x) { return x.shopVisits || x.lastShop; }},
    'r-known': {title: 'Visits by people who gave their number', fn: function (s) { return !!s.phone; }}
  };
  var BANDS = {'Under 30 sec': [0, 30], '30 sec to 1 min': [30, 60], '1 to 3 min': [60, 180], '3 to 10 min': [180, 600], 'Over 10 min': [600, 1e9]};
  var GIFT = {'Put on hold': 'gift_hold', 'Came back': 'gift_back', 'Expired': 'gift_expired'};
  function has(a, k) { return a.indexOf(k) >= 0; }
  var PANELS = {
    funnel: function (k) { var i = ORDER.indexOf(k); return function (s) { return ORDER.indexOf(s.step) >= i; }; },
    sources: function (k) { return function (s) { return s.source === k; }; },
    devices: function (k) { return function (s) { return s.device === k; }; },
    stores: function (k) { return function (s) { return s.store === k; }; },
    opened: function (k) { return function (s) { return has(s.opened, k); }; },
    added: function (k) { return function (s) { return has(s.added, k); }; },
    upsell: function (k) { return function (s) { return has(s.upsell, k); }; },
    boxes: function (k) { return function (s) { return has(s.boxup, k); }; },
    taps: function (k) { return function (s) { return has(s.taps, k); }; },
    prizes: function (k) { return k === 'Games played' ? function (s) { return has(s.types, 'draw_play'); } : function (s) { return has(s.prizes, k); }; },
    gifts: function (k) { return function (s) { return has(s.types, GIFT[k]); }; },
    leads: function (k) { return {'Numbers active': function (s) { return s.lead; }, 'Left without ordering': function (s) { return s.lead && !s.ordered; }, 'Reminded on WhatsApp': function (s) { return s.source === 'whatsapp-reminder'; }, 'Ordered': function (s) { return s.lead && s.ordered; }}[k] || all; },
    weekdays: function (k) { return function (s) { return s.weekday === k; }; },
    stayband: function (k) { var b = BANDS[k] || [0, 1e9]; return function (s) { return s.stay >= b[0] && s.stay < b[1]; }; },
    postcodes: function (k) { return function (s) { return s.postcode === k; }; },
    cities: function (k) { return function (s) { return s.city === k; }; },
    countries: function (k) { return function (s) { return s.country === k; }; }
  };
  document.addEventListener('click', function (e) {
    var el = e.target; if (!el || !el.closest) return;
    if (el.closest('#detail-close')) { each('#detail', function (d) { d.close ? d.close() : d.removeAttribute('open'); }); return; }
    if (el.closest('#detail-back')) { OA.visit = null; sync(); dash.draw('detail'); dash.draw('detail-title'); return; }
    var v = el.closest('#detail tr.v'); if (v) { OA.visit = v.getAttribute('data-sid'); sync(); dash.draw('detail'); dash.draw('detail-title'); return; }
    if (el.closest('#detail')) { if (el.id === 'detail') each('#detail', function (d) { d.close(); }); return; }
    var pr = el.closest('#retlist tbody tr[data-pk]'); if (pr) { var key = pr.getAttribute('data-pk'), name = pr.firstChild ? pr.firstChild.textContent : ''; OA.open({title: 'All visits: ' + name, all: true, fn: function (s) { return sKey(s) === key; }}); return; }
    var fr = el.closest('#feed tbody tr[data-sid], #nowon tbody tr[data-sid]'); if (fr) { OA.open({title: 'One visit', visit: fr.getAttribute('data-sid'), all: true, fn: all}); return; }
    var row = el.closest('.hb .row'); if (row) { var p = row.closest('.panel[id]'), f = p && PANELS[p.id]; if (f) OA.open({title: (p.querySelector('h3') || {}).textContent + ': ' + row.getAttribute('data-label'), fn: f(row.getAttribute('data-k'))}); return; }
    var card = el.closest('.card[id]'); if (card && CARDS[card.id]) {
      var c = CARDS[card.id], fn = c.fn;
      if (c.keys) { var ks = retKeys(c.keys); fn = function (s) { return !!ks[sKey(s)]; }; }
      OA.open({title: c.title, fn: fn, sort: c.sort, all: c.all});
    }
  });

  function drawNow(tb) {
    tb.replaceChildren();
    function msg(x) { var tr = document.createElement('tr'), td = document.createElement('td'); td.colSpan = 10; td.className = 'empty'; td.textContent = x; tr.appendChild(td); tb.appendChild(tr); }
    var d = dash.data('sessions'); if (d.status === 'error') return msg('Couldn’t load the visit log.'); if (d.status !== 'ok' || !d.data) return msg('Loading…');
    var now = Date.now(), live = d.data.filter(function (s) { return now - s.end < 5 * 6e4; });
    if (!live.length) return msg('Nobody on the stores right now.');
    var ev = (dash.data('events').data || []), lastAct = {};
    ev.forEach(function (e) { if (['stay', 'scroll', 'geo', 'device', 'who'].indexOf(e.type) >= 0) return; if (!lastAct[e.sid] || e.ts > lastAct[e.sid].ts) lastAct[e.sid] = e; });
    live.sort(function (a, b) { return a.start - b.start; }).forEach(function (s) {
      var tr = document.createElement('tr'); tr.setAttribute('data-sid', s.sid); var la = lastAct[s.sid];
      var item = la && la.item && la.type !== 'view' ? (la.type === 'draw_prize' ? OA.name(la.item) : la.type === 'lead' ? String(la.item).split('|')[0] : la.item) : '';
      var doing = la ? (ACT[la.type] || la.type) + (item ? ': ' + item : '') + ' · ' + hms(now - la.ts) + ' ago' : '';
      cell(tr, s.person + (s.visitsTotal > 1 ? ' · visit ' + s.visitNo : ' · first visit')); cell(tr, s.dev); cell(tr, hms(now - s.start)); cell(tr, secs(s.stay)); cell(tr, OA.name(s.store)); cell(tr, doing); cell(tr, s.value ? 'RM' + rm(s.value) : ''); cell(tr, area(s)); cell(tr, OA.name(s.source)); cell(tr, OA.name(s.device));
      tb.appendChild(tr);
    });
  }
  dash.draw('nowon', {mount: function (tb) { drawNow(tb); return setInterval(function () { drawNow(tb); }, 1000); }, update: function (tb) { drawNow(tb); }});

  ['ret', 'ol', 'shop', 'known'].forEach(function (k) { var f = {ret: 'ret', ol: 'orderla', shop: 'shop', known: 'known'}[k]; dash.draw('rv-' + k, function (el) { var d = dash.data('retsum'); if (d.status !== 'ok' || !d.data) { el.textContent = d.status === 'error' ? 'Couldn’t load' : '—'; return; } el.textContent = fmt(d.data[0][f]); }); });
  dash.draw('retlist', function (tb) {
    tb.replaceChildren();
    function msg(x) { var tr = document.createElement('tr'), td = document.createElement('td'); td.colSpan = 9; td.className = 'empty'; td.textContent = x; tr.appendChild(td); tb.appendChild(tr); }
    var d = dash.data('returning'); if (d.status === 'error') return msg('Couldn’t load: ' + (d.message || '')); if (d.status !== 'ok' || !d.data) return msg('Loading…');
    var w = OA.window(OA.days()), rows = d.data.filter(function (x) { return x.returning && x.last >= w.from; });
    if (!rows.length) return msg('Nobody has come back yet in this period. Returning people show here once they visit again or give a number that matches a past order.');
    rows.slice(0, 100).forEach(function (x) {
      var tr = document.createElement('tr'); tr.setAttribute('data-pk', x.key);
      cell(tr, x.person); cell(tr, x.kind); cell(tr, fmt(x.visits)); cell(tr, fmt(x.ordered)); cell(tr, t(x.last)); cell(tr, x.orderla ? fmt(x.orderla) : ''); cell(tr, dmy(x.lastOrder)); cell(tr, x.shopVisits ? fmt(x.shopVisits) : ''); cell(tr, x.lastShop ? dmy(x.lastShop) : '');
      tb.appendChild(tr);
    });
  });

  dash.draw('detail-title', function (el) { el.textContent = !OA.pick ? '—' : OA.visit ? 'What this visitor did' : OA.pick.title + (OA.pick.all ? '' : ' · ' + period()); });
  function table(el, heads) { var tb = document.createElement('table'), th = document.createElement('thead'), hr = document.createElement('tr'); heads.forEach(function (h) { var x = document.createElement('th'); x.textContent = h; hr.appendChild(x); }); th.appendChild(hr); tb.appendChild(th); var body = document.createElement('tbody'); tb.appendChild(body); var w = document.createElement('div'); w.style.overflowX = 'auto'; w.appendChild(tb); el.appendChild(w); return body; }
  function sumLine(el, pairs) { var d = document.createElement('div'); d.className = 'sum'; pairs.forEach(function (p) { var s = document.createElement('span'); s.append(p[0] + ' '); var b = document.createElement('b'); b.textContent = p[1]; s.appendChild(b); d.appendChild(s); }); el.appendChild(d); }
  function journey(el, s) {
    if (!s) { el.textContent = 'This visit is no longer in the log.'; return; }
    var rx = retData().filter(function (x) { return x.key === sKey(s); })[0];
    sumLine(el, [['Who', s.person], ['Visit', s.visitNo + ' of ' + s.visitsTotal], ['Phone / app', s.dev || '—']].concat(rx && rx.orderla ? [['Orderla orders', rx.orderla + ' (last ' + dmy(rx.lastOrder) + ')']] : []).concat(rx && rx.lastShop ? [['Shop visits', rx.shopVisits + ' (last ' + dmy(rx.lastShop) + ')']] : []));
    sumLine(el, [['Store', OA.name(s.store)], ['From', OA.name(s.source)], ['Device', OA.name(s.device)], ['Area', area(s) || 'unknown'], ['Visitor', s.isNew ? 'new' : 'returning'], ['Started', t(s.start)], ['Stayed', secs(s.stay)], ['Clicks', fmt(s.taps.length)], ['Scrolled', s.scroll ? s.scroll + '%' : '—'], ['Result', result(s)]]);
    var ev = dash.data('events'); var rows = (ev.data || []).filter(function (e) { return e.sid === s.sid; }).sort(function (a, b) { return a.ts - b.ts; });
    var body = table(el, ['Time', 'Action', 'What', 'Value']);
    rows.forEach(function (e) {
      var tr = document.createElement('tr'), what = e.item || '', val = '';
      if (e.type === 'geo') { var p = String(e.item || '').split('|'); what = [p[0], p[2]].filter(Boolean).join(', '); }
      if (e.type === 'stay') val = e.value + 's active'; else if (e.type === 'scroll') val = e.value + '% down the page'; else if (e.value) val = 'RM' + rm(e.value);
      if (e.type === 'draw_prize') what = OA.name(e.item);
      if ((e.type === 'who' || e.type === 'lead') && what.indexOf('|') > 0) what = what.replace('|', ' · ').replace(/· 60/, '· 0');
      cell(tr, t(e.ts)); cell(tr, ACT[e.type] || e.type); cell(tr, what); cell(tr, val); body.appendChild(tr);
    });
  }
  dash.draw('detail', function (el) {
    el.replaceChildren(); sync(); if (!OA.pick) return;
    var d = dash.data('sessions'); if (d.status !== 'ok' || !d.data) { el.textContent = d.status === 'error' ? 'Couldn’t load the visit log.' : 'Loading…'; return; }
    if (OA.visit) return journey(el, d.data.filter(function (s) { return s.sid === OA.visit; })[0]);
    var list = d.data.filter(function (s) { return (OA.pick.all || inW(s)) && OA.pick.fn(s); });
    if (OA.pick.sort) list.sort(function (a, b) { return OA.pick.sort(b) - OA.pick.sort(a); });
    var ord = list.filter(function (s) { return s.ordered; });
    sumLine(el, [['Visits', fmt(list.length)], ['Ordered', fmt(ord.length)], ['Conversion', list.length ? Math.round(ord.length / list.length * 1000) / 10 + '%' : '—'], ['Cart value sent', 'RM' + rm(d3.sum(ord, function (s) { return s.value; }))], ['Average stay', list.length ? secs(d3.mean(list, function (s) { return s.stay; })) : '—'], ['Clicks', fmt(d3.sum(list, function (s) { return s.taps.length; }))]]);
    if (!list.length) { var n = document.createElement('p'); n.className = 'note'; n.textContent = 'No visits match this yet.'; el.appendChild(n); return; }
    var body = table(el, ['Started', 'Who', 'Store', 'From', 'Device', 'Area', 'Stayed', 'Clicks', 'Got to', 'Result']);
    list.slice(0, 200).forEach(function (s) {
      var tr = document.createElement('tr'); tr.className = 'v'; tr.setAttribute('data-sid', s.sid); tr.title = 'See everything this visitor did';
      cell(tr, t(s.start)); cell(tr, s.person + (s.visitsTotal > 1 ? ' · visit ' + s.visitNo : '')); cell(tr, OA.name(s.store)); cell(tr, OA.name(s.source)); cell(tr, OA.name(s.device)); cell(tr, area(s)); cell(tr, secs(s.stay)); cell(tr, fmt(s.taps.length)); cell(tr, ACT[s.step] || s.step); cell(tr, result(s));
      body.appendChild(tr);
    });
    if (list.length > 200) { var m = document.createElement('p'); m.className = 'note'; m.textContent = 'Showing the newest 200 of ' + fmt(list.length) + '.'; el.appendChild(m); }
  });
})();
