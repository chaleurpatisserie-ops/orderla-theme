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
        if (target) { target.scrollIntoView({behavior:'smooth', block:'center'}); var card=target.closest('[style*="cursor: pointer"], .col-6, .col-md-4, a, [role=button]'); if (card) setTimeout(function(){ card.click(); }, 650); }
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
      var N = mobile ? 38 : 64;
      var cols = [C.blue, C.blue, C.cream, C.blue];
      function mk(top){ var big=Math.random()<.3; return {x:Math.random()*W, y: top? -10 : Math.random()*H, r: big? 4.5+Math.random()*3 : 1.5+Math.random()*2.5, s: big? .1+Math.random()*.18 : .12+Math.random()*.3, d:Math.random()*6.28, c:cols[Math.floor(Math.random()*4)], star:big, a:Math.random()*6.28}; }
      for (var i=0;i<N;i++) flakes.push(mk(false));
      function crystal(f){ /* 6-arm snowflake */
        ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.a); ctx.strokeStyle=f.c; ctx.lineWidth=1.3; ctx.lineCap='round'; ctx.globalAlpha=.95;
        for (var k=0;k<6;k++){ ctx.rotate(1.0472); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-f.r); ctx.moveTo(0,-f.r*.55); ctx.lineTo(-f.r*.28,-f.r*.8); ctx.moveTo(0,-f.r*.55); ctx.lineTo(f.r*.28,-f.r*.8); ctx.stroke(); }
        ctx.globalAlpha=.35; ctx.strokeStyle=C.brown; ctx.lineWidth=.5; ctx.beginPath(); ctx.arc(0,0,1.2,0,6.283); ctx.stroke();
        ctx.restore();
      }
      /* snow that settles on the category roofs */
      var stuck=[], roofs=[], rr=0;
      function roofRects(){ roofs=[].slice.call(document.querySelectorAll('.ca-roof')).map(function(e){ return {e:e, b:e.getBoundingClientRect()}; }).filter(function(o){ return o.b.width>0 && o.b.bottom>0 && o.b.top<H; }); }
      var run = true;
      document.addEventListener('visibilitychange', function(){ run = !document.hidden; if (run) requestAnimationFrame(tick); });
      function tick(){
        if (!run) return;
        ctx.clearRect(0,0,W,H);
        if ((rr++ % 3)===0) roofRects(); else roofs.forEach(function(o){ o.b=o.e.getBoundingClientRect(); });
        for (var i=0;i<flakes.length;i++){
          var f = flakes[i]; f.d += .006; f.y += f.s; f.x += Math.sin(f.d)*.22; f.a += .004;
          for (var q=0;q<roofs.length;q++){ var b=roofs[q].b, top=b.top+3;
            if (f.x>b.left+4 && f.x<b.right-4 && f.y>=top && f.y-f.s<top+2){
              if (Math.random()<.75){ stuck.push({e:roofs[q].e, dx:f.x-b.left, r:Math.min(f.r,3.2)*(.8+Math.random()*.5), c:f.c, born:Date.now(), life:9000+Math.random()*9000}); flakes[i]=f=mk(true); }
              break; } }
          if (f.y > H+8){ flakes[i] = mk(true); continue; }
          if (f.star){ crystal(f); continue; }
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283);
          ctx.fillStyle = f.c; ctx.globalAlpha = .85; ctx.fill();
          ctx.globalAlpha = .25; ctx.lineWidth = .6; ctx.strokeStyle = C.brown; ctx.stroke();
        }
        var now=Date.now();
        if (stuck.length>260) stuck.splice(0, stuck.length-260);
        for (var k=stuck.length-1;k>=0;k--){ var p=stuck[k], age=now-p.born;
          if (age>p.life || !p.e.isConnected){ stuck.splice(k,1); continue; }
          var bb=p.e.getBoundingClientRect(); if (bb.bottom<0 || bb.top>H) continue;
          ctx.globalAlpha = age>p.life-2000 ? Math.max(0,(p.life-age)/2000) : 1;
          ctx.beginPath(); ctx.ellipse(bb.left+p.dx, bb.top+3, p.r*1.3, p.r*.8, 0, 0, 6.283); ctx.fillStyle='#fff'; ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }


    // Christmas roof under each category title (snow settles on it)
    (function(){
      var st=document.createElement('style'); st.textContent=
        '.ca-roof{position:relative;height:30px;margin:4px 6px 10px;pointer-events:none}'+
        '.ca-roof .cap{position:absolute;left:-4px;right:-4px;top:0;height:9px;border-radius:9px 9px 3px 3px;background:#fff;box-shadow:0 1px 0 rgba(82,51,37,.12)}'+
        '.ca-roof .cap:after{content:"";position:absolute;left:6px;right:6px;top:7px;height:7px;background:radial-gradient(circle at 7px 0,#fff 5px,transparent 5.5px) repeat-x 0 0/23px 7px}'+
        '.ca-roof .eave{position:absolute;left:0;right:0;top:6px;height:12px;border-radius:0 0 6px 6px;background:'+C.burg+' repeating-linear-gradient(90deg,transparent 0 18px,rgba(0,0,0,.18) 18px 19.5px)}'+
        '.ca-roof .wire{position:absolute;left:4px;right:4px;top:15px;height:10px;border-bottom:1.2px solid '+C.brown+';border-radius:0 0 50% 50%/0 0 100% 100%;opacity:.55}'+
        '.ca-roof .bulbs{position:absolute;left:10px;right:10px;top:18px;display:flex;justify-content:space-between}'+
        '.ca-roof .bulbs i{width:7px;height:10px;border-radius:50% 50% 50% 50%/40% 40% 60% 60%;display:block;animation:caBulb 2.4s ease-in-out infinite}'+
        '.ca-roof .bulbs i:nth-child(4n+1){background:'+C.blue+'}.ca-roof .bulbs i:nth-child(4n+2){background:#F4DCBC;animation-delay:.6s}.ca-roof .bulbs i:nth-child(4n+3){background:'+C.caramel+';animation-delay:1.2s}.ca-roof .bulbs i:nth-child(4n){background:'+C.burg+';animation-delay:1.8s}'+
        '.ca-roof .holly{position:absolute;top:-3px;width:22px;height:16px}.ca-roof .holly.l{left:-2px}.ca-roof .holly.r{right:-2px;transform:scaleX(-1)}'+
        '@keyframes caBulb{0%,100%{opacity:1;filter:brightness(1.1)}50%{opacity:.55;filter:brightness(.85)}}'+
        (reduce?'.ca-roof .bulbs i{animation:none}':'');
      document.head.appendChild(st);
      var holly='<svg viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 9 Q6 3 11 7 Q8 9 9 13 Q5 10 2 9Z" fill="'+C.brown+'"/><path d="M20 9 Q16 3 11 7 Q14 9 13 13 Q17 10 20 9Z" fill="'+C.brown+'" opacity=".8"/><circle cx="9.5" cy="8.5" r="2.4" fill="'+C.burg+'"/><circle cx="12.6" cy="8" r="2.4" fill="'+C.burg+'"/><circle cx="11" cy="5.6" r="2.4" fill="'+C.burg+'"/></svg>';
      function build(){
        var n=Math.max(8, Math.round(Math.min(innerWidth,720)/34)), b=''; for(var i=0;i<n;i++) b+='<i></i>';
        return '<div class="cap"></div><div class="eave"></div><div class="wire"></div><div class="bulbs">'+b+'</div><span class="holly l">'+holly+'</span><span class="holly r">'+holly+'</span>';
      }
      function place(){
        [].slice.call(document.querySelectorAll('a.nav-link[href^="#section-"]')).forEach(function(a){
          if (/gift hunt|lucky draw/i.test(a.innerText||'')) return;
          var sec=document.getElementById(a.getAttribute('href').slice(1)); if(!sec) return;
          var n=sec.nextElementSibling, row=null;
          while(n && n.tagName!=='SECTION'){ if(n.classList.contains('row')){ row=n; break; } n=n.nextElementSibling; }
          if(!row || (row.previousElementSibling && row.previousElementSibling.classList.contains('ca-roof'))) return;
          var r=document.createElement('div'); r.className='ca-roof'; r.setAttribute('aria-hidden','true'); r.innerHTML=build();
          row.parentNode.insertBefore(r,row);
        });
      }
      /* roofs switched off (Alfred 20 Nov 21:29): remove any left on the page */
      setTimeout(function(){ [].slice.call(document.querySelectorAll('.ca-roof')).forEach(function(r){ r.remove(); }); }, 600);
    })();

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
