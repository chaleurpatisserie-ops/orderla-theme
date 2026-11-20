/* Chaleur Atelier – fun layer: side menu, Fruits & Nuts garden, Christmas gift hunt.
   Loaded by ca-theme.js. Never throws into the order form. */
(function(){
  try {
    if (window.__caFun) return; window.__caFun = 1;
    var BURG='#780C14', CREAM='#FFF0DC', BROWN='#523325', CARAMEL='#7A4926', BEIGE='#F4DCBC', BLUE='#C5D0E5';
    var CA_IMG='https://chaleurpatisserie-ops.github.io/orderla-theme/img/';
    var mobile = window.innerWidth < 700;
    var GIFT_END = new Date('2026-12-31T23:59:59+08:00').getTime();
    var MIN = 120;

    function $(s,r){ return (r||document).querySelector(s); }
    function $$(s,r){ return [].slice.call((r||document).querySelectorAll(s)); }
    function popupOpen(){ return document.body.classList.contains('ca-popup') || document.body.classList.contains('ReactModal__Body--open'); }
    function host(t,ms){ try { if(window.__caFeuille) window.__caFeuille.talk(t, ms||5000); } catch(e){} }

    var css = [
      /* ---------- side menu ---------- */
      '#ca-mbtn{position:fixed;right:0;top:44%;z-index:2147483003;background:'+BURG+';color:'+CREAM+';border:none;border-radius:16px 0 0 16px;padding:10px 8px 10px 10px;display:flex;flex-direction:column;align-items:center;gap:4px;box-shadow:-3px 3px 12px rgba(82,51,37,.3);cursor:pointer;font:700 10px Montserrat,sans-serif;letter-spacing:.12em;-webkit-tap-highlight-color:transparent;transition:transform .25s}',
      '#ca-mbtn{touch-action:none;user-select:none}','#ca-mbtn.drag{transition:none;box-shadow:-6px 6px 18px rgba(82,51,37,.45);transform:scale(1.06)}','#ca-mbtn .gr{display:block;width:14px;height:3px;border-top:2px dotted rgba(255,240,220,.6);margin-top:2px}','#ca-mbtn .ic{display:flex;flex-direction:column;gap:3px}',
      '#ca-mbtn .ic i{display:block;width:18px;height:2.5px;border-radius:2px;background:'+CREAM+';transition:width .3s}',
      '#ca-mbtn .ic i:nth-child(2){width:13px}',
      '#ca-mbtn:hover .ic i{width:18px}',
      '#ca-mbtn.wig{animation:caWig .9s ease-in-out}',
      '@keyframes caWig{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(0)}60%{transform:translateX(-4px)}}',
      '#ca-mbg{position:fixed;inset:0;background:rgba(82,51,37,.38);z-index:2147483004;opacity:0;pointer-events:none;transition:opacity .3s}',
      '#ca-menu{position:fixed;top:0;right:0;height:100%;width:min(320px,86vw);background:'+CREAM+';z-index:2147483005;transform:translateX(105%);transition:transform .38s cubic-bezier(.2,.9,.3,1.15);display:flex;flex-direction:column;font-family:Montserrat,sans-serif;box-shadow:-6px 0 24px rgba(82,51,37,.25)}',
      'body.ca-mopen #ca-menu{transform:none}',
      'body.ca-mopen #ca-mbg{opacity:1;pointer-events:auto}',
      'body.ca-mopen #ca-mbtn{transform:translateX(110%)}',
      '#ca-menu .hd{background:'+BURG+';color:'+CREAM+';padding:18px 16px 26px;position:relative}',
      '#ca-menu .hd b{display:block;font-size:19px;font-weight:800}',
      '#ca-menu .hd span{font-size:12px;opacity:.85}',
      '#ca-menu .hd::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:14px;background:'+CREAM+';border-radius:50% 50% 0 0/100% 100% 0 0}',
      '#ca-menu .x{position:absolute;right:12px;top:12px;width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,240,220,.18);color:'+CREAM+';font-size:18px;line-height:32px;cursor:pointer}',
      '#ca-menu ul{list-style:none;margin:0;padding:6px 12px 20px;overflow-y:auto;flex:1}',
      '#ca-menu li{margin:6px 0;opacity:0;transform:translateX(30px)}',
      'body.ca-mopen #ca-menu li{animation:caIn .45s cubic-bezier(.2,.9,.3,1.3) forwards}',
      '@keyframes caIn{to{opacity:1;transform:none}}',
      '#ca-menu li button{width:100%;display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid '+BEIGE+';border-radius:14px;padding:10px 12px;font:700 14px Montserrat,sans-serif;color:'+BROWN+';text-align:left;cursor:pointer;transition:transform .15s,background .2s}',
      '#ca-menu li button:active{transform:scale(.96)}',
      '#ca-menu li .em{font-size:22px;width:30px;text-align:center;flex:none}',
      '#ca-menu li .t{flex:1;line-height:1.2}',
      '#ca-menu li .t small{display:block;font-weight:500;font-size:11px;color:'+CARAMEL+';margin-top:2px}',
      '#ca-menu li.on button{background:'+BURG+';border-color:'+BURG+';color:'+CREAM+'}',
      '#ca-menu li.on .t small{color:'+BEIGE+'}',
      '#ca-menu li.on .em{animation:caHop 1.2s ease-in-out infinite}',
      '#ca-menu li.gdn button{background:#EAF2DF;border-color:#B9D19C}',
      '#ca-menu li.gdn.on button{background:#5E7A3E;border-color:#5E7A3E}',
      '@keyframes caHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}',
      '#ca-menu .ft{padding:10px 16px 16px;font-size:11px;color:'+CARAMEL+';text-align:center}',
      'body.ca-popup #ca-mbtn{display:none}',
      /* Build Your Own Box: big picture cards in a swipe row */
      '.ca-big{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;padding:2px 2px 14px;margin:0 -2px;-webkit-overflow-scrolling:touch;scrollbar-width:none}',
      '.ca-big::-webkit-scrollbar{display:none}',
      '.ca-big > .col-12{flex:0 0 68%!important;max-width:68%!important;scroll-snap-align:start}',
      '.ca-big .ca-lr{height:100%;margin:4px 0!important;padding:10px!important}',
      '.ca-big .ca-lr > div > div{flex-direction:column!important}',
      '.ca-big .ca-rimg{flex:none!important;margin:0 0 10px!important;width:100%}',
      '.ca-big .ca-rimg img{width:100%!important;height:auto!important;aspect-ratio:1/1;border-radius:14px!important}',
      '.ca-big .ca-rt p{-webkit-line-clamp:3!important}',
      /* ---------- fruits & nuts garden ---------- */
      '.ca-gpar{position:relative!important}','.ca-gpar > :not(#ca-garden){position:relative;z-index:1}',
      '#ca-garden{position:absolute;left:0;right:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,#EEF5E4 0%,#DDEBCB 55%,#CFE2B6 100%);opacity:0;transition:opacity .6s}',
      '#ca-garden.on{opacity:1}','.ca-aftergdn{padding-top:34px!important}',
      '#ca-garden .lv{position:absolute;inset:0;opacity:.38;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cg fill=%27%23A9C68A%27%3E%3Cpath d=%27M18 22c10-10 24-8 26 0-8 8-20 10-26 0z%27/%3E%3Cpath d=%27M84 70c8-12 22-12 26-4-6 10-18 14-26 4z%27/%3E%3Cpath d=%27M40 96c6-9 17-9 20-3-5 7-14 10-20 3z%27/%3E%3C/g%3E%3Cg fill=%27%23E8B4A0%27%3E%3Ccircle cx=%2796%27 cy=%2720%27 r=%273%27/%3E%3Ccircle cx=%2716%27 cy=%2770%27 r=%272.5%27/%3E%3C/g%3E%3C/svg%3E");background-size:120px 120px}',
      '#ca-garden .hedge{position:absolute;left:0;right:0;top:-22px;height:24px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 60 24%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0 24V14C4 4 12 4 15 12 18 2 28 2 30 11 33 3 42 3 45 12 48 4 56 4 60 14V24Z%27 fill=%27%23EEF5E4%27/%3E%3C/svg%3E");background-size:60px 24px;background-repeat:repeat-x}',
      '#ca-garden .grass{position:absolute;left:0;right:0;bottom:-2px;height:34px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 80 34%27%3E%3Cg fill=%27%237E9E58%27%3E%3Cpath d=%27M0 34 6 10 9 34Z%27/%3E%3Cpath d=%27M10 34 18 4 20 34Z%27/%3E%3Cpath d=%27M24 34 28 14 32 34Z%27/%3E%3Cpath d=%27M36 34 44 6 46 34Z%27/%3E%3Cpath d=%27M50 34 55 16 58 34Z%27/%3E%3Cpath d=%27M60 34 68 2 70 34Z%27/%3E%3Cpath d=%27M72 34 76 12 80 34Z%27/%3E%3C/g%3E%3Ccircle cx=%2730%27 cy=%2713%27 r=%273%27 fill=%27%23780C14%27/%3E%3Ccircle cx=%2757%27 cy=%2715%27 r=%272.5%27 fill=%27%23FFF0DC%27/%3E%3C/svg%3E");background-size:80px 34px;background-repeat:repeat-x}',
      '#ca-garden .sign{position:absolute;right:10px;top:8px;background:'+CARAMEL+';color:'+CREAM+';font:800 10px Montserrat,sans-serif;letter-spacing:.14em;padding:5px 9px;border-radius:6px;transform:rotate(3deg);box-shadow:0 2px 0 '+BROWN+'}',
      /* gardener who greets you in the garden */
      '#ca-gard{position:fixed;left:6px;bottom:'+(mobile?150:180)+'px;width:'+(mobile?70:88)+'px;z-index:2147483002;border:none;background:none;padding:0;cursor:pointer;transform:translateX(-140%);transition:transform .55s cubic-bezier(.2,.9,.3,1.3);-webkit-tap-highlight-color:transparent}',
      '#ca-gard.in{transform:none}',
      '#ca-gard img{width:100%;display:block;filter:drop-shadow(0 3px 4px rgba(82,51,37,.25))}',
      '#ca-gard .gb{position:absolute;left:calc(100% + 6px);bottom:28px;width:'+(mobile?190:230)+'px;background:#fff;border:2px solid #7E9E58;border-radius:14px 14px 14px 4px;padding:8px 10px;font:600 12.5px/1.35 Montserrat,sans-serif;color:'+BROWN+';text-align:left;opacity:0;transform:scale(.6);transform-origin:left bottom;transition:all .3s}',
      '#ca-gard.talk .gb{opacity:1;transform:none}',
      'body.ca-popup #ca-gard,body.ca-mopen #ca-gard{display:none}',
      '.ca-pm{box-sizing:border-box;max-width:100%;padding-right:2px;display:flex;align-items:flex-end;gap:10px;margin:14px 0 6px;animation:caPop .45s cubic-bezier(.2,.9,.3,1.4) both}',
      '.ca-pm img{width:74px;flex:none;cursor:pointer;filter:drop-shadow(0 3px 4px rgba(82,51,37,.25))}',
      '.ca-pm.hop img{animation:caHop .5s ease-in-out 2}',
      '.ca-pm .pb{position:relative;flex:1;min-width:0;box-sizing:border-box;background:#fff;border:2px solid '+BURG+';border-radius:16px 16px 16px 4px;padding:9px 12px;font:600 13px/1.4 Montserrat,sans-serif;color:'+BROWN+';min-height:44px}',
      '.ca-pm .pb small{display:block;font:800 10px Montserrat,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:'+CARAMEL+';margin-bottom:2px}',
      '.ca-pm.g .pb{border-color:#7E9E58;background:#F3F8EC}',
      /* ---------- gift hunt ---------- */
      '.ca-hide{display:none!important}',
      '.ca-spot{position:fixed;z-index:2147483002;border:none;background:none;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent;animation:caPop .5s cubic-bezier(.2,.9,.3,1.5) both}',
      '.ca-spot svg{display:block;width:100%;height:auto;filter:drop-shadow(0 3px 4px rgba(82,51,37,.3))}',
      '.ca-spot::after{content:"✨";position:absolute;right:-6px;top:-8px;font-size:14px;animation:caTw 1.4s ease-in-out infinite}',
      '.ca-spot.empty{animation:caShake .45s;opacity:.35;pointer-events:none}',
      '.ca-spot.empty::after{content:""}',
      '@keyframes caPop{from{transform:scale(0)}to{transform:scale(1)}}',
      '@keyframes caTw{0%,100%{opacity:.3;transform:scale(.7)}50%{opacity:1;transform:scale(1.15)}}',
      '@keyframes caShake{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}',
      '#ca-s-stock{right:'+(mobile?44:64)+'px;top:'+(mobile?112:124)+'px;width:34px;transform-origin:top center}',
      '#ca-s-stock svg{animation:caSw 2.6s ease-in-out infinite;transform-origin:top center}',
      '@keyframes caSw{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}',
      '#ca-s-tree{left:'+(mobile?16:22)+'px;bottom:72px;width:30px}',
      '#ca-s-box{left:'+(mobile?70:96)+'px;bottom:76px;width:40px}',
      '#ca-s-sleigh{left:12px;top:38%;width:36px}',
      '#ca-s-sleigh.fall{animation:caFall 2.2s cubic-bezier(.3,.6,.4,1) both}',
      '@keyframes caFall{0%{transform:translate(60vw,-60vh) rotate(-30deg)}70%{transform:translate(0,6px) rotate(8deg)}85%{transform:translate(0,-6px)}100%{transform:none}}',
      '#ca-s-santa{z-index:2147483003;right:'+(mobile?92:112)+'px;bottom:80px;width:'+(mobile?50:60)+'px}',
      '#ca-s-santa.walk{animation:caWalk 3.2s linear both}',
      '#ca-s-santa.walk svg{animation:caBob2 .35s ease-in-out 9}',
      '@keyframes caWalk{from{transform:translateX(calc(100vw))}to{transform:none}}',
      '@keyframes caBob2{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}',
      'body.ca-popup .ca-spot,body.ca-mopen .ca-spot{display:none}',
      '#ca-gh{position:fixed;left:50%;top:70px;transform:translate(-50%,-160%);z-index:2147483006;width:min(92vw,420px);background:'+BURG+';color:'+CREAM+';border-radius:16px;padding:12px 40px 12px 14px;font:600 13px/1.4 Montserrat,sans-serif;box-shadow:0 8px 24px rgba(82,51,37,.35);transition:transform .5s cubic-bezier(.2,.9,.3,1.3)}',
      '#ca-gh.in{transform:translate(-50%,0)}',
      '#ca-gh b{font-weight:800;font-size:15px;display:block;margin-bottom:2px;color:'+CREAM+'!important}',
      '#ca-gh .x{position:absolute;right:8px;top:8px;border:none;background:none;color:'+CREAM+';font-size:18px;cursor:pointer}',
      '#ca-gm{position:fixed;inset:0;z-index:2147483007;background:rgba(82,51,37,.45);display:flex;align-items:center;justify-content:center;font-family:Montserrat,sans-serif}',
      '#ca-gm .cd{width:min(88vw,360px);background:'+CREAM+';border-radius:22px;padding:22px 20px 18px;text-align:center;color:'+BROWN+';animation:caPop .45s cubic-bezier(.2,.9,.3,1.5)}',
      '#ca-gm .big{font-size:54px;line-height:1}',
      '#ca-gm h3,#ca-gm p{color:inherit}','#ca-gm h3{font:800 20px Montserrat,sans-serif;color:'+BURG+';margin:10px 0 6px}',
      '#ca-gm p{font-size:13.5px;line-height:1.45;margin:0 0 14px}',
      '#ca-gm .bt{display:block;width:100%;border:none;border-radius:999px;padding:12px;font:800 14px Montserrat,sans-serif;background:'+BURG+';color:'+CREAM+';cursor:pointer;margin-top:8px}',
      '#ca-gm .bt.o{background:transparent;color:'+BURG+';border:2px solid '+BURG+'}',
      '.ca-conf{position:fixed;z-index:2147483008;width:9px;height:14px;top:-20px;pointer-events:none;animation:caConf 2.6s ease-in forwards}',
      '@keyframes caConf{to{transform:translateY(110vh) rotate(720deg)}}',
      '#ca-gnote{margin:8px 0 4px;padding:9px 11px;border-radius:12px;background:#FBEBD3;border:1.5px dashed '+CARAMEL+';font:600 12.5px/1.4 Montserrat,sans-serif;color:'+BROWN+'}'
    ].join('\n');
    var st=document.createElement('style'); st.id='ca-fun-css'; st.textContent=css; document.head.appendChild(st);

    /* ---------- sections ---------- */
    function sections(){
      return $$('a.nav-link[href^="#section-"]').map(function(a){
        var id=a.getAttribute('href').slice(1), el=document.getElementById(id);
        return { a:a, id:id, el:el, name:(a.innerText||'').trim() };
      }).filter(function(s){ return s.el; });
    }
    function isGiftSec(n){ return /gift hunt/i.test(n); }
    function isGarden(n){ return /fruits?\s*(&|and)\s*nuts?/i.test(n); }
    function secEls(anchor){ var out=[], n=anchor.nextElementSibling; while(n && n.tagName!=='SECTION'){ if(!/^ca-/.test(n.id||'')) out.push(n); n=n.nextElementSibling; } return out; }
    function nice(n){ return n.toLowerCase().replace(/(^|[\s(&-])([a-zà-ÿ])/g,function(m,p,c){return p+c.toUpperCase();}).replace(/\bOf\b/g,'of'); }
    function icon(n){
      var t=n.toLowerCase();
      if(/build|own box/.test(t)) return '🎁'; if(isGarden(t)) return '🌿'; if(/christmas|noel|xmas/.test(t)) return '🎄';
      if(/promo/.test(t)) return '🏷️'; if(/colour|color/.test(t)) return '🎨'; if(/signature/.test(t)) return '⭐';
      if(/box/.test(t)) return '📦'; if(/entremet|whole/.test(t)) return '🎂'; if(/petit|tartlet/.test(t)) return '🧁';
      if(/viennois|bakeri|bread/.test(t)) return '🥐'; if(/cold/.test(t)) return '🧊'; if(/hot/.test(t)) return '☕';
      if(/add/.test(t)) return '✨'; if(/community/.test(t)) return '💛'; return '🍰';
    }
    function countIn(s){ var n=0; secEls(s.el).forEach(function(e){ n+=e.querySelectorAll('a.form-add-item-btn').length; }); return n; }

    /* hide the gift hunt prize section and its tab */
    function hideGift(){
      sections().forEach(function(s){
        if(!isGiftSec(s.name)) return;
        var li=s.a.closest('li')||s.a; li.classList.add('ca-hide'); s.el.classList.add('ca-hide');
        secEls(s.el).forEach(function(e){ e.classList.add('ca-hide'); });
      });
    }

    /* ---------- side menu ---------- */
    var mb, menu, list;
    function buildMenu(){
      if(document.getElementById('ca-mbtn')) return;
      mb=document.createElement('button'); mb.id='ca-mbtn'; mb.type='button'; mb.setAttribute('aria-label','Open menu');
      mb.innerHTML='<span class="ic"><i></i><i></i><i></i></span>MENU<span class="gr"></span>'; mb.title='Tap to open, drag to move';
      var bg=document.createElement('div'); bg.id='ca-mbg';
      menu=document.createElement('nav'); menu.id='ca-menu'; menu.setAttribute('aria-label','Menu');
      menu.innerHTML='<div class="hd"><b>Where to, chéri?</b><span>Tap a section and off we go!</span><button class="x" type="button" aria-label="Close">×</button></div><ul></ul><div class="ft">Swipe right to close</div>';
      list=menu.querySelector('ul');
      document.body.appendChild(mb); document.body.appendChild(bg); document.body.appendChild(menu);
      /* drag the button up/down so it never blocks the view; a short tap opens the menu */
      try { var sv=parseFloat(localStorage.getItem('caMenuY')); if(sv>0 && sv<1) mb.style.top=(sv*100)+'%'; } catch(e){}
      var dy=null, moved=false, top0=0;
      mb.addEventListener('pointerdown',function(e){ dy=e.clientY; moved=false; top0=mb.getBoundingClientRect().top; try{ mb.setPointerCapture(e.pointerId); }catch(x){} });
      mb.addEventListener('pointermove',function(e){ if(dy===null) return; var d=e.clientY-dy; if(Math.abs(d)>6) moved=true; if(moved){ var t=Math.max(70, Math.min(window.innerHeight-130, top0+d)); mb.style.top=t+'px'; mb.classList.add('drag'); } });
      function up(){ if(dy===null) return; dy=null; mb.classList.remove('drag'); if(moved){ try{ localStorage.setItem('caMenuY', (mb.getBoundingClientRect().top/window.innerHeight).toFixed(3)); }catch(x){} } else openMenu(); }
      mb.addEventListener('pointerup',up); mb.addEventListener('pointercancel',function(){ dy=null; mb.classList.remove('drag'); });
      mb.addEventListener('click',function(e){ e.preventDefault(); });
      bg.addEventListener('click',closeMenu); menu.querySelector('.x').addEventListener('click',closeMenu);
      var sx=null;
      menu.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; },{passive:true});
      menu.addEventListener('touchend',function(e){ if(sx!==null && e.changedTouches[0].clientX-sx>60) closeMenu(); sx=null; },{passive:true});
      var ex=null;
      document.addEventListener('touchstart',function(e){ var x=e.touches[0].clientX; ex=(x>window.innerWidth-18 && !popupOpen())?x:null; },{passive:true});
      document.addEventListener('touchend',function(e){ if(ex!==null && ex-e.changedTouches[0].clientX>50) openMenu(); ex=null; },{passive:true});
      var w=0, wi=setInterval(function(){ if(++w>4) return clearInterval(wi); if(!document.body.classList.contains('ca-mopen')){ mb.classList.remove('wig'); void mb.offsetWidth; mb.classList.add('wig'); } },15000);
    }
    function openMenu(){
      var cur=currentSec();
      list.innerHTML='';
      sections().filter(function(s){ return !isGiftSec(s.name); }).forEach(function(s,i){
        var li=document.createElement('li'); if(isGarden(s.name)) li.classList.add('gdn'); if(cur && cur.id===s.id) li.classList.add('on');
        li.style.animationDelay=(i*0.045)+'s';
        var c=countIn(s);
        li.innerHTML='<button type="button"><span class="em">'+icon(s.name)+'</span><span class="t">'+nice(s.name)+'<small>'+(isGarden(s.name)?'The gardener\'s corner · ':'')+(c? c+(c===1?' treat':' treats'):'Have a look')+'</small></span><span>›</span></button>';
        li.querySelector('button').addEventListener('click',function(){ closeMenu(); setTimeout(function(){ go(s); },260); });
        list.appendChild(li);
      });
      document.body.classList.add('ca-mopen');
    }
    function closeMenu(){ document.body.classList.remove('ca-mopen'); }
    function go(s){
      try { s.a.click(); } catch(e){}
      setTimeout(function(){ var r=s.el.getBoundingClientRect(); if(Math.abs(r.top)>140){ window.scrollTo({top:window.scrollY+r.top-110,behavior:'smooth'}); } },350);
    }
    function currentSec(){
      var mid=window.innerHeight*0.35, cur=null;
      sections().forEach(function(s){ if(!isGiftSec(s.name) && s.el.getBoundingClientRect().top<=mid) cur=s; });
      return cur;
    }

    function bigBoxes(){
      sections().forEach(function(x){ if(!/build your own box/i.test(x.name)) return; secEls(x.el).forEach(function(e){ if(e.classList.contains('row')) e.classList.add('ca-big'); }); });
    }
    /* ---------- Fruits & Nuts garden ---------- */
    var GARD_IN=[
      'Psst! You\'re in the freshest corner of Chaleur: my garden! 🌱',
      'Welcome to my garden! Every cake here starts with real fruit or nuts, fresh from the tree, hehe.',
      'You found the juiciest part of the menu! Pick a fruit, any fruit 🍓',
      'Shhh… this is where the fruits and nuts grow. Tap a cake to taste the garden!'
    ];
    var GARD_TAP=[
      'Sour cherry, ripe mango, juicy pear… all in here!',
      'Nut lovers: Acorn and Pistachio are calling you 🌰',
      'Can\'t choose? The Fruits & Nuts Box of 9 has the whole garden!',
      'Fresh fruit tastes best with a friend. Grab two!'
    ];
    var gard, gi=0, gt=0, inGarden=false, gtm;
    function gardTalk(t){ gard.querySelector('.gb').textContent=t; gard.classList.add('talk'); clearTimeout(gtm); gtm=setTimeout(function(){ gard.classList.remove('talk'); },6000); }
    function garden(){
      var s=sections().filter(function(x){ return isGarden(x.name); })[0];
      var layer=document.getElementById('ca-garden');
      if(!s){ if(layer) layer.classList.remove('on'); return; }
      var band=s.el.parentElement; if(!band) return; band.classList.add('ca-gpar');
      if(!layer || layer.parentElement!==band){
        if(layer) layer.remove();
        layer=document.createElement('div'); layer.id='ca-garden'; layer.setAttribute('aria-hidden','true');
        layer.innerHTML='<div class="hedge"></div><div class="lv"></div><div class="grass"></div><div class="sign">THE GARDEN</div>';
        band.appendChild(layer);
      }
      var els=secEls(s.el), last=els[els.length-1]||s.el;
      var na=last.nextElementSibling; while(na&&na.tagName!=='SECTION') na=na.nextElementSibling; if(na&&na.nextElementSibling) na.nextElementSibling.classList.add('ca-aftergdn');
      var br=band.getBoundingClientRect(), t=s.el.getBoundingClientRect().top-br.top, b=last.getBoundingClientRect().bottom-br.top;
      layer.classList.remove('ca-hide'); layer.style.top=(t+2)+'px'; layer.style.height=Math.max(60,b-t+10)+'px'; layer.classList.add('on');
      // gardener
      if(!gard){
        gard=document.createElement('button'); gard.id='ca-gard'; gard.type='button'; gard.setAttribute('aria-label','Chaleur\'s gardener');
        gard.innerHTML='<img alt="" src="'+CA_IMG+'feuille-hello.webp"><span class="gb"></span>';
        document.body.appendChild(gard);
        gard.addEventListener('click',function(){ var im=gard.querySelector('img'); im.src=CA_IMG+'feuille-happy.webp'; setTimeout(function(){ im.src=CA_IMG+'feuille-hello.webp'; },1500); gardTalk(GARD_TAP[gt++%GARD_TAP.length]); });
      }
      var vr=layer.getBoundingClientRect(), vh=window.innerHeight;
      var now = vr.top < vh*0.6 && vr.bottom > vh*0.35 && !popupOpen();
      if(now && !inGarden){ inGarden=true; gard.classList.add('in'); var im=gard.querySelector('img'); im.src=CA_IMG+'feuille-love.webp'; setTimeout(function(){ im.src=CA_IMG+'feuille-hello.webp'; },1800); setTimeout(function(){ gardTalk(GARD_IN[gi++%GARD_IN.length]); },450); }
      else if(!now && inGarden){ inGarden=false; gard.classList.remove('in','talk'); }
    }


    /* ---------- mascot introduces every product in its popup ---------- */
    var CAKE_LINES={"Mochi Strawberry Shortcake": "Fresh strawberries and vanilla chantilly, wrapped in a soft mochi skin. So bouncy!", "Noir": "Noir is for chocolate lovers: 70% dark chocolate mousse, crémeux and a crunchy base.", "Camellia": "Pink guava and elderflower, light and floral. My prettiest bloom!", "Mrs. Bunny": "Mrs. Bunny hides raspberry mousse with a strawberry lychee centre. Hop hop!", "La Fleur": "Black sesame mousse with a bright yuzu heart. Nutty meets zesty!", "Apam Balik": "Peanut sponge, sweet corn and peanut butter chantilly. Like apam balik, but fancy!", "Pecan Tartlet": "Maple-glazed pecans on a pecan frangipane tart. I cracked every nut myself, hehe.", "Rudolph": "Rudolph is toffee mousse with caramel and vanilla chantilly. He flies best with a friend!", "Ornament": "Blueberry and lavender in a little bauble. Too pretty to hang on a tree!", "Cherry": "Sour cherry compote inside chocolate mousse. Picked from my cherry tree!", "Acorn": "Hazelnut mousse, chocolate crémeux and a hazelnut rocher. Squirrels are jealous.", "Strawberry": "Strawberry compote, vanilla mousse and a crisp sablé. A classic from my patch!", "Raspberry": "Raspberry mousse and compote on a vanilla sablé. Tangy and bright!", "Mango": "Mango compote with vanilla mousse. Sunshine in a cake!", "Pistachio": "100% pistachio mousse with crunchy kunafa. Nutty heaven!", "Kurma": "Dates and hazelnut with crème vanille and a crisp feuilletine. Rich and cosy!", "Coconut": "Coconut mousse with pandan and gula melaka. A taste of home!", "Passionfruit": "Passionfruit and mango, light and tropical. Wakes up the whole box!", "Pear": "Yuzu pear compote with a vanilla pear parfait. Juicy, straight from the tree!"};
    var FN_CAKES=['Acorn','Pear','Coconut','Cherry','Mango','Strawberry','Pistachio','Raspberry','Passionfruit','Kurma'];
    var HOST_OPEN=['Ooh, good eye!','Bonjour! Let me introduce…','One of my favourites!','Excellent choice, chéri!'];
    function introFor(name, desc){
      var key=name.split(' (')[0].replace(/\s+(7-inch|6-inch|petit)$/i,'').trim();
      var fn=FN_CAKES.indexOf(key)>-1;
      if(/Gift hunt|Christmas Gift -/i.test(name)) return {who:'host', t:'A little prize from our Christmas gift hunt. Joyeux Noël! 🎁'};
      if(CAKE_LINES[key] && !/box|7-inch|6-inch/i.test(name)) return {who: fn?'gdn':'host', t:CAKE_LINES[key]};
      var d=(desc||'').replace(/\s+/g,' ').trim(); var first=d.split(/(?<=[.!])\s/)[0]||''; if(first.length>150) first=first.slice(0,147).replace(/\s+\S*$/,'')+'…';
      var o=HOST_OPEN[Math.floor(Math.random()*HOST_OPEN.length)];
      if(/box|hamper|set/i.test(name)){ var bn=(name.match(/of\s*(\d+)/i)||[])[1]; var BOXL=['Ready to share, ready to gift! 🎁','A little box of happiness, packed by hand.','Perfect for a party, or a very good night in, hehe.','Our chef picked these to go beautifully together.']; return {who:'host', t:o+' '+(bn? bn+' petit gâteaux in one box. ':'')+BOXL[Math.floor(Math.random()*BOXL.length)]+' The list above shows what\'s inside.'}; }
      if(/coffee|latte|tea|matcha|chocolate drink|cold brew|beverage|soda|juice/i.test(name+' '+d)) return {who:'host', t:o+' '+(first||'A lovely drink to go with your cake.')+' ☕'};
      return {who: fn?'gdn':'host', t:o+' '+(first||'Made fresh in our atelier.')};
    }
    function typeOut(el, txt){ var i=0; el.textContent=''; (function step(){ if(!document.body.contains(el)) return; el.textContent=txt.slice(0,i+=2); if(i<txt.length) setTimeout(step,18); })(); }
    function popupIntro(){
      var m=$$('.modal-content-wrapper,.ReactModal__Content,.modal.show').filter(function(x){ return x.getClientRects().length && /Add to Cart|Gift hunt prize/i.test(x.innerText||''); })[0];
      if(!m) return;
      var lines=(m.innerText||'').split('\n').map(function(x){return x.trim();}).filter(function(x){ return x && x!=='×'; });
      var name=lines[0]||''; if(!name) return;
      if(m.querySelector('.ca-bx')){ var ob=m.querySelector('.ca-pm'); if(ob) ob.remove(); return; }   /* box builder has its own gardener */
      var old=m.querySelector('.ca-pm'); if(old && old.getAttribute('data-n')===name) return; if(old) old.remove();
      var leaves=$$('p,div,span',m).filter(function(e){ return !e.children.length && (e.innerText||'').trim().length>30 && !/Add to Cart|LIMIT/i.test(e.innerText) && !e.closest('.ca-pm'); });
      var desc=leaves.sort(function(a,b){ return b.innerText.length-a.innerText.length; })[0];
      if(!desc){ desc=$$('p,div',m).filter(function(e){ return !e.querySelector('img,button,input,a') && !e.closest('.ca-pm') && (e.innerText||'').trim().length>30 && !/Add to Cart|LIMIT|AVAILABILITY/i.test(e.innerText); }).sort(function(a,b){ return a.innerText.length-b.innerText.length; }).pop(); }
      var foot=m.querySelector('.cart-product-modal-footer');
      if(!desc && !foot) return;
      var I=introFor(name, desc?desc.innerText:'');
      var img = I.who==='gdn' ? CA_IMG+'feuille-'+(['happy','love','gateau'][Math.floor(Math.random()*3)])+'.webp' : CA_IMG+'host-hello.webp';
      var w=document.createElement('div'); w.className='ca-pm'+(I.who==='gdn'?' g':''); w.setAttribute('data-n',name);
      w.innerHTML='<img alt="" src="'+img+'"><div class="pb"><small>'+(I.who==='gdn'?'Chaleur\'s gardener says':'Our host says')+'</small><span></span></div>';
      if(desc) desc.parentNode.insertBefore(w, desc.nextSibling); else foot.parentNode.insertBefore(w, foot);
      setTimeout(function(){ typeOut(w.querySelector('.pb span'), I.t); },350);
      w.querySelector('img').addEventListener('click',function(){ w.classList.remove('hop'); void w.offsetWidth; w.classList.add('hop'); });
    }
    /* ---------- Christmas gift hunt ---------- */
    /* chances (must add up to 1). Change here only. */
    var ODDS={ none:.20, cookie:.25, petit:.25, rm5:.15, rm10:.10, rm20:.05 };
    var KEY='caGift26';
    var SPOTS=['stock','tree','box','sleigh','santa'];
    var SPOT_NAME={stock:'the stocking',tree:'under the tree',box:'the gift box',sleigh:'the sleigh drop',santa:'Santa\'s sack'};
    var DECOY={
      stock:['Only snow in this stocking ❄️','Just a candy cane in here. Try another spot!'],
      tree:['Pine needles and one very surprised squirrel 🐿️','Nothing under the tree… yet!'],
      box:['This box is full of ribbons, hehe 🎀','Empty! Rudolph must have peeked first.'],
      sleigh:['The sleigh dropped… a mitten 🧤','Just reindeer snacks in this one!'],
      santa:['Santa\'s sack is full of letters 💌 Keep looking!','Ho ho… not this one!']
    };
    var PRIZE={
      cookie:{big:'🍪',h:'A free cookie!',add:'One Chocolate Chips Walnut Cookie, on us. We\'ve added it to your cart. Don\'t want it? Just remove it in your cart.',price:'free',re:/Christmas Gift - .*Cookie/i,ok:'Your free cookie is in the cart! 🍪'},
      petit:{big:'🧁',h:'A surprise petit gâteau!',add:'Chef\'s surprise flavour, just RM6.99. We\'ve added it to your cart. Don\'t want it? Just remove it in your cart.',price:'RM6.99',re:/Surprise Petit/i,ok:'Your surprise petit gâteau is in the cart! 🧁'},
      rm5:{big:'🎁',h:'RM5 off your order!',p:'We\'ll apply it for you at checkout. Merci & Joyeux Noël!',code:'XMASGIFT5',v:5},
      rm10:{big:'🎉',h:'RM10 off your order!',p:'We\'ll apply it for you at checkout. Merci & Joyeux Noël!',code:'XMASGIFT10',v:10},
      rm20:{big:'🌟',h:'Wow, RM20 off!',p:'Lucky you! We\'ll apply it for you at checkout. Joyeux Noël!',code:'XMASGIFT20',v:20}
    };
    function load(){ try { return JSON.parse(localStorage.getItem(KEY)||'null'); } catch(e){ return null; } }
    function save(g){ try { localStorage.setItem(KEY, JSON.stringify(g)); } catch(e){} }
    var G=load();
    function cartTotal(){
      var bar=$('.form-bottom-bar'); if(!bar) return null;
      var m=(bar.innerText||'').match(/RM\s*([\d,]+\.\d{2})/g); return m? parseFloat(m[m.length-1].replace(/[^\d.]/g,'')) : null;
    }
    function giftRow(re){ var b=$$('a.form-add-item-btn').filter(function(b){ var r=b.closest('.col-12'); return r && re.test(r.innerText); })[0]; return b; }
    function prizeAvailable(re){ var b=giftRow(re); if(!b) return false; var r=b.closest('.col-12'); return !/sold\s*out|out of stock|unavailable/i.test(r.innerText); }
    function soldOut(re){ var b=giftRow(re); if(!b) return false; return /sold\s*out|out of stock|unavailable/i.test(b.closest('.col-12').innerText); }
    /* when both the free cookies and the surprise petits are gone, the whole hunt stops (everything = nothing) */
    function huntOver(){ return soldOut(/Christmas Gift - .*Cookie/i) && soldOut(/Surprise Petit/i); }
    function petitAvailable(){ return prizeAvailable(/Surprise Petit/i); }
    function draw(){
      var r=Math.random(), o='none', acc=0;
      for(var k in ODDS){ acc+=ODDS[k]; if(r<acc){ o=k; break; } }
      if(o==='petit' && !petitAvailable()) o='none';
      if(o==='cookie' && !prizeAvailable(/Christmas Gift - .*Cookie/i)) o='none';
      return { o:o, spot:SPOTS[Math.floor(Math.random()*SPOTS.length)], opened:[], done:false, t:Date.now() };
    }
    var SVG={
      stock:'<svg viewBox="0 0 40 56"><rect x="6" y="2" width="22" height="9" rx="3" fill="#FFF0DC" stroke="#C5D0E5"/><path d="M8 11h18v20c0 4 2 6 6 8 6 3 6 13-3 13-5 0-9-2-13-6L9 40c-2-2-3-4-3-7V11z" fill="#780C14"/><path d="M8 20h18M8 28h18" stroke="#FFF0DC" stroke-width="2" stroke-dasharray="3 3"/></svg>',
      tree:'<svg viewBox="0 0 40 32"><rect x="4" y="10" width="32" height="20" rx="3" fill="#C5D0E5"/><rect x="17" y="10" width="6" height="20" fill="#780C14"/><path d="M20 10c-4-8-12-6-9-1 2 2 6 2 9 1 3 1 7 1 9-1 3-5-5-7-9 1z" fill="#780C14"/></svg>',
      box:'<svg viewBox="0 0 44 44"><rect x="4" y="16" width="36" height="26" rx="3" fill="#780C14"/><rect x="2" y="11" width="40" height="8" rx="2" fill="#9A1822"/><rect x="19" y="11" width="6" height="31" fill="#F4DCBC"/><path d="M22 11c-5-10-15-8-11-2 2 3 7 3 11 2 4 1 9 1 11-2 4-6-6-8-11 2z" fill="#F4DCBC"/></svg>',
      sleigh:'<svg viewBox="0 0 40 52"><path d="M4 18C4 6 36 6 36 18z" fill="#FFF0DC" stroke="#C5D0E5" stroke-width="1.5"/><path d="M6 18l12 16M34 18L22 34M20 18v16" stroke="#7A4926" stroke-width="1"/><rect x="11" y="32" width="18" height="18" rx="2" fill="#7A4926"/><rect x="18" y="32" width="4" height="18" fill="#FFF0DC"/></svg>',
      santa:'<svg viewBox="0 0 60 70"><ellipse cx="44" cy="44" rx="13" ry="16" fill="#7A4926"/><path d="M38 30c2-6 10-6 12 0" stroke="#523325" stroke-width="2" fill="none"/><rect x="14" y="34" width="22" height="26" rx="9" fill="#780C14"/><rect x="14" y="46" width="22" height="4" fill="#523325"/><rect x="16" y="58" width="7" height="9" rx="2" fill="#523325"/><rect x="27" y="58" width="7" height="9" rx="2" fill="#523325"/><circle cx="25" cy="24" r="10" fill="#F4DCBC"/><path d="M15 30c2 10 18 10 20 0-3 4-17 4-20 0z" fill="#fff"/><path d="M14 20c2-12 20-14 24 0z" fill="#780C14"/><circle cx="40" cy="13" r="3.5" fill="#fff"/><path d="M13 20h25" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="21" cy="24" r="1.3" fill="#523325"/><circle cx="29" cy="24" r="1.3" fill="#523325"/></svg>'
    };
    function confetti(){
      var cols=[BURG,BLUE,BEIGE,CARAMEL,'#fff'];
      for(var i=0;i<46;i++){ var c=document.createElement('i'); c.className='ca-conf'; c.style.left=(Math.random()*100)+'vw'; c.style.background=cols[i%cols.length]; c.style.animationDelay=(Math.random()*.6)+'s'; c.style.borderRadius=(i%3?'2px':'50%'); document.body.appendChild(c); (function(c){ setTimeout(function(){ c.remove(); },3600); })(c); }
    }
    function modal(html, wire){
      var m=document.createElement('div'); m.id='ca-gm'; m.innerHTML='<div class="cd" role="dialog" aria-modal="true">'+html+'</div>';
      document.body.appendChild(m); function close(){ m.remove(); } if(wire) wire(m, close);
      m.addEventListener('click',function(e){ if(e.target===m) close(); });
      return close;
    }
    function toast(html, ms){
      var t=document.getElementById('ca-gh'); if(t) t.remove();
      t=document.createElement('div'); t.id='ca-gh'; t.innerHTML=html+'<button class="x" type="button" aria-label="Close">×</button>';
      document.body.appendChild(t); setTimeout(function(){ t.classList.add('in'); },30);
      function hide(){ t.classList.remove('in'); setTimeout(function(){ t.remove(); },500); }
      t.querySelector('.x').addEventListener('click',hide); setTimeout(hide, ms||9000);
    }
    function clearSpots(){ $$('.ca-spot').forEach(function(s){ s.remove(); }); }
    function showSpots(first){
      if(document.querySelector('.ca-spot')) return;
      SPOTS.forEach(function(k,i){
        if(G.opened.indexOf(k)>-1) return;
        var b=document.createElement('button'); b.type='button'; b.className='ca-spot'; b.id='ca-s-'+k; b.setAttribute('aria-label','Search '+SPOT_NAME[k]);
        b.innerHTML=SVG[k]; b.style.animationDelay=(first? i*0.25 : 0)+'s';
        if(k==='sleigh' && first){ b.classList.add('fall'); }
        if(k==='santa' && first){ b.classList.add('walk'); }
        b.addEventListener('click',function(){ openSpot(k,b); });
        b.addEventListener('animationend',function(e){ if(e.target===b){ b.classList.remove('fall','walk'); b.style.animation='none'; } });
        document.body.appendChild(b);
      });
      if(first){ var sl=document.getElementById('ca-xmas-sleigh'); if(sl){ sl.classList.remove('go'); void sl.offsetWidth; sl.classList.add('go'); } }
    }
    function openSpot(k,b){
      if(G.done || G.opened.indexOf(k)>-1) return;
      G.opened.push(k); save(G);
      if(G.o!=='none' && k===G.spot){ G.done=true; G.found=k; save(G); clearSpots(); reveal(); return; }
      b.classList.add('empty'); setTimeout(function(){ b.remove(); },600);
      var lines=DECOY[k]; host(lines[Math.floor(Math.random()*lines.length)], 3500);
      if(G.o==='none' && G.opened.length>=2){
        G.done=true; save(G);
        setTimeout(function(){ clearSpots(); modal('<div class="big">☃️</div><h3>No gift this round</h3><p>Santa\'s elves hid nothing for you this time. Thank you for shopping with us, and Joyeux Noël!</p><button class="bt" type="button">Back to my order</button>',function(m,close){ m.querySelector('.bt').addEventListener('click',close); }); },700);
      }
    }
    function reveal(){
      confetti();
      var P=PRIZE[G.o];
      if(P.price){
        G.claim='yes'; save(G);
        modal('<div class="big">'+P.big+'</div><h3>'+P.h+'</h3><p>Found in '+SPOT_NAME[G.found]+'! '+P.add+'</p><button class="bt" type="button">Yay! Back to my order</button>',function(m,close){ m.querySelector('.bt').addEventListener('click',close); });
        setTimeout(function(){ if(G.o==='petit') addPetit(); else addPrize(P.re, P.ok); },900);
      } else {
        G.code=P.code; G.v=P.v; save(G);
        modal('<div class="big">'+P.big+'</div><h3>'+P.h+'</h3><p>Found in '+SPOT_NAME[G.found]+'! '+P.p+'</p><button class="bt" type="button">Yay! Back to my order</button>',function(m,close){ m.querySelector('.bt').addEventListener('click',close); });
      }
    }
    /* nobody can add the prize by itself: block "Add to Cart" in its popup unless it was won */
    var allowPetit=false;
    function guardPrize(){
      var m=$$('.modal-content-wrapper,.ReactModal__Content,.modal.show').filter(function(x){ return x.getClientRects().length && /Surprise Petit|Christmas Gift - .*Cookie/i.test(x.innerText||''); })[0];
      if(!m) return;
      var add=$$('button',m).filter(function(x){ return /Add to Cart|Gift hunt prize/i.test(x.innerText); })[0];
      if(!add || allowPetit) return;
      if(!add.__caG){ add.__caG=1; add.textContent='Gift hunt prize only 🎁'; add.disabled=true; add.style.opacity='.6';
        add.addEventListener('click',function(e){ if(!allowPetit){ e.preventDefault(); e.stopImmediatePropagation(); } },true); }
    }
    function addPrize(re, msg){
      var b=giftRow(re); if(!b) return;
      allowPetit=true; b.click();
      var n=0, iv=setInterval(function(){
        var add=$$('button').filter(function(x){ return /^\s*Add to Cart\s*$/i.test(x.innerText) && x.getClientRects().length; })[0];
        if(add){ clearInterval(iv); add.click(); G.added=1; save(G); setTimeout(function(){ allowPetit=false; },1500); setTimeout(function(){ host(msg,4500); },600); }
        else if(++n>25){ clearInterval(iv); allowPetit=false; }
      },200);
    }
    function addPetit(){
      var b=giftRow(/Surprise Petit/i);
      if(!b || !petitAvailable()){ host('Oh no, the surprise petits just ran out! Sorry 🥲',5000); G.claim='soldout'; save(G); return; }
      allowPetit=true; b.click();
      var n=0, iv=setInterval(function(){
        var add=$$('button').filter(function(x){ return /^\s*Add to Cart\s*$/i.test(x.innerText) && x.getClientRects().length; })[0];
        if(add){ clearInterval(iv); add.click(); G.added=1; save(G); setTimeout(function(){ allowPetit=false; },1500); setTimeout(function(){ host('Your surprise petit gâteau is in the cart! Remove it there if you change your mind 🧁',5000); },600); }
        else if(++n>25){ clearInterval(iv); allowPetit=false; host('Tap the surprise petit in your cart to add it 🧁',4500); }
      },200);
    }
    /* coupon at checkout: apply the gift code unless the customer's own code saves more */
    var applied=false;
    function checkout(){
      if(!G || !G.code) return;
      var inp=$('input.text-monospace'); var sum=document.body.innerText||'';
      var dl=sum.match(/Discount:\s*([A-Z0-9]+)\s*RM\s*-?([\d.]+)/i);
      var note=document.getElementById('ca-gnote');
      var anchor=inp? (inp.closest('.input-group')||inp.parentNode) : null;
      if(dl){
        var code=dl[1].toUpperCase(), amt=parseFloat(dl[2]);
        var msg = code===G.code ? '🎁 Your Christmas gift ('+'RM'+G.v+' off) is applied. Joyeux Noël!'
                : (amt>=G.v ? '🎁 Your '+code+' saves you more (RM'+amt.toFixed(2)+'), so we kept it instead of your RM'+G.v+' Christmas gift.' : '');
        if(code!==G.code && amt<G.v && inp && !applied){ applied=true; useCode(inp, G.code); }
        placeNote(msg);
        return;
      }
      if(inp && !applied && inp.getClientRects().length){
        if(cartTotal()!==null && cartTotal()<MIN){ placeNote('🎁 Your Christmas RM'+G.v+' off needs a cart of RM'+MIN+' or more.'); return; }
        if((inp.value||'').trim()) return;           /* customer is typing their own code: let it run, compare after */
        applied=true; useCode(inp, G.code);
      }
      function placeNote(msg){
        if(!msg){ if(note) note.remove(); return; }
        if(!note){ note=document.createElement('div'); note.id='ca-gnote'; var host2=$$('div').filter(function(d){ var t=(d.innerText||'').trim(); return /^Date & Time Slot/.test(t) && t.length<90; }).pop(); var tgt=host2||anchor; if(!tgt) return; tgt.parentNode.insertBefore(note, tgt.nextSibling); }
        note.textContent=msg; if(!document.body.contains(note)) note=null;
      }
    }
    function useCode(inp, code){
      var set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; set.call(inp, code); inp.dispatchEvent(new Event('input',{bubbles:true}));
      setTimeout(function(){ var r=$$('button').filter(function(b){ return /^\s*Redeem\s*$/.test(b.innerText); })[0]; if(r) r.click(); },250);
    }

    var lastTot=null, teased=false;
    function hunt(){
      if(Date.now()>GIFT_END) { clearSpots(); return; }
      hideGift(); guardPrize();
      var tot=cartTotal();
      if(G && G.code) checkout();
      if(G && G.done) return;
      if(tot===null) return;
      if(tot>=MIN){
        if(!G){ G=draw(); save(G); }
        if(!document.querySelector('.ca-spot') && !popupOpen() && $('.form-bottom-bar')){
          var first = !G.shown; G.shown=1; save(G);
          showSpots(first);
          if(first){
            toast('<b>🎁 Gift hunt unlocked!</b>Your cart hit RM'+MIN+'. A present is hiding in the stocking, under the tree, in the gift box, in the sleigh drop or in Santa\'s sack. Tap to search!', 11000);
            host('Ooh, the gift hunt is open! Tap the sparkly things ✨',5000);
          }
        }
      } else {
        if(document.querySelector('.ca-spot')) clearSpots();
        if(lastTot!==null && tot>lastTot && tot>0 && !teased && !popupOpen()){ teased=true; setTimeout(function(){ host('RM'+(MIN-tot).toFixed(2)+' more and you unlock our Christmas gift hunt 🎁',5500); },3800); }
      }
      lastTot=tot;
    }

    function tick(){
      try { buildMenu(); } catch(e){}
      try { bigBoxes(); } catch(e){}
      try { garden(); } catch(e){}
      try { hunt(); } catch(e){}
      try { popupIntro(); } catch(e){}
    }
    setInterval(tick, 500); tick();
    window.addEventListener('scroll', function(){ try { garden(); } catch(e){} }, {passive:true});
    window.__caGift = { reset:function(){ try{ localStorage.removeItem(KEY); }catch(e){} G=null; clearSpots(); applied=false; }, state:function(){ return G; } };
  } catch(e) { /* never break the order form */ }
})();
