(function () {
  var sel = document.querySelectorAll('#range');
  for (var i = 0; i < sel.length; i++) { sel[i].value = String(OA.days()); sel[i].addEventListener('change', function (e) { dash.setParams({days: e.target.value}); }); }
  dash.onData(function () { var s = document.querySelectorAll('#range'); for (var j = 0; j < s.length; j++) if (document.activeElement !== s[j]) s[j].value = String(OA.days()); });

  var fmt = d3.format(',');
  function sum() { return dash.data('summary'); }
  function setStatus(el, st) { el.textContent = st === 'error' ? 'Couldn’t load' : '—'; }
  var rm = d3.format(',.2f'), isRM = function (k) { return k === 'sales' || k === 'aov'; };
  ['visitors', 'sessions', 'orders', 'conv', 'sales', 'aov', 'leads', 'newv'].forEach(function (k) {
    dash.draw('kv-' + k, function (el) { var s = sum(); if (s.status !== 'ok' || !s.data) return setStatus(el, s.status); var v = s.data[0][k]; el.textContent = k === 'conv' ? v + '%' : isRM(k) ? 'RM' + rm(v) : fmt(v); });
    dash.draw('kc-' + k, function (el) {
      var s = sum(); el.className = 'ch'; if (s.status !== 'ok' || !s.data) { el.textContent = '—'; return; }
      var a = s.data[0][k], b = s.data[0]['prev_' + k], d = a - b, per = OA.days() === 1 ? 'yesterday' : 'previous ' + OA.days() + ' days';
      if (!b && !a) { el.textContent = 'No data yet'; return; }
      el.textContent = (d > 0 ? '▲ ' : d < 0 ? '▼ ' : '') + (k === 'conv' ? Math.abs(Math.round(d * 10) / 10) + ' pts' : isRM(k) ? 'RM' + rm(Math.abs(d)) : fmt(Math.abs(d))) + ' vs ' + per;
      if (d) el.classList.add(d > 0 ? 'up' : 'down');
    });
  });
  dash.draw('takeaway', function (el) {
    var s = sum(); if (s.status !== 'ok' || !s.data) { el.textContent = s.status === 'error' ? 'The visit log couldn’t be read: ' + (s.message || '') : 'Loading your store’s numbers…'; return; }
    var r = s.data[0], per = OA.days() === 1 ? 'today' : 'in the last ' + OA.days() + ' days';
    if (!r.sessions) { el.textContent = 'No visits recorded ' + per + ' yet. Tracking started on 20 Nov 2026.'; return; }
    el.textContent = fmt(r.visitors) + ' people made ' + fmt(r.sessions) + ' visits ' + per + ', and ' + r.conv + '% of visits ended with an order sent.';
  });

  function hbars(el, id, valKey, labelKey, color, limit) {
    var d = dash.data(id); el.replaceChildren();
    if (d.status === 'error') { var e = document.createElement('div'); e.className = 'empty'; e.textContent = 'Couldn’t load this.'; el.appendChild(e); return; }
    if (d.status !== 'ok' || !d.data) { el.textContent = '—'; return; }
    var rows = d.data.slice().filter(function (r) { return r[valKey] > 0 || id === 'funnel' || id === 'gifts' || id === 'leadsum'; });
    if (limit) rows = rows.sort(function (a, b) { return b[valKey] - a[valKey]; }).slice(0, limit);
    if (!rows.length) { var n = document.createElement('div'); n.className = 'empty'; n.textContent = 'Nothing yet in this period.'; el.appendChild(n); return; }
    var max = d3.max(rows, function (r) { return r[valKey]; }) || 1;
    rows.forEach(function (r) {
      var row = document.createElement('div'); row.className = 'row'; row.setAttribute('data-k', r.k != null ? r.k : (r.name != null ? r.name : r.step)); row.setAttribute('data-label', r[labelKey]); row.setAttribute('role', 'button'); row.tabIndex = 0;
      var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = r[labelKey]; nm.title = r[labelKey];
      var tr = document.createElement('span'); tr.className = 'tr'; var fl = document.createElement('span'); fl.className = 'fl'; fl.style.display = 'block'; fl.style.width = (r[valKey] / max * 100) + '%'; fl.style.background = color || OA.pal[0]; tr.appendChild(fl);
      var v = document.createElement('span'); v.className = 'n'; v.textContent = fmt(r[valKey]);
      row.append(nm, tr, v); el.appendChild(row);
    });
  }
  dash.draw('funnel', function (el) { hbars(el, 'funnel', 'visits', 'step'); });
  dash.draw('sources', function (el) { hbars(el, 'bysource', 'visits', 'name'); });
  dash.draw('devices', function (el) { hbars(el, 'bydevice', 'visits', 'name', OA.pal[1]); });
  dash.draw('stores', function (el) { hbars(el, 'bystore', 'visits', 'name', OA.pal[2]); });
  dash.draw('opened', function (el) { hbars(el, 'products', 'opened', 'name', OA.pal[0], 10); });
  dash.draw('added', function (el) { hbars(el, 'products', 'added', 'name', OA.pal[1], 10); });
  dash.draw('upsell', function (el) { hbars(el, 'upsell', 'times', 'name', OA.pal[2]); });
  dash.draw('boxup', function (el) { hbars(el, 'boxup', 'times', 'name', OA.pal[3]); });
  dash.draw('prizes', function (el) { hbars(el, 'prizes', 'times', 'name', OA.pal[0]); });
  dash.draw('gifts', function (el) { hbars(el, 'gifts', 'times', 'name', OA.pal[1]); });
  dash.draw('leadsum', function (el) { hbars(el, 'leadsum', 'times', 'name', OA.pal[2]); });
  dash.draw('postcodes', function (el) { hbars(el, 'postcodes', 'visits', 'name', OA.pal[0], 15); });
  dash.draw('cities', function (el) { hbars(el, 'cities', 'visits', 'name', OA.pal[1], 15); });
  dash.draw('countries', function (el) { hbars(el, 'countries', 'visits', 'name', OA.pal[2]); });
  dash.draw('taps', function (el) { hbars(el, 'taps', 'times', 'name', OA.pal[0], 15); });
  dash.draw('weekdays', function (el) { hbars(el, 'weekdays', 'visits', 'name', OA.pal[1]); });
  dash.draw('stayband', function (el) { hbars(el, 'stayband', 'visits', 'name', OA.pal[2]); });

  /* live */
  function live() { return dash.data('live'); }
  dash.draw('lv-active', function (el) { var d = live(); if (d.status !== 'ok' || !d.data) return setStatus(el, d.status); el.textContent = fmt(d.data[0].active); });
  dash.draw('lv-act30', function (el) { var d = live(); if (d.status !== 'ok' || !d.data) return setStatus(el, d.status); el.textContent = fmt(d.data[0].actions30); });
  dash.draw('lv-stores', function (el) { var d = live(); if (d.status !== 'ok' || !d.data) { el.textContent = '—'; return; } el.textContent = d.data[0].where || 'Nobody on the stores right now'; });
  dash.draw('lv-last', function (el) { var d = live(); if (d.status !== 'ok' || !d.data) { el.textContent = '—'; return; } var l = d.data[0].last; if (!l) { el.textContent = 'No activity yet'; return; } var m = Math.round((Date.now() - l) / 6e4); el.textContent = 'Last action ' + (m < 1 ? 'just now' : m < 60 ? m + ' min ago' : Math.round(m / 60) + ' h ago'); });
  dash.draw('feed', function (tb) {
    var d = dash.data('feed'); tb.replaceChildren();
    function msg(t) { var tr = document.createElement('tr'), td = document.createElement('td'); td.colSpan = 7; td.className = 'empty'; td.textContent = t; tr.appendChild(td); tb.appendChild(tr); }
    if (d.status === 'error') return msg('Couldn’t load the visit log.');
    if (d.status !== 'ok' || !d.data) return msg('Loading…');
    if (!d.data.length) return msg('No actions yet.');
    d.data.forEach(function (r) { var tr = document.createElement('tr'); tr.setAttribute('data-sid', r.sid); ['time', 'store', 'action', 'item', 'area', 'source', 'device'].forEach(function (k) { var td = document.createElement('td'); td.textContent = r[k]; tr.appendChild(td); }); tb.appendChild(tr); });
  });
  document.querySelectorAll('#refresh').forEach(function (b) { b.addEventListener('click', function () { dash.refresh('events'); dash.refresh('leads'); dash.refresh('orders'); dash.refresh('members'); }); });
  setInterval(function () { if (document.visibilityState === 'visible') dash.refresh('events'); }, 60000);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') dash.refresh('events'); });

  /* engagement */
  function secs(v) { v = Math.round(v || 0); return v < 60 ? v + 's' : Math.floor(v / 60) + 'm ' + (v % 60) + 's'; }
  var EF = {stay: secs, mstay: secs, taps: fmt, apv: function (v) { return String(v); }, bounce: function (v) { return v + '%'; }, scroll: function (v) { return v + '%'; }, aband: function (v) { return v + '%'; }, ret: function (v) { return v + '%'; }};
  var lowerGood = {bounce: 1, aband: 1};
  Object.keys(EF).forEach(function (k) {
    dash.draw('ev-' + k, function (el) { var d = dash.data('engage'); if (d.status !== 'ok' || !d.data) return setStatus(el, d.status); el.textContent = EF[k](d.data[0][k]); });
    dash.draw('ec-' + k, function (el) {
      var d = dash.data('engage'); el.className = 'ch'; if (d.status !== 'ok' || !d.data) { el.textContent = '—'; return; }
      var a = d.data[0][k], b = d.data[0]['prev_' + k], diff = a - b, per = OA.days() === 1 ? 'yesterday' : 'previous ' + OA.days() + ' days';
      if (!a && !b) { el.textContent = 'No data yet'; return; }
      var pct = k === 'bounce' || k === 'scroll' || k === 'aband' || k === 'ret';
      el.textContent = (diff > 0 ? '▲ ' : diff < 0 ? '▼ ' : '') + (pct ? Math.abs(Math.round(diff * 10) / 10) + ' pts' : k === 'stay' || k === 'mstay' ? secs(Math.abs(diff)) : String(Math.abs(Math.round(diff * 10) / 10))) + ' vs ' + per;
      if (diff) el.classList.add((diff > 0) !== !!lowerGood[k] ? 'up' : 'down');
    });
  });

  function barChart(el, rows, opt) {
    var W = el.clientWidth || 300, H = opt.H, m = {t: 10, r: 8, b: 24, l: 28};
    var svg = d3.select(el).append('svg').attr('width', '100%').attr('height', H).attr('viewBox', '0 0 ' + W + ' ' + H).attr('role', 'img').attr('aria-label', opt.label);
    var x = d3.scaleBand().domain(rows.map(opt.key)).range([m.l, W - m.r]).padding(opt.pad);
    var y = d3.scaleLinear().domain([0, Math.max(1, d3.max(rows, function (r) { return r.visits; }))]).nice().range([H - m.b, m.t]);
    svg.append('g').attr('transform', 'translate(0,' + (H - m.b) + ')').call(d3.axisBottom(x).tickValues(opt.ticks(x.domain(), W)).tickFormat(opt.tickFmt).tickSizeOuter(0)).call(function (g) { g.selectAll('path,line').style('stroke', 'var(--cds-chart-axis)'); });
    svg.append('g').attr('transform', 'translate(' + m.l + ',0)').call(d3.axisLeft(y).ticks(3).tickFormat(d3.format('d'))).call(function (g) { g.select('.domain').remove(); g.selectAll('line').style('stroke', 'var(--cds-chart-grid)'); });
    svg.append('g').selectAll('rect').data(rows).join('rect').attr('x', function (r) { return x(opt.key(r)); }).attr('width', x.bandwidth()).attr('y', function (r) { return y(r.visits); }).attr('height', function (r) { return y(0) - y(r.visits); }).style('fill', OA.pal[0]).attr('rx', 3);
    if (opt.second) svg.append('g').selectAll('rect').data(rows).join('rect').attr('x', function (r) { return x(opt.key(r)) + x.bandwidth() * 0.25; }).attr('width', x.bandwidth() * 0.5).attr('y', function (r) { return y(r.orders); }).attr('height', function (r) { return y(0) - y(r.orders); }).style('fill', OA.pal[1]).attr('rx', 2);
    var tip = document.createElement('div'); tip.className = 'tip'; tip.hidden = true; el.appendChild(tip);
    svg.append('g').selectAll('rect').data(rows).join('rect').attr('x', function (r) { return x(opt.key(r)); }).attr('width', x.bandwidth()).attr('y', m.t).attr('height', H - m.t - m.b).style('fill', 'transparent')
      .on('pointermove', function (ev, r) { tip.hidden = false; tip.textContent = opt.tip(r); var b = el.getBoundingClientRect(); tip.style.left = Math.min(Math.max(ev.clientX - b.left + 8, 0), b.width - 170) + 'px'; tip.style.top = '4px'; })
      .on('pointerleave', function () { tip.hidden = true; })
      .on('click', function (ev, r) { opt.click(r); });
  }
  dash.draw('hours', function (el) {
    var d = dash.data('hours'); el.replaceChildren();
    if (d.status === 'error') { el.textContent = 'Couldn’t load the visit log.'; return; }
    if (d.status !== 'ok' || !d.data) { el.textContent = '—'; return; }
    barChart(el, d.data, {H: 180, pad: 0.2, label: 'Visits started in each hour of the day', key: function (r) { return r.hour; },
      ticks: function (dom, W) { return W < 360 ? [0, 6, 12, 18] : [0, 3, 6, 9, 12, 15, 18, 21]; },
      tickFmt: function (h) { return h === 0 ? '12am' : h < 12 ? h + 'am' : h === 12 ? '12pm' : (h - 12) + 'pm'; },
      tip: function (r) { return r.hour + ':00–' + r.hour + ':59 · ' + r.visits + ' visits'; },
      click: function (r) { OA.open({title: 'Visits started ' + r.hour + ':00–' + r.hour + ':59', fn: function (s) { return s.hour === r.hour; }}); }});
  });
  dash.draw('daily', function (el) {
    var d = dash.data('daily'); el.replaceChildren();
    if (d.status === 'error') { el.textContent = 'Couldn’t load the visit log.'; return; }
    if (d.status !== 'ok' || !d.data) { el.textContent = '—'; return; }
    barChart(el, d.data, {H: 200, pad: 0.25, second: true, label: 'Visits and orders per day for the last 14 days', key: function (r) { return r.day; },
      ticks: function (dom, W) { var step = Math.ceil(dom.length / Math.max(2, Math.floor(W / 60))); return dom.filter(function (_, i) { return i % step === 0; }); },
      tickFmt: function (s) { return s.slice(8) + '/' + s.slice(5, 7); },
      tip: function (r) { return r.day.slice(8) + '/' + r.day.slice(5, 7) + ': ' + r.visits + ' visits, ' + r.orders + ' orders'; },
      click: function (r) { OA.open({title: 'Visits on ' + r.day.slice(8) + '/' + r.day.slice(5, 7), all: true, fn: function (s) { return s.day === r.day; }}); }});
    var lg = document.createElement('div'); lg.className = 'note'; lg.textContent = 'Wide bars: visits. Narrow bars: visits that sent an order. Tap a day to see its visits.'; el.appendChild(lg);
  });
})();
