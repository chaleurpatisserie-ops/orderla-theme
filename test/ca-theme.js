/* Chaleur Atelier – store theme (matches the CA website: cream page, burgundy header, Montserrat only, burgundy pill buttons, rounded cards). Remove this block to go back to Orderla's orange look. */
(function(){
  if (window.__caTheme) return; window.__caTheme = true;
  try {
    var BURG='#780C14', BURG_D='#5E0A10', CREAM='#FFF0DC', CARD='#FFF7EC', BEIGE='#F4DCBC', BROWN='#523325', CARAMEL='#7A4926', BLUE='#C5D0E5';

    var lk=document.createElement('link'); lk.rel='stylesheet';
    lk.href='https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap';
    document.head.appendChild(lk);

    var css=document.createElement('style'); css.id='ca-theme-css';
    css.textContent = [
      /* page + type */
      'html,body,#root,#app{background:'+CREAM+'!important}',
      'body,body *{font-family:Montserrat,sans-serif!important}',
      'body{color:'+BROWN+'!important}',
      '.bi,[class^="bi-"],[class*=" bi-"]{font-family:bootstrap-icons!important}',
      '.fa,.fas,.far,.fal,.fad,[class^="fa-"],[class*=" fa-"]{font-family:"Font Awesome 6 Free","Font Awesome 5 Free","FontAwesome"!important}',
      '.fab{font-family:"Font Awesome 6 Brands","Font Awesome 5 Brands"!important}',
      '.fas,.fa-solid{font-weight:900!important}',
      '.material-icons{font-family:"Material Icons"!important}',
      'h1,h2,h3,h4,h5,h6,strong,b{color:'+BURG+'!important;letter-spacing:-.01em}',
      '.ca-desc,.ca-desc *{font-family:Montserrat,sans-serif!important;color:'+BROWN+'!important;font-size:14px!important;line-height:1.6!important}',
      '.ca-desc em,.ca-desc i{color:'+CARAMEL+'!important}',
      /* white blocks become cream cards */
      '.ca-white{background-color:'+CREAM+'!important}',
      '.modal .ca-white,.ReactModal__Content .ca-white{background-color:'+CARD+'!important}',
      '.ca-grey{background-color:'+CARD+'!important;border-color:rgba(82,51,37,.14)!important}',
      /* category menu */
      '.nav-scroller,.nav-scroller *,.nav__inner,.nav__inner li{background-color:'+CREAM+'!important}',
      '.nav-scroller{border-bottom:1px solid rgba(82,51,37,.14)!important}',
      '.nav-scroller .nav-link{color:'+CARAMEL+'!important;font-weight:600!important;letter-spacing:.06em!important;font-size:12px!important}',
      '.nav-scroller li.is_current .nav-link{color:'+BURG+'!important}',
      '.nav-scroller li.is_current{border-bottom:2px solid '+BURG+'!important;box-shadow:none!important}',
      '.nav-scroller [style*="border-bottom"],.nav-scroller [class*="bar"]{border-color:'+BURG+'!important}',
      '.nav-scroller .bi{color:'+BURG+'!important}',
      /* section titles */
      '.ca-sec{font-family:Montserrat,sans-serif!important;font-weight:700!important;font-size:26px!important;color:'+BURG+'!important;letter-spacing:-.015em!important;text-transform:none}',
      /* product cards */
      '.ca-cardimg{border-radius:20px!important;overflow:hidden!important;background:#EDE4D8!important}',
      '.ca-cardimg img{border-radius:20px!important;transition:transform .6s ease}',
      '@media (hover:hover){.ca-card:hover .ca-cardimg img{transform:scale(1.04)}}',
      '.ca-name{color:'+BURG+'!important;font-weight:600!important;font-size:15.5px!important;line-height:1.3!important}',
      '.ca-price{color:'+BROWN+'!important;font-weight:600!important}',
      '.ca-strike{color:'+CARAMEL+'!important;opacity:.75}',
      /* buttons */
      '.ca-obg{background-color:'+BURG+'!important;border-color:'+BURG+'!important;color:'+CREAM+'!important}',
      '.ca-obg *{color:'+CREAM+'!important}',
      '.ca-obg:hover{background-color:'+BURG_D+'!important}',
      'a.ca-obg,button.ca-obg,.btn.ca-obg{border-radius:999px!important}',
      '.ca-ofg{color:'+BURG+'!important}',
      '.ca-obd{border-color:'+BURG+'!important}',
      '.btn-outline-dark{border:1.5px solid '+BURG+'!important;color:'+BURG+'!important;border-radius:14px!important;background:'+CARD+'!important}',
      '.btn-outline-dark *{color:'+BURG+'!important}',
      '.btn-outline-dark:hover,.btn-outline-dark.active,.btn-outline-dark:active{background:'+BURG+'!important;color:'+CREAM+'!important}',
      '.btn-outline-dark:hover *,.btn-outline-dark.active *{color:'+CREAM+'!important}',
      '.btn{font-weight:600!important;letter-spacing:.01em}',
      '.theme-bg-orange{background-color:'+BURG+'!important}',
      '.theme-color-orange{color:'+BURG+'!important}',
      /* bottom cart bar */
      '.form-bottom-bar{background:'+CREAM+'!important;border-top:1px solid rgba(82,51,37,.14)!important;box-shadow:none!important}',
      '.form-bottom-bar .btn{border-radius:999px!important}',
      /* popups */
      '.modal-content,.ReactModal__Content{background:'+CARD+'!important;border-radius:24px!important;border:none!important}',
      '.modal-header{border-bottom-color:rgba(82,51,37,.12)!important}',
      '.list-group-item{background:'+CARD+'!important;border-color:rgba(82,51,37,.14)!important;color:'+BROWN+'!important}',
      'input,select,textarea,.form-control{border-radius:12px!important;border-color:rgba(82,51,37,.25)!important;background:#fff!important;color:'+BROWN+'!important}',
      'input:focus,select:focus,textarea:focus,.form-control:focus{border-color:'+BURG+'!important;box-shadow:0 0 0 3px rgba(120,12,20,.12)!important}',
      'a{color:'+BURG+'}',
      /* brand header added on top */
      '#ca-strip{background:'+BEIGE+';color:'+BROWN+';font-size:12px;font-weight:500;text-align:center;padding:9px 14px}',
      'nav.navbar{min-height:58px}',
      '#ca-head{display:inline-flex;flex-direction:column;align-items:center;line-height:1.1;font-weight:700;font-size:13px;letter-spacing:.18em;color:'+CREAM+'!important;white-space:nowrap}',
      '#ca-head small{font-size:8px;letter-spacing:.42em;font-weight:600;opacity:.85;color:'+CREAM+'!important}',
      '#ca-head.in-nav{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none}',
      '.ca-bar{background:'+BURG+';padding:14px;text-align:center}',
      '@media (max-width:380px){#ca-head{font-size:11px;letter-spacing:.14em}}',
      '#ca-feuille{position:fixed;right:12px;bottom:84px;width:64px;z-index:2147483002;cursor:pointer;background:none;border:none;padding:0;-webkit-tap-highlight-color:transparent;animation:caBob 3.2s ease-in-out infinite}',
      '#ca-feuille img,#ca-feuille svg{width:100%;height:auto;display:block;filter:drop-shadow(0 4px 6px rgba(82,51,37,.18))}',
      '#ca-feuille .bub{position:absolute;right:58px;bottom:44px;background:'+CARD+';color:'+BURG+';border:1.5px solid '+BURG+';border-radius:16px 16px 4px 16px;padding:8px 12px;font-size:12px;font-weight:600;white-space:nowrap;opacity:0;transform:translateY(6px);transition:opacity .3s ease,transform .3s ease;pointer-events:none}',
      '#ca-feuille.talk .bub{opacity:1;transform:none}',
      '@keyframes caBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}',
      '@media (prefers-reduced-motion: reduce){#ca-feuille{animation:none}}',
      '@media (min-width:768px){#ca-feuille{width:80px;right:22px}}',
      'body.ReactModal__Body--open #ca-feuille,body.modal-open #ca-feuille,body.ReactModal__Body--open #ca-xmas-tree,body.modal-open #ca-xmas-tree{display:none!important}',
      '.btn-outline-dark{font-size:12px!important}',
      '.ca-gbg{background-color:'+BURG+'!important;border-color:'+BURG+'!important;color:'+CREAM+'!important}',
      '.ca-gbg *{color:'+CREAM+'!important}',
      '.ca-gbd{border-color:'+CARAMEL+'!important}',
      '.btn-outline-dark.ca-sel{background:'+BURG+'!important;color:'+CREAM+'!important}',
      '.btn-outline-dark.ca-sel *{color:'+CREAM+'!important}',
      'body.ca-popup #ca-feuille,body.ca-popup #ca-xmas-tree,body.ca-popup #ca-xmas-sleigh{display:none!important}',
      /* build-your-own box */
      '.ca-bx{margin:10px 0 4px}',
      '.ca-bx .box{background:#FFFAF3;border-radius:22px;padding:20px 10px 10px;position:relative;box-shadow:0 14px 30px -16px rgba(82,30,20,.45),0 0 0 4px rgba(120,12,20,.05);margin:12px auto 8px;max-width:300px}',
      '.ca-bx .box .lbl{position:absolute;left:50%;top:-12px;transform:translateX(-50%);background:'+BURG+';color:'+CREAM+'!important;font-weight:700;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;padding:6px 14px;border-radius:999px;white-space:nowrap}',
      '.ca-bx .grid{display:grid;gap:6px;margin:0 auto;justify-items:center}',
      '.ca-bx .slot{width:100%;max-width:82px;aspect-ratio:1/1;border-radius:50%;background:'+CREAM+';position:relative;display:grid;place-items:center;border:2px dashed rgba(122,73,38,.28);padding:0;cursor:pointer;transition:transform .2s}',
      '.ca-bx .slot.on{border:2px solid transparent;background:radial-gradient(circle at 50% 60%,#fff 0,#FFF0DC 70%)}',
      '.ca-bx .slot .n{font-weight:700;font-size:12px;color:rgba(120,12,20,.28)!important}',
      '.ca-bx .slot img{position:absolute;left:8%;top:6%;width:84%;height:84%;object-fit:contain;filter:drop-shadow(0 4px 4px rgba(82,51,37,.28))}',
      '.ca-bx .slot.pop img{animation:caPop .5s cubic-bezier(.3,1.7,.5,1)}',
      '@keyframes caPop{0%{transform:scale(.2) translateY(-30px);opacity:0}70%{transform:scale(1.12)}100%{transform:scale(1)}}',
      '.ca-bx .slot .x{position:absolute;top:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:'+BURG+';color:'+CREAM+'!important;font-size:12px;line-height:18px;text-align:center;z-index:2;box-shadow:0 1px 4px rgba(0,0,0,.25)}',
      '.ca-bx .bar{height:6px;border-radius:9px;background:rgba(122,73,38,.15);margin:10px 4px 0;overflow:hidden}',
      '.ca-bx .bar i{display:block;height:100%;background:linear-gradient(90deg,'+CARAMEL+','+BURG+');border-radius:9px;transition:width .35s ease}',
      '.ca-bx .sum{font-size:12.5px;margin:6px 2px 8px;text-align:center;color:'+BROWN+'!important}',
      '.ca-bx .sum b{color:'+BURG+'!important}',
      '.ca-bx.full .box{animation:caYay .7s ease}',
      '@keyframes caYay{0%,100%{transform:scale(1)}30%{transform:scale(1.04) rotate(-1deg)}60%{transform:scale(.98) rotate(1deg)}}',
      '.ca-bx.nope .box{animation:caNope .35s ease}',
      '@keyframes caNope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.ca-bx .hint{display:flex;justify-content:space-between;font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:'+CARAMEL+'!important;margin:4px 2px 6px}',
      '.ca-bx .hint span{letter-spacing:.02em;text-transform:none;font-weight:500;font-style:italic}',
      '.ca-bx .pick{display:grid;grid-auto-flow:column;grid-template-rows:repeat(2,auto);grid-auto-columns:76px;gap:8px 6px;overflow-x:auto;scroll-snap-type:x proximity;padding:2px 2px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:thin}',
      '.ca-bx .pk{border:0;background:none;padding:0;text-align:center;cursor:pointer;position:relative;scroll-snap-align:start;-webkit-tap-highlight-color:transparent}',
      '.ca-bx .pk .ci{display:block;width:68px;height:68px;margin:0 auto;border-radius:50%;background:radial-gradient(circle at 50% 60%,#fff 0,#F4DCBC 85%);position:relative;transition:transform .15s ease}',
      '.ca-bx .pk .ci img{position:absolute;left:8%;top:6%;width:84%;height:84%;object-fit:contain;filter:drop-shadow(0 3px 3px rgba(82,51,37,.25))}',
      '.ca-bx .pk:active .ci{transform:scale(.88)}',
      '.ca-bx .pk .nm{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:10.5px;font-weight:700;color:'+BURG+'!important;margin-top:4px;line-height:1.15}',
      '.ca-bx .pk .pr{display:block;font-size:10px;font-weight:600;color:'+BROWN+'!important;margin-top:1px}',
      '.ca-bx .pk .q{position:absolute;top:-2px;right:2px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:'+BURG+';color:'+CREAM+'!important;font-size:11px;font-weight:700;line-height:20px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.25)}',
      '.ca-bx.full .pk:not(.has) .ci{opacity:.4}',
      '.ca-fly{position:fixed;z-index:100000;pointer-events:none;object-fit:contain;transition:transform .5s cubic-bezier(.5,-0.3,.6,1),opacity .5s;filter:drop-shadow(0 6px 6px rgba(0,0,0,.25))}',
      '.ca-burst{position:fixed;z-index:100001;pointer-events:none;font-size:18px;transition:transform .9s ease-out,opacity .9s}',
      '.ca-bx .redo{display:block;margin:-2px auto 8px;background:#fff;border:1.5px solid '+BURG+';color:'+BURG+'!important;border-radius:999px;padding:6px 16px;font-size:12px;font-weight:700;cursor:pointer;-webkit-tap-highlight-color:transparent}',
      '.ca-bx .redo[hidden]{display:none}',
      '.ca-bx .redo:active{transform:scale(.95)}',
      '.ca-bx .tog{display:block;margin:4px auto 0;background:none;border:none;padding:4px;font-size:11px;font-weight:600;color:'+CARAMEL+'!important;text-decoration:underline;cursor:pointer}',
      'body a.delivery-button-sel.delivery-btn-selected,body a.delivery-button-sel.delivery-btn-selected:hover{background:'+BURG+'!important;border:1.5px solid '+BURG+'!important;color:'+CREAM+'!important;box-shadow:0 6px 14px -6px rgba(120,12,20,.6)!important}',
      'body a.delivery-button-sel.delivery-btn-selected *{color:'+CREAM+'!important;fill:'+CREAM+'!important}',
      '.nav-scroller .nav-link{padding-top:12px!important;padding-bottom:12px!important}',
      '.Calendar__day.greenDay{border-color:rgba(122,73,38,.55)!important;box-shadow:none!important}',
      '.Calendar__day.-selected,.Calendar__day.-selected:hover{background:'+BURG+'!important;color:'+CREAM+'!important;border-color:'+BURG+'!important}',
      '.btn-minus-selection-sm + div{font-size:14px!important;font-weight:700!important;color:'+BURG+'!important;width:32px!important}',
      '.btn-minus-selection-sm,.btn-plus-selection-sm{min-width:30px;min-height:30px;display:inline-flex!important;align-items:center;justify-content:center}',
      '.ca-bx .gdn{display:flex;align-items:flex-end;gap:6px;margin:2px 0 4px;min-height:52px}',
      '.ca-bx .gf{flex:0 0 46px;width:46px;background:none;border:none;padding:0;cursor:pointer;animation:caBob 3s ease-in-out infinite;-webkit-tap-highlight-color:transparent}',
      '.ca-bx .gf img,.ca-bx .gf svg{width:100%;height:auto;display:block;filter:drop-shadow(0 3px 4px rgba(82,51,37,.2))}',
      '.ca-bx .gb{position:relative;background:#fff;color:'+BROWN+'!important;border:1.5px solid '+CARAMEL+';border-radius:14px 14px 14px 4px;padding:7px 10px;font-size:11.5px;line-height:1.35;font-weight:600;max-width:240px;opacity:0;transform:translateY(6px) scale(.96);transform-origin:left bottom;transition:opacity .3s ease,transform .3s ease;pointer-events:none;margin-bottom:12px}',
      '.ca-bx .gdn.on .gb{opacity:1;transform:none}',
      '.ca-bx .gdn:not(.on) .gb{max-height:0;padding:0;border-width:0;margin:0;overflow:hidden}',
      '#ca-noel{position:absolute;left:0;right:0;bottom:3px;text-align:center;font-size:10px!important;font-weight:600!important;letter-spacing:.34em;text-transform:uppercase;color:'+CREAM+'!important;pointer-events:none}',
      'nav.navbar.ca-w1{padding-bottom:16px!important;overflow:visible!important}',
      'nav.navbar .fl{position:absolute;pointer-events:none}',
      '#ca-wave{position:relative;height:28px;margin-top:-1px;margin-bottom:44px;pointer-events:none;z-index:2}',
      '#ca-wave .orn{position:absolute;top:16px;display:flex;flex-direction:column;align-items:center;transform-origin:top center;animation:caSwing 3.2s ease-in-out infinite}',
      '#ca-wave .orn:nth-child(odd){animation-delay:-1.6s}',
      '#ca-wave .orn i{display:block;width:1.5px;background:'+CARAMEL+'}',
      '#ca-wave .orn b{display:block;width:8px;height:5px;background:'+CARAMEL+';border-radius:2px}',
      '#ca-wave .orn em{display:block;width:18px;height:18px;border-radius:50%;box-shadow:inset -4px -4px 0 rgba(0,0,0,.12)}',
      '@keyframes caSwing{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}',
      '@media (prefers-reduced-motion: reduce){#ca-wave .orn{animation:none}}',
      '#ca-xmas-banner.ca-pill{margin:0 auto 6px!important;max-width:560px;width:calc(100% - 28px);border-radius:999px!important;background:#F4DCBC!important;box-sizing:border-box}',
      '.ca-band{background:'+BLUE+'!important;position:relative;padding:6px 10px 14px!important;margin:30px -6px 34px!important;border-radius:0}',
      '.ca-band::before,.ca-band::after{content:"";position:absolute;left:0;right:0;height:22px;background-size:100% 100%;background-repeat:no-repeat;pointer-events:none}',
      '.ca-band::before{top:-21px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 390 22%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0,22 L0,17.5 L6,18.0 L12,17.8 L18,17.1 L24,15.9 L30,14.3 L36,12.4 L42,10.4 L48,8.4 L54,6.7 L60,5.3 L66,4.4 L72,4.0 L78,4.2 L84,5.0 L90,6.3 L96,8.0 L102,9.9 L108,12.0 L114,13.9 L120,15.6 L126,16.9 L132,17.7 L138,18.0 L144,17.7 L150,16.8 L156,15.4 L162,13.7 L168,11.7 L174,9.7 L180,7.8 L186,6.2 L192,4.9 L198,4.2 L204,4.0 L210,4.4 L216,5.4 L222,6.8 L228,8.6 L234,10.6 L240,12.6 L246,14.5 L252,16.1 L258,17.2 L264,17.9 L270,18.0 L276,17.4 L282,16.4 L288,14.9 L294,13.1 L300,11.1 L306,9.1 L312,7.2 L318,5.7 L324,4.6 L330,4.1 L336,4.1 L342,4.7 L348,5.8 L354,7.4 L360,9.3 L366,11.3 L372,13.3 L378,15.1 L384,16.5 L390,17.5 L390,22 Z%27 fill=%27%23C5D0E5%27/%3E%3C/svg%3E")}',
      '.ca-band::after{bottom:-21px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 390 22%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M0,0 L0,15.7 L6,14.1 L12,12.1 L18,10.1 L24,8.2 L30,6.4 L36,5.1 L42,4.3 L48,4.0 L54,4.3 L60,5.2 L66,6.5 L72,8.3 L78,10.2 L84,12.2 L90,14.1 L96,15.8 L102,17.1 L108,17.8 L114,18.0 L120,17.6 L126,16.6 L132,15.2 L138,13.4 L144,11.5 L150,9.4 L156,7.6 L162,6.0 L168,4.8 L174,4.1 L180,4.0 L186,4.5 L192,5.6 L198,7.1 L204,8.9 L210,10.9 L216,12.9 L222,14.7 L228,16.3 L234,17.4 L240,17.9 L246,17.9 L252,17.3 L258,16.2 L264,14.6 L270,12.8 L276,10.8 L282,8.8 L288,7.0 L294,5.5 L300,4.5 L306,4.0 L312,4.1 L318,4.8 L324,6.0 L330,7.6 L336,9.5 L342,11.6 L348,13.5 L354,15.3 L360,16.7 L366,17.6 L372,18.0 L378,17.8 L384,17.0 L390,15.7 L390,0 Z%27 fill=%27%23C5D0E5%27/%3E%3C/svg%3E")}',
      '.ca-band,.ca-band section,.ca-band .row,.ca-band > div{background-color:transparent}',
      '.ca-band{background-color:'+BLUE+'!important}',
      '.ca-card{background:#FFFAF3!important;border-radius:22px!important;padding:8px!important}',
      '.ca-card .ca-cardimg,.ca-card img{border-radius:16px!important}',
      '.nav-scroller li{border-bottom:none!important;margin-right:6px}',
      '.nav-scroller .nav-link{border:1.5px solid '+BURG+'!important;border-radius:999px!important;color:'+BURG+'!important;padding:8px 14px!important;margin:6px 0!important;line-height:1.2}',
      '.nav-scroller li.is_current .nav-link{background:'+BURG+'!important;color:'+CREAM+'!important}',
      '.ca-li{padding-left:2px!important;padding-right:2px!important}',
      '.ca-li > div{background:#FFFAF3;border-radius:18px;margin:8px 0;padding:10px 12px;box-shadow:0 6px 14px -10px rgba(82,51,37,.45)}',
      '.ca-li > div > div{padding:0!important}',
      '.ca-rimg{margin-right:12px!important;flex:0 0 84px}',
      '.ca-rimg img{width:84px!important;height:84px!important;object-fit:cover;border-radius:14px!important}',
      '.ca-ri{display:grid!important;grid-template-columns:1fr auto;column-gap:10px;align-items:start}',
      '.ca-rt{grid-column:1;grid-row:1 / span 2;display:block!important}',
      '.ca-rt > div:first-child{display:block}',
      '.ca-rt span{display:block;font-size:14px!important;font-weight:700!important;color:'+BURG+'!important;line-height:1.3!important}',
      '.ca-rt p{font-size:12px!important;color:'+CARAMEL+'!important;margin:4px 0 0!important;line-height:1.45!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
      '.ca-rb{display:contents!important}',
      '.ca-rb > div:first-child{grid-column:2;grid-row:1;text-align:right;white-space:nowrap}',
      '.ca-rb > div:first-child span{font-size:14px!important;font-weight:700!important;color:'+BROWN+'!important}',
      '.ca-rb > div:last-child{grid-column:2;grid-row:2;width:auto!important;padding:8px 0 0!important;justify-content:flex-end!important;align-self:end}',
      '.ca-li a.form-add-item-btn{background:'+BURG+'!important;color:'+CREAM+'!important;border-radius:999px!important;height:auto!important;padding:8px 14px!important;font-size:12px!important;line-height:1.2!important;border:none!important;white-space:nowrap}',
      '.ca-li + hr,.ca-band hr{display:none!important}',
      '#ca-van{position:relative;height:104px;overflow:hidden;border-radius:16px;margin:0 0 12px;background:linear-gradient(180deg,#C5D0E5 0,#C5D0E5 72%,#F4DCBC 72%)}',
      '#ca-van .road{position:absolute;left:0;right:0;bottom:12px;height:2px;background:repeating-linear-gradient(90deg,#7A4926 0 14px,transparent 14px 26px)}',
      '#ca-van .van{position:absolute;bottom:8px;left:0;width:140px;animation:caDrive 2.2s cubic-bezier(.15,.75,.3,1) both}',
      '#ca-van .vsv{width:100%;height:auto;display:block;animation:caBumpy .35s ease-in-out 6}',
      '#ca-van .wh{transform-box:fill-box;transform-origin:center;animation:caSpin .45s linear 5}',
      '#ca-van .drv{position:absolute;left:96px;top:-6px;width:30px;animation:caDrive 2.2s cubic-bezier(.15,.75,.3,1) both;display:none}',
      '#ca-van .bub{position:absolute;left:160px;right:10px;top:12px;background:#fff;color:'+BURG+'!important;border:1.5px solid '+BURG+';border-radius:14px 14px 14px 4px;padding:8px 10px;font-size:12px!important;font-weight:700!important;line-height:1.35;opacity:0;transform:scale(.8);transform-origin:left bottom;animation:caBub .35s ease 2.1s forwards}',
      '#ca-van .bub small{display:block;font-weight:500!important;font-size:10.5px!important;color:'+BROWN+'!important;margin-top:2px}',
      '@keyframes caDrive{0%{transform:translateX(-170px)}100%{transform:translateX(14px)}}',
      '@keyframes caBumpy{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}',
      '@keyframes caSpin{to{transform:rotate(360deg)}}',
      '@keyframes caBub{to{opacity:1;transform:none}}',
      '@media (max-width:380px){#ca-van .bub{left:150px;font-size:11px!important}}',
      '@media (prefers-reduced-motion: reduce){#ca-van .van,#ca-van .vsv,#ca-van .wh{animation:none}#ca-van .van{transform:translateX(14px)}#ca-van .bub{animation:none;opacity:1;transform:none}}',
      '.ca-bx-hide{display:none!important}',
      '.modal-content-wrapper{border-radius:24px!important;overflow:hidden}'
    ].join('\n');
    document.head.appendChild(css);

    function isOrange(c){ var m=/rgba?\((\d+), (\d+), (\d+)/.exec(c); if(!m) return false; var r=+m[1],g=+m[2],b=+m[3]; return r>=235 && g>=120 && g<=200 && b<=110; }
    function isWhite(c){ return c==='rgb(255, 255, 255)'; }
    function isGrey(c){ var m=/rgba?\((\d+), (\d+), (\d+)/.exec(c); if(!m) return false; var r=+m[1],g=+m[2],b=+m[3]; return r>=238 && r<255 && Math.abs(r-g)<6 && Math.abs(g-b)<6; }
    function isGreen(c){ var m=/rgba?\((\d+), (\d+), (\d+)/.exec(c); if(!m) return false; var r=+m[1],g=+m[2],b=+m[3]; return g>r+30 && g>=b && g>90; }
    function ours(e){ return e.closest && e.closest('#ca-head,#ca-strip,#ca-xmas-banner,#ca-xmas-tree,#ca-xmas-sleigh,#ca-xmas-snow,#ca-feuille,.ca-bx'); }

    function tagEl(e){
      if (e.nodeType!==1 || e.__caDone || ours(e)) return;
      var tn=e.tagName; if (tn==='SCRIPT'||tn==='STYLE'||tn==='IMG'||tn==='svg'||tn==='path') return;
      e.__caDone=true;
      var cs=getComputedStyle(e);
      if (isOrange(cs.backgroundColor)) e.classList.add('ca-obg');
      else if (isWhite(cs.backgroundColor) && tn!=='INPUT' && tn!=='TEXTAREA' && tn!=='SELECT') e.classList.add('ca-white');
      else if (isGrey(cs.backgroundColor)) e.classList.add('ca-grey');
      if (isOrange(cs.color)) e.classList.add('ca-ofg');
      if (cs.borderTopWidth!=='0px' && isOrange(cs.borderTopColor)) e.classList.add('ca-obd');
      if (isGreen(cs.backgroundColor)) e.classList.add('ca-gbg');
      else if (cs.borderTopWidth!=='0px' && isGreen(cs.borderTopColor)) e.classList.add('ca-gbd');
      if (tn==='STRONG' && parseFloat(cs.fontSize)>=18 && !e.closest('.modal,.ReactModal__Content')) e.classList.add('ca-sec');
    }
    function tagCards(root){
      var cols=document.querySelectorAll('.col-6, .col-md-4');
      for (var i=0;i<cols.length;i++){
        var c=cols[i]; if (c.__caCard) continue;
        if (c.querySelector('.modal, .modal-content-wrapper, .ReactModal__Content') || c.querySelectorAll('img').length>3) continue;
        var img=c.querySelector('img'); if(!img) continue;
        var spans=c.querySelectorAll('span'); if(!spans.length) continue;
        c.__caCard=true; c.classList.add('ca-card');
        var w=img.parentElement; for (var k=0;k<3 && w && w!==c;k++){ if (w.offsetWidth>=img.offsetWidth-2) { w.classList.add('ca-cardimg'); break; } w=w.parentElement; }
        for (var j=0;j<spans.length;j++){
          var s=spans[j], t=(s.textContent||'').trim(), cs=getComputedStyle(s);
          if (/^RM\s?\d/.test(t)) s.classList.add(cs.textDecorationLine.indexOf('line-through')>=0 || (s.parentElement && getComputedStyle(s.parentElement).textDecorationLine.indexOf('line-through')>=0) ? 'ca-strike':'ca-price');
          else if (parseInt(cs.fontWeight,10)>=600 && t.length>1) s.classList.add('ca-name');
        }
      }
    }
    function tagDesc(){
      var boxes=document.querySelectorAll('.ReactModal__Content, .modal-body, .modal-content-wrapper');
      for (var i=0;i<boxes.length;i++){
        var els=boxes[i].querySelectorAll('div,p');
        for (var j=0;j<els.length;j++){
          var e=els[j]; if (e.__caDesc || e.closest('.ca-bx')) continue;
          var t=(e.innerText||'').trim(); if (t.length<40) continue;
          var hasBlock=false; for (var k=0;k<e.children.length;k++){ var ct=e.children[k].tagName; if(!/^(BR|STRONG|EM|B|I|SPAN|A|U)$/.test(ct)){hasBlock=true;break;} }
          if (!hasBlock && !e.querySelector('button,input,img') && !e.closest('label') && !(e.parentElement && e.parentElement.querySelector('input'))){ e.__caDesc=true; e.classList.add('ca-desc'); }
        }
      }
      /* store intro text under the shop name */
      var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
      while(n=w.nextNode()){ if(n.textContent.trim()==='Modern French Pastry JB'){ var p=n.parentElement; for(var u=0;u<4&&p;u++){ if(p.innerText && p.innerText.indexOf('No alcohol')>=0){ p.classList.add('ca-desc'); break;} p=p.parentElement; } break; } }
    }
    function scan(root){
      root=root||document.body; tagEl(root);
      var all=root.querySelectorAll ? root.querySelectorAll('*') : [];
      for (var i=0;i<all.length;i++) tagEl(all[i]);
      tagCards(document); tagDesc();
    }

    function addHead(){
      if (document.getElementById('ca-head')) return;
      var strip=document.createElement('div'); strip.id='ca-strip';
      strip.textContent='Open daily 11 am \u2013 7 pm \u00b7 No alcohol, no pork, no lard';
      document.body.insertBefore(strip, document.body.firstChild);
      var nav=document.querySelector('nav.navbar');
      var wm=document.createElement('span'); wm.id='ca-head'; wm.className='wm';
      wm.innerHTML='CHALEUR ATELIER<small>P\u00c2TISSERIE</small>';
      if (nav){ nav.style.position = getComputedStyle(nav).position==='static' ? 'relative' : nav.style.position; wm.classList.add('in-nav'); nav.appendChild(wm); }
      else { var bar=document.createElement('div'); bar.className='ca-bar'; bar.appendChild(wm); strip.parentNode.insertBefore(bar, strip.nextSibling); }
    }

    /* Feuille, the Chaleur crew mascot (from the Feuille SVG pack) */
    var FEUILLE_HELLO='<img alt="" aria-hidden="true" src="https://cdn.jsdelivr.net/gh/chaleurpatisserie-ops/orderla-theme@main/img/feuille-hello.webp">';
    var CA_IMG='https://cdn.jsdelivr.net/gh/chaleurpatisserie-ops/orderla-theme@main/img/';
    var HOST_HELLO='<img alt="" aria-hidden="true" src="'+CA_IMG+'host-hello.webp">';
    var HOST_CHEEKY='<img alt="" aria-hidden="true" src="'+CA_IMG+'host-cheeky.webp">';
    function addFeuille(){
      if (document.getElementById('ca-feuille')) return;
      var f=document.createElement('button'); f.type='button'; f.id='ca-feuille'; f.setAttribute('aria-label','Our atelier host says hello');
      f.innerHTML=HOST_HELLO+'<span class="bub">Bonjour! Have a look around</span>';
      document.body.appendChild(f);
      var timer;
      function talk(text, ms){ if(text) f.querySelector('.bub').textContent=text; f.classList.add('talk'); clearTimeout(timer); timer=setTimeout(function(){f.classList.remove('talk')}, ms||4500); }
      f.addEventListener('click', function(){ var b=f.querySelector('.bub'); var s=f.querySelector('img,svg'); if(s){ s.outerHTML=HOST_CHEEKY; setTimeout(function(){ var s2=f.querySelector('img,svg'); if(s2) s2.outerHTML=HOST_HELLO; },1400); } talk(f.getAttribute('data-tap')||'Tap a cake to see what is inside', 3500); });
      window.__caFeuille={ el:f, talk:talk, setPose:function(svg){ var b=f.querySelector('.bub'); f.innerHTML=svg; f.appendChild(b); } };
      setTimeout(function(){ talk(null, 4500); }, 1800);
      var HOST_TIPS=['Tap any cake to see what\'s inside.','Free delivery on orders RM120 and above, within 18 km of our Larkin HQ.','Can\'t choose? Build your own box of 4, 6 or 9!','No alcohol, no pork, no lard in our cakes.'], ti=0;
      setInterval(function(){ if(document.body.classList.contains('ca-popup') || f.classList.contains('talk')) return; talk(HOST_TIPS[ti++ % HOST_TIPS.length], 5000); }, 40000);
      function wink(){ var s=f.querySelector('img,svg'); if(s){ s.outerHTML=HOST_CHEEKY; setTimeout(function(){ var s2=f.querySelector('img,svg'); if(s2) s2.outerHTML=HOST_HELLO; },1600); } }
      var lastCount=null, freeSaid=false, YAY=['Great choice!','Ooh, that one\'s lovely.','Added! Anything else catch your eye?','Merci! Good taste, hehe.'];
      setInterval(function(){
        var bar=document.querySelector('.form-bottom-bar'); if(!bar) return;
        var txt=bar.innerText||'', c=parseInt((txt.match(/^\s*(\d+)/)||[])[1],10), m=txt.match(/RM\s*([\d,]+\.\d{2})/g), tot=m?parseFloat(m[m.length-1].replace(/[^\d.]/g,'')):0;
        if(isNaN(c)) return;
        if(lastCount!==null && c>lastCount && !document.body.classList.contains('ca-popup')){
          wink();
          if(tot>=120 && !freeSaid){ freeSaid=true; talk('RM'+tot.toFixed(2)+' in your cart: free delivery within 18 km of Larkin HQ! 🚚', 5500); }
          else talk(YAY[Math.floor(Math.random()*YAY.length)], 3500);
        }
        if(lastCount===null || !document.body.classList.contains('ca-popup')) lastCount=c;
      }, 700);
    }

    /* Build-your-own box: turns Orderla's "Choose your N cakes" picker into a visual box. Orderla's own +/- buttons still do the ordering. */
    var BOX_IMG_BASE='/storage/img/';
    var BOX_IMGS={"Mochi Strawberry Shortcake": "cW12vmcEDRQie62TijMc9B52R3t968wchey7pNac.webp", "Noir": "6xmETKjqD5ZudEPJGpZGAZl6vvZ7s1lm3e0agNEW.webp", "Camellia": "Pwl1LAakkYqAZCSiEwrokezj5p3XS9rOm2c9tdxR.webp", "Mrs. Bunny": "6aaGzxFOyAfxX05UHiZZxLZBMPDeXI8Oe6UxpGuW.webp", "La Fleur": "Isk9G74iWlxxMFy8JbWh1Ns3RxwUHeuQNPQ3Aq0B.webp", "Apam Balik": "wlXpx37iLLhUkkotFNfHqi5LSFISpWU7ardxPlSq.webp", "Pecan Tartlet": "gCsLJ8UPFTfzKg0obtUJhi8pKbxVsfcZriZGWOG9.webp", "Rudolph": "wvxp2dhFhwSf7ew6gijIqrqwBAfKYtdIsHHG3C4c.webp", "Ornament": "MSzccZe3T2UnhfljWwlLvhwleFTNf7buLfoDZLa2.webp", "Cherry": "cwBBdWbL38rO3kEw4cLj0HDWrSjNlywnBuZyl1Xe.webp", "Acorn": "3t0sr0iJlvOIlCBMHd8o6ZvbhIuFwISrzIOWbkGM.webp", "Strawberry": "WK3BcYAr5lRpozVoIrOH6JB34P9EoFSOdRhT7LVd.webp", "Raspberry": "d9Vl7KToazeXd8dEdyHZ97KCx6IfL4ALvBGKyjQv.webp", "Mango": "3KrGgTpurNDeEv3RPJnKRwd07MTzJM2A4q0BdT4d.webp", "Pistachio": "w8OFnaAvJsleCRY0g4lxrsvFFzbGCPr1Z3Jcld1Y.webp", "Kurma": "SMa09OitGfqzvObWaWidws6VrLazzM8MHoyz3LK0.webp", "Coconut": "s4hXivNT0ELSbDT9ZtGD5M0iN77Nw2OxeM10UHMs.webp", "Passionfruit": "J4fXFf1S3QcS7tRmdKTLS9wTBiVsQdwXh13R4ESH.webp", "Pear": "g3joFZxYP2MaAnToHu36Piuid3oRUSXsQi1sJwda.webp"};
    function bxImg(name){
      var key=name.split(' (')[0].trim();
      if (BOX_IMGS[key]) return BOX_IMG_BASE+BOX_IMGS[key];
      var im=document.querySelector('img[alt="'+name.replace(/"/g,'')+'"]'); return im ? (im.currentSrc||im.src) : '';
    }
    function bxRows(list){
      var out=[], rows=list.children;
      for (var i=0;i<rows.length;i++){
        var r=rows[i], sp=r.querySelector('span'), bt=r.querySelectorAll('button'); if(!sp||bt.length<2) continue;
        var pr=r.querySelector('.text-muted'), qd=bt[0].nextElementSibling;
        out.push({name:sp.textContent.trim(), price:pr?pr.textContent.replace(/[()+]/g,'').trim():'', minus:bt[0], plus:bt[1], qty:parseInt(qd&&qd.textContent,10)||0});
      }
      return out;
    }
    var GDN_LINES={"Mochi Strawberry Shortcake": "Fresh strawberries and vanilla chantilly, wrapped in a soft mochi skin. So bouncy!", "Noir": "Noir is for chocolate lovers: 70% dark chocolate mousse, crémeux and a crunchy base.", "Camellia": "Pink guava and elderflower, light and floral. My prettiest bloom!", "Mrs. Bunny": "Mrs. Bunny hides raspberry mousse with a strawberry lychee centre. Hop hop!", "La Fleur": "Black sesame mousse with a bright yuzu heart. Nutty meets zesty!", "Apam Balik": "Peanut sponge, sweet corn and peanut butter chantilly. Like apam balik, but fancy!", "Pecan Tartlet": "Maple-glazed pecans on a pecan frangipane tart. I cracked every nut myself, hehe.", "Rudolph": "Rudolph is toffee mousse with caramel and vanilla chantilly. He flies best with a friend!", "Ornament": "Blueberry and lavender in a little bauble. Too pretty to hang on a tree!", "Cherry": "Sour cherry compote inside chocolate mousse. Picked from my cherry tree!", "Acorn": "Hazelnut mousse, chocolate crémeux and a hazelnut rocher. Squirrels are jealous.", "Strawberry": "Strawberry compote, vanilla mousse and a crisp sablé. A classic from my patch!", "Raspberry": "Raspberry mousse and compote on a vanilla sablé. Tangy and bright!", "Mango": "Mango compote with vanilla mousse. Sunshine in a cake!", "Pistachio": "100% pistachio mousse with crunchy kunafa. Nutty heaven!", "Kurma": "Dates and hazelnut with crème vanille and a crisp feuilletine. Rich and cosy!", "Coconut": "Coconut mousse with pandan and gula melaka. A taste of home!", "Passionfruit": "Passionfruit and mango, light and tropical. Wakes up the whole box!", "Pear": "Yuzu pear compote with a vanilla pear parfait. Juicy, straight from the tree!"};
    var GDN_INTRO=["Hi, I'm Feuille, Chaleur's gardener! 🌱 Tap a cake and I'll tell you what's inside.", "Bonjour! I grow the fruits and nuts for these cakes. Pick your favourites!", "Can't decide? Mix a fruity one with a chocolate one. Gardener's tip! 🌱"];
    var GDN_CHOC=['Noir','Cherry','Acorn','Rudolph','Pistachio','Kurma'], GDN_FRUIT=['Mochi Strawberry Shortcake','Mango','Strawberry','Raspberry','Ornament','Camellia','Mrs. Bunny','Passionfruit','Pear','La Fleur','Coconut'];
    function gdnKey(n){ return n.split(' (')[0].trim(); }
    function gdnPick(ui, name){
      var N=ui.__N, picks=ui.__picks.map(gdnKey), k=gdnKey(name), left=N-picks.length;
      var same=picks.filter(function(x){return x===k}).length;
      var choc=picks.filter(function(x){return GDN_CHOC.indexOf(x)>=0}).length, fruit=picks.filter(function(x){return GDN_FRUIT.indexOf(x)>=0}).length;
      var uniq=picks.filter(function(x,i,a){return a.indexOf(x)===i}).length;
      ui.__tips=ui.__tips||{};
      if(!left) return [N===9 ? 'Your box is full, what a harvest! 🌱 And Box of 9 gets 10% off every cake. Smart choice!' : 'Your box is full, what a harvest! 🌱 Tap Add to Cart when you\'re ready.','celebrate'];
      if(left===1) return ['One spot left. Make it count!','gateau'];
      if(same===2) return ['Two '+k+'s? You know what you like, hehe.','love'];
      if(choc>=3 && !fruit && !ui.__tips.c){ ui.__tips.c=1; return ['Lots of chocolate! A fruity one like Pear or Mango keeps the box fresh.','love']; }
      if(fruit>=3 && !choc && !ui.__tips.f){ ui.__tips.f=1; return ['So fruity! Add Noir or Acorn for a rich bite in between.','love']; }
      if(uniq>=5 && uniq===picks.length && !ui.__tips.u){ ui.__tips.u=1; return [uniq+' different flavours. Perfect for sharing!','love']; }
      if(picks.length===Math.ceil(N/2) && !ui.__tips.h){ ui.__tips.h=1; return ['Halfway there! '+(GDN_LINES[k]||''),'gateau']; }
      return [GDN_LINES[k] || 'Good pick!','happy'];
    }
    function boxBuilder(){
      var heads=document.querySelectorAll('.modal-content-wrapper strong, .ReactModal__Content strong');
      for (var h=0;h<heads.length;h++){
        var m=/^Choose your (\d+) cakes$/i.exec((heads[h].textContent||'').trim()); if(!m) continue;
        var N=+m[1], head=heads[h].parentElement && heads[h].parentElement.parentElement; if(!head) continue;
        var nx=head.nextElementSibling; if(!nx) continue;
        var ui=null, list=nx;
        if (nx.classList.contains('ca-bx')) { ui=nx; list=nx.nextElementSibling; if(!list) continue; }
        if (!ui){
          ui=document.createElement('div'); ui.className='ca-bx';
          ui.innerHTML='<div class="box"><span class="lbl">Box of '+N+'</span><div class="grid"></div><div class="bar"><i></i></div></div><p class="sum"></p><button type="button" class="redo" hidden>↺ Start over</button><div class="gdn"><button type="button" class="gf" aria-label="Meet Chaleur\'s gardener">'+FEUILLE_HELLO+'</button><span class="gb" aria-live="polite"></span></div><p class="hint">Tap to add <span>swipe for more →</span></p><div class="pick"></div><button type="button" class="tog">Show as list</button>';
          head.parentElement.insertBefore(ui, list);
          ui.__picks=[]; ui.__N=N;
          list.classList.add('ca-bx-hide');
          (function(g,u){ var tm, gb=g.querySelector('.gb'); var im=g.querySelector('.gf img'), idle; function say(txt,pose){ if(Array.isArray(txt)){ pose=txt[1]; txt=txt[0]; } if(txt) gb.textContent=txt; if(im) im.src=CA_IMG+'feuille-'+(pose||'hello')+'.webp'; g.classList.remove('on'); void g.offsetWidth; g.classList.add('on'); clearTimeout(tm); tm=setTimeout(function(){ g.classList.remove('on'); },6500); clearTimeout(idle); idle=setTimeout(function(){ if(document.body.contains(g) && g.getClientRects().length) say('Zzz… tap a cake to wake me up!','sleepy'); },30000); } u.__say=say; g.querySelector('.gf').addEventListener('click',function(){ say(GDN_INTRO[Math.floor(Math.random()*GDN_INTRO.length)]); }); setTimeout(function(){ say(GDN_INTRO[Math.floor(Math.random()*GDN_INTRO.length)]); },700); })(ui.querySelector('.gdn'),ui);
          ui.querySelector('.tog').addEventListener('click', function(ev){ var u=ev.target.closest('.ca-bx'), l=u.nextElementSibling; var hidden=l.classList.toggle('ca-bx-hide'); ev.target.textContent=hidden?'Show as list':'Hide list'; });
          ui.querySelector('.grid').style.gridTemplateColumns='repeat('+(N===4?2:3)+',1fr)'; ui.querySelector('.box').style.maxWidth=(N===4?200:280)+'px';
        }
        bxSync(ui, list);
      }
    }
    function bxFly(img, slot){
      try{ if(!img||!slot) return; var a=img.getBoundingClientRect(), b=slot.getBoundingClientRect(); var f=document.createElement('img'); f.src=img.src; f.className='ca-fly';
        f.style.left=a.left+'px'; f.style.top=a.top+'px'; f.style.width=a.width+'px'; f.style.height=a.height+'px'; document.body.appendChild(f);
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ f.style.transform='translate('+(b.left+b.width/2-a.left-a.width/2)+'px,'+(b.top+b.height/2-a.top-a.height/2)+'px) scale('+(b.width/a.width*.8)+')'; f.style.opacity='.2'; }); });
        setTimeout(function(){ f.remove(); },520); }catch(e){}
    }
    function bxBurst(el){
      try{ var r=el.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2, em=['✨','🎉','❄️','💛','⭐','🍓'];
        for(var i=0;i<16;i++){ (function(i){ var s=document.createElement('span'); s.className='ca-burst'; s.textContent=em[i%em.length]; s.style.left=cx+'px'; s.style.top=cy+'px'; document.body.appendChild(s);
          var ang=i/16*Math.PI*2, d=90+Math.random()*70; requestAnimationFrame(function(){ requestAnimationFrame(function(){ s.style.transform='translate('+Math.cos(ang)*d+'px,'+Math.sin(ang)*d+'px) rotate('+(Math.random()*360)+'deg)'; s.style.opacity='0'; }); });
          setTimeout(function(){ s.remove(); },950); })(i); } }catch(e){}
    }
    function bxSync(ui, list){
      var N=ui.__N, rows=bxRows(list), total=0, counts={};
      rows.forEach(function(r){ total+=r.qty; counts[r.name]=r.qty; });
      // keep the order the customer picked; fix it up if the list was changed directly
      var picks=ui.__picks.filter(function(n){ if(counts[n]>0){ counts[n]--; return true; } return false; });
      rows.forEach(function(r){ for(var k=0;k<counts[r.name];k++) picks.push(r.name); });
      ui.__picks=picks;
      var sig=rows.map(function(r){return r.name+r.qty}).join('|')+'#'+picks.join(',');
      if (ui.__sig===sig) return; ui.__sig=sig;
      var grid=ui.querySelector('.grid'), gh='';
      for (var i=0;i<N;i++){ var p=picks[i]; gh+='<button type="button" class="slot'+(p?' on':'')+(p&&i===ui.__new?' pop':'')+'" data-i="'+i+'"'+(p?' aria-label="Remove '+p.replace(/"/g,'')+'"':' aria-label="Empty slot '+(i+1)+'"')+'>'+(p?'<img alt="" src="'+bxImg(p)+'"><span class="x">×</span>':'<span class="n">'+(i+1)+'</span>')+'</button>'; }
      ui.__new=-1;
      grid.innerHTML=gh;
      var left=N-picks.length;
      ui.querySelector('.sum').innerHTML= left ? (picks.length? '<b>'+picks.length+'</b> of '+N+' chosen · '+left+' to go' : 'Fill your box! Pick any <b>'+N+'</b> cakes') : '<b>Yay, your box is full!</b> 🎉 Tap Add to Cart below.';
      ui.querySelector('.bar i').style.width=(picks.length/N*100)+'%';
      var rd=ui.querySelector('.redo'); rd.hidden=!picks.length;
      rd.onclick=function(){ if(rd.__busy) return; rd.__busy=true; ui.__picks=[]; ui.__tips={}; try{ ui.__say && ui.__say('Fresh start! Let\'s plant a new box. 🌱','hello'); }catch(e){} var clicks=[]; bxRows(list).forEach(function(r){ for(var q=0;q<r.qty;q++) clicks.push(r.name); });
        (function next(){ if(!clicks.length){ rd.__busy=false; ui.__celebrate=false; ui.__sig=''; bxSync(ui,list); return; } var n=clicks.shift(), r=bxRows(list).filter(function(x){return x.name===n})[0]; if(r && !r.minus.disabled) r.minus.click(); setTimeout(next,60); })(); };
      var wasFull=ui.classList.contains('full'); ui.classList.toggle('full', !left);
      if(!left && !wasFull && ui.__celebrate){ bxBurst(ui.querySelector('.box')); } ui.__celebrate=true;
      var pick=ui.querySelector('.pick'), ph='';
      rows.forEach(function(r,idx){ var nm=r.name.split(' (')[0].replace('Mochi Strawberry Shortcake','Mochi Strawberry'), fl=(r.name.match(/\(([^)]+)\)/)||[])[1]||''; ph+='<button type="button" class="pk'+(r.qty?' has':'')+'" data-idx="'+idx+'" title="'+(nm+(fl?' · '+fl:'')).replace(/"/g,'')+'" aria-label="Add '+r.name.replace(/"/g,'')+'"><span class="ci"><img alt="" src="'+bxImg(r.name)+'"></span>'+(r.qty?'<span class="q">'+r.qty+'</span>':'')+'<span class="nm">'+nm+'</span><span class="pr">'+r.price+'</span></button>'; });
      var sl=pick.scrollLeft;
      var keep=pick.scrollLeft; pick.innerHTML=ph; pick.scrollLeft=keep;
      grid.querySelectorAll('.slot').forEach(function(s){ s.onclick=function(){ var i=+s.getAttribute('data-i'), n=ui.__picks[i]; if(!n) return; var r=bxRows(list).filter(function(x){return x.name===n})[0]; if(r && !r.minus.disabled){ ui.__picks.splice(i,1); r.minus.click(); try{ ui.__say && ui.__say('Swapping '+gdnKey(n)+'? Pick another one!','oops'); }catch(e){} setTimeout(function(){ ui.__sig=''; bxSync(ui,list); },120); } }; });
      pick.querySelectorAll('.pk').forEach(function(b){ b.onclick=function(){ var cur=bxRows(list), r=cur[+b.getAttribute('data-idx')]; if(!r) return; var tot=cur.reduce(function(a,x){return a+x.qty},0); if(tot>=N || r.plus.disabled){ var s=ui.querySelector('.sum'); s.innerHTML='<b>Your box is full!</b> Tap a cake in the box to swap it.'; try{ ui.__say && ui.__say('No more room! Tap a cake in the box to swap it.','oops'); }catch(e){} ui.classList.remove('nope'); void ui.offsetWidth; ui.classList.add('nope'); return; } var ti=ui.__picks.length; bxFly(b.querySelector('img'), ui.querySelectorAll('.slot')[ti]); ui.__new=ti; ui.__picks.push(r.name); r.plus.click(); try{ ui.__say && ui.__say(gdnPick(ui, r.name)); }catch(e){} setTimeout(function(){ ui.__sig=''; bxSync(ui,list); },120); }; });
    }

    var pending=false, queue=[];
    var mo=new MutationObserver(function(muts){
      for (var i=0;i<muts.length;i++){
        var m=muts[i];
        if (m.type==='childList') for (var j=0;j<m.addedNodes.length;j++){ if(m.addedNodes[j].nodeType===1) queue.push(m.addedNodes[j]); }
        else if (m.type==='attributes' && m.target.nodeType===1){ m.target.__caDone=false; queue.push(m.target); }
      }
      if (pending) return; pending=true;
      setTimeout(function(){ pending=false; var q=queue; queue=[]; for (var k=0;k<q.length;k++){ if(document.body.contains(q[k])) scan(q[k]); } }, 120);
    });

    var W1_WAVE='<svg aria-hidden="true" viewBox="0 0 390 28" preserveAspectRatio="none" style="display:block;width:100%;height:28px"><path d="M0,0 L0,14.0 L6,15.9 L12,17.7 L18,19.3 L24,20.6 L30,21.5 L36,21.9 L42,21.9 L48,21.5 L54,20.6 L60,19.3 L66,17.7 L72,15.9 L78,14.0 L84,12.1 L90,10.3 L96,8.7 L102,7.4 L108,6.5 L114,6.1 L120,6.1 L126,6.5 L132,7.4 L138,8.7 L144,10.3 L150,12.1 L156,14.0 L162,15.9 L168,17.7 L174,19.3 L180,20.6 L186,21.5 L192,21.9 L198,21.9 L204,21.5 L210,20.6 L216,19.3 L222,17.7 L228,15.9 L234,14.0 L240,12.1 L246,10.3 L252,8.7 L258,7.4 L264,6.5 L270,6.1 L276,6.1 L282,6.5 L288,7.4 L294,8.7 L300,10.3 L306,12.1 L312,14.0 L318,15.9 L324,17.7 L330,19.3 L336,20.6 L342,21.5 L348,21.9 L354,21.9 L360,21.5 L366,20.6 L372,19.3 L378,17.7 L384,15.9 L390,14.0 L390,0 Z" fill="#780C14"></path></svg>', W1_ORN='<span class="orn" style="left:9%"><i style="height:16px"></i><b></b><em style="background:#C5D0E5"></em></span><span class="orn" style="left:29%"><i style="height:28px"></i><b></b><em style="background:#FFF0DC"></em></span><span class="orn" style="left:69%"><i style="height:22px"></i><b></b><em style="background:#C5D0E5"></em></span><span class="orn" style="left:87%"><i style="height:13px"></i><b></b><em style="background:#FFF0DC"></em></span>', W1_FLAKES='<svg aria-hidden="true" class="fl" width="12" height="12" viewBox="0 0 12 12" style="left:6%;top:8px;opacity:0.8" fill="none" stroke="#FFF0DC" stroke-width="1.6" stroke-linecap="round"><line x1="6.0" y1="6.0" x2="12.0" y2="6.0"></line><line x1="6.0" y1="6.0" x2="9.0" y2="11.2"></line><line x1="6.0" y1="6.0" x2="3.0" y2="11.2"></line><line x1="6.0" y1="6.0" x2="0.0" y2="6.0"></line><line x1="6.0" y1="6.0" x2="3.0" y2="0.8"></line><line x1="6.0" y1="6.0" x2="9.0" y2="0.8"></line><circle cx="6.0" cy="6.0" r="1.6" fill="#FFF0DC"></circle></svg><svg aria-hidden="true" class="fl" width="9" height="9" viewBox="0 0 9 9" style="left:22%;top:34px;opacity:0.7" fill="none" stroke="#FFF0DC" stroke-width="1.6" stroke-linecap="round"><line x1="4.5" y1="4.5" x2="9.0" y2="4.5"></line><line x1="4.5" y1="4.5" x2="6.8" y2="8.4"></line><line x1="4.5" y1="4.5" x2="2.3" y2="8.4"></line><line x1="4.5" y1="4.5" x2="0.0" y2="4.5"></line><line x1="4.5" y1="4.5" x2="2.2" y2="0.6"></line><line x1="4.5" y1="4.5" x2="6.8" y2="0.6"></line><circle cx="4.5" cy="4.5" r="1.6" fill="#FFF0DC"></circle></svg><svg aria-hidden="true" class="fl" width="11" height="11" viewBox="0 0 11 11" style="left:78%;top:6px;opacity:0.8" fill="none" stroke="#FFF0DC" stroke-width="1.6" stroke-linecap="round"><line x1="5.5" y1="5.5" x2="11.0" y2="5.5"></line><line x1="5.5" y1="5.5" x2="8.2" y2="10.3"></line><line x1="5.5" y1="5.5" x2="2.8" y2="10.3"></line><line x1="5.5" y1="5.5" x2="0.0" y2="5.5"></line><line x1="5.5" y1="5.5" x2="2.7" y2="0.7"></line><line x1="5.5" y1="5.5" x2="8.2" y2="0.7"></line><circle cx="5.5" cy="5.5" r="1.6" fill="#FFF0DC"></circle></svg><svg aria-hidden="true" class="fl" width="8" height="8" viewBox="0 0 8 8" style="left:90%;top:32px;opacity:0.7" fill="none" stroke="#FFF0DC" stroke-width="1.6" stroke-linecap="round"><line x1="4.0" y1="4.0" x2="8.0" y2="4.0"></line><line x1="4.0" y1="4.0" x2="6.0" y2="7.5"></line><line x1="4.0" y1="4.0" x2="2.0" y2="7.5"></line><line x1="4.0" y1="4.0" x2="0.0" y2="4.0"></line><line x1="4.0" y1="4.0" x2="2.0" y2="0.5"></line><line x1="4.0" y1="4.0" x2="6.0" y2="0.5"></line><circle cx="4.0" cy="4.0" r="1.6" fill="#FFF0DC"></circle></svg><svg aria-hidden="true" class="fl" width="7" height="7" viewBox="0 0 7 7" style="left:62%;top:2px;opacity:0.6" fill="none" stroke="#FFF0DC" stroke-width="1.6" stroke-linecap="round"><line x1="3.5" y1="3.5" x2="7.0" y2="3.5"></line><line x1="3.5" y1="3.5" x2="5.2" y2="6.5"></line><line x1="3.5" y1="3.5" x2="1.8" y2="6.5"></line><line x1="3.5" y1="3.5" x2="0.0" y2="3.5"></line><line x1="3.5" y1="3.5" x2="1.7" y2="0.5"></line><line x1="3.5" y1="3.5" x2="5.2" y2="0.5"></line><circle cx="3.5" cy="3.5" r="1.6" fill="#FFF0DC"></circle></svg>';
    function addWaves(){
      var nav=document.querySelector('nav.navbar'); if(!nav) return;
      if(!nav.classList.contains('ca-w1')){ nav.classList.add('ca-w1'); var n=document.createElement('span'); n.id='ca-noel'; n.textContent='Joyeux Noël'; nav.appendChild(n); nav.insertAdjacentHTML('beforeend',W1_FLAKES); }
      var w=document.getElementById('ca-wave'); if(!w){ w=document.createElement('div'); w.id='ca-wave'; w.setAttribute('aria-hidden','true'); w.innerHTML=W1_WAVE+W1_ORN; nav.parentNode.insertBefore(w, nav.nextSibling); }
      var b=document.getElementById('ca-xmas-banner'); if(b && b.previousElementSibling!==w){ b.classList.add('ca-pill'); w.parentNode.insertBefore(b, w.nextSibling); }
      var s=document.querySelector('section[id^="section-"]'); var band=s&&s.parentElement; if(band && !band.classList.contains('ca-band')) band.classList.add('ca-band');
    }
    var VAN_HTML='<div class="road"></div><div class="van"><svg class="vsv" viewBox="0 0 160 84" aria-hidden="true"><rect x="4" y="18" width="100" height="46" rx="10" fill="#780C14"/><path d="M104 30 h26 q10 0 16 12 l8 14 v8 h-50 z" fill="#780C14"/><path d="M110 35 h18 q6 0 10 8 l4 8 h-32 z" fill="#C5D0E5"/><rect x="14" y="26" width="58" height="22" rx="6" fill="#FFF0DC"/><text x="43" y="42" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="13" fill="#780C14">CA</text><rect x="146" y="52" width="10" height="5" rx="2" fill="#F4DCBC"/><g class="wh"><circle cx="34" cy="66" r="12" fill="#523325"/><circle cx="34" cy="66" r="4" fill="#7A4926"/><rect x="33" y="56" width="2" height="20" fill="#7A4926"/></g><g class="wh"><circle cx="126" cy="66" r="12" fill="#523325"/><circle cx="126" cy="66" r="4" fill="#7A4926"/><rect x="125" y="56" width="2" height="20" fill="#7A4926"/></g></svg></div><p class="bub">Free delivery on orders RM120 &amp; above! 🎉<small>Within 18 km of our Larkin HQ</small></p>';
    function addVan(){
      var ms=document.querySelectorAll('.modal.show'); 
      for(var i=0;i<ms.length;i++){ var m=ms[i]; if(!/Start Order/.test(m.innerText||'') || m.querySelector('#ca-van')) continue;
        var host=m.querySelector('.modal-body') || m.querySelector('.modal-content'); if(!host) continue;
        var v=document.createElement('div'); v.id='ca-van'; v.setAttribute('role','note'); v.innerHTML=VAN_HTML; host.insertBefore(v, host.firstChild); }
    }
    function tagRows(){
      var rs=document.querySelectorAll('.col-12 > div[style*="cursor: pointer"]');
      for(var i=0;i<rs.length;i++){ var r=rs[i], col=r.parentElement; if(col.classList.contains('ca-li')) continue;
        var info=r.querySelector('[style*="flex: 1 1 0%"]'), img=r.querySelector('img'); if(!info || !img || info.children.length<2) continue;
        col.classList.add('ca-li'); info.classList.add('ca-ri'); info.children[0].classList.add('ca-rt'); info.children[1].classList.add('ca-rb');
        var w=img.closest('.lazyload-wrapper'); (w && w.parentElement ? w.parentElement : img.parentElement).classList.add('ca-rimg'); }
    }
    function start(){
      addHead(); scan(document.body); addFeuille();
      setInterval(function(){
        var p=document.querySelector('.modal.show, .modal-content-wrapper, .ReactModal__Content'); document.body.classList.toggle('ca-popup', !!(p && p.getClientRects().length));
        try { boxBuilder(); } catch(e){}
        try { addWaves(); } catch(e){}
        try { tagRows(); addVan(); } catch(e){}
        var bs=document.querySelectorAll('.btn-outline-dark'); for (var i=0;i<bs.length;i++){ var b=bs[i]; b.classList.remove('ca-sel'); var bg=getComputedStyle(b).backgroundColor; var m=/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?/.exec(bg); if(m && (m[4]===undefined || +m[4]>0.2) && +m[1]<235 && Math.abs(m[1]-m[2])<12) b.classList.add('ca-sel'); }
      }, 400);
      mo.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','disabled']});
    }
    if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', start); else start();
  } catch(e) { /* never break the order form */ }
})();
