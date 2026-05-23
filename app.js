    {id:'GG', label:'GG', altura:76,  largura:54},
    {id:'XG', label:'XG', altura:82,  largura:65.5},
  ],
  moletom:[
    {id:'P',  label:'P',  altura:62,  largura:52},
    {id:'M',  label:'M',  altura:65,  largura:54},
    {id:'G',  label:'G',  altura:68,  largura:57},
    {id:'GG', label:'GG', altura:70,  largura:60},
    {id:'XG', label:'XG', altura:74,  largura:65},
  ],
};
let sizesDB = JSON.parse(JSON.stringify(DEFAULT_SIZES));

// ══════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════

const STORAGE_BASE = 'https://firebasestorage.googleapis.com/v0/b/app-vendas-estampas.firebasestorage.app/o';

// Monta URL do mockup no Firebase Storage
function imgSrc(key){
  const parts = key.split('-');
  const prod  = parts[0];
  const view  = parts.slice(1).join('-');

  const viewMap = {
    'frente':  'FRENTE',
    'costas':  'COSTAS',
    'lat-dir': 'LATERAL_DIREITO',
    'lat-esq': 'LATERAL_ESQUERDO',
  };
  const colorMap = {
    'branco': 'BRANCO',
    'preto':  'PRETO',
    'cinza':  'CINZA',
  };

  const prodLabel  = prod.toUpperCase();
  const viewLabel  = viewMap[view]  || 'FRENTE';
  const colorLabel = colorMap[color] || 'BRANCO';

  const filename = `${prodLabel}_${viewLabel}_${colorLabel}.webp`;
  return `${STORAGE_BASE}/mockups%2F${filename}?alt=media`;
}

const VIEWS = [
  {key:'frente',  label:'Frente'},
  {key:'lat-dir', label:'Manga Direita'},
  {key:'costas',  label:'Costas'},
  {key:'lat-esq', label:'Manga Esquerda'},
];

const ZONES = {
  'camiseta-frente':[
    {id:'peito-grande',  top:17.0, left:25.4, w:49.2, h:43.0},
    {id:'peito-central', top:17.0, left:25.4, w:49.2, h:12.1},
    {id:'peito-esq',     top:17.0, left:25.4, w:12.7, h:10.9},
    {id:'peito-dir',     top:17.0, left:61.9, w:12.7, h:10.9},
  ],
  'camiseta-costas':[
    {id:'costas-grande',  top:10.0, left:28.5, w:43.0, h:43.0},
    {id:'costas-central', top:10.0, left:28.5, w:43.0, h:10.0},
  ],
  'camiseta-lat-dir':[
    {id:'manga-dir', top:18.0, left:20.0, w:38.0, h:17.0},
  ],
  'camiseta-lat-esq':[
    {id:'manga-esq', top:18.0, left:42.0, w:38.0, h:17.0},
  ],
  // Moletom — zonas calibradas
  'moletom-frente':[
    {id:'peito-grande',  top:38.0, left:29.0, w:46.0, h:32.2},
    {id:'peito-central', top:38.0, left:29.0, w:46.0, h:10.1},
    {id:'peito-esq',     top:38.0, left:29.0, w:12.0, h:10.1},
    {id:'peito-dir',     top:38.0, left:63.0, w:12.0, h:10.1},
  ],
  'moletom-costas':[
    {id:'costas-grande',  top:33.0, left:28.0, w:44.0, h:38.0},
    {id:'costas-central', top:33.0, left:28.0, w:44.0, h:10.0},
  ],
  // Mangas moletom calibradas
  'moletom-lat-dir':[
    {id:'manga-dir', top:54.0, left:14.0, w:33.4, h:38.0, rotate:-13},
  ],
  'moletom-lat-esq':[
    {id:'manga-esq', top:54.0, left:49.0, w:33.4, h:38.0, rotate:6},
  ],
};

const POS_META = {
  'peito-grande':   {label:'Frente Total'},
  'peito-central':  {label:'Frente Central'},
  'peito-esq':      {label:'Frente Esquerda'},
  'peito-dir':      {label:'Frente Direita'},
  'costas-grande':  {label:'Costas Total'},
  'costas-central': {label:'Costas Central'},
  'manga-dir':      {label:'Manga Direita'},
  'manga-esq':      {label:'Manga Esquerda'},
};

const ZONE_COLORS = {
  'peito-grande':  {fill:'rgba(255,69,0,0.10)',   border:'rgba(255,69,0,0.45)'},
  'peito-central': {fill:'rgba(255,170,0,0.10)',  border:'rgba(255,170,0,0.45)'},
  'peito-esq':     {fill:'rgba(0,212,160,0.10)',  border:'rgba(0,212,160,0.45)'},
  'peito-dir':     {fill:'rgba(100,160,255,0.10)',border:'rgba(100,160,255,0.45)'},
  'costas-grande': {fill:'rgba(255,69,0,0.10)',   border:'rgba(255,69,0,0.45)'},
  'costas-central':{fill:'rgba(255,170,0,0.10)',  border:'rgba(255,170,0,0.45)'},
  'manga-dir':     {fill:'rgba(200,100,255,0.10)',border:'rgba(200,100,255,0.45)'},
  'manga-esq':     {fill:'rgba(200,100,255,0.10)',border:'rgba(200,100,255,0.45)'},
};

const DEFAULT_DB = {
  'peito-grande':[
    {code:'CAR001',name:'Mustang 67',price:35,emoji:'🚗'},
    {code:'CAR002',name:'Chevrolet Bel Air',price:35,emoji:'🚙'},
    {code:'CAR003',name:'Dodge Charger',price:35,emoji:'🏎️'},
    {code:'CAR004',name:'VW Fusca Clássico',price:30,emoji:'🚘'},
    {code:'CAR005',name:'Ford Galaxy',price:35,emoji:'🚕'},
    {code:'CAR006',name:'Kombi Retrô',price:30,emoji:'🚐'},
  ],
  'costas-grande':[
    {code:'COS001',name:'Route 66 Panorama',price:40,emoji:'🛣️'},
    {code:'COS002',name:'Garage King',price:40,emoji:'🏁'},
    {code:'COS003',name:'V8 Engine Art',price:40,emoji:'⚙️'},
    {code:'COS004',name:'Muscle Cars Era',price:40,emoji:'💪'},
  ],
  'peito-central': [{code:'CEN001',name:'Logo Central',price:25,emoji:'🎯'},{code:'CEN002',name:'Brand Tag',price:25,emoji:'🏷️'}],
  'peito-dir':     [{code:'PD001',name:'Logo Pistão',price:20,emoji:'🔧'},{code:'PD002',name:'Skull Wrench',price:20,emoji:'💀'},{code:'PD003',name:'Star Badge',price:20,emoji:'⭐'}],
  'peito-esq':     [{code:'PE001',name:'Logo Pistão',price:20,emoji:'🔧'},{code:'PE002',name:'Skull Wrench',price:20,emoji:'💀'},{code:'PE003',name:'Speed Flag',price:20,emoji:'🚩'}],
  'costas-central':[{code:'CC001',name:'Costas Tag Central',price:25,emoji:'🎯'},{code:'CC002',name:'Neck Label Art',price:25,emoji:'🏷️'}],
  'manga-dir':     [{code:'MD001',name:'Chamas Laterais',price:25,emoji:'🔥'},{code:'MD002',name:'Racing Stripe',price:25,emoji:'⚡'}],
  'manga-esq':     [{code:'ME001',name:'Chamas Laterais',price:25,emoji:'🔥'},{code:'ME002',name:'Racing Number',price:25,emoji:'🔢'}],
};

// ══════════════════════════════════════════════════════
// FIREBASE
// ══════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey:"AIzaSyD2jI0m2xr7AguLT0uUCIRV6aztM6z6CDc",
  authDomain:"app-vendas-estampas.firebaseapp.com",
  projectId:"app-vendas-estampas",
  storageBucket:"app-vendas-estampas.firebasestorage.app",
  messagingSenderId:"1087493916351",
  appId:"1:1087493916351:web:5867910ead8ad9cf85680a"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

function setSyncStatus(ok){
  const d = document.getElementById('syncDot');
  d.className = 'sync-dot' + (ok===true?'':ok===false?' err':' warn');
}

function saveImgsLocal(){
  const cache={};
  for(const [pid,stamps] of Object.entries(stampsDB)){
    for(const s of stamps){
      if(s.imgUrl){
        if(!cache[pid]) cache[pid]={};
        cache[pid][s.code]=s.imgUrl;
      }
    }
  }
  try{ localStorage.setItem('dtf_imgs',JSON.stringify(cache)); }catch(e){}
}
function loadImgsLocal(){
  try{ return JSON.parse(localStorage.getItem('dtf_imgs')||'{}'); }catch(e){ return {}; }
}
function mergeImgs(dbObj,cache){
  for(const [pid,stamps] of Object.entries(dbObj))
    for(const s of stamps)
      if(cache[pid]?.[s.code]) s.imgUrl=cache[pid][s.code];
}
function stripImgs(dbObj){
  const c={};
  for(const [pid,stamps] of Object.entries(dbObj))
    c[pid]=stamps.map(({imgUrl,...rest})=>rest);
  return c;
}

async function saveDB(){
  saveImgsLocal();
  try{ localStorage.setItem('dtf_db',JSON.stringify(stampsDB)); }catch(e){}
  try{ localStorage.setItem('dtf_sizes',JSON.stringify(sizesDB)); }catch(e){}
  try{
    setSyncStatus(null);
    const clean=stripImgs(stampsDB);
    for(const [pid,stamps] of Object.entries(clean))
      await db.collection('config').doc('stamps_'+pid).set({pid,stamps});
    await db.collection('config').doc('manifest').set({
      positions:Object.keys(clean),
      updatedAt:firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('config').doc('sizes').set({sizes:sizesDB});
    setSyncStatus(true);
  }catch(e){
    console.error('saveDB:',e);
    setSyncStatus(false);
  }
}

async function loadDBFromCloud(){
  setSyncStatus(null);
  const cache=loadImgsLocal();
  try{
    const manifest=await db.collection('config').doc('manifest').get();
    if(manifest.exists){
      const positions=manifest.data().positions||[];
      const newDB={};
      for(const pid of positions){
        const doc=await db.collection('config').doc('stamps_'+pid).get();
        if(doc.exists && doc.data().stamps) newDB[pid]=doc.data().stamps;
      }
      if(Object.keys(newDB).length>0){
        stampsDB=newDB; mergeImgs(stampsDB,cache);
        setSyncStatus(true); renderAdmin(); return;
      }
    }
    const doc=await db.collection('config').doc('stamps').get();
    if(doc.exists && doc.data().data){
      stampsDB=JSON.parse(doc.data().data);
      for(const stamps of Object.values(stampsDB))
        for(const s of stamps) delete s.imgUrl;
      mergeImgs(stampsDB,cache);
      setSyncStatus(true); saveDB(); renderAdmin(); return;
    }
    stampsDB=JSON.parse(JSON.stringify(DEFAULT_DB));
    mergeImgs(stampsDB,cache);
    setSyncStatus(true);
  }catch(e){
    console.warn('Firebase offline:',e.message);
    setSyncStatus(false);
    const local=localStorage.getItem('dtf_db');
    stampsDB=local?JSON.parse(local):JSON.parse(JSON.stringify(DEFAULT_DB));
    mergeImgs(stampsDB,cache);
  }
  // Load sizes
  try{
    const sdoc=await db.collection('config').doc('sizes').get();
    if(sdoc.exists && sdoc.data().sizes) sizesDB=sdoc.data().sizes;
    else {
      const ls=localStorage.getItem('dtf_sizes');
      if(ls) sizesDB=JSON.parse(ls);
    }
  }catch(e){
    const ls=localStorage.getItem('dtf_sizes');
    if(ls) sizesDB=JSON.parse(ls);
  }
  // Load mockup background
  try{
    const bdoc=await db.collection('config').doc('mockupBg').get();
    if(bdoc.exists && bdoc.data().color){
      mockupBg=bdoc.data().color;
      document.getElementById('mockupStage').style.background=mockupBg;
    }
  }catch(e){
    const lb=localStorage.getItem('dtf_mockupBg');
    if(lb){ mockupBg=lb; document.getElementById('mockupStage').style.background=mockupBg; }
  }
  renderAdmin();
}

async function saveOrderToCloud(order){
  const cleanStamps={};
  for(const [pid,s] of Object.entries(order.stamps)){
    const {imgUrl,...rest}=s; cleanStamps[pid]=rest;
  }
  try{
    await db.collection('pedidos').doc(order.code).set({
      code:order.code,
      datetime:order.datetime,
      garment:order.garment,
      color: order.color||'branco',
      total:order.total,
      size: order.size||'',
      clientName: order.clientName||'',
      clientPhone: order.clientPhone||'',
      stamps:JSON.stringify(cleanStamps),
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    });
    setSyncStatus(true);
  }catch(e){
    console.error('saveOrder:',e);
    setSyncStatus(false);
    const orders=JSON.parse(localStorage.getItem('dtf_orders')||'[]');
    orders.unshift(order);
    try{ localStorage.setItem('dtf_orders',JSON.stringify(orders)); }catch(ex){}
  }
}

async function loadOrdersFromCloud(){
  try{
    const snap=await db.collection('pedidos').orderBy('createdAt','desc').limit(100).get();
    ordersHistory=snap.docs.map(d=>{
      const data=d.data();
      return {...data, stamps:typeof data.stamps==='string'?JSON.parse(data.stamps):(data.stamps||{})};
    });
    setSyncStatus(true);
  }catch(e){
    const local=localStorage.getItem('dtf_orders');
    ordersHistory=local?JSON.parse(local):[];
  }
  renderOrders();
}

// ══════════════════════════════════════════════════════
// APP STATE
// ══════════════════════════════════════════════════════
let stampsDB      = JSON.parse(JSON.stringify(DEFAULT_DB));
let ordersHistory = [];
let garment       = 'camiseta';
let color         = 'branco'; // branco | preto | cinza
let mockupBg      = '#0d2233'; // cor de fundo — configurável pelo admin
let mockupBgImg   = null;      // imagem de fundo WebP
let viewIdx       = 0;
let selected      = {};
let activePosId   = null;
let hoverStamp    = null;

function currentViewKey(){ return garment+'-'+VIEWS[viewIdx].key; }

// ══════════════════════════════════════════════════════
// MOCKUP RENDERING
// ══════════════════════════════════════════════════════
function renderMockup(){
  const key = currentViewKey();
  const img = document.getElementById('mockupImg');
  const stage = document.getElementById('mockupStage');
  // Apply background
  stage.style.background = mockupBg;
  if(mockupBgImg){
    stage.style.backgroundImage = `url(${mockupBgImg})`;
    stage.style.backgroundSize = 'cover';
    stage.style.backgroundPosition = 'center';
  }
  // Item 3 — Blend mode dinâmico por cor da camiseta
  updateStampBlendMode();
  img.onload = placeZones;
  img.src = imgSrc(key);
  if(img.complete && img.naturalWidth) placeZones();
  let cordaoEl = document.getElementById('cordaoImg');
  if(garment === 'moletom' && VIEWS[viewIdx].key === 'frente'){
    if(!cordaoEl){
      cordaoEl = document.createElement('img');
      cordaoEl.id = 'cordaoImg';
      cordaoEl.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none;z-index:10;';
      stage.appendChild(cordaoEl);
    }
    cordaoEl.src = `${STORAGE_BASE}/mockups%2FCORDAO_${(color==='preto'?'PRETO':color==='cinza'?'CINZA':'BRANCO')}.webp?alt=media`;
    cordaoEl.style.display = 'block';
  } else {
    if(cordaoEl) cordaoEl.style.display = 'none';
  }
  renderViewDots();
}

// Blend mode: multiply para claro, screen para preto
function updateStampBlendMode(){
  const blendMode = color === 'preto' ? 'screen' : 'multiply';
  document.querySelectorAll('.zone-stamp-img').forEach(el=>{
    el.style.mixBlendMode = blendMode;
  });
  // Save for CSS var so new zones pick it up
  document.documentElement.style.setProperty('--stamp-blend', blendMode);
}

function placeZones(){
  const key    = currentViewKey();
  const zones  = ZONES[key]||[];
  const overlay= document.getElementById('mockupOverlay');
  const img    = document.getElementById('mockupImg');
  const stage  = document.getElementById('mockupStage');
  overlay.innerHTML = '';

  const sRect = stage.getBoundingClientRect();
  const iRect = img.getBoundingClientRect();
  const offL  = iRect.left - sRect.left;
  const offT  = iRect.top  - sRect.top;
  const imgW  = iRect.width;
  const imgH  = iRect.height;

  zones.forEach(z=>{
    const px = {
      top:  offT  + (z.top/100)*imgH,
      left: offL  + (z.left/100)*imgW,
      w:    (z.w/100)*imgW,
      h:    (z.h/100)*imgH,
    };
    const el = document.createElement('div');
    const isGrande = z.id==='peito-grande' || z.id==='costas-grande';
    el.className = 'zone' + (selected[z.id]?' stamped':'');
    if(isGrande) el.dataset.size = 'grande';

    // Apply rotation for sleeve zones
    const rotation = z.rotate ? `rotate(${z.rotate}deg)` : '';
    el.style.cssText = `top:${px.top}px;left:${px.left}px;width:${px.w}px;height:${px.h}px;${rotation?`transform:${rotation};transform-origin:center;`:''}`;

    if(selected[z.id]){
      const s = selected[z.id];
      if(s.imgUrl){
        const si = document.createElement('img');
        si.src = s.imgUrl; si.className = 'zone-stamp-img';
        // Item 3 — blend mode dinâmico
        si.style.mixBlendMode = color === 'preto' ? 'screen' : 'multiply';
        el.appendChild(si);
      } else {
        const sp = document.createElement('div');
        sp.className = 'zone-stamp-emoji';
        sp.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:clamp(18px,4vw,42px)';
        sp.textContent = s.emoji||'🖼️';
        el.appendChild(sp);
      }
      const del = document.createElement('button');
      del.className = 'zone-del'; del.innerHTML = '×';
      del.onclick = e=>{ e.stopPropagation(); removeStamp(z.id); };
      el.appendChild(del);
      el.addEventListener('click', e=>{
        e.stopPropagation();
        document.querySelectorAll('.zone.show-del').forEach(z2=>{ if(z2!==el) z2.classList.remove('show-del'); });
        el.classList.toggle('show-del');
      });
    } else {
      // Empty zone — hidden by default, shown when stage is active
      el.classList.add('empty-zone');
      const col = ZONE_COLORS[z.id]||{fill:'rgba(255,255,255,0.1)',border:'rgba(255,255,255,0.3)'};
      el.style.background = col.fill;
      el.style.border = `1.5px solid ${col.border}`;
      el.addEventListener('click', e=>{ e.stopPropagation(); openSheet(z.id); });
    }
    overlay.appendChild(el);
  });

  // overlay não deve capturar cliques — as zonas já têm stopPropagation
  overlay.addEventListener('click', e=>{
    if(!e.target.closest('.zone')){
      stage.classList.remove('zones-visible');
      document.querySelectorAll('.zone.show-del').forEach(z=>z.classList.remove('show-del'));
    }
  });
}

// Show zones when tapping the mockup image area
document.addEventListener('DOMContentLoaded', ()=>{
  const stage = document.getElementById('mockupStage');
  stage.addEventListener('click', e=>{
    if(!e.target.closest('.zone')){
      const hasEmpty = stage.querySelector('.zone.empty-zone');
      if(hasEmpty){
        const isVisible = stage.classList.contains('zones-visible');
        stage.classList.toggle('zones-visible', !isVisible);
      }
      document.querySelectorAll('.zone.show-del').forEach(z=>z.classList.remove('show-del'));
    }
  });
});

let resizeTimer;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(placeZones, 80);
});

function closeAllAdminAccordions(){
  ['sizesBody','bgBody','stampsBody','campBody'].forEach(id=>{
    document.getElementById(id)?.classList.remove('open');
  });
  document.querySelectorAll('.accordion-bar').forEach(b=>b.classList.remove('open'));
}

function toggleSizesAccordion(bar){
    const isOpen = bar.classList.contains('open');
    closeAllAdminAccordions();
    if(!isOpen){ bar.classList.add('open'); document.getElementById('sizesBody').classList.add('open'); }
}

function toggleStampsAccordion(bar){
    const isOpen = bar.classList.contains('open');
    closeAllAdminAccordions();
    if(!isOpen){ bar.classList.add('open'); document.getElementById('stampsBody').classList.add('open'); }
}
// ══════════════════════════════════════════════════════
// VIEW NAVIGATION
// ══════════════════════════════════════════════════════
function renderViewDots(){
  const dots = document.getElementById('viewDots');
  dots.innerHTML = VIEWS.map((v,i)=>{
    const key = garment+'-'+v.key;
    const hasStamp = (ZONES[key]||[]).some(z=>selected[z.id]);
    let cls = 'vdot';
    if(i===viewIdx)   cls+=' active';
    else if(hasStamp) cls+=' stamped';
    return `<div class="${cls}"></div>`;
  }).join('');
  document.getElementById('viewName').textContent = VIEWS[viewIdx].label;
}

function navigateView(dir){
  viewIdx = (viewIdx+dir+VIEWS.length)%VIEWS.length;
  document.getElementById('mockupStage').classList.remove('zones-visible');
  const stage = document.getElementById('mockupStage');
  stage.style.opacity='0'; stage.style.transition='opacity .15s';
  setTimeout(()=>{ renderMockup(); stage.style.opacity='1'; },150);
}

// ══════════════════════════════════════════════════════
// GARMENT & COLOR
// ══════════════════════════════════════════════════════
function setGarment(g, btn){
  garment = g; viewIdx = 0;
  document.getElementById('mockupStage').classList.remove('zones-visible');
  btn.closest('.garment-bar').querySelectorAll('.gbtn')
    .forEach(b=>b.classList.toggle('active',b===btn));
  renderMockup();
}

function setColor(c, btn){
  color = c;
  document.querySelectorAll('.cbtn')
    .forEach(b=>b.classList.toggle('active', b===btn));
  renderMockup();
  updateStampBlendMode();
}

// ══════════════════════════════════════════════════════
// CATALOG SHEET
// ══════════════════════════════════════════════════════
function openSheet(posId){
  dismissUpsell();
  activePosId = posId;
  hoverStamp  = selected[posId]||null;

  const meta   = POS_META[posId]||{label:posId};
  const stamps = stampsDB[posId]||[];

  document.getElementById('sheetPosName').textContent = meta.label;
  document.getElementById('sheetBackdrop').classList.add('open');
  document.getElementById('catSheet').classList.add('open');

  const key = currentViewKey();
  document.getElementById('miniMockupImg').src = imgSrc(key);
  renderMiniZones(hoverStamp);

  const grid = document.getElementById('sheetGrid');
  grid.innerHTML = '';
  if(!stamps.length){
    grid.innerHTML='<div class="no-stamps"><div class="no-stamps-icon">📭</div><p>Nenhuma estampa cadastrada.<br>Adicione no painel ⚙️</p></div>';
    updateConfirmBtn(); return;
  }
  stamps.forEach(s=>{
    const isSel = selected[posId]?.code===s.code;
    const c = document.createElement('div');
    c.className = 'scard'+(isSel?' sel':'');
    const thumbHtml = s.imgUrl
      ? `<img src="${s.imgUrl}" style="width:100%;height:100%;object-fit:contain;background:#fff;display:block;">`
      : s.emoji||'🖼️';
    c.innerHTML=`
      <div class="scard-thumb">${thumbHtml}</div>
      <div class="scard-info">
        <div class="scard-name">${s.name}</div>
        <div class="scard-price">R$ ${s.price.toFixed(2).replace('.',',')}</div>
      </div>
      ${isSel?'<div class="scard-badge">✓</div>':''}
    `;
    const doPreview=()=>{ hoverStamp=s; renderMiniZones(s); updatePreviewInfo(s); };
    c.addEventListener('mouseenter', doPreview);
    c.addEventListener('touchstart',  doPreview, {passive:true});
   c.addEventListener('click', ()=>{
      hoverStamp=s;
      renderMiniZones(s);
      updatePreviewInfo(s);
      updateConfirmBtn();
      document.querySelectorAll('.scard').forEach(el=>el.classList.remove('sel'));
      c.classList.add('sel');
    });
    grid.appendChild(c);
  });

  if(hoverStamp){ updatePreviewInfo(hoverStamp); }
  else {
    document.getElementById('previewName').textContent='—';
    document.getElementById('previewPrice').textContent='';
    document.getElementById('previewHint').textContent='Passe o dedo pelas estampas para visualizar';
  }
  updateConfirmBtn();
}

function closeSheet(){
  document.getElementById('catSheet').classList.remove('open');
  document.getElementById('sheetBackdrop').classList.remove('open');
  activePosId = null; hoverStamp = null;
}

function updatePreviewInfo(s){
  document.getElementById('previewName').textContent  = s.name;
  document.getElementById('previewPrice').textContent = 'R$ '+s.price.toFixed(2).replace('.',',');
  document.getElementById('previewHint').textContent  = 'Toque em ✓ Escolher para confirmar';
}

function updateConfirmBtn(){
  document.getElementById('confirmBtn').disabled = !hoverStamp;
}

function confirmStamp(){
  if(!activePosId||!hoverStamp) return;
  const posId = activePosId;
  selected[posId] = hoverStamp;
  closeSheet();
  renderMockup();
  updateCart();
  renderViewDots();
  showToast('✅ '+hoverStamp.name+' aplicada!','var(--green)');
  setTimeout(()=>triggerUpsell(posId), 420);
}

function removeStamp(id){
  delete selected[id];
  renderMockup(); updateCart(); renderViewDots();
  if(!Object.keys(selected).length) dismissUpsell();
}

// ── Mini mockup zone overlay ──────────────────────────
function renderMiniZones(previewStamp){
  const mini  = document.getElementById('miniMockup');
  const mImg  = document.getElementById('miniMockupImg');
  mini.querySelectorAll('.mini-zone').forEach(z=>z.remove());

  const key   = currentViewKey();
  const zones = ZONES[key]||[];

  const place=()=>{
    const mRect = mini.getBoundingClientRect();
    const iRect = mImg.getBoundingClientRect();
    const oL = iRect.left - mRect.left;
    const oT = iRect.top  - mRect.top;
    const iW = iRect.width;
    const iH = iRect.height;

    zones.forEach(z=>{
      let stamp = selected[z.id];
      if(z.id===activePosId && previewStamp) stamp=previewStamp;
      if(!stamp) return;
      const el = document.createElement('div');
      el.className = 'mini-zone';
      el.style.cssText=`position:absolute;top:${oT+(z.top/100)*iH}px;left:${oL+(z.left/100)*iW}px;width:${(z.w/100)*iW}px;height:${(z.h/100)*iH}px;pointer-events:none;`;
      if(stamp.imgUrl){
        const si=document.createElement('img'); si.src=stamp.imgUrl;
        si.style.cssText='width:100%;height:100%;object-fit:contain;';
        el.appendChild(si);
      } else {
        const sp=document.createElement('span');
        sp.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;';
        sp.textContent=stamp.emoji||'🖼️'; el.appendChild(sp);
      }
      mini.appendChild(el);
    });
  };

  if(mImg.complete && mImg.naturalWidth) place();
  else mImg.onload = place;
}

// ══════════════════════════════════════════════════════
// UPSELL
// ══════════════════════════════════════════════════════
const UPSELL_MAP={
  'peito-grande':   'costas-grande',
  'peito-central':  'costas-central',
  'peito-esq':      'manga-esq',
  'peito-dir':      'manga-dir',
  'costas-grande':  'peito-grande',
  'costas-central': 'peito-central',
  'manga-dir':      'manga-esq',
  'manga-esq':      'manga-dir',
};
const POS_VIEW_IDX={
  'peito-grande':0,'peito-central':0,'peito-esq':0,'peito-dir':0,
  'costas-grande':2,'costas-central':2,
  'manga-dir':1,'manga-esq':3,
};
let _upsellTimer=null, _upsellTarget=null, _upsellDismissed=false;

function triggerUpsell(justChosenPosId){
  const suggest=UPSELL_MAP[justChosenPosId];
  if(!suggest||selected[suggest]||_upsellDismissed) return;
  _upsellTarget=suggest;
  const meta=POS_META[suggest]||{label:suggest};
  const stamps=stampsDB[suggest]||[];
  const minPrice=stamps.length?Math.min(...stamps.map(s=>s.price)):null;
  const priceStr=minPrice!=null?' — a partir de R$ '+minPrice.toFixed(2).replace('.',','):'';
  document.getElementById('upsellTitle').textContent='Fica ainda melhor com '+meta.label+' 🔥';
  document.getElementById('upsellSub').textContent='Adicionar'+priceStr;
  document.getElementById('upsellBtn').onclick=acceptUpsell;
  const bar=document.getElementById('upsellBar');
  bar.classList.toggle('with-bar', Object.keys(selected).length>0);
  bar.classList.add('visible');
  clearTimeout(_upsellTimer);
  _upsellTimer=setTimeout(dismissUpsell, 8000);
}

function dismissUpsell(){
  clearTimeout(_upsellTimer);
  document.getElementById('upsellBar')?.classList.remove('visible');
  _upsellTarget=null;
}

function acceptUpsell(){
  if(!_upsellTarget) return;
  const posId=_upsellTarget;
  dismissUpsell();
  const targetViewIdx=POS_VIEW_IDX[posId]??0;
  if(viewIdx!==targetViewIdx){
    viewIdx=targetViewIdx;
    const stage=document.getElementById('mockupStage');
    stage.style.opacity='0'; stage.style.transition='opacity .15s';
    setTimeout(()=>{ renderMockup(); stage.style.opacity='1';
      setTimeout(()=>openSheet(posId),120); },150);
  } else { openSheet(posId); }
}

// ══════════════════════════════════════════════════════
// CART / ACTION BAR
// ══════════════════════════════════════════════════════
function updateCart(){
  const n = Object.keys(selected).length;
  const t = Object.values(selected).reduce((a,s)=>a+s.price,0);
  const fmt = v=>'R$ '+v.toFixed(2).replace('.',',');

  const btn   = document.getElementById('cartBtn');
  const count = document.getElementById('cartCount');
  const total = document.getElementById('cartTotal');
  if(!btn) return;
  btn.classList.toggle('has-items', n>0);
  count.style.display = n>0?'flex':'none';
  count.textContent   = n;
  total.textContent   = fmt(t);

  const bar = document.getElementById('actionBar');
  bar.classList.toggle('visible', n>0);
  document.getElementById('actionTotal').textContent = fmt(t);

  document.getElementById('upsellBar')?.classList.toggle('with-bar', n>0);
}

// ══════════════════════════════════════════════════════
// RESET
// ══════════════════════════════════════════════════════
function resetOrder(){
  selected={};
  _upsellDismissed=false;
  dismissUpsell();
  renderMockup(); updateCart(); renderViewDots();
  showToast('🗑 Pedido limpo');
}

// ══════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════
let _toastTimer;
function showToast(msg, color='var(--text)'){
  const t=document.getElementById('toast');
  t.textContent=msg; t.style.color=color;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove('show'),2500);
}

// ══════════════════════════════════════════════════════
// ORDER MODAL
// ══════════════════════════════════════════════════════
function genCode(){
  const n=new Date(), p=x=>String(x).padStart(2,'0');
  return 'DTF'+p(n.getHours())+p(n.getMinutes())+p(n.getSeconds());
}

function openModal(){
  if(!Object.keys(selected).length) return;
  const code  = genCode();
  const now   = new Date();
  const total = Object.values(selected).reduce((a,s)=>a+s.price,0);
  document.getElementById('mCode').textContent   = code;
  document.getElementById('mDt').textContent     = now.toLocaleString('pt-BR');
  const colorLabel = {branco:'Branca',preto:'Preta',cinza:'Cinza Mescla'}[color]||'';
  document.getElementById('mGarment').innerHTML  = (garment==='camiseta'?'👕':'🧥')+' '+garment.charAt(0).toUpperCase()+garment.slice(1)+' '+colorLabel;
  document.getElementById('mTotal').textContent  = 'R$ '+total.toFixed(2).replace('.',',');
  document.getElementById('clientName').value  = '';
  document.getElementById('clientPhone').value = '';

  // Render size buttons
  renderSizeButtons();

  document.getElementById('mItems').innerHTML = Object.entries(selected).map(([pid,s])=>{
    const m = POS_META[pid]||{label:pid};
    const thumbHtml = s.imgUrl
      ? `<img src="${s.imgUrl}" style="width:100%;height:100%;object-fit:contain;display:block;">`
      : s.emoji||'🖼️';
    return `<div class="oi-card">
      <div class="oi-thumb">${thumbHtml}</div>
      <div class="oi-body">
        <div class="oi-pos">${m.label}</div>
        <div class="oi-name">${s.name}</div>
        <div class="oi-price">R$ ${s.price.toFixed(2).replace('.',',')}</div>
      </div>
    </div>`;
  }).join('');

  window._pending={code,datetime:now.toISOString(),garment,color,stamps:{...selected},total};
  document.getElementById('overlay').classList.add('open');
}

function closeModal(){ document.getElementById('overlay').classList.remove('open'); }

async function confirmOrder(){
  if(!window._pending) return;
  const name  = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim().replace(/\D/g,'');
  const size  = document.querySelector('.size-btn.active')?.dataset.size||'';

  if(!size){ showToast('❌ Escolha o tamanho'); return; }
  if(!name){ showToast('❌ Informe o nome do cliente'); return; }
  if(!phone||phone.length<10){ showToast('❌ WhatsApp inválido (mín. 10 dígitos)'); return; }

  const order = {...window._pending, clientName:name, clientPhone:phone, size};
  window._pending = null;
  closeModal(); resetOrder();
  await saveOrderToCloud(order);
  ordersHistory.unshift(order); renderOrders();
  showToast('✅ Pedido '+order.code+' salvo!','var(--green)');

  const stampsList = Object.entries(order.stamps)
    .map(([pid,s])=>{ const m=POS_META[pid]||{label:pid}; return `• ${m.label}: ${s.name}`; })
    .join('\n');
  const garmentLabel = order.garment==='camiseta'?'Camiseta':'Moletom';
  const colorLabel   = {branco:'Branca',preto:'Preta',cinza:'Cinza'}[order.color||'branco']||'';
  const msg = encodeURIComponent(
    `Olá ${name}! 👋\n`+
    `Seu pedido *DTF Studio* foi confirmado! 🎉\n\n`+
    `*Pedido:* ${order.code}\n`+
    `*Peça:* ${garmentLabel} ${colorLabel} — Tamanho *${size}*\n`+
    `*Estampas:*\n${stampsList}\n\n`+
    `*Total: R$ ${Number(order.total).toFixed(2).replace('.',',')}*\n\n`+
    `Em breve entraremos em contato para entrega. Obrigado! 🤙`
  );
  const clientNum = phone.startsWith('55') ? phone : '55'+phone;
  setTimeout(()=>{ window.open(`https://wa.me/${clientNum}?text=${msg}`,'_blank'); }, 400);
}

// ── Size buttons ──────────────────────────────────────
function renderSizeButtons(){
  const wrap = document.getElementById('sizeBtns');
  const sizes = sizesDB[garment] || sizesDB.camiseta;
  wrap.innerHTML = sizes.map(s=>
    `<button class="size-btn" data-size="${s.id}" onclick="selectSize(this)">${s.label}</button>`
  ).join('');
}

function selectSize(btn){
  document.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function openSizeGuide(){
  const modal = document.getElementById('sizeGuideOverlay');
  renderSizeGuide();
  modal.classList.add('open');
}
function closeSizeGuide(){
  document.getElementById('sizeGuideOverlay').classList.remove('open');
}

function renderSizeGuide(){
  const wrap = document.getElementById('sizeGuideContent');
  const sizes = sizesDB[garment] || sizesDB.camiseta;
  const isMoletom = garment === 'moletom';

  const svgShape = isMoletom
    ? /* moletom SVG */ `<svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- corpo -->
        <path d="M22 18 L8 32 L18 36 L18 82 L62 82 L62 36 L72 32 L58 18 Q50 14 40 22 Q30 14 22 18Z" fill="#2a2a2a" stroke="#ff4500" stroke-width="1.5"/>
        <!-- capuz -->
        <path d="M28 18 Q40 2 52 18 Q46 12 40 22 Q34 12 28 18Z" fill="#333" stroke="#ff4500" stroke-width="1"/>
        <!-- manga esq -->
        <path d="M22 18 L8 32 L18 36 L24 22Z" fill="#333" stroke="#ff4500" stroke-width="1"/>
        <!-- manga dir -->
        <path d="M58 18 L72 32 L62 36 L56 22Z" fill="#333" stroke="#ff4500" stroke-width="1"/>
        <!-- bolso -->
        <rect x="30" y="55" width="20" height="14" rx="3" fill="#333" stroke="#555" stroke-width="1"/>
        <!-- seta largura (busto) -->
        <line x1="18" y1="40" x2="62" y2="40" stroke="#ffaa00" stroke-width="1.2" stroke-dasharray="3,2"/>
        <polygon points="18,40 22,38 22,42" fill="#ffaa00"/>
        <polygon points="62,40 58,38 58,42" fill="#ffaa00"/>
        <!-- seta altura (ombro→barra) -->
        <line x1="8" y1="22" x2="8" y2="82" stroke="#ffaa00" stroke-width="1.2" stroke-dasharray="3,2"/>
        <polygon points="8,22 6,27 10,27" fill="#ffaa00"/>
        <polygon points="8,82 6,77 10,77" fill="#ffaa00"/>
      </svg>`
    : /* camiseta SVG */ `<svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- corpo -->
        <path d="M22 12 L8 28 L18 32 L18 82 L62 82 L62 32 L72 28 L58 12 Q50 20 40 20 Q30 20 22 12Z" fill="#2a2a2a" stroke="#ff4500" stroke-width="1.5"/>
        <!-- gola -->
        <path d="M30 12 Q40 22 50 12" fill="none" stroke="#ff4500" stroke-width="1.5"/>
        <!-- manga esq -->
        <path d="M22 12 L8 28 L18 32 L24 18Z" fill="#333" stroke="#ff4500" stroke-width="1"/>
        <!-- manga dir -->
        <path d="M58 12 L72 28 L62 32 L56 18Z" fill="#333" stroke="#ff4500" stroke-width="1"/>
        <!-- seta largura (busto, abaixo da axila) -->
        <line x1="18" y1="36" x2="62" y2="36" stroke="#ffaa00" stroke-width="1.2" stroke-dasharray="3,2"/>
        <polygon points="18,36 22,34 22,38" fill="#ffaa00"/>
        <polygon points="62,36 58,34 58,38" fill="#ffaa00"/>
        <!-- seta altura (ombro→barra) -->
        <line x1="8" y1="16" x2="8" y2="82" stroke="#ffaa00" stroke-width="1.2" stroke-dasharray="3,2"/>
        <polygon points="8,16 6,21 10,21" fill="#ffaa00"/>
        <polygon points="8,82 6,77 10,77" fill="#ffaa00"/>
      </svg>`;

  wrap.innerHTML = sizes.map(s=>`
    <div style="background:var(--surface2);border-radius:12px;padding:14px;display:flex;align-items:center;gap:14px;border:1px solid var(--border)">
      ${svgShape}
      <div style="flex:1">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--accent);letter-spacing:2px;line-height:1">${s.label}</div>
        <div style="margin-top:8px;display:flex;flex-direction:column;gap:5px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:11px;color:var(--muted);width:70px">↔ Largura</span>
            <span style="font-size:15px;font-weight:700;color:var(--text)">${s.largura} cm</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:11px;color:var(--muted);width:70px">↕ Altura</span>
            <span style="font-size:15px;font-weight:700;color:var(--text)">${s.altura} cm</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════════════
// ORDER PREVIEW MODAL
// ══════════════════════════════════════════════════════
let opOrder = null;
let opViewIdx = 0;

function openOrderPreview(order){
  opOrder = order;
  opViewIdx = 0;
  opRenderView();
  const list = document.getElementById('opStampList');
  list.innerHTML = Object.entries(order.stamps||{}).map(([pid,s])=>{
    const m = POS_META[pid]||{label:pid};
    return `<div style="background:var(--surface2);border-radius:20px;padding:4px 10px;font-size:11px;color:#ccc">${m.label} · ${s.name} · R$${Number(s.price).toFixed(2).replace('.',',')}</div>`;
  }).join('');
  document.getElementById('opCode').textContent = order.code;
  document.getElementById('opDt').textContent   = new Date(order.datetime).toLocaleString('pt-BR');
  document.getElementById('opGarment').textContent = (order.garment==='camiseta'?'👕':'🧥')+' '+order.garment;
  document.getElementById('opTotal').textContent   = 'R$ '+Number(order.total).toFixed(2).replace('.',',');
  document.getElementById('orderPreviewOverlay').classList.add('open');
}

function closeOrderPreview(){
  document.getElementById('orderPreviewOverlay').classList.remove('open');
  opOrder = null;
}

function opNavigate(dir){
  opViewIdx = (opViewIdx+dir+VIEWS.length)%VIEWS.length;
  opRenderView();
}

const POS_VIEW = {
  'peito-grande':   'frente',
  'peito-central':  'frente',
  'peito-esq':      'frente',
  'peito-dir':      'frente',
  'costas-grande':  'costas',
  'costas-central': 'costas',
  'manga-dir':      'lat-dir',
  'manga-esq':      'lat-esq',
};

function opRenderView(){
  if(!opOrder) return;
  const v   = VIEWS[opViewIdx];
  const key = opOrder.garment+'-'+v.key;
  const img = document.getElementById('opMockupImg');
  const overlay = document.getElementById('opMockupOverlay');
  const wrap    = document.getElementById('opMockupWrap');

  document.getElementById('opViewName').textContent = v.label;

  document.getElementById('opDots').innerHTML = VIEWS.map((fv,i)=>{
    const hasAny=Object.entries(opOrder.stamps||{}).some(([pid])=>POS_VIEW[pid]===fv.key);
    let cls='vdot';
    if(i===opViewIdx) cls+=' active';
    else if(hasAny)   cls+=' stamped';
    return `<div class="${cls}"></div>`;
  }).join('');

  overlay.innerHTML='';

  const placeOpZones=()=>{
    overlay.innerHTML='';
    const wRect=wrap.getBoundingClientRect();
    const iRect=img.getBoundingClientRect();
    const oL=iRect.left-wRect.left;
    const oT=iRect.top-wRect.top;
    const iW=iRect.width;
    const iH=iRect.height;

    (ZONES[key]||[]).forEach(z=>{
      if(POS_VIEW[z.id]!==v.key) return;
      const s=opOrder.stamps?.[z.id];
      if(!s) return;
      const el=document.createElement('div');
      el.style.cssText=`position:absolute;top:${oT+(z.top/100)*iH}px;left:${oL+(z.left/100)*iW}px;width:${(z.w/100)*iW}px;height:${(z.h/100)*iH}px;pointer-events:none;display:flex;align-items:center;justify-content:center;`;
      if(s.imgUrl){
        const si=document.createElement('img');
        si.src=s.imgUrl;
        si.style.cssText='width:100%;height:100%;object-fit:contain;display:block;';
        el.appendChild(si);
      } else {
        el.style.fontSize='clamp(14px,3vw,32px)';
        el.textContent=s.emoji||'🖼️';
      }
      overlay.appendChild(el);
    });
  };

  // Fix: always clear onload before changing src to avoid race conditions
  img.onload=null;
  const newSrc=imgSrc(key);
  const curFile=img.src.split('/').pop();
  if(curFile!==newSrc){
    img.onload=placeOpZones;
    img.src=newSrc;
  } else {
    if(img.complete && img.naturalWidth) placeOpZones();
    else img.onload=placeOpZones;
  }
}

// ══════════════════════════════════════════════════════
// ORDERS
// ══════════════════════════════════════════════════════
function renderOrders(){
  const h=document.getElementById('orderHist');
  if(!ordersHistory.length){
    h.innerHTML='<p style="color:var(--muted)">Nenhum pedido ainda.</p>'; return;
  }

  // Total do dia
  const hoje = new Date().toLocaleDateString('pt-BR');
  const totalDia = ordersHistory
    .filter(o=>new Date(o.datetime).toLocaleDateString('pt-BR')===hoje)
    .reduce((a,o)=>a+Number(o.total||o.preco||0),0);
  const totalDiaEl = document.getElementById('orderDayTotal');
  if(totalDiaEl) totalDiaEl.textContent = 'Total do dia: R$ '+totalDia.toFixed(2).replace('.',',');

  h.innerHTML=ordersHistory.map((o,idx)=>{
    const n=Object.keys(o.stamps||{}).length;
    const thumbs=Object.values(o.stamps||{}).map(s=>{
      const inner=s.imgUrl
        ?`<img src="${s.imgUrl}" style="width:100%;height:100%;object-fit:contain;">`
        :(s.emoji||'🖼️');
      return `<div class="oh-thumb">${inner}</div>`;
    }).join('');
    const phone = o.clientPhone ? (o.clientPhone.startsWith('55')?o.clientPhone:'55'+o.clientPhone) : '';
    const clientInfo = o.clientName ? `
      <div class="oh-client-name">👤 ${o.clientName}</div>
      ${phone?`<a class="oh-client-wa" href="https://wa.me/${phone}" target="_blank" onclick="event.stopPropagation()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.336-1.508A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.214-3.732.978.995-3.63-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
        ${o.clientPhone}
      </a>`:''}
    ` : '';
    return `<div class="ohcard" data-idx="${idx}" style="cursor:pointer">
      <button class="oh-del" title="Excluir pedido">×</button>
      <div class="oh-left">
        <div class="ohcode">${o.code}</div>
        <div class="ohtime">${new Date(o.datetime).toLocaleString('pt-BR')}</div>
        ${clientInfo}
      </div>
      <div class="ohinfo">
        <div class="ohgarment">${o.garment==='camiseta'?'👕':'🧥'} ${o.garment||''}${o.color?' · '+o.color:''} — ${n} estampa(s)</div>
        <div class="oh-thumbs-row">
          <div class="oh-thumbs">${thumbs}</div>
          ${o.size?`<div class="oh-size-badge">${o.size}</div>`:''}
        </div>
      </div>
      <div class="oh-right">
        <div class="ohtotal">R$${Number(o.total||o.preco||0).toFixed(2).replace('.',',')}</div>
      </div>
    </div>`;
  }).join('');

  h.querySelectorAll('.ohcard').forEach(card=>{
    const idx=parseInt(card.dataset.idx);
    card.addEventListener('click',e=>{
      if(e.target.closest('.oh-del')||e.target.closest('.oh-client-wa')) return;
      openOrderPreview(ordersHistory[idx]);
    });
    card.querySelector('.oh-del').addEventListener('click',e=>{
      e.stopPropagation();
      deleteOrder(idx);
    });
  });
}

async function deleteOrder(idx){
  const order=ordersHistory[idx];
  if(!order) return;
  if(!confirm(`Excluir pedido ${order.code}?`)) return;
  try{
    await db.collection('pedidos').doc(order.code).delete();
    setSyncStatus(true);
  }catch(e){
    console.error('deleteOrder:',e);
    setSyncStatus(false);
  }
  ordersHistory.splice(idx,1);
  try{
    const stored=JSON.parse(localStorage.getItem('dtf_orders')||'[]');
    localStorage.setItem('dtf_orders',JSON.stringify(stored.filter(o=>o.code!==order.code)));
  }catch(e){}
  renderOrders();
  showToast('🗑 Pedido '+order.code+' excluído');
}

// ══════════════════════════════════════════════════════
// ADMIN
// ══════════════════════════════════════════════════════
const ALL_POS=[
  {id:'peito-grande',   label:'Frente Total'},
  {id:'peito-central',  label:'Frente Central'},
  {id:'peito-dir',      label:'Frente Direita'},
  {id:'peito-esq',      label:'Frente Esquerda'},
  {id:'costas-grande',  label:'Costas Total'},
  {id:'costas-central', label:'Costas Central'},
  {id:'manga-dir',      label:'Manga Direita'},
  {id:'manga-esq',      label:'Manga Esquerda'},
];

// Seleção múltipla de estampas para excluir em lote
let _stampSelection = {};

function toggleStampSelect(pid, idx, el){
  if(!_stampSelection[pid]) _stampSelection[pid] = new Set();
  const s = _stampSelection[pid];
  if(s.has(idx)){ s.delete(idx); el.classList.remove('arow-selected'); }
  else { s.add(idx); el.classList.add('arow-selected'); }
  const total = Object.values(_stampSelection).reduce((a,s)=>a+s.size,0);
  document.querySelectorAll('.batch-del-btn').forEach(b=>{
    b.style.display = total>0?'flex':'none';
    b.textContent = `🗑 Excluir ${total} selecionada(s)`;
  });
}

function batchDeleteSelected(){
  const total = Object.values(_stampSelection).reduce((a,s)=>a+s.size,0);
  if(!total) return;
  if(!confirm(`Excluir ${total} estampa(s) selecionada(s)?`)) return;
  const {openPosIds, stampsOpen} = getAdminAccordionState();
  for(const [pid, idxSet] of Object.entries(_stampSelection)){
    const sorted = Array.from(idxSet).sort((a,b)=>b-a);
    sorted.forEach(i=>{ if(stampsDB[pid]) stampsDB[pid].splice(i,1); });
  }
  _stampSelection={};
  saveDB(); renderAdmin(); restoreAdminAccordionState(openPosIds, stampsOpen);
  showToast('🗑 Estampas excluídas','var(--green)');
}

function getAdminAccordionState(){
  const openPosIds = [];
  document.querySelectorAll('.pos-accordion-bar.open').forEach(bar=>openPosIds.push(bar.dataset.posId));
  const stampsOpen = document.getElementById('stampsBody')?.classList.contains('open');
  const sizesOpen  = document.getElementById('sizesBody')?.classList.contains('open');
  const bgOpen     = document.getElementById('bgBody')?.classList.contains('open');
  return {openPosIds, stampsOpen, sizesOpen, bgOpen};
}

function restoreAdminAccordionState(openPosIds, stampsOpen, sizesOpen, bgOpen){
  if(stampsOpen){
    document.getElementById('stampsBody')?.classList.add('open');
    document.querySelector('[onclick="toggleStampsAccordion(this)"]')?.classList.add('open');
  }
  if(sizesOpen){
    document.getElementById('sizesBody')?.classList.add('open');
    document.querySelector('[onclick="toggleSizesAccordion(this)"]')?.classList.add('open');
  }
  if(bgOpen){
    document.getElementById('bgBody')?.classList.add('open');
    document.querySelector('[onclick="toggleBgAccordion(this)"]')?.classList.add('open');
  }
  (openPosIds||[]).forEach(p=>{
    const bar = document.querySelector(`.pos-accordion-bar[data-pos-id="${p}"]`);
    if(bar){ bar.classList.add('open'); document.getElementById('pos_'+p)?.classList.add('open'); }
  });
}

function toggleBgAccordion(bar){
    const isOpen = bar.classList.contains('open');
    closeAllAdminAccordions();
    if(!isOpen){ bar.classList.add('open'); document.getElementById('bgBody').classList.add('open'); }
}

function togglePosAccordion(bar, bodyId){
  const isOpen = bar.classList.contains('open');
  document.querySelectorAll('.accordion-body[id^="pos_"]').forEach(b=>{
    b.classList.remove('open');
  });
  document.querySelectorAll('.pos-accordion-bar').forEach(b=>{
    b.classList.remove('open');
  });
  if(!isOpen){
    bar.classList.add('open');
    document.getElementById(bodyId)?.classList.add('open');
  }
}

function delStampSingle(pid,idx){
  if(!confirm('Remover esta estampa?')) return;
  const state = getAdminAccordionState();
  stampsDB[pid].splice(idx,1);
  saveDB(); renderAdmin();
  restoreAdminAccordionState(state.openPosIds, state.stampsOpen, state.sizesOpen, state.bgOpen);
  showToast('🗑 Removida');
}

function renderAdmin(){
  const g=document.getElementById('adminGrid');
  if(!g) return;

  // ── SANFONA 1: Medidas ────────────────────────────────
  const renderSizeTable=(product,label,dbKey)=>`
    <div style="margin-bottom:14px">
      <div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">${label}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${sizesDB[dbKey].map((s,i)=>`
          <div style="background:var(--bg);border-radius:8px;padding:8px 10px;border:1px solid var(--border);min-width:80px">
            <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--accent);margin-bottom:5px">${s.label}</div>
            <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px">
              <span style="font-size:10px;color:var(--muted);width:14px">L</span>
              <input type="number" step="0.5" value="${s.largura}"
                style="width:52px;background:var(--surface2);border:1px solid var(--border);border-radius:5px;padding:3px 5px;color:var(--text);font-size:11px;font-family:'DM Sans',sans-serif"
                onchange="updateSize('${dbKey}',${i},'largura',this.value)">
              <span style="font-size:10px;color:var(--muted)">cm</span>
            </div>
            <div style="display:flex;align-items:center;gap:4px">
              <span style="font-size:10px;color:var(--muted);width:14px">A</span>
              <input type="number" step="0.5" value="${s.altura}"
                style="width:52px;background:var(--surface2);border:1px solid var(--border);border-radius:5px;padding:3px 5px;color:var(--text);font-size:11px;font-family:'DM Sans',sans-serif"
                onchange="updateSize('${dbKey}',${i},'altura',this.value)">
              <span style="font-size:10px;color:var(--muted)">cm</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const sizesHtml=`<div class="acard" style="grid-column:1/-1;padding:0;overflow:hidden">
    <div class="accordion-bar" onclick="toggleSizesAccordion(this)">
      <h3>📏 Tabela de Medidas</h3>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body" id="sizesBody">
      <div style="padding:12px 14px 14px">
        <div class="atag" style="margin-bottom:10px">Editável — L = Largura · A = Altura (cm)</div>
        ${renderSizeTable('camiseta','👕 Camiseta','camiseta')}
        ${renderSizeTable('moletom','🧥 Moletom','moletom')}
        <button class="abtn" onclick="saveSizes()" style="padding:8px 20px;margin-top:4px">💾 Salvar medidas</button>
      </div>
    </div>
  </div>`;

  const bgHtml=`<div class="acard" style="grid-column:1/-1;padding:0;overflow:hidden">
    <div class="accordion-bar" onclick="toggleBgAccordion(this)">
      <h3>🎨 Plano de Fundo do Mockup</h3>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body" id="bgBody">
      <div style="padding:12px 14px 14px;max-width:380px">
        <div id="adminBgSwatch" style="width:100%;height:60px;border-radius:8px;border:1px solid var(--border);margin-bottom:10px;background:${mockupBg};transition:background .2s;overflow:hidden;position:relative">
          <div id="adminBgImgPreview" style="position:absolute;inset:0;background-size:cover;background-position:center;display:none"></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <input type="color" id="adminBgColor" value="${mockupBg}" style="width:40px;height:30px;border:none;border-radius:6px;cursor:pointer;padding:0;flex-shrink:0" oninput="applyMockupBg(this.value)">
          <input type="text" id="adminBgHex" value="${mockupBg}" style="flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:5px 8px;color:var(--text);font-size:11px;font-family:monospace" oninput="syncBgHex(this.value)" placeholder="#0d2233">
        </div>
        <div style="margin-bottom:10px">
          <div style="font-size:10px;color:var(--muted);margin-bottom:5px">Imagem de fundo <span style="color:var(--accent2);font-weight:700">(.webp)</span></div>
          <label style="display:flex;align-items:center;gap:6px;background:var(--surface2);border:1.5px dashed var(--muted2);border-radius:8px;padding:7px 10px;cursor:pointer;font-size:11px;color:var(--muted);transition:all .2s" onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'" onmouseout="this.style.borderColor='var(--muted2)';this.style.color='var(--muted)'">
            🖼️ Buscar imagem .webp
            <input type="file" accept=".webp,image/webp" style="display:none" onchange="pickBgImage(this)">
          </label>
          <div id="bgImgName" style="font-size:10px;color:var(--muted);margin-top:4px"></div>
        </div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:5px">Presets:</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px">
          ${[{c:'#0d2233',n:'Petróleo'},{c:'#0e0e0e',n:'Preto'},{c:'#1a1a2e',n:'Noite'},{c:'#1e3a1e',n:'Floresta'},{c:'#2a1a0e',n:'Café'},{c:'#1a0a1e',n:'Roxo'},{c:'#f0f0f0',n:'Branco'}].map(p=>`<div title="${p.n}" onclick="setPresetBg('${p.c}')" style="width:26px;height:26px;border-radius:5px;background:${p.c};cursor:pointer;border:2px solid var(--border);transition:transform .15s" onmouseover="this.style.transform='scale(1.18)'" onmouseout="this.style.transform='scale(1)'"></div>`).join('')}
        </div>
        <button class="abtn" onclick="saveMockupBg()" style="padding:8px 20px">💾 Salvar fundo</button>
      </div>
    </div>
  </div>`;

  const stampsHtml=`<div class="acard" style="grid-column:1/-1;padding:0;overflow:hidden">
    <div class="accordion-bar" onclick="toggleStampsAccordion(this)">
      <h3>🖼️ Gerenciar Estampas</h3>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body" id="stampsBody">
      <div style="padding:12px 14px 14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div class="atag">Clique para selecionar · botão × para excluir individual</div>
          <button class="batch-del-btn" onclick="batchDeleteSelected()" style="display:none;align-items:center;gap:6px;background:#c62828;color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;cursor:pointer;">🗑 Excluir selecionadas</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${ALL_POS.map(pos=>{
            const stamps=stampsDB[pos.id]||[];
            const rows=stamps.map((s,i)=>{
              const th=s.imgUrl
                ?`<img class="athumb" src="${s.imgUrl}" alt="">`
                :`<span style="font-size:18px">${s.emoji||'🖼️'}</span>`;
              return `<div class="arow" data-pid="${pos.id}" data-idx="${i}" onclick="toggleStampSelect('${pos.id}',${i},this)" style="cursor:pointer">
                <div class="arow-sel-dot"></div>
                ${th}
                <span class="acode">${s.code}</span>
                <span class="aname">${s.name}</span>
                <span class="aprice">R$${s.price}</span>
                <button class="adel" onclick="event.stopPropagation();delStampSingle('${pos.id}',${i})">×</button>
              </div>`;
            }).join('')||'<div style="color:var(--muted);font-size:11px;padding:6px 0">Sem estampas cadastradas</div>';

            return `<div style="border:1px solid var(--border);border-radius:10px;overflow:hidden;background:var(--surface)">
              <div class="pos-accordion-bar accordion-bar" data-pos-id="${pos.id}" onclick="togglePosAccordion(this,'pos_${pos.id}')" style="padding:9px 12px">
                <div style="display:flex;align-items:center;gap:8px">
                  <h3 style="margin:0;font-size:12px">${pos.label}</h3>
                  <span style="font-size:10px;color:var(--muted);background:var(--surface3);padding:2px 7px;border-radius:20px">${stamps.length}</span>
                </div>
                <span class="accordion-arrow">▼</span>
              </div>
              <div class="accordion-body" id="pos_${pos.id}">
                <div style="padding:10px 12px;background:var(--surface2)">
                  <div class="alist">${rows}</div>
                  <label class="upload-lbl" style="margin-top:8px">
                    📁 Subir imagens em lote
                    <input type="file" accept="image/*" multiple style="display:none" onchange="batchUpload(this,'${pos.id}')">
                  </label>
                  <div class="aform">
                    <label class="aimg-pick" title="Selecionar imagem">🖼️
                      <input type="file" accept="image/*" style="display:none" onchange="pickStampImg(this,'${pos.id}')">
                    </label>
                    <div class="aimg-preview" id="apreview_${pos.id}"></div>
                    <input id="an_${pos.id}" placeholder="Nome da estampa" style="flex:2">
                    <input id="ap_${pos.id}" type="number" placeholder="R$" style="max-width:52px">
                    <button class="abtn" onclick="addStamp('${pos.id}')">+</button>
                  </div>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  </div>`;

  g.innerHTML = sizesHtml + bgHtml + stampsHtml;
  renderAdminVitrine(g);
  renderAdminZoneEditor(g);
}
function updateSize(product, idx, field, val){
  if(!sizesDB[product]) return;
  sizesDB[product][idx][field] = parseFloat(val)||0;
}

async function saveSizes(){
  try{ localStorage.setItem('dtf_sizes',JSON.stringify(sizesDB)); }catch(e){}
  try{
    await db.collection('config').doc('sizes').set({sizes:sizesDB});
    showToast('✅ Medidas salvas!','var(--green)');
  }catch(e){
    showToast('⚠️ Salvo local (sem conexão)','var(--accent2)');
  }
}

const _pendingImgs={};
function resizeImg(file,cb){
  const r=new FileReader();
  r.onload=e=>{
    const img=new Image();
    img.onload=()=>{
      const MAX=600;
      let w=img.width,h=img.height;
      if(w>MAX||h>MAX){
        if(w>h){h=Math.round(h*MAX/w);w=MAX;}
        else{w=Math.round(w*MAX/h);h=MAX;}
      }
      const c=document.createElement('canvas');
      c.width=w;c.height=h;
      c.getContext('2d').drawImage(img,0,0,w,h);
      cb(c.toDataURL('image/png',.88));
    };
    img.src=e.target.result;
  };
  r.readAsDataURL(file);
}

function autoCode(pid){
  const pf={'peito-grande':'PG','peito-central':'PC','peito-esq':'PE','peito-dir':'PD',
    'costas-grande':'CG','costas-central':'CC','manga-dir':'MD','manga-esq':'ME'};
  return (pf[pid]||'XX')+String((stampsDB[pid]||[]).length+1).padStart(3,'0');
}

function batchUpload(input,pid){
  const files=Array.from(input.files);
  if(!files.length) return;
  const priceStr=prompt(`Preço para as ${files.length} estampa(s) (R$):`,'25');
  const price=parseFloat(priceStr);
  if(isNaN(price)){showToast('❌ Preço inválido');return;}
  if(!stampsDB[pid]) stampsDB[pid]=[];
  const state = getAdminAccordionState();
  let done=0;
  files.forEach(file=>{
    const rawName=file.name.replace(/\.[^.]+$/,'').replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
    resizeImg(file,imgUrl=>{
      stampsDB[pid].push({code:autoCode(pid),name:rawName,price,emoji:'🖼️',imgUrl});
      if(++done===files.length){
        saveDB(); renderAdmin();
        restoreAdminAccordionState(state.openPosIds, state.stampsOpen, state.sizesOpen, state.bgOpen);
        showToast(`✅ ${files.length} estampa(s) adicionada(s)!`,'var(--green)');
      }
    });
  });
  input.value='';
}

function pickStampImg(input, pid){
  if(!input.files[0]) return;
  resizeImg(input.files[0], imgUrl=>{
    _pendingImgs[pid] = imgUrl;
    const prev = document.getElementById('apreview_'+pid);
    if(prev) prev.innerHTML = `<img src="${imgUrl}" style="width:28px;height:28px;object-fit:contain;border-radius:4px;background:#fff;border:1px solid var(--border)">`;
  });
}

function addStamp(pid){
  const nameEl = document.getElementById('an_'+pid);
  const priceEl = document.getElementById('ap_'+pid);
  const name  = nameEl?.value.trim();
  const price = parseFloat(priceEl?.value);
  if(!name||isNaN(price)){showToast('❌ Preencha nome e preço!');return;}
  if(!stampsDB[pid]) stampsDB[pid]=[];
  const code = autoCode(pid);
  const stamp={code,name,price,emoji:'🖼️'};
  if(_pendingImgs[pid]){stamp.imgUrl=_pendingImgs[pid];delete _pendingImgs[pid];}
  stampsDB[pid].push(stamp);
  const state = getAdminAccordionState();
  saveDB();
  renderAdmin();
  restoreAdminAccordionState(state.openPosIds, state.stampsOpen, state.sizesOpen, state.bgOpen);
  showToast('✅ Estampa adicionada!','var(--green)');
}

function delStamp(pid,idx){
  // Alias para compatibilidade — usa delStampSingle
  delStampSingle(pid,idx);
}

// ══════════════════════════════════════════════════════
// MOCKUP BACKGROUND
// ══════════════════════════════════════════════════════
function applyMockupBg(val){
  mockupBg = val;
  const stage = document.getElementById('mockupStage');
  stage.style.background = val;
  const swatch = document.getElementById('adminBgSwatch');
  if(swatch) swatch.style.background = val;
  const hex = document.getElementById('adminBgHex');
  if(hex) hex.value = val;
  const picker = document.getElementById('adminBgColor');
  if(picker) picker.value = val;
}

function syncBgHex(val){
  if(/^#[0-9a-fA-F]{6}$/.test(val)) applyMockupBg(val);
}

function setPresetBg(val){
  mockupBgImg = null;
  const stage = document.getElementById('mockupStage');
  stage.style.backgroundImage = 'none';
  const imgPrev = document.getElementById('adminBgImgPreview');
  if(imgPrev) imgPrev.style.display='none';
  const nameEl = document.getElementById('bgImgName');
  if(nameEl) nameEl.textContent='';
  applyMockupBg(val);
}

function pickBgImage(input){
  const file = input.files[0];
  if(!file) return;
  if(file.type !== 'image/webp' && !file.name.toLowerCase().endsWith('.webp')){
    showToast('❌ Apenas arquivos .webp são aceitos!','var(--accent)');
    input.value='';
    return;
  }
  const url = URL.createObjectURL(file);
  mockupBgImg = url;
  const stage = document.getElementById('mockupStage');
  stage.style.backgroundImage = `url(${url})`;
  stage.style.backgroundSize = 'cover';
  stage.style.backgroundPosition = 'center';
  const imgPrev = document.getElementById('adminBgImgPreview');
  if(imgPrev){ imgPrev.style.backgroundImage=`url(${url})`; imgPrev.style.display='block'; }
  const nameEl = document.getElementById('bgImgName');
  if(nameEl) nameEl.textContent = '✅ '+file.name;
  showToast('✅ Imagem aplicada!','var(--green)');
}

async function saveMockupBg(){
  try{ localStorage.setItem('dtf_mockupBg', mockupBg); }catch(e){}
  try{
    await db.collection('config').doc('mockupBg').set({color: mockupBg});
    showToast('✅ Fundo salvo!','var(--green)');
  }catch(e){
    showToast('⚠️ Salvo local (sem conexão)','var(--accent2)');
  }
}

// ══════════════════════════════════════════════════════
// ADMIN MODE — acesso via 5 cliques no logo
// ══════════════════════════════════════════════════════
const ADMIN_PASSWORD = 'dtf2025'; // altere aqui sua senha
let isAdminMode = false;
let logoClickCount = 0;
let logoClickTimer = null;

document.addEventListener('DOMContentLoaded', ()=>{
  const logo = document.getElementById('logoBtn');
  if(logo){
    logo.addEventListener('click', ()=>{
      logoClickCount++;
      clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(()=>{ logoClickCount=0; }, 2000);
      if(logoClickCount >= 5){
        logoClickCount=0;
        if(isAdminMode){
          // Sair do modo admin
          isAdminMode=false;
          document.body.classList.remove('admin-mode');
          switchTab('config');
          showToast('👤 Modo cliente ativado');
        } else {
          // Entrar — pede senha
          openAdminLogin();
        }
      }
    });
  }
});

function openAdminLogin(){
  document.getElementById('adminLoginOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('adminPwdInput').focus(), 100);
}
function closeAdminLogin(){
  document.getElementById('adminLoginOverlay').classList.remove('open');
  document.getElementById('adminPwdInput').value='';
}
function checkAdminPwd(){
  const pwd = document.getElementById('adminPwdInput').value;
  if(pwd === ADMIN_PASSWORD){
    isAdminMode=true;
    document.body.classList.add('admin-mode');
    closeAdminLogin();
    showToast('🔐 Modo admin ativado','var(--green)');
  } else {
    showToast('❌ Senha incorreta','var(--accent)');
    document.getElementById('adminPwdInput').value='';
  }
}

// ══════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════
function switchTab(t){
  const names=['config','vitrine','pedidos','admin'];
  document.querySelectorAll('.tab').forEach((el,i)=>el.classList.toggle('active',names[i]===t));

  document.getElementById('tab-config').style.display    = t==='config'?'flex':'none';
  document.getElementById('tab-vitrine').classList.toggle('active', t==='vitrine');
  document.getElementById('tab-pedidos').classList.toggle('active', t==='pedidos');
  document.getElementById('tab-admin').classList.toggle('active',   t==='admin');
  const bar=document.getElementById('actionBar');
  if(t!=='config') bar.classList.remove('visible');
  else if(Object.keys(selected).length) bar.classList.add('visible');
  if(t==='pedidos') loadOrdersFromCloud();
  if(t==='admin')   renderAdmin();
  if(t==='vitrine') renderVitrine();
}

// ══════════════════════════════════════════════════════
// VITRINE
// ══════════════════════════════════════════════════════
let vitrineDB = []; // campanhas ativas
let vitrinePopupIdx = 0; // rodízio do popup

async function loadVitrineFromCloud(){
  try{
    const snap = await db.collection('vitrine').where('ativa','==',true).get();
    const now = new Date();
    vitrineDB = snap.docs.map(d=>({id:d.id,...d.data()})).filter(c=>{
      const start = c.dataInicio ? new Date(c.dataInicio) : null;
      const end   = c.dataFim   ? new Date(c.dataFim)   : null;
      if(start && now < start) return false;
      if(end){ const endDay = new Date(c.dataFim+'T23:59:59'); if(now > endDay) return false; }
      return true;
    });
    // Carrega itens de cada campanha
    for(const camp of vitrineDB){
      if(!camp.itens) camp.itens=[];
    }
    if(!isAdminMode) showVitrinePopup();
  }catch(e){
    console.warn('Vitrine offline:',e.message);
    vitrineDB=[];
  }
}

function showVitrinePopup(){
  // Coleta todos os itens de todas as campanhas
  const allItems = [];
  vitrineDB.forEach(camp=>{
    (camp.itens||[]).forEach(item=>{
      if(item.estoque > 0) allItems.push({...item, campNome: camp.nome});
    });
  });
  if(!allItems.length) return;

  // Rodízio
  if(vitrinePopupIdx >= allItems.length) vitrinePopupIdx=0;
  const item = allItems[vitrinePopupIdx];
  vitrinePopupIdx++;

  document.getElementById('vtPopupImg').src = item.imgUrl||'';
  document.getElementById('vtPopupCampTitle').textContent = item.campNome||'Novidades';
  document.getElementById('vtPopupStock').textContent = `🔥 Restam ${item.estoque} unidades`;
  document.getElementById('vtPopupPrice').textContent = 'R$ '+Number(item.preco).toFixed(2).replace('.',',');
  document.getElementById('vtPopupBackdrop').classList.add('open');
  document.getElementById('vtPopup').classList.add('open');
}

function closeVitrinePopup(){
  document.getElementById('vtPopupBackdrop').classList.remove('open');
  document.getElementById('vtPopup').classList.remove('open');
}

function renderVitrine(){
  const grid = document.getElementById('vitrineGrid');
  if(!vitrineDB.length){
    grid.innerHTML='<div style="color:var(--muted);text-align:center;padding:40px;grid-column:1/-1">Nenhuma campanha ativa no momento.</div>';
    return;
  }
  grid.innerHTML='';
  vitrineDB.forEach(camp=>{
    (camp.itens||[]).forEach((item,idx)=>{
      const esgotado = (item.estoque||0) <= 0;
      const low = item.estoque > 0 && item.estoque <= 5;
      const card = document.createElement('div');
      card.className = 'vt-card'+(esgotado?' esgotado':'');
     card.innerHTML=`
        <div class="vt-card-img" onclick="openVitrineDetail('${camp.id}',${idx})" style="cursor:pointer;position:relative">
          ${item.imgUrl?`<img src="${item.imgUrl}" alt="${item.nome||''}" loading="lazy">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px">🖼️</div>'}
          ${(item.imgs||[]).length>1?`<div style="position:absolute;bottom:6px;right:8px;background:rgba(0,0,0,.6);border-radius:20px;padding:2px 7px;font-size:10px;color:#fff">${item.imgs.length} fotos</div>`:''}
        </div>
        ${esgotado?'<div class="vt-badge-esgotado">ESGOTADO</div>':''}
        <div class="vt-card-body">
          <div class="vt-card-name" style="font-size:13px;font-weight:600;margin-bottom:4px">${item.nome||''}</div>
          <div class="vt-card-price">R$ ${Number(item.preco).toFixed(2).replace('.',',')}</div>
          <div class="vt-card-stock ${low?'low':''}">
            ${esgotado?'Esgotado':`🔥 Restam ${item.estoque}`}
          </div>
          <button class="vt-btn" ${esgotado?'disabled':''} onclick="openVitrineDetail('${camp.id}',${idx})">
            ${esgotado?'Esgotado':'Ver detalhes →'}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  });
}
function openVitrineDetail(campId, itemIdx){
  const camp = vitrineDB.find(c=>c.id===campId);
  if(!camp) return;
  const item = (camp.itens||[])[itemIdx];
  if(!item) return;
  const imgs = (item.imgs||[]).filter(Boolean);
  if(!imgs.length && item.imgUrl) imgs.push(item.imgUrl);
  let cur = 0;
  const esgotado = (item.estoque||0)<=0;

  let popup = document.getElementById('vitrineDetailPopup');
  if(popup) popup.remove();
  popup = document.createElement('div');
  popup.id = 'vitrineDetailPopup';
  popup.style.cssText = 'position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);padding:16px;';

  const render = ()=>{
    popup.innerHTML=`
      <div style="background:var(--surface);border-radius:18px;border:1px solid var(--border);width:100%;max-width:420px;overflow:hidden">
        <div style="position:relative;background:#0a0a0a;line-height:0">
          <img src="${imgs[cur]||''}" style="width:100%;max-height:55dvh;object-fit:contain;display:block">
          ${imgs.length>1?`
            <button onclick="vtDetailNav(-1)" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">&#8592;</button>
            <button onclick="vtDetailNav(1)" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">&#8594;</button>
            <div style="position:absolute;bottom:8px;left:0;right:0;display:flex;gap:5px;justify-content:center">
              ${imgs.map((_,i)=>`<div style="width:6px;height:6px;border-radius:50%;background:${i===cur?'#fff':'rgba(255,255,255,.3)'}"></div>`).join('')}
            </div>
          `:''}
          <button onclick="document.getElementById('vitrineDetailPopup').remove()" style="position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,.7);border:none;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>
        </div>
        <div style="padding:16px">
          <div style="font-weight:700;font-size:15px;margin-bottom:4px">${item.nome||''}</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--accent);margin-bottom:4px">R$ ${Number(item.preco).toFixed(2).replace('.',',')}</div>
          <div style="font-size:11px;color:${esgotado?'var(--muted)':'var(--accent2)'};margin-bottom:14px">${esgotado?'Esgotado':'🔥 Restam '+item.estoque+' unidades'}</div>
          <button onclick="document.getElementById('vitrineDetailPopup').remove();openVitrineOrder('${campId}',${itemIdx})"
            style="width:100%;background:${esgotado?'var(--surface2)':'var(--accent)'};color:${esgotado?'var(--muted)':'#fff'};border:none;border-radius:50px;padding:12px;font-size:15px;font-weight:700;cursor:${esgotado?'default':'pointer'};font-family:'DM Sans',sans-serif;"
            ${esgotado?'disabled':''}>
            ${esgotado?'Esgotado':'🛍️ Quero essa →'}
          </button>
        </div>
      </div>
    `;
    window.vtDetailNav = dir=>{
      cur = (cur+dir+imgs.length)%imgs.length;
      render();
    };
  };

  render();
  document.body.appendChild(popup);
  popup.addEventListener('click', e=>{ if(e.target===popup) popup.remove(); });
}
// ── Vitrine order ──────────────────────────────────────
let _vtPending = null;

function openVitrineOrder(campId, itemIdx){
  const camp = vitrineDB.find(c=>c.id===campId);
  if(!camp) return;
  const item = (camp.itens||[])[itemIdx];
  if(!item||item.estoque<=0) return;
  _vtPending = {campId, itemIdx, camp, item};

  // Render item summary
  document.getElementById('vtOrderItem').innerHTML=`
    <div style="display:flex;gap:12px;align-items:center;background:var(--surface2);border-radius:12px;padding:12px">
      <img src="${item.imgUrl||''}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;background:#111">
      <div>
        <div style="font-size:11px;color:var(--muted)">${camp.nome}</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--accent)">${'R$ '+Number(item.preco).toFixed(2).replace('.',',')}</div>
        <div style="font-size:11px;color:var(--accent2)">🔥 Restam ${item.estoque} unidades</div>
      </div>
    </div>
  `;

  // Render size buttons
  const sizes = sizesDB['camiseta'] || [];
  document.getElementById('vtSizeBtns').innerHTML = sizes.map(s=>
    `<button class="size-btn" data-size="${s.id}" onclick="selectSize(this)">${s.label}</button>`
  ).join('');

  document.getElementById('vtClientName').value='';
  document.getElementById('vtClientPhone').value='';
  document.getElementById('vitrineOrderOverlay').classList.add('open');
}

function closeVitrineOrder(){
  document.getElementById('vitrineOrderOverlay').classList.remove('open');
  _vtPending=null;
}

async function confirmVitrineOrder(){
  if(!_vtPending) return;
  const name  = document.getElementById('vtClientName').value.trim();
  const phone = document.getElementById('vtClientPhone').value.trim().replace(/\D/g,'');
  const size  = document.querySelector('#vtSizeBtns .size-btn.active')?.dataset.size||'';

  if(!size){ showToast('❌ Escolha o tamanho'); return; }
  if(!name){ showToast('❌ Informe o nome'); return; }
  if(!phone||phone.length<10){ showToast('❌ WhatsApp inválido'); return; }

  const {campId, itemIdx, camp, item} = _vtPending;
  const code = genCode();
  const now  = new Date();

  // Decrementa estoque no Firebase
  try{
    const campRef = db.collection('vitrine').doc(campId);
    const campDoc = await campRef.get();
    if(campDoc.exists){
      const itens = campDoc.data().itens||[];
      if(itens[itemIdx] && itens[itemIdx].estoque>0){
        itens[itemIdx].estoque--;
        await campRef.update({itens});
        if(camp.itens[itemIdx]) camp.itens[itemIdx].estoque--;
      }
    }
  }catch(e){ console.error('estoque:',e); }

  // Salva pedido
  const order={
    code, datetime:now.toISOString(),
    type:'vitrine', campanha:camp.nome,
    clientName:name, clientPhone:phone, size,
    preco:item.preco, total:item.preco,
    createdAt:firebase.firestore.FieldValue.serverTimestamp()
  };
  try{ await db.collection('pedidos').doc(code).set(order); }catch(e){}

  closeVitrineOrder();
  renderVitrine();
  showToast('✅ Pedido '+code+' confirmado!','var(--green)');

  // WhatsApp
  const msg = encodeURIComponent(
    `Olá ${name}! 👋\n`+
    `Seu pedido *DTF Studio* foi confirmado! 🎉\n\n`+
    `*Pedido:* ${code}\n`+
    `*Campanha:* ${camp.nome}\n`+
    `*Tamanho:* ${size}\n`+
    `*Total: R$ ${Number(item.preco).toFixed(2).replace('.',',')}*\n\n`+
    `Em breve entraremos em contato. Obrigado! 🤙`
  );
  const clientNum = phone.startsWith('55')?phone:'55'+phone;
  setTimeout(()=>window.open(`https://wa.me/${clientNum}?text=${msg}`,'_blank'),400);
}

// ── Admin — Gestão de Campanhas ───────────────────────
function renderAdminVitrine(g){
  // Adiciona seção de campanhas ao grid admin
  const campHtml=`<div class="acard" style="grid-column:1/-1;padding:0;overflow:hidden">
    <div class="accordion-bar" onclick="toggleCampAccordion(this)">
      <h3>🛍️ Campanhas da Vitrine</h3>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body" id="campBody">
      <div style="padding:12px 14px 14px">
        <div class="atag" style="margin-bottom:12px">Crie e gerencie campanhas com estoque limitado</div>
        <div id="campList" style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px"></div>
        <button class="abtn" onclick="openNewCamp()" style="width:100%;padding:8px">+ Nova Campanha</button>
      </div>
    </div>
  </div>`;
  g.insertAdjacentHTML('beforeend', campHtml);
  loadCampsForAdmin();
}

async function loadCampsForAdmin(){
  const list = document.getElementById('campList');
  if(!list) return;
  try{
    const snap = await db.collection('vitrine').orderBy('criadoEm','desc').limit(20).get();
    if(snap.empty){ list.innerHTML='<div style="color:var(--muted);font-size:11px">Nenhuma campanha ainda.</div>'; return; }
    list.innerHTML = snap.docs.map(d=>{
      const c={id:d.id,...d.data()};
      const total = (c.itens||[]).reduce((a,i)=>a+(i.estoque||0),0);
      const itensHtml = (c.itens||[]).map((it,idx)=>`
        <div style="display:flex;align-items:center;gap:8px;background:var(--surface3);border-radius:8px;padding:7px 10px;margin-bottom:6px">
          ${it.imgUrl?`<img src="${it.imgUrl}" style="width:36px;height:36px;object-fit:contain;border-radius:6px;background:#111">`:'<div style="width:36px;height:36px;border-radius:6px;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:18px">🖼️</div>'}
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.nome}</div>
            <div style="font-size:10px;color:var(--muted)">R$${Number(it.preco).toFixed(2).replace('.',',')} · ${it.estoque} em estoque</div>
          </div>
          <button onclick="delCampItem('${c.id}',${idx})" style="background:none;border:none;color:var(--muted);font-size:16px;cursor:pointer;padding:2px 6px;flex-shrink:0">×</button>
        </div>
      `).join('');
      return `<div style="background:var(--surface2);border-radius:10px;padding:10px 12px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${c.nome||'Sem nome'}</div>
            <div style="font-size:10px;color:var(--muted)">${c.dataInicio||'—'} → ${c.dataFim||'—'} · ${(c.itens||[]).length} item(s) · ${total} em estoque</div>
          </div>
          <div style="display:flex;gap:6px;align-items:center;flex-shrink:0">
            <div style="width:8px;height:8px;border-radius:50%;background:${c.ativa?'var(--green)':'var(--muted)'}"></div>
            <span style="font-size:10px;color:var(--muted)">${c.ativa?'Ativa':'Inativa'}</span>
            <button onclick="openEditCamp('${c.id}','${c.nome||''}','${c.dataInicio||''}','${c.dataFim||''}','${c.textoPop||''}')" style="background:none;border:none;color:var(--accent2);font-size:12px;cursor:pointer">✏️</button>
            <button onclick="toggleCamp('${c.id}',${!c.ativa})" style="background:none;border:none;color:var(--accent2);font-size:14px;cursor:pointer">${c.ativa?'⏸':'▶'}</button>
            <button onclick="deleteCamp('${c.id}')" style="background:none;border:none;color:var(--muted);font-size:16px;cursor:pointer">×</button>
          </div>
        </div>
        ${itensHtml}
        <button onclick="openAddItemPopup('${c.id}')" style="width:100%;background:var(--surface3);border:1.5px dashed var(--muted2);color:var(--muted);border-radius:8px;padding:7px;font-size:12px;cursor:pointer;margin-top:4px;font-family:'DM Sans',sans-serif;">+ Adicionar item</button>
      </div>`;
    }).join('');
  }catch(e){ console.error(e); }
}

function openAddItemPopup(campId){
  let popup = document.getElementById('addItemPopup');
  if(popup) popup.remove();
  _pendingItemImgs = [null,null,null,null];
  popup = document.createElement('div');
  popup.id = 'addItemPopup';
  popup.style.cssText = 'position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.88);padding:16px;overflow-y:auto;';
  popup.innerHTML = `
    <div style="background:var(--surface);border-radius:18px;border:1px solid var(--border);width:100%;max-width:420px;padding:22px;margin:auto">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;margin-bottom:16px">📦 Novo Item</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
        <div>
          <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px">Imagens do produto (até 4)</label>
          <label style="display:flex;align-items:center;gap:8px;background:var(--surface2);border:1.5px dashed var(--muted2);border-radius:8px;padding:8px 12px;cursor:pointer;font-size:12px;color:var(--muted);margin-bottom:8px">
            📁 Selecionar até 4 imagens de uma vez
            <input type="file" accept="image/*" multiple style="display:none" onchange="previewItemImgMulti(this)">
          </label>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">
            ${[0,1,2,3].map(i=>`
              <label style="aspect-ratio:1;border-radius:8px;background:var(--surface2);border:1.5px dashed var(--muted2);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;position:relative" id="imgSlot_${i}">
                <span style="font-size:20px;color:var(--muted)">+</span>
                <input type="file" accept="image/*" style="display:none" onchange="previewItemImgSlot(this,${i})">
              </label>
            `).join('')}
          </div>
          <div style="font-size:10px;color:var(--muted);margin-top:4px">1ª imagem aparece no card · demais no popup de detalhes</div>
        </div>
        <div>
          <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Nome do produto *</label>
          <input id="ni_nome" type="text" placeholder="Ex: Camiseta Camp Half-Blood"
            style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Preço (R$) *</label>
            <input id="ni_preco" type="number" placeholder="59.90"
              style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Estoque *</label>
            <input id="ni_estoque" type="number" placeholder="10"
              style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
          </div>
        </div>
        <div>
          <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Tamanhos disponíveis</label>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${['P','M','G','GG','XGG'].map(s=>`
              <label style="display:flex;align-items:center;gap:4px;font-size:12px;cursor:pointer">
                <input type="checkbox" value="${s}" name="ni_tam" style="accent-color:var(--accent)"> ${s}
              </label>
            `).join('')}
          </div>
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="document.getElementById('addItemPopup').remove()" style="flex:1;background:none;border:1.5px solid var(--border);color:var(--text);border-radius:50px;padding:10px;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;">Cancelar</button>
        <button onclick="submitAddItem('${campId}')" style="flex:2;background:var(--green);color:#fff;border:none;border-radius:50px;padding:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;">✅ Salvar Item</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  popup.addEventListener('click', e=>{ if(e.target===popup) popup.remove(); });
}

let _pendingItemImgs = [null,null,null,null];
function previewItemImgMulti(input){
  const files = Array.from(input.files).slice(0,4);
  files.forEach((file,i)=>{
    const slot = document.getElementById('imgSlot_'+i);
    if(slot) slot.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--muted)">⏳</div>`;
    uploadToStorage(file, `vitrine/${Date.now()}_${i}_${file.name}`, url=>{
      _pendingItemImgs[i] = url;
      if(slot){
        slot.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:6px"><input type="file" accept="image/*" style="display:none" onchange="previewItemImgSlot(this,${i})">`;
        slot.style.border = '1.5px solid var(--green)';
      }
    });
  });
}

function uploadToStorage(file, path, callback){
  const ref = storage.ref(path);
  ref.put(file).then(snap=>snap.ref.getDownloadURL()).then(url=>callback(url)).catch(e=>{
    console.error('Upload Storage:',e);
    showToast('❌ Erro ao enviar imagem');
  });
}

function previewItemImgSlot(input, idx){
  const file = input.files[0];
  if(!file) return;
  const slot = document.getElementById('imgSlot_'+idx);
  if(slot) slot.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--muted)">⏳</div>`;
  uploadToStorage(file, `vitrine/${Date.now()}_${idx}_${file.name}`, url=>{
    _pendingItemImgs[idx] = url;
    if(slot){
      slot.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:6px"><input type="file" accept="image/*" style="display:none" onchange="previewItemImgSlot(this,${idx})">`;
      slot.style.border = '1.5px solid var(--green)';
    }
  });
}

async function submitAddItem(campId){
  const nome    = document.getElementById('ni_nome')?.value.trim();
  const preco   = parseFloat(document.getElementById('ni_preco')?.value);
  const estoque = parseInt(document.getElementById('ni_estoque')?.value);
  const tams    = Array.from(document.querySelectorAll('input[name="ni_tam"]:checked')).map(c=>c.value);
  if(!nome||isNaN(preco)||isNaN(estoque)){ showToast('❌ Preencha nome, preço e estoque'); return; }
  const imgs = _pendingItemImgs.filter(Boolean);
  const item = { nome, preco, estoque, tamanhos: tams, imgUrl: imgs[0]||null, imgs };
  _pendingItemImgs = [null,null,null,null];
  try{
    const ref = db.collection('vitrine').doc(campId);
    const doc = await ref.get();
    const itens = doc.data().itens||[];
    itens.push(item);
    await ref.update({itens});
    document.getElementById('addItemPopup')?.remove();
    showToast('✅ Item adicionado!','var(--green)');
    loadCampsForAdmin();
    loadVitrineFromCloud();
  }catch(e){ showToast('❌ Erro ao salvar item'); }
}

async function delCampItem(campId, idx){
  if(!confirm('Remover este item?')) return;
  try{
    const ref = db.collection('vitrine').doc(campId);
    const doc = await ref.get();
    const itens = doc.data().itens||[];
    itens.splice(idx,1);
    await ref.update({itens});
    showToast('🗑 Item removido');
    loadCampsForAdmin();
    loadVitrineFromCloud();
  }catch(e){}
}

function openEditCamp(id, nome, inicio, fim, texto){
  let popup = document.getElementById('editCampPopup');
  if(popup) popup.remove();
  popup = document.createElement('div');
  popup.id = 'editCampPopup';
  popup.style.cssText = 'position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.88);padding:16px;';
  popup.innerHTML = `
    <div style="background:var(--surface);border-radius:18px;border:1px solid var(--border);width:100%;max-width:420px;padding:22px">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;margin-bottom:4px">✏️ Editar Campanha</div>
      <p style="font-size:11px;color:var(--muted);margin-bottom:18px">Altere os dados e salve.</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
        <div>
          <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Nome da Campanha *</label>
          <input id="ec_nome" type="text" value="${nome}"
            style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;outline:none" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">📅 Data Início</label>
            <input id="ec_inicio" type="date" value="${inicio}"
              style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">📅 Data Fim</label>
            <input id="ec_fim" type="date" value="${fim}"
              style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
          </div>
        </div>
        <div>
          <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Texto do Popup</label>
          <input id="ec_texto" type="text" value="${texto}"
            style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;outline:none" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="document.getElementById('editCampPopup').remove()" style="flex:1;background:none;border:1.5px solid var(--border);color:var(--text);border-radius:50px;padding:10px;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;">Cancelar</button>
        <button onclick="submitEditCamp('${id}')" style="flex:2;background:var(--green);color:#fff;border:none;border-radius:50px;padding:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;">💾 Salvar</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  popup.addEventListener('click', e=>{ if(e.target===popup) popup.remove(); });
}

async function submitEditCamp(id){
  const nome   = document.getElementById('ec_nome')?.value.trim();
  const inicio = document.getElementById('ec_inicio')?.value;
  const fim    = document.getElementById('ec_fim')?.value;
  const texto  = document.getElementById('ec_texto')?.value.trim();
  if(!nome){ showToast('❌ Informe o nome'); return; }
  try{
    await db.collection('vitrine').doc(id).update({nome, dataInicio:inicio, dataFim:fim, textoPop:texto});
    document.getElementById('editCampPopup')?.remove();
    showToast('✅ Campanha atualizada!','var(--green)');
    loadCampsForAdmin();
    loadVitrineFromCloud();
  }catch(e){ showToast('❌ Erro ao salvar'); }
}

function toggleCampAccordion(bar){
    const isOpen = bar.classList.contains('open');
    closeAllAdminAccordions();
    if(!isOpen){ bar.classList.add('open'); document.getElementById('campBody').classList.add('open'); }
}

function openNewCamp(){
  // Cria popup inline se ainda não existe
  let popup = document.getElementById('newCampPopup');
  if(!popup){
    popup = document.createElement('div');
    popup.id = 'newCampPopup';
    popup.style.cssText = 'position:fixed;inset:0;z-index:400;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);padding:16px;';
    const today = new Date().toISOString().split('T')[0];
    popup.innerHTML = `
      <div style="background:var(--surface);border-radius:18px;border:1px solid var(--border);width:100%;max-width:420px;padding:22px;animation:su .2s ease">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;margin-bottom:4px">🛍️ Nova Campanha</div>
        <p style="font-size:11px;color:var(--muted);margin-bottom:18px">Preencha os dados da campanha</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
          <div>
            <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Nome da Campanha *</label>
            <input id="nc_nome" type="text" placeholder="Ex: Maio Amarelo, Geek Week..."
              style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;outline:none;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div>
              <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">📅 Data Início</label>
              <input id="nc_inicio" type="date" value="${today}"
                style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
            </div>
            <div>
              <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">📅 Data Fim</label>
              <input id="nc_fim" type="date" value="${today}"
                style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
            </div>
          </div>
          <div>
            <label style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Texto do Popup (opcional)</label>
            <input id="nc_texto" type="text" placeholder="Ex: Novidades da Semana"
              style="width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:10px 12px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;outline:none;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
          </div>
        </div>
        <div style="display:flex;gap:10px">
          <button onclick="closeNewCampPopup()" style="flex:1;background:none;border:1.5px solid var(--border);color:var(--text);border-radius:50px;padding:10px;font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;">Cancelar</button>
          <button onclick="submitNewCamp()" style="flex:2;background:var(--green);color:#fff;border:none;border-radius:50px;padding:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;">✅ Criar Campanha</button>
        </div>
      </div>
    `;
    document.body.appendChild(popup);
    popup.addEventListener('click', e=>{ if(e.target===popup) closeNewCampPopup(); });
  } else {
    popup.style.display='flex';
  }
  setTimeout(()=>document.getElementById('nc_nome')?.focus(), 100);
}

function closeNewCampPopup(){
  const popup = document.getElementById('newCampPopup');
  if(popup) popup.style.display='none';
}

async function submitNewCamp(){
  const nome   = document.getElementById('nc_nome')?.value.trim();
  const inicio = document.getElementById('nc_inicio')?.value;
  const fim    = document.getElementById('nc_fim')?.value;
  const texto  = document.getElementById('nc_texto')?.value.trim() || nome;
  if(!nome){ showToast('❌ Informe o nome da campanha'); return; }
  closeNewCampPopup();
  await createCamp(nome, inicio, fim, texto);
}

async function createCamp(nome, dataInicio, dataFim, textoPop){
  try{
    await db.collection('vitrine').add({
      nome, dataInicio, dataFim, textoPop,
      ativa:true, itens:[],
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('✅ Campanha criada!','var(--green)');
    loadCampsForAdmin();
    loadVitrineFromCloud();
  }catch(e){ showToast('❌ Erro ao criar campanha'); }
}

async function toggleCamp(id, novoEstado){
  try{
    await db.collection('vitrine').doc(id).update({ativa:novoEstado});
    loadCampsForAdmin();
    loadVitrineFromCloud();
    showToast(novoEstado?'✅ Campanha ativada':'⏸ Campanha pausada');
  }catch(e){}
}

async function deleteCamp(id){
  if(!confirm('Excluir esta campanha?')) return;
  try{
    await db.collection('vitrine').doc(id).delete();
    loadCampsForAdmin();
    loadVitrineFromCloud();
    showToast('🗑 Campanha removida');
  }catch(e){}
}

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════
renderMockup();
updateCart();
loadDBFromCloud();
loadVitrineFromCloud();
loadZonesFromFirebase();
preloadAllMockups();

// ── Pré-carregamento de todos os mockups ──────────────
function preloadAllMockups(){
  const garments  = ['camiseta','moletom'];
  const viewKeys  = ['frente','costas','lat-dir','lat-esq'];
  const colors    = ['branco','preto','cinza'];
  const savedColor = color;
  garments.forEach(g=>{
    viewKeys.forEach(v=>{
      colors.forEach(c=>{
        color = c;
        const url = imgSrc(`${g}-${v}`);
        color = savedColor;
        const img = new Image();
        img.src = url;
      });
    });
  });
}

// ══════════════════════════════════════════════════════════════
// EDITOR VISUAL DE ZONAS — Admin
// ══════════════════════════════════════════════════════════════

let _zeGarment = 'camiseta', _zeView = 'frente', _zeZones = null, _zeSelected = null;

function renderAdminZoneEditor(g){
  const html = `<div class="acard" style="grid-column:1/-1;padding:0;overflow:hidden">
    <div class="accordion-bar" onclick="toggleZEAccordion(this)">
      <h3>📐 Editor Visual de Zonas</h3>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body" id="zeBody">
      <div style="padding:14px">
        <div style="font-size:11px;color:var(--muted);margin-bottom:12px">Arraste as zonas, redimensione pelos cantos e ajuste a rotação. Salve no Firebase quando terminar.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px" id="zeSelBtns">
          ${['camiseta','moletom'].map(g2=>['frente','costas','lat-dir','lat-esq'].map(v=>`
            <button class="ze-sel-btn" data-g="${g2}" data-v="${v}" onclick="zeSelect('${g2}','${v}',this)"
              style="background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:5px 10px;color:var(--muted);font-size:10px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s">
              ${g2==='camiseta'?'👕':'🧥'} ${g2} ${v}
            </button>`).join('')).join('')}
        </div>
        <div style="display:grid;grid-template-columns:minmax(200px, 500px);gap:12px;align-items:start">
          <div style="position:relative;border-radius:10px;overflow:hidden;background:#0a0a0a;line-height:0;user-select:none" id="zeStage">
            <img id="zeImg" src="" style="width:100%;display:block;pointer-events:none;opacity:0.85">
            <div id="zeOverlay" style="position:absolute;inset:0"></div>
          </div>
          <div style="background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border)">
            <div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Zona Selecionada</div>
            <div id="zePanelEmpty" style="font-size:11px;color:var(--muted);padding:8px 0">Clique numa zona para editar</div>
            <div id="zePanel" style="display:none">
              <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--accent);margin-bottom:10px" id="zePanelName"></div>
              ${[['Top (%)','zeTop'],['Left (%)','zeLeft'],['Largura (%)','zeW'],['Altura (%)','zeH'],['Rotação (°)','zeRot']].map(([lbl,id])=>`
                <div style="margin-bottom:8px">
                  <div style="font-size:10px;color:var(--muted);margin-bottom:3px">${lbl}</div>
                  <input id="${id}" type="number" step="0.1"
                    style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:5px 8px;color:var(--text);font-size:12px;font-family:'DM Sans',sans-serif"
                    oninput="zeUpdateFromPanel()">
                </div>`).join('')}
            </div>
            <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
              <button onclick="zeSave()" style="width:100%;background:var(--green);color:#fff;border:none;border-radius:8px;padding:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;margin-bottom:6px">💾 Salvar no Firebase</button>
              <button onclick="zeReset()" style="width:100%;background:var(--surface3);color:var(--muted);border:none;border-radius:8px;padding:7px;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif">↺ Resetar para padrão</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  g.insertAdjacentHTML('beforeend', html);
  setTimeout(()=>{const b=document.querySelector('.ze-sel-btn');if(b)zeSelect('camiseta','frente',b);},200);
}

function toggleZEAccordion(bar){bar.classList.toggle('open');document.getElementById('zeBody').classList.toggle('open');}

function zeSelect(gmt,view,btn){
  _zeGarment=gmt;_zeView=view;
  document.querySelectorAll('.ze-sel-btn').forEach(b=>{b.style.borderColor='var(--border)';b.style.color='var(--muted)';b.style.background='var(--surface2)';});
  if(btn){btn.style.borderColor='var(--accent)';btn.style.color='var(--text)';btn.style.background='rgba(255,69,0,0.1)';}
  const vm={frente:'FRENTE',costas:'COSTAS','lat-dir':'LATERAL_DIREITO','lat-esq':'LATERAL_ESQUERDO'};
  const gm={camiseta:'CAMISETA',moletom:'MOLETOM'};
  const img=document.getElementById('zeImg');
  if(img) img.src=`${STORAGE_BASE}/mockups%2F${gm[gmt]}_${vm[view]}_BRANCO.webp?alt=media`;
  _zeZones=JSON.parse(JSON.stringify(ZONES[`${gmt}-${view}`]||[]));
  _zeSelected=null;zeDeselect();zeRender();
}

function zeRender(){
  const overlay=document.getElementById('zeOverlay');const stage=document.getElementById('zeStage');
  if(!overlay||!stage) return;
  overlay.innerHTML='';
  _zeZones.forEach((z,i)=>{
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;top:${z.top}%;left:${z.left}%;width:${z.w}%;height:${z.h}%;border:2px solid ${_zeSelected===i?'#ff4500':'rgba(255,255,255,0.4)'};background:${_zeSelected===i?'rgba(255,69,0,0.15)':'rgba(255,255,255,0.05)'};cursor:move;box-sizing:border-box;transform:rotate(${z.rotate||0}deg);transform-origin:center;display:flex;align-items:center;justify-content:center;`;
    const lbl=document.createElement('div');
    lbl.textContent=POS_META[z.id]?.label||z.id;
    lbl.style.cssText='font-size:9px;color:#fff;text-align:center;pointer-events:none;background:rgba(0,0,0,.5);padding:1px 4px;border-radius:3px;max-width:90%;overflow:hidden;white-space:nowrap;';
    el.appendChild(lbl);
    const rh=document.createElement('div');
    rh.style.cssText='position:absolute;bottom:-4px;right:-4px;width:10px;height:10px;background:var(--accent);border-radius:2px;cursor:se-resize;z-index:2;';
    rh.addEventListener('mousedown',e=>{e.stopPropagation();zeStartResize(e,i,stage);});
    el.appendChild(rh);
    el.addEventListener('mousedown',e=>{if(e.target===rh)return;zeStartDrag(e,i,stage);});
    el.addEventListener('click',()=>zeSelectZone(i));
    overlay.appendChild(el);
  });
}

function zeSelectZone(idx){
  _zeSelected=idx;zeRender();
  const z=_zeZones[idx];
  document.getElementById('zePanelEmpty').style.display='none';
  document.getElementById('zePanel').style.display='block';
  document.getElementById('zePanelName').textContent=POS_META[z.id]?.label||z.id;
  document.getElementById('zeTop').value=z.top.toFixed(1);
  document.getElementById('zeLeft').value=z.left.toFixed(1);
  document.getElementById('zeW').value=z.w.toFixed(1);
  document.getElementById('zeH').value=z.h.toFixed(1);
  document.getElementById('zeRot').value=(z.rotate||0).toFixed(1);
}

function zeDeselect(){
  document.getElementById('zePanelEmpty').style.display='block';
  document.getElementById('zePanel').style.display='none';
}

function zeUpdateFromPanel(){
  if(_zeSelected===null) return;
  const z=_zeZones[_zeSelected];
  z.top=parseFloat(document.getElementById('zeTop').value)||0;
  z.left=parseFloat(document.getElementById('zeLeft').value)||0;
  z.w=parseFloat(document.getElementById('zeW').value)||10;
  z.h=parseFloat(document.getElementById('zeH').value)||10;
  z.rotate=parseFloat(document.getElementById('zeRot').value)||0;
  zeRender();
}

function zeStartDrag(e,idx,stage){
  e.preventDefault();zeSelectZone(idx);
  const rect=stage.getBoundingClientRect();
  const z=_zeZones[idx];const sx=e.clientX,sy=e.clientY,ol=z.left,ot=z.top;
  const onMove=ev=>{
    z.left=Math.max(0,Math.min(100-z.w,ol+(ev.clientX-sx)/rect.width*100));
    z.top=Math.max(0,Math.min(100-z.h,ot+(ev.clientY-sy)/rect.height*100));
    zeRender();zeSelectZone(idx);
  };
  const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};
  document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
}

function zeStartResize(e,idx,stage){
  e.preventDefault();
  const rect=stage.getBoundingClientRect();
  const z=_zeZones[idx];const sx=e.clientX,sy=e.clientY,ow=z.w,oh=z.h;
  const onMove=ev=>{
    z.w=Math.max(5,ow+(ev.clientX-sx)/rect.width*100);
    z.h=Math.max(3,oh+(ev.clientY-sy)/rect.height*100);
    zeRender();zeSelectZone(idx);
  };
  const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};
  document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
}

async function zeSave(){
  const key=`${_zeGarment}-${_zeView}`;
  ZONES[key]=JSON.parse(JSON.stringify(_zeZones));
  try{
    const zonesData={};Object.keys(ZONES).forEach(k=>{zonesData[k]=ZONES[k];});
    await db.collection('config').doc('zones').set({zones:zonesData});
    showToast('✅ Zonas salvas!','var(--green)');
  }catch(e){showToast('❌ Erro ao salvar');console.error(e);}
}

function zeReset(){
  if(!confirm('Resetar para as coordenadas originais?')) return;
  _zeZones=JSON.parse(JSON.stringify(ZONES[`${_zeGarment}-${_zeView}`]||[]));
  _zeSelected=null;zeDeselect();zeRender();
}

async function loadZonesFromFirebase(){
  try{
    const doc=await db.collection('config').doc('zones').get();
    if(doc.exists&&doc.data().zones) Object.assign(ZONES,doc.data().zones);
  }catch(e){console.warn('Zonas padrão em uso.');}
}
