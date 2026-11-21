window.OA = window.OA || {};
OA.pal = ['#780C14', '#7A4926', '#523325', '#780C14', '#7A4926'];
OA.parseTs = function (s) {
  if (s == null || s === '') return null;
  if (typeof s === 'number') return s;
  var m = String(s).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})/);
  if (m) return Date.UTC(+m[3], +m[1] - 1, +m[2], +m[4] - 8, +m[5], +m[6]);
  var t = Date.parse(s); return isNaN(t) ? null : t;
};
OA.days = function () { var d = Number((dash.params() || {}).days); return d === 1 || d === 30 ? d : 7; };
OA.window = function (days) {
  var now = Date.now(), dayMs = 864e5;
  if (days === 1) { var myt = new Date(now + 8 * 36e5); var start = Date.UTC(myt.getUTCFullYear(), myt.getUTCMonth(), myt.getUTCDate()) - 8 * 36e5; return {from: start, to: now, pFrom: start - dayMs, pTo: start}; }
  return {from: now - days * dayMs, to: now, pFrom: now - 2 * days * dayMs, pTo: now - days * dayMs};
};
OA.pretty = {
  instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp', 'whatsapp-reminder': 'WhatsApp reminder link', tiktok: 'TikTok', google: 'Google', website: 'chaleurpatisserie.com', direct: 'Direct / typed link', other: 'Other websites',
  'chaleur-atelier-patisserie-larkin': 'HQ Larkin', 'chaleur-atelier-patisserie-x-jiran-cafe': 'Jiran Cafe', 'chaleur-atelier-patisserie-x-knocknock-cafe': 'KnockKnock Cafe', 'testing-site': 'Testing site',
  mobile: 'Phone', desktop: 'Computer', tablet: 'Tablet',
  rm20: 'RM20 off', rm2: 'RM2 off', half: 'Next cake 50% off', petit: 'RM6.99 surprise cake', cookie: 'Free cookie', kit: 'Free birthday kit'
};
OA.name = function (k) { return OA.pretty[k] || k || '(unknown)'; };

function sheetRows(answer) {
  var a = answer && answer.content ? answer.content : answer;
  if (a && a.error) throw new Error(typeof a.error === 'string' ? a.error : (a.error.message || 'Sheet read failed'));
  var v = (a && a.values) || [];
  if (!v.length) return {columns: [], rows: []};
  var cols = v[0].map(String), rows = [];
  for (var i = 1; i < v.length; i++) { var r = v[i]; if (!r || !r[0]) continue; var o = {}; for (var j = 0; j < cols.length; j++) o[cols[j]] = r[j] == null ? '' : r[j]; rows.push(o); }
  return {columns: cols, rows: rows};
}
dash.loader('events', {fn: function ({answer}) {
  var t = sheetRows(answer);
  t.rows.forEach(function (r) { r.ts = OA.parseTs(r.ts); r.value = r.value === '' ? null : Number(r.value); r['new'] = String(r['new']) === '1'; });
  t.rows = t.rows.filter(function (r) { return r.ts; });
  return t;
}});
dash.loader('leads', {fn: function ({answer}) {
  var t = sheetRows(answer);
  t.rows.forEach(function (r) { r.first_seen = OA.parseTs(r.first_seen); r.last_update = OA.parseTs(r.last_update); r.reminded_at = OA.parseTs(r.reminded_at); r.total = Number(r.total) || 0; r.ordered = String(r.ordered).toUpperCase() === 'TRUE'; });
  return {columns: ['phone', 'store', 'total', 'items', 'stage', 'ordered', 'first_seen', 'last_update', 'reminded_at'], rows: t.rows};
}});
function normPh(p) { p = String(p || '').replace(/\D/g, ''); if (p.indexOf('0') === 0) p = '6' + p; return p; }
dash.loader('orders', {fn: function ({answer}) {
  var t = sheetRows(answer); t.rows.forEach(function (r) { r.phone = normPh(r.phone); r.total = Number(String(r.total || '').replace(/[^\d.]/g, '')) || 0; }); t.rows = t.rows.filter(function (r) { return r.phone; }); return {columns: ['phone', 'date', 'form', 'status', 'total'], rows: t.rows};
}});
dash.loader('members', {fn: function ({answer}) {
  var t = sheetRows(answer); t.rows.forEach(function (r) { r.phone = normPh(r.phone); r.total_transactions = Number(r.total_transactions) || 0; }); t.rows = t.rows.filter(function (r) { return r.phone; }); return {columns: ['phone', 'last_visit', 'total_transactions'], rows: t.rows};
}});

dash.calc('returning', {inputs: ['sessions', 'orders', 'members'], fn: function (sessions, orders, members) {
  var o = {}, m = {}, p = {};
  orders.forEach(function (r) { var x = o[r.phone] = o[r.phone] || {n: 0, first: '', last: '', stores: {}}; if (/CANCEL|FAIL|REFUND/i.test(r.status || '')) return; x.n++; if (!x.first || r.date < x.first) x.first = r.date; if (!x.last || r.date > x.last) x.last = r.date; if (r.form) x.stores[r.form] = 1; });
  members.forEach(function (r) { m[r.phone] = r; });
  sessions.forEach(function (s) {
    var key = s.phone || ('dev:' + s.vid), x = p[key];
    if (!x) x = p[key] = {key: key, person: s.person, phone: s.phone || '', name: s.name || '', visits: 0, ordered: 0, first: s.start, last: s.end, devices: s.devices || 1};
    x.visits++; if (s.ordered) x.ordered++; x.first = Math.min(x.first, s.start); x.last = Math.max(x.last, s.end);
  });
  return Object.keys(p).map(function (k) {
    var x = p[k], oo = x.phone ? o[x.phone] : null, mm = x.phone ? m[x.phone] : null;
    x.orderla = oo ? oo.n : 0; x.lastOrder = oo ? oo.last : ''; x.orderStores = oo ? Object.keys(oo.stores).join(', ') : '';
    x.shopVisits = mm ? mm.total_transactions : 0; x.lastShop = mm ? mm.last_visit : '';
    x.kind = x.orderla ? 'Past Orderla customer' : mm ? 'Shop member' : x.visits > 1 ? 'Came back to the web store' : x.phone ? 'New, gave number' : 'New visitor';
    x.returning = x.visits > 1 || !!x.orderla || !!mm;
    return x;
  }).sort(function (a, b) { return b.last - a.last; });
}});
dash.calc('retsum', {inputs: ['returning'], fn: function (people) {
  var w = OA.window(OA.days()), act = people.filter(function (x) { return x.last >= w.from; });
  return [{ret: act.filter(function (x) { return x.returning; }).length, orderla: act.filter(function (x) { return x.orderla; }).length, shop: act.filter(function (x) { return x.shopVisits || x.lastShop; }).length, known: act.filter(function (x) { return x.phone; }).length}];
}});
function mytDay(ms) { return new Date(ms + 8 * 36e5).toISOString().slice(0, 10); }
function isPaid(r) { var st = String(r.status || '').toUpperCase(); return /PAID/.test(st) && !/NOT_PAID|UNPAID|CANCEL|REFUND|FAIL/.test(st); }
dash.calc('paid', {inputs: ['orders', 'sessions', 'leads'], fn: function (orders, sessions, leads) {
  var lt = {}; leads.forEach(function (l) { var p = normPh(l.phone); if (p && l.total > 0) lt[p] = l.total; });
  var w = OA.window(OA.days()), f = mytDay(w.from), t = mytDay(w.to), pf = mytDay(w.pFrom), pt = mytDay(w.pTo - 1);
  var seen = {}; sessions.forEach(function (s) { if (s.phone) (seen[s.phone] = seen[s.phone] || []).push(s); });
  function amt(r) { if (r.total > 0) return r.total; if (lt[r.phone]) return lt[r.phone]; var ss = (seen[r.phone] || []).filter(function (s) { return s.day <= r.date && s.value > 0; }).sort(function (x, y) { return y.start - x.start; }); return ss.length ? ss[0].value : 0; }
  function count(a, b, endIncl) { var inR = function (r) { return r.date >= a && (endIncl ? r.date <= b : r.date < b); };
    var rows = orders.filter(function (r) { return isPaid(r) && inR(r); }), withAmt = rows.map(amt).filter(function (x) { return x > 0; }), rmv = withAmt.reduce(function (t, x) { return t + x; }, 0);
    return {n: rows.length, v: rows.filter(function (r) { return seen[r.phone]; }).length, rm: Math.round(rmv * 100) / 100, aov: withAmt.length ? Math.round(rmv / withAmt.length * 100) / 100 : 0, known: withAmt.length, unpaid: orders.filter(function (r) { return !isPaid(r) && !/CANCEL/i.test(r.status || '') && inR(r); }).length}; }
  var a = count(f, t, true), b = count(pf, f, false);
  return [{paid: a.n, prev_paid: b.n, paidv: a.v, prev_paidv: b.v, paidrm: a.rm, prev_paidrm: b.rm, paidaov: a.aov, prev_paidaov: b.aov, known: a.known, unpaid: a.unpaid}];
}});
OA.paidPhones = function (orders) { var m = {}; orders.forEach(function (r) { if (isPaid(r)) (m[r.phone] = m[r.phone] || []).push(r.date); }); return m; };
dash.calc('summary', {inputs: ['events'], fn: function (events) {
  var w = OA.window(OA.days()), o = {};
  function count(from, to) {
    var v = new Set(), s = new Set(), ord = new Set(), nv = new Set(), leads = 0, val = {};
    events.forEach(function (e) { if (e.ts < from || e.ts >= to) return; v.add(e.vid); s.add(e.sid); if (e['new']) nv.add(e.vid); if (e.type === 'order') { ord.add(e.sid); if (e.value > 0) val[e.sid] = e.value; } if (e.type === 'lead') leads++; });
    var sales = Object.keys(val).reduce(function (t, k) { return t + val[k]; }, 0), nval = Object.keys(val).length;
    return {visitors: v.size, sessions: s.size, orders: ord.size, conv: s.size ? Math.round(ord.size / s.size * 1000) / 10 : 0, sales: Math.round(sales * 100) / 100, aov: nval ? Math.round(sales / nval * 100) / 100 : 0, leads: leads, newv: nv.size};
  }
  var a = count(w.from, w.to), b = count(w.pFrom, w.pTo);
  Object.keys(a).forEach(function (k) { o[k] = a[k]; o['prev_' + k] = b[k]; });
  return [o];
}});
dash.calc('daily', {inputs: ['events'], fn: function (events) {
  var dayMs = 864e5, out = [], map = {};
  var today = new Date(Date.now() + 8 * 36e5); var start = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) - 13 * dayMs;
  for (var i = 0; i < 14; i++) { var d = new Date(start + i * dayMs).toISOString().slice(0, 10); map[d] = {day: d, s: new Set(), o: new Set()}; out.push(map[d]); }
  events.forEach(function (e) { var d = new Date(e.ts + 8 * 36e5).toISOString().slice(0, 10); if (!map[d]) return; map[d].s.add(e.sid); if (e.type === 'order') map[d].o.add(e.sid); });
  return out.map(function (r) { return {day: r.day, visits: r.s.size, orders: r.o.size}; });
}});
function inWindow(events) { var w = OA.window(OA.days()); return events.filter(function (e) { return e.ts >= w.from && e.ts < w.to; }); }
dash.calc('funnel', {inputs: ['events'], fn: function (events) {
  var steps = [['view', 'Opened the store'], ['open', 'Opened a cake'], ['lead', 'Gave number'], ['add', 'Added to cart'], ['cart', 'Opened cart'], ['details', 'Customer details'], ['summary', 'Order summary'], ['order', 'Sent order']];
  var by = {}; inWindow(events).forEach(function (e) { (by[e.sid] = by[e.sid] || new Set()).add(e.type); });
  var sids = Object.keys(by);
  return steps.map(function (st, i) { var later = steps.slice(i).map(function (x) { return x[0]; }); return {step: st[1], k: st[0], visits: sids.filter(function (s) { return later.some(function (k) { return by[s].has(k); }); }).length}; });
}});
function groupSessions(events, key) { var m = {}, o = {}; inWindow(events).forEach(function (e) { var k = e[key] || ''; (m[k] = m[k] || new Set()).add(e.sid); if (e.type === 'order') (o[k] = o[k] || new Set()).add(e.sid); }); return Object.keys(m).map(function (k) { var n = m[k].size, c = o[k] ? o[k].size : 0, r = n ? Math.round(c / n * 1000) / 10 : 0; return {name: OA.name(k) + ' · ' + r + '% ordered', visits: n, orders: c, conv: r, k: k}; }).sort(function (a, b) { return b.visits - a.visits; }); }
dash.calc('bysource', {inputs: ['events'], fn: function (events) { return groupSessions(events, 'source'); }});
dash.calc('bydevice', {inputs: ['events'], fn: function (events) { return groupSessions(events, 'device'); }});
dash.calc('bystore', {inputs: ['events'], fn: function (events) { return groupSessions(events, 'store'); }});
dash.calc('products', {inputs: ['events'], fn: function (events) {
  var m = {}; inWindow(events).forEach(function (e) { if (e.type !== 'open' && e.type !== 'add') return; var k = (e.item || '').trim(); if (!k) return; m[k] = m[k] || {name: k, opened: 0, added: 0}; if (e.type === 'open') m[k].opened++; else m[k].added++; });
  return Object.keys(m).map(function (k) { return m[k]; });
}});
function countBy(events, type) { var m = {}; inWindow(events).forEach(function (e) { if (e.type !== type) return; var k = e.item || ''; m[k] = (m[k] || 0) + 1; }); return Object.keys(m).map(function (k) { return {name: OA.name(k), times: m[k], k: k}; }).sort(function (a, b) { return b.times - a.times; }); }
dash.calc('upsell', {inputs: ['events'], fn: function (events) { return countBy(events, 'upsell'); }});
dash.calc('boxup', {inputs: ['events'], fn: function (events) { return countBy(events, 'box_up'); }});
dash.calc('prizes', {inputs: ['events'], fn: function (events) { var rows = countBy(events, 'draw_prize'); var plays = inWindow(events).filter(function (e) { return e.type === 'draw_play'; }).length; return [{name: 'Games played', times: plays}].concat(rows); }});
dash.calc('gifts', {inputs: ['events'], fn: function (events) { var w = inWindow(events); function n(t) { return w.filter(function (e) { return e.type === t; }).length; } return [{name: 'Put on hold', times: n('gift_hold')}, {name: 'Came back', times: n('gift_back')}, {name: 'Expired', times: n('gift_expired')}]; }});
OA.act = {view: 'Opened the store', open: 'Opened a cake', add: 'Added to cart', tap: 'Tapped', cart: 'Opened cart', details: 'Customer details', summary: 'Order summary', order: 'Sent order', lead: 'Gave WhatsApp number', upsell: 'Tapped "Usually goes with"', box_up: 'Upgraded box', draw_play: 'Played Lucky Draw', draw_prize: 'Won a prize', gift_hold: 'Gift on hold', gift_back: 'Gift came back', gift_expired: 'Gift expired', postcode: 'Typed delivery postcode'};
function geoOf(e) { var p = String(e.item || '').split('|'); return {city: p[0] || '', region: p[1] || '', country: p[2] || ''}; }
OA.areas = function (events) { var a = {}; events.forEach(function (e) { if (e.type === 'geo' && !a[e.sid]) { var g = geoOf(e); a[e.sid] = [g.city, g.country].filter(Boolean).join(', '); } }); events.forEach(function (e) { if (e.type === 'postcode') a[e.sid] = 'Postcode ' + e.item; }); return a; };
dash.calc('live', {inputs: ['events'], fn: function (events) {
  var now = Date.now(), a = new Set(), st = {}, n30 = 0, last = 0;
  events.forEach(function (e) { if (e.ts > last) last = e.ts; if (now - e.ts < 5 * 6e4) { a.add(e.sid); (st[e.store] = st[e.store] || new Set()).add(e.sid); } if (now - e.ts < 30 * 6e4 && e.type !== 'stay' && e.type !== 'scroll') n30++; });
  var ar = OA.areas(events), ac = {}; a.forEach(function (s) { var k = ar[s] || 'area unknown'; ac[k] = (ac[k] || 0) + 1; });
  var where = Object.keys(st).map(function (k) { return OA.name(k) + ' ' + st[k].size; }).join(' · ') + (a.size ? ' — from ' + Object.keys(ac).map(function (k) { return k + (ac[k] > 1 ? ' ×' + ac[k] : ''); }).join(', ') : '');
  return [{active: a.size, actions30: n30, where: where, last: last}];
}});
dash.calc('feed', {inputs: ['events'], fn: function (events) {
  var area = OA.areas(events);
  var rows = events.filter(function (e) { return ['stay', 'scroll', 'geo', 'device', 'who'].indexOf(e.type) < 0; }).sort(function (a, b) { return b.ts - a.ts; }).slice(0, 40);
  return rows.map(function (e, i) { var d = new Date(e.ts + 8 * 36e5); return {key: String(e.ts) + '-' + i, time: d.toISOString().slice(5, 10).split('-').reverse().join('/') + ' ' + d.toISOString().slice(11, 19), store: OA.name(e.store), action: OA.act[e.type] || e.type, item: (e.type === 'lead' ? String(e.item || '').split('|')[0] : e.item) || (e.value ? 'RM' + e.value : ''), area: area[e.sid] || '', sid: e.sid, source: OA.name(e.source), device: OA.name(e.device)}; });
}});
function geoGroup(events, f) { var m = {}; inWindow(events).forEach(function (e) { if (e.type !== 'geo') return; var k = f(geoOf(e)) || '(unknown)'; (m[k] = m[k] || new Set()).add(e.sid); }); return Object.keys(m).map(function (k) { return {name: k, visits: m[k].size}; }).sort(function (a, b) { return b.visits - a.visits; }); }
dash.calc('cities', {inputs: ['events'], fn: function (events) { return geoGroup(events, function (g) { return [g.city, g.region !== g.city ? g.region : ''].filter(Boolean).join(', '); }); }});
dash.calc('countries', {inputs: ['events'], fn: function (events) { var n = {MY: 'Malaysia', SG: 'Singapore', ID: 'Indonesia'}; return geoGroup(events, function (g) { return n[g.country] || g.country; }); }});
dash.calc('postcodes', {inputs: ['events'], fn: function (events) { var m = {}; inWindow(events).forEach(function (e) { if (e.type !== 'postcode') return; (m[e.item] = m[e.item] || new Set()).add(e.sid); }); return Object.keys(m).map(function (k) { return {name: k, visits: m[k].size}; }).sort(function (a, b) { return b.visits - a.visits; }); }});
dash.calc('engage', {inputs: ['events'], fn: function (events) {
  var w = OA.window(OA.days());
  function count(from, to) {
    var by = {}, v = {}, taps = 0;
    events.forEach(function (e) { if (e.ts < from || e.ts >= to) return; var s = by[e.sid] = by[e.sid] || {stay: 0, min: e.ts, max: e.ts, types: new Set(), taps: 0, sc: 0}; s.min = Math.min(s.min, e.ts); s.max = Math.max(s.max, e.ts); s.types.add(e.type); if (e.type === 'stay') s.stay += e.value || 0; if (e.type === 'scroll') s.sc = Math.max(s.sc, e.value || 0); if (e.type === 'tap') { s.taps++; taps++; } v[e.vid] = v[e.vid] || e['new']; });
    var ss = Object.keys(by).map(function (k) { return by[k]; }); if (!ss.length) return {stay: 0, mstay: 0, taps: 0, apv: 0, bounce: 0, scroll: 0, aband: 0, ret: 0};
    var stays = ss.map(function (s) { return s.stay || Math.round((s.max - s.min) / 1000); }).sort(function (a, b) { return a - b; });
    var bounced = ss.filter(function (s) { var x = 0; s.types.forEach(function (t) { if (['view', 'stay', 'scroll', 'geo', 'device', 'who'].indexOf(t) < 0) x++; }); return !x; }).length;
    var scs = ss.filter(function (s) { return s.sc; }); var carts = ss.filter(function (s) { return s.types.has('cart'); });
    var vids = Object.keys(v), ret = vids.filter(function (k) { return !v[k]; }).length;
    return {stay: Math.round(d3.mean(stays)), mstay: Math.round(d3.median(stays)), taps: taps, apv: Math.round(taps / ss.length * 10) / 10, bounce: Math.round(bounced / ss.length * 1000) / 10, scroll: scs.length ? Math.round(d3.mean(scs, function (s) { return s.sc; })) : 0, aband: carts.length ? Math.round(carts.filter(function (s) { return !s.types.has('order'); }).length / carts.length * 1000) / 10 : 0, ret: vids.length ? Math.round(ret / vids.length * 1000) / 10 : 0};
  }
  var a = count(w.from, w.to), b = count(w.pFrom, w.pTo), o = {};
  Object.keys(a).forEach(function (k) { o[k] = a[k]; o['prev_' + k] = b[k]; });
  return [o];
}});
dash.calc('taps', {inputs: ['events'], fn: function (events) { return countBy(events, 'tap'); }});
dash.calc('hours', {inputs: ['events'], fn: function (events) {
  var first = {}; inWindow(events).forEach(function (e) { if (!first[e.sid] || e.ts < first[e.sid]) first[e.sid] = e.ts; });
  var h = d3.range(24).map(function (i) { return {hour: i, visits: 0}; }); Object.keys(first).forEach(function (k) { h[new Date(first[k] + 8 * 36e5).getUTCHours()].visits++; }); return h;
}});
dash.calc('weekdays', {inputs: ['events'], fn: function (events) {
  var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], first = {};
  inWindow(events).forEach(function (e) { if (!first[e.sid] || e.ts < first[e.sid]) first[e.sid] = e.ts; });
  var c = names.map(function (n) { return {name: n, visits: 0}; }); Object.keys(first).forEach(function (k) { c[new Date(first[k] + 8 * 36e5).getUTCDay()].visits++; });
  return c.slice(1).concat(c.slice(0, 1));
}});
dash.calc('stayband', {inputs: ['events'], fn: function (events) {
  var by = {}; inWindow(events).forEach(function (e) { var s = by[e.sid] = by[e.sid] || {stay: 0, min: e.ts, max: e.ts}; s.min = Math.min(s.min, e.ts); s.max = Math.max(s.max, e.ts); if (e.type === 'stay') s.stay += e.value || 0; });
  var bands = [['Under 30 sec', 0, 30], ['30 sec to 1 min', 30, 60], ['1 to 3 min', 60, 180], ['3 to 10 min', 180, 600], ['Over 10 min', 600, 1e9]];
  var st = Object.keys(by).map(function (k) { var s = by[k]; return s.stay || (s.max - s.min) / 1000; });
  return bands.map(function (b) { return {name: b[0], visits: st.filter(function (x) { return x >= b[1] && x < b[2]; }).length}; });
}});
dash.calc('sessions', {inputs: ['events'], fn: function (events) {
  var by = {}, whoV = {}, days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], cn = {MY: 'Malaysia', SG: 'Singapore', ID: 'Indonesia'};
  var order = ['view', 'open', 'lead', 'add', 'cart', 'details', 'summary', 'order'];
  events.forEach(function (e) {
    var s = by[e.sid]; if (!s) s = by[e.sid] = {sid: e.sid, vid: e.vid, start: e.ts, end: e.ts, store: e.store, source: e.source, device: e.device, isNew: false, types: [], opened: [], added: [], taps: [], upsell: [], boxup: [], prizes: [], stay: 0, scroll: 0, value: 0, city: '', country: '', postcode: ''};
    s.start = Math.min(s.start, e.ts); s.end = Math.max(s.end, e.ts); if (e['new']) s.isNew = true;
    if (s.types.indexOf(e.type) < 0) s.types.push(e.type);
    if (e.type === 'open' && e.item) s.opened.push(e.item);
    if (e.type === 'add' && e.item) s.added.push(e.item);
    if (e.type === 'tap') s.taps.push(e.item || '');
    if (e.type === 'upsell') s.upsell.push(e.item);
    if (e.type === 'box_up') s.boxup.push(e.item);
    if (e.type === 'draw_prize') s.prizes.push(e.item);
    if (e.type === 'stay') s.stay += e.value || 0;
    if (e.type === 'scroll') s.scroll = Math.max(s.scroll, e.value || 0);
    if ((e.type === 'order' || e.type === 'summary' || e.type === 'details' || e.type === 'cart') && e.value > 0) s.value = e.value;
    if (e.type === 'geo') { var g = geoOf(e); s.city = [g.city, g.region !== g.city ? g.region : ''].filter(Boolean).join(', '); s.country = cn[g.country] || g.country; }
    if (e.type === 'postcode') s.postcode = e.item;
    if (e.type === 'device' && e.item) s.dev = e.item;
    if ((e.type === 'who' || e.type === 'lead') && e.item) { if (!whoV[e.vid] || e.ts > whoV[e.vid].ts) whoV[e.vid] = {ts: e.ts, who: e.item}; }
  });
  function parseWho(w) { var p = String(w || '').split('|'); return {name: p[0] || '', phone: (p[1] || '').replace(/\D/g, '')}; }
  var vidsOf = {};
  Object.keys(whoV).forEach(function (v) { var w = parseWho(whoV[v].who), key = w.phone || w.name; (vidsOf[key] = vidsOf[key] || []).push(v); });
  var byVid = {}; Object.keys(by).forEach(function (k) { (byVid[by[k].vid] = byVid[by[k].vid] || []).push(by[k]); });
  var byKey = {};
  Object.keys(byVid).forEach(function (v) { var w = whoV[v] ? parseWho(whoV[v].who) : null, key = w ? (w.phone || w.name) : 'dev:' + v; (byKey[key] = byKey[key] || []).push.apply(byKey[key], byVid[v]); });
  Object.keys(byKey).forEach(function (key) {
    var list = byKey[key].sort(function (a, b) { return a.start - b.start; });
    list.forEach(function (s, i) {
      var w = whoV[s.vid] ? parseWho(whoV[s.vid].who) : {name: '', phone: ''};
      s.visitNo = i + 1; s.visitsTotal = list.length; s.deviceId = 'Device ' + String(s.vid).slice(0, 4).toUpperCase();
      s.name = w.name; s.phone = w.phone; s.who = w.name; s.devices = key.indexOf('dev:') === 0 ? 1 : (vidsOf[key] || [1]).length;
      s.person = w.name ? w.name + (w.phone ? (w.phone.indexOf('65') === 0 ? ' · +65 ' + w.phone.slice(2) : ' · 0' + w.phone.replace(/^60/, '')) : '') + (s.devices > 1 ? ' (' + s.devices + ' devices)' : '') : s.deviceId;
      s.dev = s.dev || '';
    });
  });
  return Object.keys(by).map(function (k) {
    var s = by[k], d = new Date(s.start + 8 * 36e5);
    if (!s.stay) s.stay = Math.round((s.end - s.start) / 1000);
    s.day = d.toISOString().slice(0, 10); s.hour = d.getUTCHours(); s.weekday = days[d.getUTCDay()];
    s.ordered = s.types.indexOf('order') >= 0; s.lead = s.types.indexOf('lead') >= 0;
    var far = 0; order.forEach(function (t, i) { if (s.types.indexOf(t) >= 0) far = i; }); s.step = order[far];
    s.bounce = !s.types.some(function (t) { return ['view', 'stay', 'scroll', 'geo', 'device', 'who'].indexOf(t) < 0; });
    return s;
  }).sort(function (a, b) { return b.start - a.start; });
}});
dash.calc('leadsum', {inputs: ['leads'], fn: function (leads) {
  var w = OA.window(OA.days()); var act = leads.filter(function (r) { return r.last_update >= w.from; });
  return [{name: 'Numbers active', times: act.length}, {name: 'Left without ordering', times: act.filter(function (r) { return !r.ordered; }).length}, {name: 'Reminded on WhatsApp', times: act.filter(function (r) { return r.reminded_at; }).length}, {name: 'Ordered', times: act.filter(function (r) { return r.ordered; }).length}];
}});
