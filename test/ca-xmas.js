/* Chaleur Atelier – Christmas 2026 effect (snow, sleigh, layer-cake tree, banner). Remove this whole block after Christmas. */
(function(){
  if (window.__caXmas) return; window.__caXmas = true;
  try {
    var C = {burg:'#780C14', cream:'#FFF0DC', blue:'#C5D0E5', brown:'#523325', caramel:'#7A4926'};
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var mobile = innerWidth < 600;

    // Montserrat
    var lk = document.createElement('link'); lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap';
    document.head.appendChild(lk);

    var css = document.createElement('style');
    css.textContent =
      '#ca-xmas-banner{font-family:Montserrat,sans-serif;background:#F4DCBC;color:'+C.brown+';text-align:center;padding:9px 40px 9px 14px;font-size:12.5px;font-weight:500;letter-spacing:.2px;position:relative;cursor:pointer;line-height:1.5}' +
      '#ca-xmas-banner b{font-weight:700;color:'+C.burg+'!important}' +
      '#ca-xmas-banner .ca-go{display:inline-block;margin-left:8px;padding:2px 12px;border:1.5px solid '+C.burg+';color:'+C.burg+';border-radius:20px;font-size:11px;font-weight:700}' +
      '#ca-xmas-banner .ca-x{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:16px;opacity:.7;padding:4px 6px}' +
      '#ca-xmas-snow{position:fixed;inset:0;pointer-events:none;z-index:2147483000}' +
      '#ca-xmas-sleigh{position:fixed;top:150px;left:-260px;width:230px;pointer-events:none;z-index:2147483001;opacity:0}' +
      '#ca-xmas-sleigh.go{animation:caSleigh 9s linear forwards}' +
      '@keyframes caSleigh{0%{left:-260px;opacity:0;transform:translateY(20px) rotate(-4deg)}8%{opacity:1}50%{transform:translateY(-15px) rotate(-2deg)}92%{opacity:1}100%{left:calc(100% + 40px);opacity:0;transform:translateY(-40px) rotate(-6deg)}}' +
      '#ca-xmas-tree{position:fixed;left:10px;bottom:78px;width:'+(mobile?58:78)+'px;pointer-events:none;z-index:2147483001}' +
      '#ca-xmas-tree .lay{transform-box:fill-box;transform-origin:50% 100%;transform:scale(0)}' +
      '#ca-xmas-tree.grow .lay{animation:caGrow .7s cubic-bezier(.3,1.5,.6,1) forwards}' +
      '#ca-xmas-tree .orn,#ca-xmas-tree .star{transform-box:fill-box;transform-origin:50% 50%;transform:scale(0)}' +
      '#ca-xmas-tree.grow .orn{animation:caGrow .4s ease-out forwards}' +
      '#ca-xmas-tree.grow .star{animation:caGrow .5s ease-out 2.6s forwards,caTwinkle 2.4s ease-in-out 3.2s infinite}' +
      '@keyframes caGrow{to{transform:scale(1)}}' +
      '@keyframes caTwinkle{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}' +
      (reduce ? '#ca-xmas-tree .lay,#ca-xmas-tree .orn,#ca-xmas-tree .star{transform:none!important;animation:none!important}' : '');
    document.head.appendChild(css);

    // 1. Banner (top of page, closable)
    function addBanner(){
      try { if (sessionStorage.getItem('caXmasBannerOff')) return; } catch(e){}
      if (document.getElementById('ca-xmas-banner')) return;
      var b = document.createElement('div'); b.id = 'ca-xmas-banner';
      b.innerHTML = '🎄 <b>Christmas Hamper RM279</b> · free cooler bag worth RM25<span class="ca-go">See it</span><span class="ca-x" aria-label="Close">✕</span>';
      var strip = document.getElementById('ca-strip');
      if (strip) { strip.style.display = 'none'; }
      b.addEventListener('click', function(ev){
        if (ev.target.className === 'ca-x') { b.remove(); try{sessionStorage.setItem('caXmasBannerOff','1')}catch(e){} return; }
        var els = document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span,a');
        var target = null;
        for (var i=0;i<els.length;i++){ var t=(els[i].textContent||'').trim(); if (t==='Christmas Hamper'){ target=els[i]; break; } }
        if (!target) for (var j=0;j<els.length;j++){ var u=(els[j].textContent||'').trim().toUpperCase(); if (u.indexOf('CHRISTMAS 2026')===0 && u.length<20){ target=els[j]; break; } }
        if (target) { target.scrollIntoView({behavior:'smooth', block:'center'}); var card=target.closest('.col-6, .col-md-4, a, [role=button]'); if (card) setTimeout(function(){ card.click(); }, 650); }
        else { location.href = 'https://chaleurpatisserie.orderla.my/chaleur-atelier-patisserie-larkin'; }
      });
      document.body.insertBefore(b, document.body.firstChild);
    }
    // the store theme adds its top strip a moment later on some loads: re-check once
    function bannerAgain(){ var s=document.getElementById('ca-strip'); var b=document.getElementById('ca-xmas-banner'); if (s && b) { s.style.display='none'; } }

    // 2. Snow (canvas, never blocks taps)
    function addSnow(){
      if (reduce) return;
      var cv = document.createElement('canvas'); cv.id = 'ca-xmas-snow'; document.body.appendChild(cv);
      var ctx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio||1, 2), W, H, flakes = [];
      function size(){ W = innerWidth; H = innerHeight; cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
      size(); addEventListener('resize', size);
      var N = mobile ? 35 : 60;
      var cols = [C.blue, C.blue, C.cream, C.blue];
      for (var i=0;i<N;i++) flakes.push({x:Math.random()*W, y:Math.random()*H, r:1.5+Math.random()*3, s:.3+Math.random()*.9, d:Math.random()*6.28, c:cols[i%4]});
      var run = true;
      document.addEventListener('visibilitychange', function(){ run = !document.hidden; if (run) requestAnimationFrame(tick); });
      function tick(){
        if (!run) return;
        ctx.clearRect(0,0,W,H);
        for (var i=0;i<flakes.length;i++){
          var f = flakes[i]; f.d += .01; f.y += f.s; f.x += Math.sin(f.d)*.4;
          if (f.y > H+5){ f.y = -5; f.x = Math.random()*W; }
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283);
          ctx.fillStyle = f.c; ctx.globalAlpha = .85; ctx.fill();
          ctx.globalAlpha = .25; ctx.lineWidth = .6; ctx.strokeStyle = C.brown; ctx.stroke();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    // 3. Sleigh with reindeer (flies across now and then)
    function addSleigh(){
      if (reduce) return;
      var s = document.createElement('div'); s.id = 'ca-xmas-sleigh';
      var deer = function(x){ return '<g transform="translate('+x+',0)" fill="'+C.brown+'">' +
        '<ellipse cx="22" cy="30" rx="16" ry="7"/>' +
        '<rect x="10" y="34" width="3" height="12" rx="1.5"/><rect x="30" y="34" width="3" height="12" rx="1.5"/>' +
        '<path d="M36 26 L42 14 L46 15 L41 28 Z"/><circle cx="45" cy="13" r="4.5"/>' +
        '<path d="M44 9 L42 2 M44 9 L48 3 M46 5 L50 4" stroke="'+C.caramel+'" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>'; };
      s.innerHTML = '<svg viewBox="0 0 230 60" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M10 40 Q40 46 70 40 L120 30" stroke="'+C.caramel+'" stroke-width="1.2" fill="none"/>' +
        '<path d="M4 22 L48 22 Q60 22 58 34 L56 40 L8 40 Q2 40 4 30 Z" fill="'+C.burg+'"/>' +
        '<path d="M2 46 L58 46 Q66 46 66 40" stroke="'+C.caramel+'" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<rect x="14" y="10" width="18" height="13" rx="2" fill="'+C.cream+'" stroke="'+C.burg+'" stroke-width="1.5"/>' +
        '<path d="M23 10 V23 M14 16 H32" stroke="'+C.burg+'" stroke-width="2"/>' +
        '<rect x="34" y="14" width="12" height="9" rx="2" fill="'+C.blue+'"/>' +
        deer(110) + deer(165) + '</svg>';
      document.body.appendChild(s);
      function fly(){ s.classList.remove('go'); void s.offsetWidth; s.classList.add('go'); }
      setTimeout(fly, 2500); setInterval(fly, 30000);
    }

    // 4. Layer-cake Christmas tree that grows in (bottom-left, above the cart bar)
    function addTree(){
      var t = document.createElement('div'); t.id = 'ca-xmas-tree';
      t.innerHTML = '<svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg">' +
        '<rect class="lay" x="34" y="92" width="12" height="14" rx="2" fill="'+C.brown+'" style="animation-delay:0s"/>' +
        '<path class="lay" d="M6 94 Q40 100 74 94 L58 66 Q40 70 22 66 Z" fill="'+C.burg+'" style="animation-delay:.4s"/>' +
        '<path class="lay" d="M8 93 Q40 99 72 93" stroke="'+C.cream+'" stroke-width="2.5" fill="none" style="animation-delay:.4s"/>' +
        '<path class="lay" d="M14 70 Q40 76 66 70 L52 44 Q40 47 28 44 Z" fill="'+C.caramel+'" style="animation-delay:.9s"/>' +
        '<path class="lay" d="M16 69 Q40 75 64 69" stroke="'+C.cream+'" stroke-width="2.5" fill="none" style="animation-delay:.9s"/>' +
        '<path class="lay" d="M22 47 Q40 52 58 47 L40 18 Z" fill="'+C.burg+'" style="animation-delay:1.4s"/>' +
        '<circle class="orn" cx="26" cy="84" r="3.5" fill="'+C.cream+'" style="animation-delay:1.9s"/>' +
        '<circle class="orn" cx="52" cy="80" r="3.5" fill="'+C.blue+'" style="animation-delay:2.0s"/>' +
        '<circle class="orn" cx="38" cy="60" r="3.5" fill="'+C.cream+'" style="animation-delay:2.1s"/>' +
        '<circle class="orn" cx="46" cy="38" r="3" fill="'+C.blue+'" style="animation-delay:2.2s"/>' +
        '<path class="star" d="M40 4 L43.5 12 L52 12.5 L45.5 18 L47.5 26 L40 21.5 L32.5 26 L34.5 18 L28 12.5 L36.5 12 Z" fill="'+C.caramel+'" stroke="'+C.cream+'" stroke-width="1"/>' +
        '</svg>';
      document.body.appendChild(t);
      requestAnimationFrame(function(){ t.classList.add('grow'); });
    }


    // 5. Feuille holds the CA gift box for Christmas
    function feuilleXmas(tries){
      var F=window.__caFeuille;
      if (!F){ if ((tries||0)<20) setTimeout(function(){ feuilleXmas((tries||0)+1); }, 250); return; }
      F.el.setAttribute('data-tap','The Christmas Hamper is RM279 this year');
      F.el.setAttribute('aria-label','Our atelier host says Merry Christmas');
      F.talk('Merry Christmas from the atelier!', 5000);
      setInterval(function(){ F.talk('Merry Christmas from the atelier!', 4000); }, 45000);
    }

    function start(){ addBanner(); addSnow(); addSleigh(); addTree(); setTimeout(bannerAgain, 300); setTimeout(feuilleXmas, 2600); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  } catch(e) { /* never break the order form */ }
})();
