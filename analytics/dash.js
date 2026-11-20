/* Chaleur Atelier · Orderla Analytics app
   A small runtime that gives the dashboard page the same "dash" helpers it uses inside Claude,
   but reads the Google Sheets directly with the signed-in user's own Google access (read-only).
   No data, keys or customer details are stored in this code. */
(function () {
  var CFG = window.CA_CONFIG || {};
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  var TOKEN_KEY = 'caAnaTok';
  var token = null, tokenExp = 0, tokenClient = null, pendingAuth = [];

  /* ---------- sign-in (Google Identity Services, token only, read-only scope) ---------- */
  try { var saved = JSON.parse(sessionStorage.getItem(TOKEN_KEY) || 'null'); if (saved && saved.exp > Date.now() + 60000) { token = saved.t; tokenExp = saved.exp; } } catch (e) {}
  function gisReady() { return window.google && google.accounts && google.accounts.oauth2; }
  function ensureClient() {
    if (tokenClient || !gisReady()) return tokenClient;
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CFG.clientId, scope: SCOPE, prompt: '',
      callback: function (r) {
        if (r && r.access_token) {
          token = r.access_token; tokenExp = Date.now() + (Number(r.expires_in) || 3600) * 1000;
          try { sessionStorage.setItem(TOKEN_KEY, JSON.stringify({t: token, exp: tokenExp})); } catch (e) {}
          showGate(false); var p = pendingAuth; pendingAuth = []; p.forEach(function (f) { f(null); });
        } else { var q = pendingAuth; pendingAuth = []; q.forEach(function (f) { f(new Error((r && (r.error_description || r.error)) || 'Sign-in was cancelled')); }); showGate(true, 'Sign-in didn’t finish. Tap the button to try again.'); }
      },
      error_callback: function (err) { var q = pendingAuth; pendingAuth = []; q.forEach(function (f) { f(new Error(err && err.message || 'Sign-in failed')); }); showGate(true, 'Sign-in was closed. Tap the button to try again.'); }
    });
    return tokenClient;
  }
  function getToken() {
    return new Promise(function (res, rej) {
      if (token && tokenExp > Date.now() + 60000) return res(token);
      pendingAuth.push(function (err) { err ? rej(err) : res(token); });
      if (pendingAuth.length > 1) return;
      showGate(true);
    });
  }
  function signIn(interactive) {
    var c = ensureClient(); if (!c) { setTimeout(function () { signIn(interactive); }, 300); return; }
    c.requestAccessToken({prompt: interactive ? 'select_account' : ''});
  }
  function showGate(on, msg) {
    var g = document.getElementById('ca-gate'); if (!g) return;
    g.hidden = !on; var m = g.querySelector('.msg'); if (m && msg) m.textContent = msg;
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('#ca-signin')) signIn(true);
    if (e.target.closest && e.target.closest('#ca-signout')) { try { sessionStorage.removeItem(TOKEN_KEY); if (token && gisReady()) google.accounts.oauth2.revoke(token, function () {}); } catch (x) {} token = null; location.reload(); }
  });

  /* ---------- data ---------- */
  var sources = {}, loaders = {}, calcs = {}, draws = [], onDataFns = [];
  var params = {}, defaults = CFG.params || {};
  try { params = Object.assign({}, defaults, JSON.parse(localStorage.getItem('caAnaParams') || '{}')); } catch (e) { params = Object.assign({}, defaults); }
  Object.keys(CFG.datasets || {}).forEach(function (id) { sources[id] = {status: 'loading', data: [], columns: [], at: 0}; });
  var calcMemo = {};

  function load(id) {
    var ds = CFG.datasets[id]; if (!ds) return;
    var s = sources[id]; s.refreshing = s.status === 'ok';
    if (s.status !== 'ok') s.status = 'loading';
    getToken().then(function (tok) {
      var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + encodeURIComponent(ds.sheet) + '/values/' + encodeURIComponent(ds.range) + '?majorDimension=ROWS';
      return fetch(url, {headers: {Authorization: 'Bearer ' + tok}}).then(function (r) {
        if (r.status === 401) { token = null; try { sessionStorage.removeItem(TOKEN_KEY); } catch (e) {} throw new Error('Signed out. Please sign in again.'); }
        if (r.status === 403) throw new Error('This Google account can’t read the sheet. Sign in with chaleurpatisserie@gmail.com, or ask Alfred to share the sheet.');
        if (!r.ok) throw new Error('Google Sheets answered ' + r.status);
        return r.json();
      });
    }).then(function (answer) {
      var out = loaders[id] ? loaders[id]({answer: answer}) : answer;
      var rows = Array.isArray(out) ? out : (out && (out.rows || out.data)) || [];
      s.data = rows; s.columns = (out && out.columns) || []; s.status = 'ok'; s.message = ''; s.at = Date.now(); s.refreshing = false;
      changed();
    }).catch(function (err) {
      s.refreshing = false; if (s.status !== 'ok') { s.status = 'error'; s.data = []; } s.message = err.message || String(err);
      if (/sign in/i.test(s.message)) showGate(true, s.message);
      changed();
    });
  }
  function calcValue(id) {
    if (calcMemo[id]) return calcMemo[id];
    var c = calcs[id]; var ins = c.inputs.map(function (i) { return api.data(i); });
    var bad = ins.filter(function (x) { return x.status !== 'ok'; })[0];
    var res;
    if (bad) res = {status: bad.status === 'error' ? 'error' : 'loading', data: null, message: bad.message};
    else { try { res = {status: 'ok', data: c.fn.apply({}, ins.map(function (x) { return x.data; }))}; } catch (e) { console.error('calc ' + id, e); res = {status: 'error', data: null, message: e.message}; } }
    calcMemo[id] = res; return res;
  }

  /* ---------- drawing ---------- */
  var scheduled = false;
  function changed() { calcMemo = {}; if (scheduled) return; scheduled = true; requestAnimationFrame(function () { scheduled = false; render(); updateStamp(); }); }
  function runDraw(d, el) {
    try {
      if (typeof d.fn === 'function') d.fn(el);
      else {
        if (!el.__caMade) { el.replaceChildren(); el.__caMade = {v: d.fn.mount ? d.fn.mount(el) : null}; }
        else if (d.fn.update) d.fn.update(el, el.__caMade.v);
      }
    } catch (e) { console.error('draw ' + d.name, e); }
  }
  function render(only) {
    onDataFns.forEach(function (f) { try { f(); } catch (e) { console.error(e); } });
    draws.forEach(function (d) {
      if (only && d.name !== only) return;
      var els = document.querySelectorAll('[data-draw="' + d.name + '"]');
      for (var i = 0; i < els.length; i++) runDraw(d, els[i]);
    });
  }
  function updateStamp() {
    var ev = sources.events; var el = document.getElementById('ca-stamp'); if (!el || !ev) return;
    el.textContent = ev.at ? 'Updated ' + new Date(ev.at).toLocaleTimeString('en-MY', {hour: '2-digit', minute: '2-digit'}) : '';
  }
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { render(); }, 150); });

  var api = {
    data: function (id) {
      if (calcs[id]) return calcValue(id);
      var s = sources[id]; if (!s) return {status: 'missing', data: [], message: 'Unknown data ' + id};
      return {status: s.status, data: s.data, columns: s.columns, message: s.message, refreshing: !!s.refreshing};
    },
    loader: function (id, o) { loaders[id] = o.fn; },
    calc: function (id, o) { calcs[id] = {inputs: o.inputs || [], fn: o.fn}; },
    draw: function (name, fn) { if (!fn) { render(name); return; } draws.push({name: name, fn: fn}); },
    onData: function (fn) { onDataFns.push(fn); },
    params: function () { return params; },
    setParams: function (p) { Object.assign(params, p); try { localStorage.setItem('caAnaParams', JSON.stringify(params)); } catch (e) {} changed(); },
    resetParams: function () { params = Object.assign({}, defaults); changed(); },
    refresh: function (id) { if (sources[id]) load(id); },
    setLink: function () {},
    colors: ['#780C14', '#7A4926', '#523325', '#C5D0E5'],
    start: function () {
      render();
      if (!token) showGate(true);
      Object.keys(sources).forEach(load);
    }
  };
  window.dash = api;
  window.addEventListener('load', function () { ensureClient(); });
})();
