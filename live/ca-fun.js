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
      /* Build Your Own Box: 2 big picture cards per row (like Orderla's grid) */
      '.ca-big{display:grid!important;grid-template-columns:1fr 1fr;gap:10px;padding:4px 0 10px}',
      '.ca-big > .col-12{max-width:100%!important;flex:none!important;width:auto!important}',
      '.ca-big .ca-lr{height:100%;margin:0!important;padding:5px 5px 10px!important;border-radius:20px!important}',
      '.ca-big .ca-lr > div{height:100%}',
      '.ca-big .ca-lr > div > div{flex-direction:column!important}',
      '.ca-big .ca-rimg{flex:none!important;margin:0 0 10px!important;width:100%}',
      '.ca-big .ca-rimg img{width:100%!important;height:auto!important;aspect-ratio:1/1;border-radius:14px!important}',
      '.ca-big .ca-ri{display:flex!important;flex-direction:column;gap:4px;padding:0 4px}',
      '.ca-big .ca-rt span{font-size:14px!important}',
      '.ca-big .ca-rt p{display:none!important}',
      '.ca-big .ca-rb > div:first-child{text-align:left}',
      '.ca-big .ca-rb > div:last-child{justify-content:flex-start!important;padding-top:6px!important}',
      /* ---------- fruits & nuts garden ---------- */
      '.ca-gpar{position:relative!important}','.ca-gpar > :not(#ca-garden){position:relative;z-index:1}',
      '#ca-garden{position:absolute;left:0;right:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,#EEF5E4 0%,#DDEBCB 55%,#CFE2B6 100%);opacity:0;transition:opacity .6s}',
      '#ca-garden.on{opacity:1}','.ca-aftergdn{padding-top:30px!important}',
      '#ca-garden .lv{position:absolute;inset:0;opacity:.38;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cg fill=%27%23A9C68A%27%3E%3Cpath d=%27M18 22c10-10 24-8 26 0-8 8-20 10-26 0z%27/%3E%3Cpath d=%27M84 70c8-12 22-12 26-4-6 10-18 14-26 4z%27/%3E%3Cpath d=%27M40 96c6-9 17-9 20-3-5 7-14 10-20 3z%27/%3E%3C/g%3E%3Cg fill=%27%23E8B4A0%27%3E%3Ccircle cx=%2796%27 cy=%2720%27 r=%273%27/%3E%3Ccircle cx=%2716%27 cy=%2770%27 r=%272.5%27/%3E%3C/g%3E%3C/svg%3E");background-size:120px 120px}',
      '#ca-garden .hedge{position:absolute;left:0;right:0;top:-22px;height:24px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 60 24%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0 24V14C4 4 12 4 15 12 18 2 28 2 30 11 33 3 42 3 45 12 48 4 56 4 60 14V24Z%27 fill=%27%23EEF5E4%27/%3E%3C/svg%3E");background-size:60px 24px;background-repeat:repeat-x}',
      '#ca-garden .grass{position:absolute;left:0;right:0;bottom:-2px;height:34px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 80 34%27%3E%3Cg fill=%27%237E9E58%27%3E%3Cpath d=%27M0 34 6 10 9 34Z%27/%3E%3Cpath d=%27M10 34 18 4 20 34Z%27/%3E%3Cpath d=%27M24 34 28 14 32 34Z%27/%3E%3Cpath d=%27M36 34 44 6 46 34Z%27/%3E%3Cpath d=%27M50 34 55 16 58 34Z%27/%3E%3Cpath d=%27M60 34 68 2 70 34Z%27/%3E%3Cpath d=%27M72 34 76 12 80 34Z%27/%3E%3C/g%3E%3Ccircle cx=%2730%27 cy=%2713%27 r=%273%27 fill=%27%23780C14%27/%3E%3Ccircle cx=%2757%27 cy=%2715%27 r=%272.5%27 fill=%27%23FFF0DC%27/%3E%3C/svg%3E");background-size:80px 34px;background-repeat:repeat-x}',
      '#ca-garden .sign{position:absolute;right:10px;top:8px;background:'+CARAMEL+';color:'+CREAM+';font:800 10px Montserrat,sans-serif;letter-spacing:.14em;padding:5px 9px;border-radius:6px;transform:rotate(3deg);box-shadow:0 2px 0 '+BROWN+'}',
      /* gardener who greets you in the garden */
      '#ca-gard{position:fixed;left:6px;bottom:'+(mobile?150:180)+'px;width:'+(mobile?70:88)+'px;z-index:2147483002;border:none;background:none;padding:0;cursor:pointer;transform:translateX(-140%);transition:transform .55s cubic-bezier(.2,.9,.3,1.3);-webkit-tap-highlight-color:transparent}',
      '#ca-gard.in{transform:none}',
      '#ca-gard img{width:100%;display:block;filter:drop-shadow(0 3px 4px rgba(82,51,37,.25))}',
      '#ca-gard .gb{position:absolute;left:calc(100% + 6px);bottom:28px;width:'+(mobile?190:230)+'px;background:#fff;border:2px solid #7E9E58;border-radius:14px 14px 14px 4px;padding:8px 10px;font:600 12.5px/1.35 Montserrat,sans-serif;color:'+BROWN+';text-align:left;opacity:0;transform:scale(.6);transform-origin:left bottom;transition:all .3s}',
      '#ca-gard.in.talk .gb{opacity:1;transform:none}',
      'body.ca-popup #ca-gard,body.ca-mopen #ca-gard{display:none}',
      '.ca-pm{box-sizing:border-box;max-width:100%;padding-right:2px;display:flex;align-items:flex-end;gap:10px;margin:14px 0 6px;animation:caPop .45s cubic-bezier(.2,.9,.3,1.4) both}',
      '.ca-pm img{width:74px;flex:none;cursor:pointer;filter:drop-shadow(0 3px 4px rgba(82,51,37,.25))}',
      '.ca-pm.hop img{animation:caHop .5s ease-in-out 2}',
      '.ca-pm .pb{position:relative;flex:1;min-width:0;box-sizing:border-box;background:#fff;border:2px solid '+BURG+';border-radius:16px 16px 16px 4px;padding:9px 12px;font:600 13px/1.4 Montserrat,sans-serif;color:'+BROWN+';min-height:44px}',
      '.ca-pm .pb small{display:block;font:800 10px Montserrat,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:'+CARAMEL+';margin-bottom:2px}',
      '.ca-pm.g .pb{border-color:#7E9E58;background:#F3F8EC}',
      /* ---------- lucky draw game ---------- */
      '#ca-gm.dg .cd{width:min(92vw,380px);padding:18px 16px 16px}',
      '.dg-h{display:flex;align-items:center;gap:10px;text-align:left;margin-bottom:6px}',
      '.dg-h img{width:64px}',
      '.dg-h small{font:800 11px Montserrat,sans-serif;letter-spacing:.14em;color:'+CARAMEL+'}',
      '.dg-h h3{margin:2px 0 0!important}',
      '.dg-rules{text-align:left;margin:8px 0 10px;padding-left:22px;font-size:14px;line-height:1.55}',
      '.dg-prz{font-size:12.5px!important;background:#fff;border-radius:12px;padding:8px 10px;margin:0 0 6px!important}',
      '.dg-fine{font-size:11px!important;color:'+CARAMEL+';margin:10px 0 0!important}',
      '.dg-top{display:flex;justify-content:space-between;font:700 14px Montserrat,sans-serif;margin-bottom:10px}',
      '.dg-top .hot{color:'+BURG+';animation:caHop .5s ease-in-out infinite}',
      '.dg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}',
      '.coin{aspect-ratio:1;border:none;background:none;padding:0;perspective:600px;cursor:pointer;-webkit-tap-highlight-color:transparent}',
      '.coin .in{position:relative;display:block;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}',
      '.coin.up .in{transform:rotateY(180deg)}',
      '.coin .bk,.coin .fr{position:absolute;inset:0;border-radius:50%;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;align-items:center;justify-content:center}',
      '.coin .bk{background:radial-gradient(circle at 35% 30%,#9A1822,'+BURG+' 70%);border:4px solid '+BEIGE+';box-shadow:0 4px 10px rgba(82,51,37,.3)}',
      '.coin .bk b{font:800 22px Montserrat,sans-serif;color:'+CREAM+';letter-spacing:.06em}',
      '.coin .fr{background:'+CREAM+';border:4px solid '+CARAMEL+';transform:rotateY(180deg);overflow:hidden}',
      '.coin .fr img{width:86%;height:86%;object-fit:contain}',
      '.coin.match .fr{border-color:#7E9E58;box-shadow:0 0 0 4px rgba(126,158,88,.35)}',
      '.coin.dim{opacity:.55}',
      '.coin:not(.up):active .in{transform:scale(.94)}',
      '.dg-msg{margin:12px 0 0!important;font-weight:700}',
      '#ca-lead{position:fixed;inset:0;z-index:2147483006;background:rgba(82,51,37,.45);display:flex;align-items:center;justify-content:center;padding:16px}',
      '#ca-lead .cd{background:'+CREAM+';border-radius:22px;padding:18px 18px 14px;width:min(92vw,360px);text-align:center;font-family:Montserrat,sans-serif;color:'+BROWN+';box-shadow:0 12px 30px rgba(0,0,0,.25)}',
      '#ca-lead img{width:70px;margin:-50px auto 4px;display:block}',
      '#ca-lead h3{margin:0 0 4px!important;font:800 18px Montserrat,sans-serif!important;color:'+BURG+'!important}',
      '#ca-lead p{margin:0 0 10px!important;font-size:13px!important}',
      '#ca-lead label{display:block;text-align:left;font:700 12px Montserrat,sans-serif;margin:8px 0 0}',
      '#ca-lead input{width:100%;box-sizing:border-box;border:2px solid '+BEIGE+';border-radius:12px;padding:10px 12px;font:600 15px Montserrat,sans-serif;color:'+BROWN+';background:#fff;margin-top:4px}',
      '#ca-lead .ph{display:flex;gap:6px;align-items:center}','#ca-lead .ph b{margin-top:4px;color:'+BURG+'}','#ca-lead .ph select.cc{margin-top:4px;font:inherit;font-weight:700;color:'+BURG+';background:#fff;border:1px solid rgba(82,51,37,.25);border-radius:10px;padding:9px 6px;flex:0 0 auto}',
      '#ca-lead .err{color:'+BURG+'!important;font-weight:700;margin:6px 0 0!important}',
      '#ca-lead .bt{width:100%;margin-top:12px;border:none;border-radius:999px;background:'+BURG+';color:'+CREAM+';font:800 15px Montserrat,sans-serif;padding:12px}',
      '#ca-lead .fine{font-size:11px!important;color:'+CARAMEL+';margin:10px 0 0!important}',
      '#orderla-cart-upsell{min-width:0!important;max-width:100%!important;overflow:hidden}',
      '#orderla-cart-upsell .ca-up{margin:6px 0 4px;position:relative;width:100%;max-width:min(100%,calc(100vw - 24px));min-width:0;box-sizing:border-box}',
      '#orderla-cart-upsell .ca-up .nav{position:absolute;top:calc(50% - 6px);transform:translateY(-50%);width:34px;height:34px;border-radius:50%;border:0;background:'+BURG+';color:'+CREAM+';font:800 18px/34px Montserrat,sans-serif;text-align:center;padding:0;box-shadow:0 4px 12px -4px rgba(82,51,37,.6);z-index:2;cursor:pointer}',
      '#orderla-cart-upsell .ca-up .nav.l{left:-4px}','#orderla-cart-upsell .ca-up .nav.r{right:-4px}','#orderla-cart-upsell .ca-up .nav[hidden]{display:none}',
      '#orderla-cart-upsell .ca-up .hd{font:800 15px Montserrat,sans-serif;color:'+BURG+';margin:0 0 8px}',
      '#orderla-cart-upsell .ca-up .ca-uprow{display:flex;flex-wrap:nowrap!important;gap:10px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y;overscroll-behavior-x:contain;width:100%;max-width:100%;box-sizing:border-box;padding:2px 2px 8px;margin:0!important}',
      '#orderla-cart-upsell .ca-up .ca-uprow::-webkit-scrollbar{display:none}',
      '#orderla-cart-upsell .ca-upc{flex:0 0 118px;scroll-snap-align:start;border:1.5px solid '+BEIGE+';border-radius:16px;background:#fff;padding:6px 6px 8px;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;font-family:Montserrat,sans-serif;text-align:center}',
      '#orderla-cart-upsell .ca-upc .ph{width:104px;height:104px;border-radius:12px;overflow:hidden;background:'+CREAM+';display:flex;align-items:center;justify-content:center}',
      '#orderla-cart-upsell .ca-upc .ph img{width:100%;height:100%;object-fit:cover}',
      '#orderla-cart-upsell .ca-upc .nm{font:700 11.5px/1.25 Montserrat,sans-serif;color:'+BROWN+';min-height:29px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
      '#orderla-cart-upsell .ca-upc .pr{font:800 12.5px Montserrat,sans-serif;color:'+BURG+'}',
      '#orderla-cart-upsell .ca-upc .ad{font:800 11.5px Montserrat,sans-serif;color:'+CREAM+';background:'+BURG+';border-radius:999px;padding:4px 12px;margin-top:2px}',
      '#orderla-cart-upsell .ca-up .sw{font-size:11px;color:'+CARAMEL+';text-align:right}',
      '#orderla-cart-upsell > div{border:none!important;background:transparent!important;padding:0!important}',
      '#ca-hold{position:fixed;left:50%;transform:translateX(-50%);top:104px;z-index:2147483003;background:'+BURG+';color:'+CREAM+';font:700 12.5px Montserrat,sans-serif;padding:8px 14px;border-radius:999px;box-shadow:0 6px 16px rgba(82,51,37,.35);white-space:nowrap;cursor:pointer}',
      '#ca-hold b{color:'+CREAM+'!important;font-weight:800}',
      '#ca-hold.hot{background:#9A1822;animation:caHop .6s ease-in-out infinite}',
      '#ca-dchip{position:fixed;left:12px;bottom:150px;z-index:2147483002;border:none;border-radius:999px;background:'+BURG+';color:'+CREAM+';font:800 13px Montserrat,sans-serif;padding:10px 14px;display:flex;gap:6px;align-items:center;box-shadow:0 6px 16px rgba(82,51,37,.35);animation:caWig 1.2s ease-in-out infinite;cursor:pointer}',
      'body.ca-popup #ca-dchip,body.ca-mopen #ca-dchip{display:none}',
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
    function isGiftSec(n){ return /gift hunt|lucky draw/i.test(n); }
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
      if(!(last.innerText||'').trim() && last.offsetHeight<90) b=last.getBoundingClientRect().top-br.top+12; layer.classList.remove('ca-hide'); layer.style.top=(t+2)+'px'; layer.style.height=Math.max(60,b-t)+'px'; layer.classList.add('on');
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
    /* ---------- Christmas Lucky Draw (flip game) ---------- */
    var DMIN=150, DKEY='caDraw26', WIN=1, LIMIT=30, FLIPS=3, HOLD=10*60*1000;   /* everyone wins; prize held 10 min */
    /* prize split among winners (must add up to 1) */
    var PRIZE_W={ rm20:.005, rm2:.25, half:.35, petit:.15, cookie:.125, kit:.12 };
    var PR={
      rm20:{code:'rm20', v:20, big:'🌟', h:'Wow, RM20 off your order!', p:'Lucky you! We\'ll apply it for you at checkout. Joyeux Noël!'},
      rm2:{code:'rm2', v:2, big:'🎟️', h:'RM2 off your order!', p:'We\'ll apply it for you at checkout. Joyeux Noël!'},
      half:{re:/Lucky Draw - Extra Petit/i, big:'🍰', h:'An extra cake at 50% off!', p:'The next cake you choose is half price (petit gâteau or tart). We\'ve opened it for you: pick your cake and tap Add to Cart.', choose:true},
      petit:{re:/Lucky Draw - Surprise Petit/i, big:'🧁', h:'A surprise petit gâteau for RM6.99!', p:'Chef\'s surprise flavour. We\'ve added it to your cart. Don\'t want it? Just remove it in your cart.', ok:'Your surprise petit gâteau is in the cart! 🧁'},
      cookie:{re:/Lucky Draw - Free Chocolate/i, big:'🍪', h:'A free cookie!', p:'One Chocolate Chips Walnut Cookie, on us. It\'s in your cart now (remove it anytime).', ok:'Your free cookie is in the cart! 🍪'},
      kit:{re:/Lucky Draw - Free Birthday Kit/i, big:'🎂', h:'A free Birthday Kit!', p:'Birthday tag + 6 candles, on us. It\'s in your cart now (remove it anytime).', ok:'Free Birthday Kit added! 🎂'}
    };
    var FACES=['rudolph','cherry','ornament','strawberry','acorn','pistachio','mango','raspberry','noir','pear','coconut','kurma'];
    var BOX_IMG={rudolph:'Rudolph',cherry:'Cherry',ornament:'Ornament',strawberry:'Strawberry',acorn:'Acorn',pistachio:'Pistachio',mango:'Mango',raspberry:'Raspberry',noir:'Noir',pear:'Pear',coconut:'Coconut',kurma:'Kurma'};
    function faceImg(k){ try { if(window.__caBxImg) return window.__caBxImg(BOX_IMG[k]); } catch(e){} return CA_IMG+'feuille-happy.webp'; }
    function dload(){ try { return JSON.parse(localStorage.getItem(DKEY)||'null'); } catch(e){ return null; } }
    function dsave(g){ try { localStorage.setItem(DKEY, JSON.stringify(g)); } catch(e){} }
    var D=dload();
    function cartTotal(){ var bar=$('.form-bottom-bar'); if(!bar) return null; var m=(bar.innerText||'').match(/RM\s*([\d,]+\.\d{2})/g); return m? parseFloat(m[m.length-1].replace(/[^\d.]/g,'')) : null; }
    function giftRow(re){ return $$('a.form-add-item-btn').filter(function(b){ var r=b.closest('.col-12'); return r && re.test(r.innerText); })[0]; }
    function prizeAvailable(re){ var b=giftRow(re); if(!b) return false; return !/sold\s*out|out of stock|unavailable/i.test(b.closest('.col-12').innerText); }
    function confetti(){ var cols=[BURG,BLUE,BEIGE,CARAMEL,'#fff']; for(var i=0;i<46;i++){ var c=document.createElement('i'); c.className='ca-conf'; c.style.left=(Math.random()*100)+'vw'; c.style.background=cols[i%cols.length]; c.style.animationDelay=(Math.random()*.6)+'s'; c.style.borderRadius=(i%3?'2px':'50%'); document.body.appendChild(c); (function(c){ setTimeout(function(){ c.remove(); },3600); })(c); } }
    function modal(html, wire, cls){ var m=document.createElement('div'); m.id='ca-gm'; if(cls) m.className=cls; m.innerHTML='<div class="cd" role="dialog" aria-modal="true">'+html+'</div>'; document.body.appendChild(m); function close(){ m.remove(); } if(wire) wire(m, close); return close; }
    /* prize products can only be added by winners */
    var allowPrize=false;
    function guardPrize(){
      var m=$$('.modal-content-wrapper,.ReactModal__Content,.modal.show').filter(function(x){ return x.getClientRects().length && /Lucky Draw -|Christmas Gift -/i.test(x.innerText||''); })[0];
      if(!m) return;
      var add=$$('button',m).filter(function(x){ return /Add to Cart|Lucky draw prize/i.test(x.innerText); })[0];
      if(!add || allowPrize) return;
      if(!add.__caG){ add.__caG=1; add.textContent='Lucky draw prize only 🎁'; add.disabled=true; add.style.opacity='.6';
        add.addEventListener('click',function(e){ if(!allowPrize){ e.preventDefault(); e.stopImmediatePropagation(); } },true); }
    }
    function addPrize(P){
      if(closeOrderlaModal()){ setTimeout(function(){ addPrize(P); setTimeout(function(){ host('Your prize is in the cart 🎁 Tap Cart to continue your order.',6000); },1800); },700); return; }
      var b=giftRow(P.re); if(!b){ host('Hmm, the prize is hiding. Please tell our staff 🙏',5000); return; }
      allowPrize=true; b.click();
      if(P.choose){ D.added=1; dsave(D); setTimeout(function(){ host('Pick your cake, it\'s half price! 🍰',6000); },900); setTimeout(function(){ allowPrize=false; },120000); return; }
      var n=0, iv=setInterval(function(){
        var add=$$('button').filter(function(x){ return /^\s*Add to Cart\s*$/i.test(x.innerText) && x.getClientRects().length; })[0];
        if(add){ clearInterval(iv); add.click(); D.added=1; dsave(D); setTimeout(function(){ allowPrize=false; },1500); setTimeout(function(){ host(P.ok,5000); },600); }
        else if(++n>25){ clearInterval(iv); allowPrize=false; }
      },200);
    }
    function pickPrize(){
      var r=Math.random(), acc=0, k='half';
      for(var p in PRIZE_W){ acc+=PRIZE_W[p]; if(r<acc){ k=p; break; } }
      if(PR[k].code) return k;
      return prizeAvailable(PR[k].re) ? k : 'rm2';   /* sold out = RM2 off instead (everyone wins) */
    }
    function intro(){
      modal('<div class="dg-h"><img alt="" src="'+CA_IMG+'feuille-celebrate.webp"><div><small>CHRISTMAS LUCKY DRAW</small><h3>Flip &amp; match!</h3></div></div>'+
        '<ol class="dg-rules"><li>9 cake coins are hiding face-down.</li><li>Each turn, flip <b>2 coins</b>. No match? They flip back.</li><li>You get <b>3 turns</b> in <b>30 seconds</b>.</li><li>Find <b>2 of the same cake</b> to open your prize!</li><li>Check out within <b>10 minutes</b> to keep it.</li></ol>'+
        '<p class="dg-prz"><b>Everyone wins something this Christmas! 🎄</b><br>🌟 RM20 off · 🎟️ RM2 off · 🍰 next cake 50% off · 🧁 RM6.99 surprise cake · 🍪 free cookie · 🎂 free birthday kit</p>'+
        '<button class="bt go" type="button">Start the game</button><button class="bt o later" type="button">Maybe later</button><p class="dg-fine">One game per phone · while stocks last · until 31 Dec 2026</p>',
        function(m,close){ ev('draw_offer');
          m.querySelector('.go').onclick=function(){ var go=this; if(go.__busy) return;
            if(D.done){ close(); host('This WhatsApp number has already played our Lucky Draw 🎁',6000); return; }
            /* one game per number: if the ledger check hasn't come back yet, wait for it here (max 5s) */
            if(LD_URL && L && L.phone && !D.checked){ go.__busy=1; go.textContent='One moment…';
              checkPlayed(function(){ go.__busy=0; close(); if(D.done){ host('This WhatsApp number has already played our Lucky Draw 🎁',6000); return; } play(); }, 5000); return; }
            close(); play(); };
          m.querySelector('.later').onclick=function(){ close(); ev('draw_later'); D.later=1; dsave(D); showChip(); host('Tap the 🎁 button whenever you\'re ready to play!',5000); }; }, 'dg');
    }
    function showChip(){
      if(document.getElementById('ca-dchip') || D.done) return;
      var c=document.createElement('button'); c.id='ca-dchip'; c.type='button'; c.innerHTML='🎁<span>Lucky draw</span>';
      c.onclick=function(){ c.remove(); intro(); }; document.body.appendChild(c);
    }
    function play(){
      ev('draw_play'); D.started=Date.now(); var win=Math.random()<WIN, prize=win?pickPrize():null; if(!prize) win=false;
      D.win=win; D.prize=prize; dsave(D);
      var TURNS=3, turn=1, inTurn=[], ended=false, busy=false, coinFace={}, used=[];
      /* the turn that wins (if this game wins): turn 2 or 3 most often */
      var r=Math.random(), winTurn= !win ? 0 : (r<.2?1:(r<.6?2:3));
      var pool=FACES.slice().sort(function(){return Math.random()-.5;});
      function fresh(){ var f=pool.filter(function(x){ return used.indexOf(x)<0; })[0]; used.push(f); return f; }
      var cells=''; for(var i=0;i<9;i++) cells+='<button type="button" class="coin" data-i="'+i+'"><span class="in"><span class="bk"><b>CA</b></span><span class="fr"><img alt="" src=""></span></span></button>';
      var close=modal('<div class="dg-top"><span class="tm">⏱ <b>30</b>s</span><span class="fl">Turn <b>1</b> of 3</span></div><div class="dg-grid">'+cells+'</div><p class="dg-msg">Flip 2 coins. Find 2 of the same cake!</p>', function(m){
        var tEl=m.querySelector('.tm b'), fEl=m.querySelector('.fl b'), msg=m.querySelector('.dg-msg'), left=LIMIT;
        var tk=setInterval(function(){ if(ended) return clearInterval(tk); left--; tEl.textContent=left; if(left<=10) m.querySelector('.tm').classList.add('hot'); if(left<=0){ clearInterval(tk); finish(false,'time'); } },1000);
        function faceFor(idx){
          if(coinFace[idx]) return coinFace[idx];          /* a coin keeps its cake */
          var f;
          if(inTurn.length===1 && win && turn>=winTurn) f=coinFace[inTurn[0]];   /* winning turn: 2nd coin matches */
          else f=fresh();                                   /* otherwise always a new cake, so no accidental pair */
          coinFace[idx]=f; return f;
        }
        m.querySelectorAll('.coin').forEach(function(b){ b.onclick=function(){
          var idx=+b.getAttribute('data-i');
          if(ended || busy || b.classList.contains('up')) return;
          var f=faceFor(idx); inTurn.push(idx);
          b.querySelector('img').src=faceImg(f); b.classList.add('up');
          if(inTurn.length===1){ msg.textContent='Now flip one more…'; return; }
          busy=true;
          if(coinFace[inTurn[0]]===coinFace[inTurn[1]]){
            inTurn.forEach(function(k){ m.querySelectorAll('.coin')[k].classList.add('match'); });
            return setTimeout(function(){ finish(true); },800);
          }
          if(turn>=TURNS){ msg.textContent='Not a match…'; return setTimeout(function(){ finish(false,'flips'); },1000); }
          msg.textContent='Not a match! Flipping back…';
          setTimeout(function(){
            if(ended) return;
            inTurn.forEach(function(k){ m.querySelectorAll('.coin')[k].classList.remove('up'); });
            inTurn=[]; turn++; fEl.textContent=turn; busy=false;
            msg.textContent= turn===TURNS ? 'Last turn! Flip 2 coins.' : 'Turn '+turn+'! Flip 2 coins.';
          },1100);
        }; });
        function finish(won, why){
          if(ended) return; ended=true; clearInterval(tk); D.done=1; D.result=won?D.prize:'none'; dsave(D);
          setTimeout(function(){ close(); result(won, why); },1200);
        }
      }, 'dg');
    }
    function result(won, why){
      var chip=document.getElementById('ca-dchip'); if(chip) chip.remove();
      if(!D.prize){ D.prize='rm2'; }
      D.wonAt=Date.now(); dsave(D); ev('draw_prize', D.prize);
      if(L && L.phone) api('draw_win',{phone:L.phone, prize:D.prize, store:location.pathname.replace(/^\//,'')}, function(j){ if(j && j.ok){ D.token=j.token; if(j.already && j.prize!==D.prize){ /* number had already played */ } dsave(D); } });
      var lead= won ? '' : '<p style="margin:0 0 6px!important"><b>'+(why==='time'?'Time\'s up!':'No pair this time…')+'</b> But at Christmas everyone wins! 🎄</p>';
      var P=PR[D.prize]; confetti();
      modal('<div class="big">'+P.big+'</div>'+lead+'<h3>'+P.h+'</h3><p>'+P.p+'</p><p class="dg-fine">⏱ Check out within 10 minutes to keep your prize.</p><button class="bt" type="button">'+(P.choose?'Choose my cake':'Yay! Back to my order')+'</button>', function(m,close){ m.querySelector('.bt').onclick=close; });
      if(P.code){ D.code=P.code; D.v=P.v; dsave(D); return; }
      setTimeout(function(){ addPrize(P); }, P.choose?2200:900);
    }

    /* RM20 off prize: auto-apply the (hidden) code at checkout */
    var applied=false;
    var JC={ rm20:'WUM3S0JXUTlTNkFD', rm2:'N1M5QVZDUE1HTkFD' };
    function jc(k){ try { return atob(JC[k||(D&&D.code==='rm2'?'rm2':'rm20')]).split('').reverse().join(''); } catch(e){ return ''; } }
    function maskCode(){ /* show "LUCKYDRAW" instead of the real code on the page */
      [jc('rm20'),jc('rm2')].forEach(function(c){ if(!c) return; var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null), n;
      while((n=w.nextNode())){ if(n.nodeValue.indexOf(c)>=0) n.nodeValue=n.nodeValue.split(c).join('LUCKYDRAW'); }
      $$('input').forEach(function(i){ if(i.value===c) i.style.color='transparent'; }); });
    }
    function checkout(){
      maskCode();
      if(!D || !D.code || D.expired) return;
      var inp=$('input.text-monospace'); var sum=document.body.innerText||'';
      var dl=sum.match(/Discount:\s*([A-Z0-9]+)\s*RM\s*-?([\d.]+)/i);
      var note=document.getElementById('ca-gnote');
      var anchor=inp? (inp.closest('.input-group')||inp.parentNode) : null;
      function placeNote(msg){
        if(!msg){ if(note) note.remove(); return; }
        if(!note){ note=document.createElement('div'); note.id='ca-gnote'; var host2=$$('div').filter(function(d){ var t=(d.innerText||'').trim(); return /^Date & Time Slot/.test(t) && t.length<90; }).pop(); var tgt=host2||anchor; if(!tgt) return; tgt.parentNode.insertBefore(note, tgt.nextSibling); }
        note.textContent=msg; if(!document.body.contains(note)) note=null;
      }
      if(dl){
        var code=dl[1].toUpperCase(), amt=parseFloat(dl[2]);
        var mine = code==='LUCKYDRAW' || code===jc();
        var msg = mine ? '🌟 Your Lucky Draw RM'+D.v+' off is applied. Joyeux Noël!'
                : (amt>=D.v ? '🌟 Your '+code+' saves you more (RM'+amt.toFixed(2)+'), so we kept it instead of your RM'+D.v+' Lucky Draw prize.' : '');
        if(!mine && amt<D.v && inp && !applied){ applied=true; useCode(inp, jc()); }
        placeNote(msg); return;
      }
      if(inp && !applied && inp.getClientRects().length){
        if(cartTotal()!==null && cartTotal()<DMIN){ placeNote('🌟 Your Lucky Draw RM'+D.v+' off needs a cart of RM'+DMIN+' or more.'); return; }
        if((inp.value||'').trim()) return;
        applied=true; useCode(inp, jc());
      }
    }
    function useCode(inp, code){
      var set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; inp.style.color='transparent'; set.call(inp, code); inp.dispatchEvent(new Event('input',{bubbles:true}));
      setTimeout(function(){ var r=$$('button').filter(function(b){ return /^\s*Redeem\s*$/.test(b.innerText); })[0]; if(r) r.click(); },250);
    }

    /* 10-minute hold: countdown chip; after that the prize is dropped */
    var expTold=false;
    /* prize follows the cart: below RM150 (without the prize) it is taken out, back at RM150 it returns */
    var PV={half:14.45, petit:6.99, cookie:0, kit:0};
    function cartSub(){ var m=(document.body.innerText||'').match(/Subtotal\s*RM\s*([\d,]+\.\d{2})/); if(m && $$('tr').some(function(r){ return r.querySelector('[class*="btn-minus-selection"]') && r.getClientRects().length; })) return parseFloat(m[1].replace(/,/g,'')); return cartTotal(); }
    function prizeRows(){ return $$('tr').filter(function(r){ return /Christmas Lucky Draw - /.test(r.innerText||'') && r.querySelector('[class*="btn-minus-selection"]') && r.getClientRects().length; }); }
    function dropRows(){ prizeRows().forEach(function(r){ var minus=r.querySelector('[class*="btn-minus-selection"]');
      if(minus && !minus.__caX){ minus.__caX=1; minus.click(); setTimeout(function(){ var ok=$$('.alerty-action .btn-ok').filter(function(b){ return b.getClientRects().length && /Remove/i.test(b.textContent); })[0]; if(ok) ok.click(); },350); setTimeout(function(){ minus.__caX=0; },1500); } }); }
    var follow=0;
    function visModal(){ return $$('.modal-content-wrapper,.ReactModal__Content,#ca-gm,#ca-lead').some(function(x){ return x.getClientRects().length && x.offsetHeight>0 && !x.querySelector('[class*="btn-minus-selection"]'); }); }   /* the cart itself doesn't count */
    function followCart(){
      var P=PR[D.prize]; if(!P || P.code || D.expired) return;
      var tot=cartSub(); if(tot===null) return;
      var base=tot-(D.added && !D.paused ? (PV[D.prize]||0) : 0);
      if(base<DMIN && D.added && !D.paused){
        if(prizeRows().length){ dropRows(); D.paused=1; dsave(D); ev('gift_hold', D.prize); host('Your Lucky Draw gift is on hold 🎁 Add back to RM'+DMIN+' and it comes right back!',6000); }
      } else if(base>=DMIN && D.paused && !visModal() && Date.now()-follow>8000){
        follow=Date.now(); D.paused=0; dsave(D); ev('gift_back', D.prize); host('Welcome back! Your Lucky Draw gift is back in the cart 🎁',5000); setTimeout(function(){ addPrize(P); },600);
      }
    }
    function hold(){
      if(!D.wonAt || D.ordered) return;
      try{ followCart(); }catch(e){}
      var left=(D.holdUntil||D.wonAt+HOLD)-Date.now(), chip=document.getElementById('ca-hold');
      if(left>0 && !D.expired){
        if(!chip){ chip=document.createElement('div'); chip.id='ca-hold'; document.body.appendChild(chip); chip.onclick=function(){ if(D.prize==='half' && !D.paused && !D.expired) addPrize(PR.half); }; }
        var hh=Math.floor(left/3600000), mm=Math.floor(left%3600000/60000), ss=Math.floor(left%60000/1000); if(hh) mm=hh+':'+(mm<10?'0':'')+mm;
        chip.innerHTML = D.paused ? '🎁 Gift on hold · add back to <b>RM'+DMIN+'</b> to get it' : '🎁 Prize held <b>'+mm+':'+(ss<10?'0':'')+ss+'</b> · check out to keep it'+(D.prize==='half'?' · <u>pick cake</u>':'');
        chip.classList.toggle('hot', left<120000);
        return;
      }
      if(chip) chip.remove();
      if(!D.expired){ D.expired=1; dsave(D); ev('gift_expired', D.prize); }
      if(!expTold){ expTold=true; host('Your Lucky Draw prize has expired ⏱ (10 minutes are up).',6000); }
      /* take prize items out of the cart when the cart is open */
      $$('tr').filter(function(r){ return /Christmas Lucky Draw - /.test(r.innerText||'') && r.querySelector('[class*="btn-minus-selection"]'); }).forEach(function(r){
        var minus=r.querySelector('[class*="btn-minus-selection"]');
        if(minus && !minus.__caX){ minus.__caX=1; minus.click();
          setTimeout(function(){ var ok=$$('.alerty-action .btn-ok').filter(function(b){ return b.getClientRects().length && /Remove/i.test(b.textContent); })[0]; if(ok) ok.click(); },350);
          setTimeout(function(){ minus.__caX=0; },1500); }
      });
    }
    /* ---------- Cart leads: ask for WhatsApp number at first Add to Cart ---------- */
    var LKEY='caLead26', LD_URL='https://script.google.com/macros/s/AKfycbyWs6BRVmARBdM8DlsgDh_8X-fdg6MD_l0EYsNl8ONPaR4XFEbLBzjBpI0aHR7c55CVew/exec';   /* LD_URL: CA Lucky Draw Ledger web app (empty = keep on the phone only) */
    function api(action, q, cb){
      if(!LD_URL){ if(cb) cb(null); return; }
      var u=LD_URL+'?action='+action; for(var k in q) u+='&'+k+'='+encodeURIComponent(q[k]==null?'':q[k]);
      fetch(u).then(function(r){ return r.json(); }).then(function(j){ if(cb) cb(j); }).catch(function(){ if(cb) cb(null); });
    }
    function lload(){ try { return JSON.parse(localStorage.getItem(LKEY)||'null'); } catch(e){ return null; } }
    function lsave(v){ try { localStorage.setItem(LKEY, JSON.stringify(v)); } catch(e){} }
    var L=lload();
    /* Malaysia (+60, 01x…) or Singapore (+65, 8 digits starting 3/6/8/9) → 60XXXXXXXXX / 65XXXXXXXX */
    function normPhone(v, cc){ var d=(v||'').replace(/\D/g,'');
      if(cc==='65' || (!cc && /^65[3689]\d{7}$/.test(d))){ if(d.indexOf('65')===0 && d.length===10) d=d.slice(2); return /^[3689]\d{7}$/.test(d) ? '65'+d : ''; }
      if(d.indexOf('60')===0) d=d.slice(2); if(d.indexOf('0')===0) d=d.slice(1); return /^1\d{8,9}$/.test(d) ? '60'+d : ''; }
    function isSG(p){ return String(p||'').indexOf('65')===0; }
    function cartItems(){ /* names in the cart bar's cart view when open, else last known */ var rows=$$('tr').filter(function(r){ return r.querySelector('[class*="btn-minus-selection"]'); }); return rows.map(function(r){ var n=r.querySelector('strong'); var q=(r.innerText.match(/^\s*-\s*\n?\s*(\d+)/)||[])[1]; return (q?q+' x ':'')+(n?n.textContent.trim():''); }).filter(Boolean); }
    var lastSent='';
    function sendLead(stage){
      if(!L || !L.phone) return;
      var tot=cartTotal(), items=cartItems(); if(items.length) L.items=items; if(tot!==null) L.total=tot; L.stage=stage||L.stage||'cart'; L.ts=Date.now(); L.store=location.pathname.replace(/^\//,''); lsave(L);
      var sig=[L.total,(L.items||[]).join('|'),L.stage,!!L.ordered].join('#'); if(sig===lastSent) return; lastSent=sig;
      api('cart_lead_v1',{phone:L.phone, name:L.name||'', store:L.store, total:L.total||0, items:(L.items||[]).slice(0,30).join(' | '), stage:L.stage, ordered:L.ordered?1:0});
    }
    function askLead(then){
      if(document.getElementById('ca-lead')) return;
      var m=document.createElement('div'); m.id='ca-lead';
      m.innerHTML='<div class="cd" role="dialog" aria-modal="true"><img alt="" src="'+CA_IMG+'feuille-hello.webp"><h3>Your WhatsApp number</h3><p>Please fill in your WhatsApp number. <b>We\'ll use this number to confirm your order.</b></p>'+
        '<label>Name <input class="nm" type="text" autocomplete="name" placeholder="Your name"></label>'+
        '<label>WhatsApp number <span class="ph"><select class="cc" aria-label="Country code"><option value="60">🇲🇾 +60</option><option value="65">🇸🇬 +65</option></select><input class="tel" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="12 345 6789"></span></label>'+
        '<p class="err" hidden>Please enter a mobile number: Malaysia e.g. 012 345 6789, Singapore e.g. 8123 4567.</p>'+
        '<button class="bt go" type="button">Continue</button>'+
        '<p class="fine">We only WhatsApp you about your order (and once if you leave cakes in your cart). Reply STOP anytime.</p></div>';
      document.body.appendChild(m);
      var tel=m.querySelector('.tel'), nm=m.querySelector('.nm'), err=m.querySelector('.err'), cc=m.querySelector('.cc');
      cc.onchange=function(){ tel.placeholder = cc.value==='65' ? '8123 4567' : '12 345 6789'; err.hidden=true; };
      if(L && L.phone){ if(isSG(L.phone)) cc.value='65'; cc.onchange(); tel.value=L.phone.slice(2); nm.value=L.name||''; }
      setTimeout(function(){ (nm.value?tel:nm).focus(); },200);
      function go(){ var p=normPhone(tel.value, cc.value); if(!p){ err.hidden=false; tel.focus(); return; }
        L={phone:p, name:(nm.value||'').trim().slice(0,60), at:Date.now()}; lsave(L); ev('lead', whoTag()); m.remove(); sendLead('start'); checkPlayed(); if(then) setTimeout(then,60); }
      m.querySelector('.go').onclick=go; tel.onkeydown=function(e){ if(e.key==='Enter') go(); };
    }

    /* one game per WhatsApp number (ledger) */
    function restoreWin(j, msg){
      var P=PR[j.prize]; if(!P) return;
      D={offered:1, done:1, win:true, prize:j.prize, result:j.prize, wonAt:Date.now(), holdUntil:j.hold_until, token:j.token||''};
      if(P.code){ D.code=P.code; D.v=P.v; } else { D.added=1; D.paused=1; }
      dsave(D); if(msg) host(msg,7000);
    }
    function checkPlayed(cb, wait){
      var fired=false; function fin(){ if(fired) return; fired=true; if(cb) cb(); }
      if(!L || !L.phone || !LD_URL){ fin(); return; }
      if(cb && wait) setTimeout(function(){ if(!fired){ D=D||{}; D.checked=1; dsave(D); fin(); } }, wait);   /* ledger slow: let them play (the ledger still keeps one game per number) */
      api('draw_check',{phone:L.phone}, function(j){
        if(fired && cb) return;
        if(!j || !j.ok || !j.played) { D=D||{}; D.checked=1; dsave(D); fin(); return; }
        if(j.status==='won' && j.hold_until>Date.now()){ if(!D || !D.done) restoreWin(j,'Welcome back! Your Lucky Draw gift is saved for you 🎁'); }
        else { D={offered:1, done:1, result:'played', expired:1, checked:1}; dsave(D); }
        fin();
      });
    }
    /* reopen link from WhatsApp: ?ld=token */
    (function(){ var m=location.search.match(/[?&]ld=([a-f0-9]{12})/); if(!m) return;
      var tries=0, iv=setInterval(function(){ if(!LD_URL && ++tries<20) return; clearInterval(iv);
        api('lead_get',{t:m[1]}, function(j){
          if(!j || !j.ok) return;
          L={phone:j.phone, name:j.name||'', at:Date.now()}; lsave(L);
          if(j.status==='won' && j.hold_until>Date.now()) restoreWin(j,'Welcome back! Your Lucky Draw gift ('+((PR[j.prize]||{}).h||'gift').replace(/!$/,'')+') is saved for you. Add RM'+DMIN+' of cakes to use it 🎁');
          else host('Welcome back! This Lucky Draw gift has expired, but our cakes are still here 🍰',6000);
        }); },300);
    })();
    var leadBypass=false;
    document.addEventListener('click', function(e){
      var b=e.target.closest && e.target.closest('a.form-add-item-btn'); if(!b || leadBypass) return;
      if(L && L.phone) return;
      if(/Lucky Draw -/.test((b.closest('.col-12')||{}).innerText||'')) return;
      e.preventDefault(); e.stopImmediatePropagation();
      askLead(function(){ leadBypass=true; b.click(); setTimeout(function(){ leadBypass=false; },300); });
    }, true);
    document.addEventListener('click', function(e){
      var b=e.target.closest && e.target.closest('.modal-content-wrapper button, .cart-product-modal-footer button'); if(!b || leadBypass || (L && L.phone)) return;
      if(!/Add to Cart/i.test(b.innerText||'')) return;
      e.preventDefault(); e.stopImmediatePropagation();
      askLead(function(){ leadBypass=true; b.click(); setTimeout(function(){ leadBypass=false; },300); });
    }, true);
    /* fill the number into Orderla's Customer Details, follow the cart, mark ordered */
    function leadTick(){
      if(!L || !L.phone) return;
      var ph=$$('input[type="tel"]').filter(function(i){ return i.getClientRects().length && !i.closest('#ca-lead'); })[0];
      var setv=function(el,v){ var set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; set.call(el,v); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); };
      if(ph && !ph.__caF){ ph.__caF=1; var sg=isSG(L.phone), want=sg ? L.phone.slice(2) : '0'+L.phone.slice(2);
        if(sg){ var cs=$$('select',(ph.closest('.input-group,.form-group,div')||document)).concat($$('select',(ph.closest('form')||document)))[0];
          if(cs){ var op=[].filter.call(cs.options,function(o){ return /(^|\D)65(\D|$)|singapore/i.test(o.value+' '+o.text); })[0]; if(op && cs.value!==op.value){ var sset=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set; sset.call(cs,op.value); cs.dispatchEvent(new Event('change',{bubbles:true})); } } }
        if(ph.value.replace(/\D/g,'')!==want) setv(ph,want);
        ph.addEventListener('change',function(){ var n=normPhone(ph.value, sg ? '65' : ''); if(n && n!==L.phone){ L.phone=n; lsave(L); lastSent=''; sendLead('details'); } }); }
      if(ph && L.name){ var box=ph.closest('form')||document; var nm=$$('input[type="text"]',box).filter(function(i){ return i.getClientRects().length && !i.closest('#ca-lead') && /name/i.test(((i.closest('div')||{}).parentElement||{}).innerText||''); })[0];
        if(nm && !nm.__caF){ nm.__caF=1; if((nm.value||'').trim().toLowerCase()!==L.name.toLowerCase()) setv(nm,L.name);
          nm.addEventListener('change',function(){ var v=(nm.value||'').trim(); if(v && v!==L.name){ L.name=v.slice(0,60); lsave(L); lastSent=''; sendLead('details'); } }); } }
      var stage = /Order Summary/.test(document.body.innerText||'') && $('input.text-monospace') ? 'summary' : (/Customer Details/.test(document.body.innerText||'') && ph ? 'details' : 'cart');
      sendLead(stage);
    }
    document.addEventListener('click', function(e){
      var b=e.target.closest && e.target.closest('button,a,[role="button"],input[type="submit"],input[type="button"],label'); if(!b || !L || !L.phone) return;
      if(/Order via WhatsApp|Place Order|Pay Now|Proceed to Pay|Confirm Order/i.test((b.innerText||b.value||b.getAttribute('aria-label')||'').trim())){ L.ordered=1; L.orderedAt=Date.now(); lsave(L); sendLead('ordered'); }
    }, true);

    /* ---------- checkout add-ons as a swipe row of pictures ("Usually goes with") ---------- */
    function prodImg(name){
      var rows=$$('.col-12').filter(function(r){ var t=(r.querySelector('.ca-rt span,strong,h5,h6')||r).textContent||''; return t.trim().toLowerCase()===name.toLowerCase() || (r.innerText||'').split('\n')[0].trim().toLowerCase()===name.toLowerCase(); });
      var im=rows.length && rows[0].querySelector('img'); return im ? (im.currentSrc||im.src) : '';
    }
    function upsellRow(){
      var up=document.getElementById('orderla-cart-upsell'); if(!up) return;
      var key=up.getAttribute('data-offers')||''; if(up.__caKey===key && up.querySelector('.ca-up')) return;
      var btns=$$('[data-orderla-upsell]',up); if(!btns.length) return;
      var cards='';
      btns.forEach(function(b){
        var name=b.getAttribute('data-orderla-upsell'), price=b.getAttribute('data-p') || ((b.innerText||'').match(/RM\s*[\d.]+/)||[''])[0], img=b.getAttribute('data-i') || prodImg(name);
        cards+='<button type="button" class="ca-upc" data-p="'+price+'" data-i="'+img+'" data-orderla-upsell="'+name.replace(/"/g,'&quot;')+'"><span class="ph">'+(img?'<img alt="" src="'+img+'">':'<b>🎁</b>')+'</span><span class="nm">'+name+'</span><span class="pr">'+price+'</span><span class="ad">+ Add</span></button>';
      });
      up.__caKey=key;
      up.innerHTML='<div class="ca-up"><div class="hd">Usually goes with</div><button type="button" class="nav l" aria-label="Back" hidden>‹</button><div class="ca-uprow">'+cards+'</div><button type="button" class="nav r" aria-label="More">›</button><div class="sw">Swipe or tap › to see more</div></div>';
      var row=up.querySelector('.ca-uprow'), nl=up.querySelector('.nav.l'), nr=up.querySelector('.nav.r');
      function navs(){ var max=row.scrollWidth-row.clientWidth-2; nl.hidden=row.scrollLeft<=2; nr.hidden=row.scrollLeft>=max; if(max<=0){ nl.hidden=nr.hidden=true; up.querySelector('.sw').hidden=true; } }
      function step(d){ row.scrollTo({left:row.scrollLeft+d*Math.max(120,row.clientWidth*0.8),behavior:'smooth'}); }
      nl.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); step(-1); });
      nr.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); step(1); });
      row.addEventListener('scroll',navs,{passive:true}); setTimeout(navs,50); setTimeout(navs,600);
      /* own finger-drag, in case the cart popup blocks the browser's sideways swipe */
      var sx=0, sy=0, sl=0, drag=false, moved=false;
      row.addEventListener('touchstart',function(e){ var t=e.touches[0]; sx=t.clientX; sy=t.clientY; sl=row.scrollLeft; drag=false; moved=false; },{passive:true});
      row.addEventListener('touchmove',function(e){ var t=e.touches[0], dx=t.clientX-sx, dy=t.clientY-sy;
        if(!drag && Math.abs(dx)>8 && Math.abs(dx)>Math.abs(dy)) drag=true;
        if(drag){ moved=true; row.scrollLeft=sl-dx; e.preventDefault(); e.stopPropagation(); } },{passive:false});
      row.addEventListener('touchend',function(){ if(drag) setTimeout(navs,30); drag=false; },{passive:true});
      row.addEventListener('click',function(e){ if(moved){ moved=false; e.preventDefault(); e.stopPropagation(); } },true);
    }

    /* ---------- visit analytics → ledger (Events tab) ---------- */
    var EVQ=[], EVK='caVid26';
    var VID=(function(){ try { var v=localStorage.getItem(EVK); if(v) return {id:v, isNew:false}; v=Math.random().toString(36).slice(2,12); localStorage.setItem(EVK,v); return {id:v, isNew:true}; } catch(e){ return {id:'x', isNew:false}; } })();
    var SID=(function(){ try { var o=JSON.parse(sessionStorage.getItem('caSid26')||'null'); if(o && Date.now()-o.t<30*60000){ o.t=Date.now(); sessionStorage.setItem('caSid26',JSON.stringify(o)); return o.id; } var id=Math.random().toString(36).slice(2,12); sessionStorage.setItem('caSid26',JSON.stringify({id:id,t:Date.now()})); return id; } catch(e){ return 'x'; } })();
    function evSource(){
      var ua=navigator.userAgent||'', r=document.referrer||'', q=location.search;
      var u=(q.match(/[?&]utm_source=([^&]+)/)||[])[1]; if(u) return decodeURIComponent(u).toLowerCase().slice(0,20);
      if(/[?&]ld=/.test(q)) return 'whatsapp-reminder';
      if(/Instagram/i.test(ua)) return 'instagram'; if(/FBAN|FBAV|FB_IAB/i.test(ua)) return 'facebook'; if(/WhatsApp/i.test(ua)) return 'whatsapp'; if(/TikTok|musical_ly|BytedanceWebview/i.test(ua)) return 'tiktok';
      if(/google\./i.test(r)) return 'google'; if(/instagram\./i.test(r)) return 'instagram'; if(/facebook\.|fb\.me/i.test(r)) return 'facebook'; if(/wa\.me|whatsapp/i.test(r)) return 'whatsapp'; if(/chaleurpatisserie\.com/i.test(r)) return 'website';
      if(r && !/orderla\.my/i.test(r)) return 'other'; return 'direct';
    }
    var EVSRC=(function(){ try { var s0=sessionStorage.getItem('caSrc26'); if(s0) return s0; var s1=evSource(); sessionStorage.setItem('caSrc26',s1); return s1; } catch(e){ return evSource(); } })();
    var EVDEV=/Mobi|Android|iPhone/i.test(navigator.userAgent)?'mobile':(/iPad|Tablet/i.test(navigator.userAgent)?'tablet':'desktop');
    function ev(k,i,v){ EVQ.push({t:Date.now(),k:k,i:(i||'').toString().slice(0,90),v:v||''}); if(EVQ.length>=25) evFlush(); }
    function evFlush(){
      if(!EVQ.length || !LD_URL) return; var b=JSON.stringify({action:'ev', vid:VID.id, sid:SID, store:location.pathname.replace(/^\//,'').slice(0,60), dev:EVDEV, src:EVSRC, isNew:VID.isNew, events:EVQ.splice(0,60)});
      try { if(!(navigator.sendBeacon && navigator.sendBeacon(LD_URL, new Blob([b],{type:'text/plain'})))) fetch(LD_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:b,keepalive:true}); } catch(e){}
    }
    setInterval(evFlush, 15000);
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') evFlush(); });
    window.addEventListener('pagehide', evFlush);
    ev('view', document.title||'');
    /* what customers tap */
    /* stay time + scroll depth: active seconds sent each minute and when the page is hidden */
    var evAct=0, evLastAct=Date.now(), evMaxSc=0, evSentSc=0;
    ['click','touchstart','scroll','keydown','mousemove'].forEach(function(n){ window.addEventListener(n, function(){ evLastAct=Date.now(); if(n==='scroll'){ var h=document.documentElement; var p=Math.round(((h.scrollTop||window.scrollY)+innerHeight)/Math.max(1,h.scrollHeight)*100); if(p>evMaxSc) evMaxSc=Math.min(100,p); } }, {passive:true, capture:true}); });
    setInterval(function(){ if(document.visibilityState==='visible' && Date.now()-evLastAct<120000) evAct+=5; }, 5000);
    function evStay(){ if(evAct>0){ ev('stay','',evAct); evAct=0; } if(evMaxSc>evSentSc){ ev('scroll','',evMaxSc); evSentSc=evMaxSc; } }
    setInterval(evStay, 60000);
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden'){ evStay(); evFlush(); } });
    window.addEventListener('pagehide', function(){ evStay(); evFlush(); });
    /* rough area from the connection (city level), once per visit; no GPS prompt, IP not kept */
    (function(){ try { if(sessionStorage.getItem('caGeo26')) return; sessionStorage.setItem('caGeo26','1'); } catch(e){ return; }
      fetch('https://get.geojs.io/v1/ip/geo.json').then(function(r){ return r.json(); }).then(function(g){
        if(!g) return; var la=Math.round(parseFloat(g.latitude)*10)/10, lo=Math.round(parseFloat(g.longitude)*10)/10;
        ev('geo', [g.city||'', g.region||'', g.country_code||'', isNaN(la)?'':la, isNaN(lo)?'':lo].join('|')); evFlush();
      }).catch(function(){}); })();
    /* which phone/app, and who (name + WhatsApp number, only after they fill in the popup) so return visits are recognised */
    function whoTag(){ return L && L.phone ? (((L.name||'').trim()||'Customer').slice(0,40)+'|'+String(L.phone).replace(/\D/g,'')) : ''; }
    (function(){ try { if(sessionStorage.getItem('caDev26')) return; sessionStorage.setItem('caDev26','1'); } catch(e){ return; }
      var u=navigator.userAgent||'';
      var os=/iPhone/.test(u)?'iPhone':/iPad/.test(u)?'iPad':/Android/.test(u)?(((u.match(/Android[^;)]*;\s*([^;)]+?)(?:\s+Build|[;)])/)||[])[1]||'').replace(/^K$/,'')||'Android'):/Windows/.test(u)?'Windows PC':/Macintosh|Mac OS X/.test(u)?'Mac':'Other';
      if(/Android/.test(u) && os!=='Android') os='Android '+os;
      var br=/Instagram/.test(u)?'Instagram app':/FBAN|FBAV|FB_IAB/.test(u)?'Facebook app':/TikTok|musical_ly|Bytedance/i.test(u)?'TikTok app':/WhatsApp/.test(u)?'WhatsApp':/Edg\//.test(u)?'Edge':/SamsungBrowser/.test(u)?'Samsung browser':/CriOS|Chrome/.test(u)?'Chrome':/Safari/.test(u)?'Safari':/Firefox|FxiOS/.test(u)?'Firefox':'Browser';
      ev('device', os+' · '+br); var w=whoTag(); if(w) ev('who', w); })();
    /* delivery postcode typed at checkout (only the 5 digits are kept, never the address) */
    var evPc='';
    document.addEventListener('change', function(e){
      var t=e.target; if(!t || !/^(INPUT|TEXTAREA)$/.test(t.tagName) || t.type==='tel') return;
      var hint=((t.name||'')+' '+(t.placeholder||'')+' '+(t.id||'')+' '+((t.closest('.form-group,div')||{}).innerText||'').slice(0,80)).toLowerCase();
      if(!/address|postcode|post code|poskod|alamat|zip/.test(hint)) return;
      var m=(t.value||'').match(/(^|\D)([0-9]{5})(?!\d)/); if(m && m[2]!==evPc){ evPc=m[2]; ev('postcode', m[2]); evFlush(); }
    }, true);
    /* every tap on something clickable */
    document.addEventListener('click', function(e){
      var t=e.target; if(!t.closest) return;
      var c=t.closest('button,a,[role="button"],.ca-upc,label,input[type="radio"],input[type="checkbox"],select');
      if(c && !c.closest('#ca-lead')){ var lb=(c.getAttribute('aria-label')||c.innerText||c.value||c.title||'').replace(/\s+/g,' ').trim().slice(0,40); if(!lb && c.querySelector && c.querySelector('img')) lb=(c.querySelector('img').alt||'image').slice(0,40); ev('tap', lb||c.tagName.toLowerCase()); }
    }, true);
    document.addEventListener('click', function(e){
      var t=e.target; if(!t.closest) return;
      var a=t.closest('a.form-add-item-btn'); if(a){ var row=a.closest('.col-12'); var nm=row && ((row.querySelector('.ca-rt span')||{}).textContent || (row.innerText||'').split('\n')[0]); if(!/Lucky Draw -/.test(nm||'')) ev('open', (nm||'').trim()); return; }
      var ob=t.closest('button,a,[role="button"],input[type="submit"],input[type="button"],label');
      if(ob && /Order via WhatsApp|Place Order|Pay Now|Proceed to Pay|Confirm Order/i.test((ob.innerText||ob.value||ob.getAttribute('aria-label')||'').trim())){ var tot=cartTotal(); if(tot===null){ var mt=(document.body.innerText||'').match(/Total\s*RM\s*([\d,]+\.?\d*)/i); if(mt) tot=parseFloat(mt[1].replace(/,/g,'')); } ev('order', '', tot||''); evFlush(); return; }
      var b=t.closest('button'); if(!b) return;
      var up=b.closest('[data-orderla-upsell]'); if(up){ ev('upsell', up.getAttribute('data-orderla-upsell')); return; }
      var txt=(b.innerText||'').trim();
      if(/^Add to Cart$/i.test(txt)){ var w=b.closest('.modal-content-wrapper'); var h=w && w.querySelector('h1,h2,h3,h4,h5,.product-name,strong'); var nm2=w ? ((w.innerText||'').split('\n').filter(function(x){ return x.trim() && !/^(BUILD YOUR OWN|CHALEUR|RM|LIMIT)/i.test(x.trim()); })[0]||'') : ''; var pr=((w&&w.querySelector('.cart-product-modal-footer'))||{}).innerText||''; var amt=(pr.match(/RM\s*([\d,.]+)/)||[])[1]; ev('add', nm2.trim(), amt?parseFloat(amt.replace(/,/g,'')):''); return; }
    }, true);
    var evStage='';
    function evTick(){
      var bt=document.body.innerText||'', st='';
      if($('input.text-monospace') && /Order Summary/.test(bt)) st='summary'; else if($('input[type="tel"]') && /Customer Details/.test(bt)) st='details'; else if($$('tr').some(function(r){ return r.querySelector('[class*="btn-minus-selection"]') && r.getClientRects().length; })) st='cart';
      if(st && st!==evStage){ evStage=st; ev(st,'',cartTotal()||''); } else if(!st) evStage='';
    }
    var teased=false, lastTot=null, checking=false;
    /* the game may open over the cart / checkout window, but not over a product being added or our own popups */
    function gameCanOpen(){
      if(document.getElementById('ca-gm') || document.getElementById('ca-lead')) return false;
      var m=$$('.ReactModal__Content,.modal.show,.modal-content-wrapper').filter(function(x){ return x.getClientRects().length; });
      return !m.some(function(x){ return x.querySelector('.ca-bx') || $$('button',x).some(function(b){ return /^\s*Add to Cart\s*$/i.test(b.innerText) && b.getClientRects().length; }); });
    }
    /* close Orderla's cart / checkout window (so the prize can be added on the main page) */
    function closeOrderlaModal(){
      var m=$$('.ReactModal__Content').filter(function(x){ return x.getClientRects().length; })[0]; if(!m) return false;
      var x=$$('button,a,[role="button"]',m).filter(function(b){ return b.getClientRects().length && (/close|dismiss/i.test((b.getAttribute('aria-label')||'')+' '+b.className) || /^\s*[×✕xX]\s*$/.test(b.innerText||'')); })[0];
      if(x){ x.click(); return true; }
      var ov=document.querySelector('.ReactModal__Overlay'); if(ov){ ov.dispatchEvent(new MouseEvent('mousedown',{bubbles:true})); ov.click(); return true; }
      return false;
    }
    function draw(){
      if(Date.now()>GIFT_END) return;
      hideGift(); guardPrize();
      if(!D) D={};
      if(D.done){ try{ hold(); }catch(e){} try{ checkout(); }catch(e){} return; }
      /* check early (as soon as we know the number) so the game is ready the moment the cart reaches RM150 */
      if(LD_URL && L && L.phone && !D.checked && !checking){ checking=true; checkPlayed(); setTimeout(function(){ checking=false; },8000); }
      var tot=cartTotal(); if(tot===null) return;
      if(tot>=DMIN){
        var onSummary=!!$('input.text-monospace') && /Order Summary/.test(document.body.innerText||'');
        if(!D.offered && gameCanOpen()){ D.offered=1; dsave(D); intro(); }
        else if(D.offered && !D.lastCall && onSummary && !document.getElementById('ca-gm') && gameCanOpen()){ D.lastCall=1; dsave(D); ev('draw_last'); var c0=document.getElementById('ca-dchip'); if(c0) c0.remove(); intro(); }   /* last call before paying */
        else if(D.offered && !document.getElementById('ca-gm')) showChip();
      } else {
        var c=document.getElementById('ca-dchip'); if(c) c.remove();
        if(lastTot!==null && tot>lastTot && tot>0 && !teased && !popupOpen()){ teased=true; setTimeout(function(){ host('RM'+(DMIN-tot).toFixed(2)+' more and you unlock our Christmas Lucky Draw 🎁',5500); },3800); }
      }
      lastTot=tot;
    }

    /* ---------- Build Your Own Box: auto-upgrade 3 → 4 → 6 → 9 → new box of 3 ---------- */
    var NEXT={3:4,4:6,6:9};
    function openBox(n, cb){
      var b=$$('a.form-add-item-btn').filter(function(x){ var r=x.closest('.col-12'); return r && new RegExp('Build Your Own Box of '+n+'\\b').test(r.innerText); })[0];
      if(!b) return; b.click();
      var k=0, iv=setInterval(function(){ var ui=$$('.modal-content-wrapper .ca-bx').filter(function(u){ return u.getClientRects().length && u.__N===n; })[0]; if(ui){ clearInterval(iv); setTimeout(function(){ cb(ui); },250); } else if(++k>40) clearInterval(iv); },150);
    }
    function closeProductPopup(){
      var w=$$('.modal-content-wrapper').filter(function(x){ return x.getClientRects().length; })[0]; if(!w) return;
      var x=$$('button,div,span,a',w.parentElement).filter(function(e){ var r=e.getBoundingClientRect(); return e.getClientRects().length && r.width<56 && r.width>14 && /close|×|✕/i.test((e.getAttribute('aria-label')||'')+' '+String(e.className)+' '+(e.innerText||'')); })[0];
      if(x) x.click(); else document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
    }
    function addPicks(ui, names, i){
      if(i>=names.length){ try{ ui.__say && ui.__say('Your box just got bigger! 🎉 Keep going!','celebrate'); }catch(e){} return; }
      var pk=$$('.pk',ui).filter(function(b){ return (b.getAttribute('aria-label')||'')==='Add '+names[i]; })[0];
      if(pk) pk.click(); setTimeout(function(){ addPicks(ui,names,i+1); },170);
    }
    window.__caBoxUp=function(N, picks, extra){
      try{ ev('box_up', N+'>'+(N<9?NEXT[N]:'new3')); }catch(e){}
      if(window.__caBoxBusy) return; window.__caBoxBusy=true; setTimeout(function(){ window.__caBoxBusy=false; },6000);
      if(N<9){
        var M=NEXT[N]; closeProductPopup();
        setTimeout(function(){ openBox(M, function(ui){ addPicks(ui, picks.concat([extra]), 0); window.__caBoxBusy=false; }); },450);
      } else {
        var add=$$('.modal-content-wrapper button').filter(function(x){ return /^\s*Add to Cart\s*$/i.test(x.innerText) && x.getClientRects().length; })[0];
        if(add) add.click();
        setTimeout(function(){ host('Box of 9 is in your cart! Starting a new box for you 🎁',5000); openBox(3, function(ui){ addPicks(ui, [extra], 0); window.__caBoxBusy=false; }); },900);
      }
    };

    function tick(){
      try { buildMenu(); } catch(e){}
      try { bigBoxes(); } catch(e){}
      try { garden(); } catch(e){}
      try { draw(); } catch(e){} try { leadTick(); } catch(e){} try { upsellRow(); } catch(e){} try { evTick(); } catch(e){}
      try { popupIntro(); } catch(e){}
    }
    setInterval(tick, 500); tick();
    window.addEventListener('scroll', function(){ try { garden(); } catch(e){} }, {passive:true});
    window.__caDraw = { reset:function(){ try{ localStorage.removeItem(DKEY); }catch(e){} D={}; var c=document.getElementById('ca-dchip'); if(c) c.remove(); }, state:function(){ return D; }, intro:function(){ intro(); } };
  } catch(e) { /* never break the order form */ }
})();
