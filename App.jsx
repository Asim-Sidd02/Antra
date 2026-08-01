import React, { useEffect } from 'react';

const APP_STYLES = `
:root{
  --antra-green-900:#04463A;
  --antra-green-700:#045F4E;
  --antra-gold:#C28554;
  --antra-gold-dark:#9A6A3F;
  --antra-ivory:#F4F1ED;
  --antra-warm-white:#FBF8F3;
  --antra-white:#FFFFFF;
  --antra-ink:#3A322A;
  --antra-body:#6B553F;
  --antra-muted:#8F8478;
  --antra-line:#E3DACB;
  --font-head:'Playfair Display',Georgia,serif;
  --font-body:'Metropolis','Segoe UI',system-ui,-apple-system,sans-serif;
  --max:1240px;
  --pad:clamp(20px,5vw,64px);
  --sp-lg:clamp(56px,9vw,104px);
  --sp:clamp(56px,7vw,80px);
  --radius:6px;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto;}*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
body{margin:0;background:var(--antra-ivory);color:var(--antra-ink);font-family:var(--font-body);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased;}
img,svg{display:block;max-width:100%;}
a{color:var(--antra-green-700);text-decoration:none;}
h1,h2,h3{font-family:var(--font-head);font-weight:400;color:var(--antra-green-900);margin:0;}
p{margin:0;}
.wrap{max-width:var(--max);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad);}
h1{font-size:clamp(38px,5.4vw,68px);line-height:1.05;}
h2{font-size:clamp(30px,4vw,44px);line-height:1.15;}
h3{font-size:clamp(22px,2.4vw,26px);line-height:1.25;font-weight:500;}
.eyebrow{font-family:var(--font-body);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:var(--antra-gold-dark);}
.intro{font-size:clamp(17px,1.6vw,18px);line-height:1.65;color:var(--antra-body);}
.small{font-size:14px;line-height:1.55;color:var(--antra-body);}
.hl{font-style:italic;color:var(--antra-gold-dark);}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:var(--font-body);font-size:14px;font-weight:600;letter-spacing:.02em;min-height:44px;padding:0 24px;border-radius:var(--radius);border:1px solid transparent;cursor:pointer;transition:background .25s,color .25s,border-color .25s,transform .15s;}
.btn:focus-visible{outline:2px solid var(--antra-gold);outline-offset:2px;}
.btn--primary{background:var(--antra-gold);color:var(--antra-green-900);}
.btn--primary:hover{background:#d0a06f;}
.btn--secondary{background:var(--antra-green-700);color:var(--antra-white);}
.btn--secondary:hover{background:#05715f;color:#fff;}
.btn--ghost{background:transparent;border-color:var(--antra-line);color:var(--antra-green-700);}
.btn--ghost:hover{border-color:var(--antra-gold);color:var(--antra-gold-dark);}
.btn--onphoto{background:transparent;border-color:rgba(255,255,255,.6);color:#fff;}
.btn--onphoto:hover{background:rgba(255,255,255,.12);color:#fff;}
.tlink{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-body);font-size:14px;font-weight:600;color:var(--antra-green-700);}
.tlink:hover{color:var(--antra-gold-dark);}
.tlink svg{width:18px;height:18px;stroke:currentColor;}
.icon{width:22px;height:22px;stroke:currentColor;stroke-width:1.5;fill:none;stroke-linecap:round;stroke-linejoin:round;}
.sec{padding-top:var(--sp);padding-bottom:var(--sp);}
.sec--lg{padding-top:var(--sp-lg);padding-bottom:var(--sp-lg);}
.sec-head{max-width:600px;}
.sec-head--center{margin-left:auto;margin-right:auto;text-align:center;}
.sec-head .eyebrow{display:block;margin-bottom:14px;}
.sec-head h2{margin-bottom:14px;}
.sec-head p{color:var(--antra-body);}
.mark-divider{display:block;margin:0 auto 18px;width:52px;height:auto;}
.mark-divider svg{width:52px;height:auto;}
.site-header{position:sticky;top:0;z-index:80;background:var(--antra-warm-white);border-bottom:1px solid var(--antra-line);transition:box-shadow .3s;}
.site-header.scrolled{box-shadow:0 2px 20px rgba(58,50,42,.06);}
.nav{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-top:9px;padding-bottom:9px;min-height:66px;}
.brand{display:inline-flex;align-items:center;}
.brand svg{height:38px;width:auto;}
.nav-menu{display:flex;align-items:center;gap:32px;}
.nav-links{display:flex;align-items:center;gap:28px;list-style:none;margin:0;padding:0;}
.nav-links a{font-size:14px;font-weight:500;color:var(--antra-ink);letter-spacing:.01em;}
.nav-links a:hover{color:var(--antra-gold-dark);}
.nav-links a:focus-visible{outline:2px solid var(--antra-gold);outline-offset:3px;}
.nav-cta{display:inline-flex;}
.menu-toggle{display:none;background:none;border:0;padding:8px;cursor:pointer;color:var(--antra-green-900);}
.menu-toggle .icon{width:26px;height:26px;}
.drawer{position:fixed;inset:0;z-index:90;visibility:hidden;}
.drawer[aria-hidden="false"]{visibility:visible;}
.drawer-overlay{position:absolute;inset:0;background:rgba(4,44,36,.5);opacity:0;transition:opacity .3s;}
.drawer[aria-hidden="false"] .drawer-overlay{opacity:1;}
.drawer-panel{position:absolute;top:0;right:0;height:100%;width:min(84vw,340px);background:var(--antra-warm-white);transform:translateX(100%);transition:transform .3s;display:flex;flex-direction:column;padding:24px;gap:8px;}
.drawer[aria-hidden="false"] .drawer-panel{transform:translateX(0);}
.drawer-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.drawer-top svg{height:42px;width:auto;}
.drawer-close{background:none;border:0;padding:8px;cursor:pointer;color:var(--antra-green-900);}
.drawer nav a{display:block;padding:14px 4px;font-size:16px;font-weight:500;color:var(--antra-ink);border-bottom:1px solid var(--antra-line);}
.drawer nav a:hover{color:var(--antra-gold-dark);}
.drawer .btn{margin-top:20px;width:100%;}
.hero{position:relative;min-height:560px;display:flex;align-items:center;overflow:hidden;}
.hero-media{position:absolute;inset:0;z-index:0;}
.hero-media img{width:100%;height:100%;object-fit:cover;object-position:center right;}
.hero-media--mobile{display:none;}
.hero-inner{position:relative;z-index:2;width:100%;}
.hero-copy{max-width:500px;background:rgba(251,248,243,.7);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);border-radius:var(--radius);padding:clamp(24px,3vw,36px);}
.hero .eyebrow{color:var(--antra-gold-dark);display:block;margin-bottom:16px;}
.hero h1{color:var(--antra-green-900);margin-bottom:18px;}
.hero h1 .hl{color:var(--antra-gold-dark);}
.hero p{color:var(--antra-body);font-size:clamp(16px,1.7vw,18px);max-width:46ch;margin-bottom:28px;}
.hero-cta{display:flex;flex-wrap:wrap;gap:14px;}
.hero-block{display:none;}
.hero-stats{border-top:1px solid var(--antra-line);}
.hero-stats .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding-top:36px;padding-bottom:36px;}
.stat{position:relative;padding-left:clamp(16px,3vw,40px);}
.stat:not(:first-child)::before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);height:42px;width:1px;background:var(--antra-line);}
.stat:first-child{padding-left:0;}
.stat b{font-family:var(--font-head);font-size:clamp(28px,3vw,38px);font-weight:400;color:var(--antra-green-700);line-height:1;display:block;}
.stat span{font-size:13px;color:var(--antra-muted);margin-top:6px;display:block;}
.select-tabs{display:flex;gap:28px;border-bottom:1px solid var(--antra-line);margin:36px 0 32px;overflow-x:auto;scrollbar-width:none;}
.select-tabs::-webkit-scrollbar{display:none;}
.select-tab{position:relative;background:none;border:0;padding:0 2px 16px;font-family:var(--font-body);font-size:15px;font-weight:500;color:var(--antra-muted);cursor:pointer;white-space:nowrap;transition:color .2s;}
.select-tab[aria-selected="true"]{color:var(--antra-green-900);}
.select-tab[aria-selected="true"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--antra-gold);}
.select-tab:focus-visible{outline:2px solid var(--antra-gold);outline-offset:3px;}
.feature{display:grid;grid-template-columns:1.4fr 1fr;gap:clamp(24px,4vw,48px);align-items:stretch;}
.feature-media{position:relative;border-radius:var(--radius);overflow:hidden;min-height:400px;background:var(--antra-line);}
.feature-media picture{position:absolute;inset:0;}
.feature-media img{width:100%;height:100%;object-fit:cover;object-position:center;position:absolute;inset:0;}
.feature-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:2;width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(4,44,36,.42);color:#fff;cursor:pointer;transition:background .2s,border-color .2s,transform .15s;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);}
.feature-arrow:hover{background:rgba(4,44,36,.66);border-color:#fff;}
.feature-arrow:focus-visible{outline:2px solid var(--antra-gold);outline-offset:2px;}
.feature-arrow--prev{left:14px;}
.feature-arrow--next{right:14px;}
.feature-arrow .icon{width:20px;height:20px;}
.feature-body{display:flex;flex-direction:column;justify-content:center;}
.feature-body .eyebrow{display:block;margin-bottom:12px;}
.feature-body h3{font-size:clamp(24px,2.6vw,30px);margin-bottom:10px;}
.feature-body>p{color:var(--antra-body);margin-bottom:22px;max-width:46ch;}
.spec{display:grid;gap:0;margin-bottom:26px;border-top:1px solid var(--antra-line);}
.spec>div{display:flex;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px solid var(--antra-line);font-size:14.5px;}
.spec dt{color:var(--antra-muted);margin:0;}
.spec dd{color:var(--antra-ink);font-weight:600;margin:0;text-align:right;}
.feature-cta{display:flex;align-items:center;gap:24px;flex-wrap:wrap;}
.venue-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:8px;}
.venue{background:var(--antra-white);border:1px solid var(--antra-line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;height:460px;}
.venue-figure{flex:0 0 62%;background:var(--antra-line);overflow:hidden;}
.venue-figure img{width:100%;height:100%;object-fit:cover;}
.venue-body{flex:1 1 38%;padding:22px 24px;display:flex;flex-direction:column;gap:6px;line-height:1.45;}
.venue-body .eyebrow{color:var(--antra-gold-dark);}
.venue-body h3{font-size:21px;line-height:1.25;}
.venue-body p{color:var(--antra-body);font-size:14px;line-height:1.45;margin:0;}
.venue-body .tlink{margin-top:auto;padding-top:12px;}
.services{background:var(--antra-green-900);color:#fff;}
.services h2{color:#fff;}
.services .sec-head p{color:#CBD9D3;}
.services .eyebrow{color:#E9C9A6;}
.svc-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;margin:44px 0 56px;}
.svc-sum{display:flex;flex-direction:column;gap:10px;}
.svc-sum .icon{color:#E9C9A6;}
.svc-sum h3{color:#fff;font-size:19px;font-weight:500;}
.svc-sum p{color:#C1D2CB;font-size:14px;line-height:1.55;}
.svc-detail{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
.svc-card{display:grid;grid-template-columns:auto 1fr;gap:18px;background:rgba(255,255,255,.04);border:1px solid rgba(233,201,166,.18);border-radius:var(--radius);padding:26px;}
.svc-card .icon{color:#E9C9A6;}
.svc-card h3{color:#fff;font-size:18px;font-weight:500;margin-bottom:6px;}
.svc-card p{color:#C1D2CB;font-size:14px;line-height:1.55;}
.stories-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,64px);align-items:center;}
.quote-block .mark-divider{margin:0 0 20px;}
.quote-block blockquote{font-family:var(--font-head);font-style:italic;font-size:clamp(21px,2.5vw,27px);line-height:1.45;color:var(--antra-green-900);margin:0 0 20px;}
.quote-block cite{font-style:normal;font-size:14px;color:var(--antra-body);display:block;}
.quote-nav{display:flex;gap:10px;margin-top:26px;}
.quote-nav button{width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--antra-line);border-radius:50%;background:transparent;color:var(--antra-green-700);cursor:pointer;transition:background .2s,color .2s,border-color .2s;}
.quote-nav button:hover{background:var(--antra-green-700);color:#fff;border-color:var(--antra-green-700);}
.quote-nav button:focus-visible{outline:2px solid var(--antra-gold);outline-offset:2px;}
.quote-nav .icon{width:20px;height:20px;}
.gallery-preview{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:12px;}
.gallery-preview figure{margin:0;aspect-ratio:1;border-radius:var(--radius);overflow:hidden;background:var(--antra-line);}
.gallery-preview img{width:100%;height:100%;object-fit:cover;}
.gallery-preview a{display:flex;align-items:center;justify-content:center;background:var(--antra-warm-white);border:1px solid var(--antra-line);color:var(--antra-gold-dark);font-weight:600;font-size:14px;text-align:center;border-radius:var(--radius);aspect-ratio:1;}
.gallery-preview a:hover{border-color:var(--antra-gold);}
.visit{display:grid;grid-template-columns:1fr 1fr;background:var(--antra-warm-white);}
.visit-map{position:relative;min-height:440px;background:var(--antra-green-900);}
.visit-map img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.visit-map .pin{position:absolute;left:24px;bottom:24px;background:rgba(4,70,58,.92);color:#fff;font-size:13px;padding:10px 16px;border-radius:var(--radius);line-height:1.5;max-width:70%;}
.visit-form{padding:clamp(40px,5vw,72px) var(--pad);}
.visit-form .eyebrow{display:block;margin-bottom:12px;}
.visit-form h2{margin-bottom:12px;}
.visit-form>p{color:var(--antra-body);margin-bottom:12px;max-width:52ch;}
.visit-contact{display:flex;flex-wrap:wrap;gap:8px 22px;margin-bottom:26px;font-size:14px;}
.visit-contact a{display:inline-flex;align-items:center;gap:8px;color:var(--antra-green-700);font-weight:600;}
.visit-contact a:hover{color:var(--antra-gold-dark);}
.visit-contact .icon{width:18px;height:18px;}
form{display:grid;gap:16px;max-width:520px;}
.row-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.field{display:grid;gap:6px;}
.field label{font-size:13px;font-weight:600;color:var(--antra-ink);}
.field input,.field select{min-height:46px;border:1px solid var(--antra-line);border-radius:var(--radius);background:var(--antra-white);padding:0 14px;font-family:var(--font-body);font-size:14.5px;color:var(--antra-ink);width:100%;}
.field textarea{border:1px solid var(--antra-line);border-radius:var(--radius);background:var(--antra-white);padding:12px 14px;font-family:var(--font-body);font-size:14.5px;color:var(--antra-ink);width:100%;resize:vertical;min-height:84px;}
.field input:focus,.field select:focus,.field textarea:focus{outline:2px solid var(--antra-gold);outline-offset:1px;border-color:var(--antra-gold);}
.field .err{font-size:12.5px;color:#a23b2d;min-height:0;}
.form-foot{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:4px;}
.form-note{font-size:13px;color:var(--antra-muted);}
.site-footer{background:var(--antra-green-900);color:#C6D6CE;}
.footer-top{display:grid;grid-template-columns:1.6fr 1fr 1.1fr;gap:40px;padding-top:44px;padding-bottom:34px;}
.footer-brand svg{height:48px;width:auto;margin-bottom:14px;}
.footer-brand p{color:#A9C2B7;font-size:14px;max-width:32ch;}
.footer-col h4{font-family:var(--font-body);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:#E9C9A6;margin:0 0 16px;}
.footer-col ul{list-style:none;margin:0;padding:0;display:grid;gap:11px;}
.footer-col a,.footer-col address{color:#C6D6CE;font-size:14px;font-style:normal;line-height:1.5;}
.footer-col a:hover{color:#E9C9A6;}
.footer-cta{margin-top:18px;}
.footer-bottom{border-top:1px solid rgba(255,255,255,.12);padding-top:20px;padding-bottom:28px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:12.5px;color:#8FA79D;}
.footer-bottom .links{display:flex;gap:20px;flex-wrap:wrap;}
.footer-bottom a{color:#8FA79D;}
.footer-bottom a:hover{color:#E9C9A6;}
[data-reveal]{opacity:0;transform:translate3d(0,24px,0);transition:opacity 1s cubic-bezier(.22,1,.36,1),transform 1s cubic-bezier(.22,1,.36,1);will-change:transform,opacity;backface-visibility:hidden;}
[data-reveal].visible{opacity:1;transform:translate3d(0,0,0);}
[data-reveal-item]{opacity:0;transform:translate3d(0,16px,0);transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1);will-change:transform,opacity;backface-visibility:hidden;}
[data-reveal-item].visible{opacity:1;transform:translate3d(0,0,0);}
[data-reveal-item]:nth-child(1){transition-delay:0ms;}
[data-reveal-item]:nth-child(2){transition-delay:100ms;}
[data-reveal-item]:nth-child(3){transition-delay:200ms;}
[data-reveal-item]:nth-child(4){transition-delay:300ms;}
[data-reveal-item]:nth-child(5){transition-delay:400ms;}
[data-reveal-item]:nth-child(6){transition-delay:500ms;}
@media(max-width:1024px){
  .footer-top{grid-template-columns:1fr 1fr;gap:32px;}
}
@media(max-width:768px){
  .hero{min-height:0;display:block;}
  .hero .hero-inner{display:none;}
  .hero-media{position:relative;inset:auto;width:100%;}
  .hero-media img{position:relative;width:100%;height:auto;display:block;object-fit:cover;}
  .hero-block{display:block;background:var(--antra-warm-white);padding:32px 0 8px;}
  .hero-block h1{color:var(--antra-green-900);margin:14px 0 14px;}
  .hero-block h1 .hl{color:var(--antra-gold-dark);}
  .hero-block .eyebrow{color:var(--antra-gold-dark);display:block;}
  .hero-block p{color:var(--antra-body);font-size:17px;margin-bottom:24px;max-width:60ch;}
  .hero-block .hero-cta{display:flex;flex-wrap:wrap;gap:14px;}
}
@media(max-width:900px){
  .nav-menu{display:none;}
  .menu-toggle{display:inline-flex;}
  .feature{grid-template-columns:1fr;}
  .feature-media{min-height:280px;}
  .venue-grid{grid-template-columns:1fr 1fr;}
  .venue{height:auto;}
  .venue-figure{flex:none;aspect-ratio:16/10;}
  .venue-body{flex:none;}
  .svc-summary{grid-template-columns:1fr 1fr;gap:28px 24px;}
  .svc-detail{grid-template-columns:1fr;}
  .stories-grid{grid-template-columns:1fr;gap:32px;}
  .visit{grid-template-columns:1fr;}
  .visit-map{min-height:260px;order:-1;}
}
@media(max-width:640px){
  .hero-stats .wrap{grid-template-columns:1fr 1fr;gap:22px;}
  .stat{padding-left:0;}
  .stat::before{display:none!important;}
  .venue-grid{grid-template-columns:1fr;}
  .svc-summary{grid-template-columns:1fr;}
  .row-2{grid-template-columns:1fr;}
  .gallery-preview{grid-template-columns:1fr 1fr;}
  .footer-top{grid-template-columns:1fr;}
  .footer-bottom{justify-content:flex-start;}
}
body.no-scroll{overflow:hidden;}
`;

const APP_HTML = `
<header class="site-header" id="siteHeader">
  <div class="wrap nav">
    <a class="brand" href="#top" aria-label="Antra home">
      <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554"/>
        <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554"/>
        <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554"/>
        <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554"/>
        <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554"/>
      </svg>
    </a>
    <div class="nav-menu">
      <ul class="nav-links">
        <li><a href="#spaces">Spaces</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#visit">Contact</a></li>
      </ul>
      <a class="btn btn--primary nav-cta" href="#visit">Plan a visit</a>
    </div>
    <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </div>
</header>

<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-overlay" data-close></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu">
    <div class="drawer-top">
      <span aria-hidden="true">
        <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554"/>
          <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554"/>
          <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554"/>
          <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554"/>
          <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554"/>
        </svg>
      </span>
      <button class="drawer-close" id="drawerClose" aria-label="Close menu">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <nav aria-label="Mobile">
      <a href="#spaces" data-close>Spaces</a>
      <a href="#services" data-close>Services</a>
      <a href="#gallery" data-close>Gallery</a>
      <a href="#visit" data-close>Contact</a>
    </nav>
    <a class="btn btn--primary" href="#visit" data-close>Plan a visit</a>
  </div>
</div>

<main id="top">
  <section class="hero" aria-label="Introduction" data-reveal>
    <div class="hero-media" aria-hidden="false">
      <picture>
        <source media="(max-width:768px)" srcset="Hero page banners/Hero banner - Mobile.jpg" />
        <img src="Hero page banners/Hero banner - Desktop.jpg" alt="A couple sharing a warm moment at a celebration held at Antra Luxe" width="1600" height="690" fetchpriority="high" />
      </picture>
    </div>
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <span class="eyebrow">Patamata &middot; Vijayawada</span>
        <h1>A venue that holds <span class="hl">the whole occasion</span></h1>
        <p>Five spaces, in-house kitchens and rooms for the family — Antra Luxe brings the parts of a large gathering together under one roof.</p>
        <div class="hero-cta">
          <a class="btn btn--primary" href="#visit">Plan a visit</a>
          <a class="btn btn--secondary" href="#spaces">Explore our spaces</a>
        </div>
      </div>
    </div>
  </section>

  <section class="hero-block" aria-label="Introduction" data-reveal>
    <div class="wrap">
      <span class="eyebrow">Patamata &middot; Vijayawada</span>
      <h1>A venue that holds <span class="hl">the whole occasion</span></h1>
      <p>Five spaces, in-house kitchens and rooms for the family — Antra Luxe brings the parts of a large gathering together under one roof.</p>
      <div class="hero-cta">
        <a class="btn btn--primary" href="#visit">Plan a visit</a>
        <a class="btn btn--secondary" href="#spaces">Explore our spaces</a>
      </div>
    </div>
  </section>

  <section class="hero-stats" aria-label="Venue at a glance">
    <div class="wrap">
      <div class="stat" data-reveal-item><b>1,500</b><span>Seated in the main hall</span></div>
      <div class="stat" data-reveal-item><b>5</b><span>Distinct spaces</span></div>
      <div class="stat" data-reveal-item><b>60</b><span>Rooms on site</span></div>
      <div class="stat" data-reveal-item><b>300</b><span>Car parking spaces</span></div>
    </div>
  </section>

  <section class="sec" id="spaces" aria-labelledby="spaces-h" data-reveal>
    <div class="wrap">
      <div class="sec-head">
        <span class="eyebrow">Featured spaces</span>
        <h2 id="spaces-h">Look closer at a single room</h2>
        <p>Move through each space to see how it is set up, who it suits and what it holds.</p>
      </div>

      <div class="select-tabs" role="tablist" aria-label="Choose a space" id="tablist"></div>

      <div class="feature">
        <div class="feature-media">
          <picture>
            <source id="featureSrcMobile" media="(max-width:768px)" srcset="" />
            <img id="featureImg" src="" alt="" width="720" height="520" loading="lazy" />
          </picture>
          <button class="feature-arrow feature-arrow--prev" id="featurePrev" type="button" aria-label="Previous space">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>
          </button>
          <button class="feature-arrow feature-arrow--next" id="featureNext" type="button" aria-label="Next space">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </button>
        </div>
        <div class="feature-body">
          <span class="eyebrow" id="featureTag"></span>
          <h3 id="featureName"></h3>
          <p id="featureDesc"></p>
          <dl class="spec" id="featureSpec"></dl>
          <div class="feature-cta">
            <a class="btn btn--secondary" href="#visit">Enquire about this space</a>
            <a class="tlink" href="#gallery">View gallery
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec sec--lg services" id="services" aria-labelledby="services-h" data-reveal>
    <div class="wrap">
      <div class="sec-head" style="margin-bottom: 44px;">
        <span class="eyebrow">Support</span>
        <h2 id="services-h">Held together by one team</h2>
        <p>The parts that usually take a dozen vendors are handled in-house, by people who know the building.</p>
      </div>

      <div class="svc-detail">
        <article class="svc-card" data-reveal-item>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2"/><path d="M5 2v20"/><path d="M15 2v20"/><path d="M15 8a4 4 0 0 0 4-4V2"/></svg>
          <div><h3>Catering &amp; culinary</h3><p>A resident kitchen brigade cooks South Indian, North Indian and continental menus, with Jain, vegan and allergen-aware options. Tastings are arranged before anything is confirmed.</p></div>
        </article>
        <article class="svc-card" data-reveal-item>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
          <div><h3>Guest accommodation</h3><p>Sixty rooms and suites sit on the property and are held together as a block, so out-of-town families and the wedding party stay a short walk from the hall.</p></div>
        </article>
        <article class="svc-card" data-reveal-item>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <div><h3>Event coordination</h3><p>One coordinator owns the timeline and the vendors, from the first site visit through to the floor on the day, so the hosts can stay with their guests.</p></div>
        </article>
        <article class="svc-card" data-reveal-item>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10.5 15.5 6c-.3-.6-.9-1-1.6-1H5c-.7 0-1.3.4-1.6 1L1 10.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
          <div><h3>Parking &amp; amenities</h3><p>Three hundred parking spaces with valet, house sound and stage lighting, backup power and connectivity — the practical layer a large gathering leans on.</p></div>
        </article>
      </div>
    </div>
  </section>

  <section class="sec" id="gallery" aria-labelledby="stories-h" data-reveal>
    <div class="wrap">
      <h2 id="stories-h" class="visually-hidden" style="position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0);">Stories and gallery</h2>
      <div class="stories-grid">
        <div class="quote-block">
          <span class="mark-divider" aria-hidden="true"><svg width="102" height="101" viewBox="0 0 102 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M64.8128 100.583L63.2553 101L51 56.1567L38.7447 101L37.4936 100.666L2.43191 35.5886C3.01915 33.7479 3.70851 31.9585 4.49361 30.2141L38.0426 96.4977L38.566 94.4518L9.7851 21.0684C10.8191 19.6382 11.9234 18.2657 13.0979 16.9573L39.6638 90.1676L40.5575 86.6979L20.7 10.0243C22.0404 9.02381 23.4383 8.09385 24.8745 7.22803L41.9936 81.0925L43.6532 74.634L34.0532 2.90532C35.5851 2.36659 37.1426 1.89199 38.7383 1.49435L45.7468 66.4889L49.3787 52.3407L48.7085 0.0577216C49.4681 0.0256541 50.234 0 51 0C51.8553 0 52.7106 0.0256541 53.5596 0.0641351L52.6021 52.2765L56.4383 67.2264L63.5234 1.5649C65.1128 1.96895 66.6766 2.44996 68.2021 3.00152L58.5192 75.3267L60.1404 81.6504L77.3553 7.36913C78.7915 8.24136 80.183 9.18415 81.517 10.1911L61.5702 87.2238L62.4383 90.6037L89.0809 17.1754C90.2489 18.4966 91.3468 19.8755 92.3809 21.3121L63.5362 94.8687L64.0468 96.8505L97.6277 30.4963C98.4 32.2471 99.0894 34.0493 99.6638 35.8964L64.8064 100.583H64.8128ZM80.4383 93.0729L95.2468 76.7056C97.0979 73.4604 98.6234 69.9971 99.7404 66.3542L72.9957 97.4854C75.6128 96.2283 78.0894 94.7468 80.4383 93.0729ZM101.802 46.8828L66.1979 100.166C67.5383 99.7429 68.8532 99.2619 70.1426 98.736L101.936 53.7068C101.974 52.8922 102 52.0649 102 51.2376C102 49.7689 101.923 48.3194 101.802 46.8828ZM6.28723 75.8975L22.3149 93.6116C24.5681 95.1509 26.9489 96.5105 29.4383 97.6778L2.12553 65.886C3.16595 69.3942 4.56383 72.7485 6.28723 75.8975ZM0 51.244C0 51.9366 0.0255282 52.6293 0.0510601 53.3155L32.2277 98.8835C33.5043 99.3902 34.8064 99.8584 36.134 100.262L0.223403 46.5236C0.0829777 48.0757 0 49.647 0 51.244Z" fill="url(#paint0_linear_262_52)"/>
<defs>
<linearGradient id="paint0_linear_262_52" x1="51" y1="4.64338" x2="51" y2="100.275" gradientUnits="userSpaceOnUse">
<stop stop-color="#E8B077"/>
<stop offset="1" stop-color="#7A5737"/>
</linearGradient>
</defs>
</svg></span>
          <blockquote id="qText">The venue felt thoughtfully planned from the moment our guests arrived. The team managed the flow beautifully, allowing both families to enjoy the evening without worrying about the details.</blockquote>
          <cite id="qCite">Niharika &amp; Varun &middot; Wedding Reception</cite>
          <div class="quote-nav">
            <button id="qPrev" aria-label="Previous testimonial" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg></button>
            <button id="qNext" aria-label="Next testimonial" type="button"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg></button>
          </div>
        </div>
        <div class="gallery-preview">
          <figure data-reveal-item><img src="Gallery images/Reception setup.jpg" alt="Reception set up in the main hall" width="320" height="320" loading="lazy" /></figure>
          <figure data-reveal-item><img src="Gallery images/Lawn event.jpg" alt="An event on the lawn" width="320" height="320" loading="lazy" /></figure>
          <figure data-reveal-item><img src="Gallery images/floral detail.jpg" alt="Table and floral detail" width="320" height="320" loading="lazy" /></figure>
          <a href="#" aria-label="View the full gallery">View full gallery</a>
        </div>
      </div>
    </div>
  </section>

  <section class="visit" id="visit" aria-labelledby="visit-h" data-reveal>
    <div class="visit-map">
      <span class="pin">Donka Road, Patamata &middot; Vijayawada 520010</span>
    </div>
    <div class="visit-form">
      <span class="eyebrow">Visit &amp; enquire</span>
      <h2 id="visit-h">At the Heart of Vijayawada</h2>
      <p>We are easy to reach from across the city, with parking on site and someone to walk you through dates and details in person.</p>
      <form id="enquiryForm" novalidate>
        <div class="row-2">
          <div class="field"><label for="f-first">First name</label><input id="f-first" name="firstName" type="text" autocomplete="given-name" required aria-required="true" /><span class="err" data-for="f-first" aria-live="polite"></span></div>
          <div class="field"><label for="f-last">Last name</label><input id="f-last" name="lastName" type="text" autocomplete="family-name" required aria-required="true" /><span class="err" data-for="f-last" aria-live="polite"></span></div>
        </div>
        <div class="row-2">
          <div class="field"><label for="f-email">Email address</label><input id="f-email" name="email" type="email" autocomplete="email" required aria-required="true" /><span class="err" data-for="f-email" aria-live="polite"></span></div>
          <div class="field"><label for="f-phone">Contact number</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required aria-required="true" /><span class="err" data-for="f-phone" aria-live="polite"></span></div>
        </div>
        <div class="row-2">
          <div class="field"><label for="f-type">Event type</label>
            <select id="f-type" name="type">
              <option value="">Please choose</option>
              <option>Wedding</option><option>Reception</option><option>Conference</option>
              <option>Milestone or birthday</option><option>Cultural or social</option><option>Other</option>
            </select>
          </div>
          <div class="field"><label for="f-start">Start date</label><input id="f-start" name="startDate" type="date" /></div>
        </div>
        <div class="row-2">
          <div class="field"><label for="f-end">End date</label><input id="f-end" name="endDate" type="date" /></div>
          <div class="field" aria-hidden="true"></div>
        </div>
        <div class="field"><label for="f-msg">Message (optional)</label><textarea id="f-msg" name="message" rows="3"></textarea></div>
        <div class="form-foot">
          <button class="btn btn--primary" type="submit">Submit enquiry</button>
        </div>
        <p class="form-note" id="formStatus" role="status" aria-live="polite" hidden></p>
      </form>
    </div>
  </section>
</main>

<footer class="site-footer" data-reveal>
  <div class="wrap footer-top">
    <div class="footer-brand">
      <svg width="183" height="152" viewBox="0 0 183 152" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4833 94.2578H14.5715L29.0548 126.565H25.5098L22.0971 118.884H6.90871L3.589 126.565H0L14.4833 94.2578ZM20.8583 116.103C18.5571 110.853 16.5643 106.261 14.5225 101.274C12.4856 106.261 10.4928 110.853 8.19155 116.103H20.8583Z" fill="#C28554"/>
        <path d="M47.6997 103.747C47.3913 103.396 47.0387 102.996 46.7694 102.645C46.7694 103.528 46.8135 104.455 46.8135 105.47V126.569H43.4448V94.2617H43.4889L63.8184 117.61L64.7487 118.713C64.7487 117.83 64.7046 116.946 64.7046 115.887V94.7887H68.0684V127.096H68.0244L47.6948 103.747H47.6997Z" fill="#C28554"/>
        <path d="M96.0607 97.6104V126.565H92.6969V97.6104H82.9092V94.7852H105.893V97.6104H96.0607Z" fill="#C28554"/>
        <path d="M130.83 94.7852C137.562 94.7852 141.68 98.3179 141.68 104.232C141.68 109.043 138.669 112.176 134.683 113.147L142.169 126.565H138.404L131.363 113.635H124.102V126.565H120.738V94.7852H130.834H130.83ZM124.097 97.6104V110.853H130.918C135.525 110.853 138.272 108.379 138.272 104.232C138.272 100.084 135.437 97.6104 130.697 97.6104H124.097Z" fill="#C28554"/>
        <path d="M168.429 94.2578H168.517L183 126.565H179.455L176.042 118.884H160.849L157.529 126.565H153.94L168.424 94.2578H168.429ZM174.809 116.103C172.507 110.853 170.514 106.261 168.473 101.274C166.436 106.261 164.443 110.853 162.142 116.103H174.809Z" fill="#C28554"/>
      </svg>
      <p>A convention and celebration venue in Patamata, Vijayawada.</p>
    </div>
    <div class="footer-col">
      <h4>Explore</h4>
      <ul>
        <li><a href="#spaces">Spaces</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#gallery">Gallery</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <address>Donka Road, Patamata,<br>Vijayawada 520010</address>
      <a class="btn btn--primary footer-cta" href="#visit">Plan a visit</a>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>&copy; 2026 Antra Luxe. All rights reserved.</span>
    <span class="links"><a href="#">Privacy policy</a><a href="#">Terms of service</a></span>
  </div>
</footer>
`;

export default function App() {
  useEffect(() => {
    const header = document.getElementById('siteHeader');
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const drawer = document.getElementById('drawer');
    const toggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('drawerClose');

    const openDrawer = () => {
      if (!drawer || !toggle) return;
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
      const focusTarget = drawer.querySelector('a,button');
      if (focusTarget) focusTarget.focus();
    };

    const closeDrawer = () => {
      if (!drawer || !toggle) return;
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      toggle.focus();
    };

    toggle?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    drawer?.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer?.getAttribute('aria-hidden') === 'false') {
        closeDrawer();
      }
    });

    const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-item]');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                target.classList.add('visible');
              });
            });
            revealObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    requestAnimationFrame(() => {
      revealTargets.forEach((target) => revealObserver.observe(target));
    });

    const spaces = [
      { name: 'Grand Banquet Hall', tag: 'Indoor · Air-conditioned', desc: 'The main indoor room — wide, column-free and set up as easily for a wedding dinner as a company conference.', spec: [['Seated dinner', '1,500 guests'], ['Floor area', '12,000 sq ft'], ['Stage & LED wall', 'Included'], ['Best for', 'Receptions, conferences']], imgD: 'Featured-space images (Desktop)/Grand Banquet Hall - Desktop.jpg', imgM: 'Featured-space images (Mobile)/Grand Banquet Hall - Mobile.jpg', alt: 'The Grand Banquet Hall set for a reception' },
      { name: 'The Lawn', tag: 'Open-air · Evening-lit', desc: 'A landscaped stretch of green, lit for the evening and open to the sky, for the parts of a wedding that spill outdoors.', spec: [['Standing', '2,000 guests'], ['Area', '18,000 sq ft'], ['Cover', 'Marquee available'], ['Best for', 'Mehendi, sangeet, haldi']], imgD: 'Featured-space images (Desktop)/The Lawn - Desktop.jpg', imgM: 'Featured-space images (Mobile)/The Lawn - Mobile.jpg', alt: 'The landscaped lawn lit for an evening gathering' },
      { name: 'Pre-function Foyer', tag: 'Arrival · Climate-controlled', desc: 'A calm indoor area to gather guests before the doors open — welcome drinks, registration or a small exhibition.', spec: [['Reception', '400 guests'], ['Area', '3,500 sq ft'], ['Desks', 'Included'], ['Best for', 'Welcome drinks, expos']], imgD: 'Featured-space images (Desktop)/Pre-function Foyer - Desktop.jpg', imgM: 'Featured-space images (Mobile)/Pre-function Foyer - Mobile.jpg', alt: 'The climate-controlled pre-function foyer' },
      { name: 'Board Room', tag: 'Meetings · AV-equipped', desc: 'A private, fully wired room for briefings, interviews and smaller working sessions away from the main floor.', spec: [['Boardroom', '40 guests'], ['Area', '900 sq ft'], ['Video conf.', 'Included'], ['Best for', 'Meetings, briefings']], imgD: 'Featured-space images (Desktop)/Board Room - Desktop.jpg', imgM: 'Featured-space images (Mobile)/Board Room - Mobile.jpg', alt: 'The private board room equipped for meetings' },
      { name: 'Guest Suites & Rooms', tag: 'Stay · On the property', desc: 'Rooms and suites on site, held as a block, so families and the wedding party stay a short walk from the hall.', spec: [['Keys', '60 rooms'], ['Suites', '6'], ['Rate', 'Fixed event block'], ['Best for', 'Out-of-town families']], imgD: 'Featured-space images (Desktop)/Guest Suites & Rooms - Desktop.jpg', imgM: 'Featured-space images (Desktop)/Guest Suites & Rooms - Desktop.jpg', alt: 'A guest suite for families staying on the property' }
    ];

    const tablist = document.getElementById('tablist');
    const fName = document.getElementById('featureName');
    const fTag = document.getElementById('featureTag');
    const fDesc = document.getElementById('featureDesc');
    const fSpec = document.getElementById('featureSpec');
    const fImg = document.getElementById('featureImg');
    const fSrcM = document.getElementById('featureSrcMobile');
    let current = 0;
    const tabs = [];

    const renderSpace = (index) => {
      const item = spaces[index];
      if (!item || !fName || !fTag || !fDesc || !fSpec || !fImg) return;

      fName.textContent = item.name;
      fTag.textContent = item.tag;
      fDesc.textContent = item.desc;
      fSpec.innerHTML = item.spec.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
      fImg.src = item.imgD;
      fImg.alt = item.alt;
      if (fSrcM) fSrcM.srcset = item.imgM;

      tabs.forEach((tab, idx) => {
        tab.setAttribute('aria-selected', idx === index ? 'true' : 'false');
        tab.tabIndex = idx === index ? 0 : -1;
      });
      current = index;
    };

    spaces.forEach((space, index) => {
      const button = document.createElement('button');
      button.className = 'select-tab';
      button.type = 'button';
      button.textContent = space.name;
      button.setAttribute('role', 'tab');
      button.id = `tab-${index}`;
      button.setAttribute('aria-selected', 'false');
      button.tabIndex = -1;
      button.addEventListener('click', () => renderSpace(index));
      button.addEventListener('keydown', (event) => {
        let nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % spaces.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + spaces.length) % spaces.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = spaces.length - 1;

        if (nextIndex !== null) {
          event.preventDefault();
          renderSpace(nextIndex);
          tabs[nextIndex]?.focus();
        }
      });
      tablist?.appendChild(button);
      tabs.push(button);
    });
    renderSpace(0);

    const prevBtn = document.getElementById('featurePrev');
    const nextBtn = document.getElementById('featureNext');
    prevBtn?.addEventListener('click', () => renderSpace((current - 1 + spaces.length) % spaces.length));
    nextBtn?.addEventListener('click', () => renderSpace((current + 1) % spaces.length));

    const quotes = [
      { text: 'The venue felt thoughtfully planned from the moment our guests arrived. The team managed the flow beautifully, allowing both families to enjoy the evening without worrying about the details.', cite: 'Niharika & Varun · Wedding Reception' },
      { text: 'Having the hall, guest rooms and event support in one place made the entire wedding weekend much easier for our family.', cite: 'Sravya & Aditya · Wedding Celebrations' },
      { text: 'The spaces worked equally well for our formal conference presentations and the more intimate family reception the following evening.', cite: 'Ramesh & Priya · Corporate + Social' },
      { text: 'From the morning ceremonies to the late-night celebrations, everything was cared for. We only had to show up and enjoy our own wedding.', cite: 'Anjali & Karthik · Wedding' }
    ];

    const qText = document.getElementById('qText');
    const qCite = document.getElementById('qCite');
    let quoteIndex = 0;

    const showQuote = (index) => {
      if (!qText || !qCite) return;
      quoteIndex = index;
      qText.textContent = quotes[index].text;
      qCite.innerHTML = quotes[index].cite;
    };

    document.getElementById('qPrev')?.addEventListener('click', () => showQuote((quoteIndex - 1 + quotes.length) % quotes.length));
    document.getElementById('qNext')?.addEventListener('click', () => showQuote((quoteIndex + 1) % quotes.length));

    const form = document.getElementById('enquiryForm');
    const formStatus = document.getElementById('formStatus');
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        const err = form.querySelector(`[data-for="${field.id}"]`);
        if (!field.value.trim()) {
          valid = false;
          if (err) err.textContent = 'Required';
        } else if (err) {
          err.textContent = '';
        }
      });

      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value && !/^[^@]+@[^@]+\.[^@]+$/.test(emailField.value)) {
        valid = false;
        const err = form.querySelector(`[data-for="${emailField.id}"]`);
        if (err) err.textContent = 'Enter a valid email';
      }

      if (valid && formStatus) {
        formStatus.hidden = false;
        formStatus.textContent = 'Thank you — your enquiry has been noted. We will be in touch shortly.';
      }
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      toggle?.removeEventListener('click', openDrawer);
      closeBtn?.removeEventListener('click', closeDrawer);
      drawer?.querySelectorAll('[data-close]').forEach((el) => el.removeEventListener('click', closeDrawer));
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style>{APP_STYLES}</style>
      <div dangerouslySetInnerHTML={{ __html: APP_HTML }} />
    </>
  );
}
