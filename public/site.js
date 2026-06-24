// ─── LOAD DATA & RENDER ───────────────────────────────────────────────────
let DATA = {};

async function loadData() {
  showSkeletons();
  const hasContent = (o) => o && typeof o === 'object' && Object.keys(o).length > 0 && (o.services || o.brand || o.pricing);
  let defaults = {};
  try { defaults = await (await fetch('/data.json', { cache: 'no-store' })).json(); } catch(e) {}
  try {
    // Prefer live content saved from the admin panel, but always keep data.json defaults as a base
    const live = await fetch('/api/public/site-content', { cache: 'no-store' });
    const liveJson = await live.json();
    if (hasContent(liveJson && liveJson.content)) {
      DATA = Object.assign({}, defaults);
      const lc = liveJson.content;
      Object.keys(lc).forEach(k => {
        const v = lc[k];
        // keep data.json default when live value is empty/missing (e.g. team: [])
        const isEmpty = v == null || (Array.isArray(v) && v.length === 0);
        if (!isEmpty) DATA[k] = v;
      });
    } else {
      DATA = defaults;
    }

  } catch(e) {
    DATA = defaults;
  }
  if (!DATA || !Object.keys(DATA).length) {
    // fallback inline data
    DATA = {
      brand: { name:"Alevoor Technologies", phone:"+91 9483886270", email:"alevoor@gmail.com", instagram:"@alevoor", founderName:"Rishabh Alevoor", founderTitle:"Founder & CEO, Alevoor Technologies" },
      stats: [{value:"50+",label:"YouTube Managed"},{value:"10M+",label:"Insta Growth"},{value:"100+",label:"Happy Creators"},{value:"3x",label:"Avg. Growth"}],
      services: [],process:[],whyUs:[],testimonials:[],pricing:{content:[],yt:[],onetime:[]},portfolio:[],team:[],faqs:[]
    };
  }

  // brief delay so skeleton transition is visible
  await new Promise(r => setTimeout(r, 400));
  renderAll();
  hideLoading();
  highlightNav();
  // if arriving with a hash (e.g. /about#team), scroll to it after render
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    setTimeout(() => navScroll(id), 200);
  }
}

function highlightNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('#nav .nav-links a[data-path], #menu-overlay a[data-path]').forEach(a => {
    if (a.getAttribute('data-path') === path) a.classList.add('nav-active');
    else a.classList.remove('nav-active');
  });
}


function skelCards(n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += `<div class="skel-card"><div class="skeleton skel-block"></div><div class="skeleton skel-line md"></div><div class="skeleton skel-line sm"></div></div>`;
  }
  return s;
}

function showSkeletons() {
  const map = { 'services-grid': 6, 'testi-grid': 3, 'team-grid': 3 };
  Object.entries(map).forEach(([id, n]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = skelCards(n);
  });
}

function hideLoading() {
  const l = document.getElementById('loading');
  l.style.opacity = '0';
  setTimeout(() => l.style.display = 'none', 500);
}

function renderAll() {
  renderStats();
  renderMarquee();
  renderServices();
  renderCourses();
  renderProcess();
  renderWhyUs();
  renderPortfolio();
  renderGallery();
  renderTestimonials();
  renderTeam();
  renderFAQs();
  renderContact();
}

function renderStats() {
  const el = document.getElementById('hero-stats');
  if (!DATA.stats) return;
  el.innerHTML = DATA.stats.map(s => `
    <div class="hero-stat text-center">
      <div class="hero-stat-val">${s.value}</div>
      <div class="hero-stat-label">${s.label}</div>
    </div>`).join('');
}

function renderMarquee() {
  const el = document.getElementById('marquee-track');
  if (!el || !DATA.trustedClients) return;
  const icon = (p) => p === 'Instagram' ? '📸' : (p === 'Both' ? '🌐' : '▶');
  const pill = (c) => `<div class="marquee-pill">${icon(c.platform)} ${c.name}</div>`;
  const list = DATA.trustedClients.map(pill).join('');
  el.innerHTML = list + list;
}

const SERVICE_CAT = {
  'Content Marketing':'Content','Editing Support':'Content','Content Creation':'Content','UGC':'Content',
  'Hosting Services':'Tech','Inventory Software':'Software','Website Development':'Software','App Development':'Software','Software':'Software',
  'SEO Optimisation':'Marketing','Digital Marketing':'Marketing','Social Media':'Marketing','Ads':'Marketing','AI':'Tech','Cloud':'Tech','Analytics':'Tech'
};
function catFor(name){
  for (const k in SERVICE_CAT){ if (name.toLowerCase().includes(k.toLowerCase())) return SERVICE_CAT[k]; }
  return 'Tech';
}
function renderServices() {
  const el = document.getElementById('services-grid');
  if (!DATA.services) return;
  el.innerHTML = DATA.services.map((s,i) => `
    <div class="service-card anim-in" data-cat="${catFor(s.name)}" style="animation-delay:${i*0.07}s">
      <div class="service-icon">${s.icon}</div>
      <div>
        <div class="service-name">${s.name}</div>
        <div class="service-desc">${s.desc}</div>
      </div>
    </div>`).join('');
}
function filterServices(cat, btn) {
  document.querySelectorAll('#service-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#services-grid .service-card').forEach(c => {
    c.style.display = (cat === 'All' || c.dataset.cat === cat) ? '' : 'none';
  });
}

function courseCardHTML(c){
  const prices = c.pricing.map(p => `<div class="course-price-box"><div class="course-price-label">${p.label}</div><div class="course-price-val">${p.price}</div></div>`).join('');
  const feats = c.features.map(f => `<li>${f}</li>`).join('');
  return `<div class="course-card ${c.popular?'popular':''}">
    ${c.popular?'<div class="pop-badge">Most Popular</div>':''}
    <div class="course-card-head">
      <div class="course-card-icon" style="background:${c.iconBg}">${c.icon}</div>
      <div><div class="course-card-name">${c.name}</div><div class="course-card-dur">Duration: ${c.duration}</div></div>
    </div>
    <div class="course-price-row">${prices}</div>
    <ul class="course-feat">${feats}</ul>
    <button class="course-cta" onclick="navScroll('contact')">${c.cta}</button>
  </div>`;
}
function renderCourses() {
  if (!DATA.courses) return;
  const prev = document.getElementById('course-preview');
  if (prev) prev.innerHTML = DATA.courses.map(c => `
    <div class="course-preview-card" onclick="openCourseDetail()">
      <div class="course-icon" style="background:${c.iconBg}">${c.icon}</div>
      <div class="course-preview-name">${c.name}</div>
    </div>`).join('');
  const grid = document.getElementById('course-detail-grid');
  if (grid) grid.innerHTML = DATA.courses.map(courseCardHTML).join('');
}
function toggleCourseDetail(){
  const d = document.getElementById('course-detail');
  d.classList.toggle('open');
  if (d.classList.contains('open')) d.scrollIntoView({behavior:'smooth', block:'start'});
}
function openCourseDetail(){
  const d = document.getElementById('course-detail');
  if (!d.classList.contains('open')) d.classList.add('open');
  d.scrollIntoView({behavior:'smooth', block:'start'});
}

function switchPortfolio(tab){
  const isCase = tab === 'case';
  document.getElementById('portfolio-case').style.display = isCase ? '' : 'none';
  document.getElementById('portfolio-gallery').style.display = isCase ? 'none' : '';
  document.getElementById('ptab-case').classList.toggle('active', isCase);
  document.getElementById('ptab-gallery').classList.toggle('active', !isCase);
}
function renderGallery(){
  const el = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');
  if (!el) return;
  const items = (DATA.gallery || []).slice().reverse();
  if (!items.length){ el.innerHTML=''; if(empty) empty.style.display='block'; return; }
  if (empty) empty.style.display='none';
  el.innerHTML = items.map((g,i) => {
    const ratio = g.ratio === '16:9' ? 'ratio-169' : 'ratio-916';
    const thumb = g.type === 'photo' && g.src
      ? `<img class="gallery-thumb" src="${g.src}" alt="${g.title||'Gallery'}" />`
      : `<div class="gallery-thumb">${g.type==='video'?'▶':'🖼️'}</div>`;
    return `<div class="gallery-item ${ratio}" onclick='openLightbox(${i})'>
      ${g.category?`<div class="gallery-cat">${g.category}</div>`:''}
      ${thumb}
      <div class="gallery-overlay">${g.type==='video'?'▶':'🔍'}</div>
    </div>`;
  }).join('');
  window.__GALLERY = items;
}
function openLightbox(i){
  const g = (window.__GALLERY||[])[i]; if(!g) return;
  const c = document.getElementById('lightbox-content');
  if (g.type==='video' && g.src){
    let embed = g.src;
    const yt = g.src.match(/(?:youtu\.be\/|v=)([\w-]+)/);
    if (yt) embed = `https://www.youtube.com/embed/${yt[1]}`;
    c.innerHTML = (embed.includes('youtube.com/embed')||embed.includes('player'))
      ? `<iframe src="${embed}" allowfullscreen></iframe>`
      : `<video src="${g.src}" controls autoplay></video>`;
  } else {
    c.innerHTML = `<img src="${g.src||''}" alt="${g.title||''}" />`;
  }
  document.getElementById('gallery-lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  document.getElementById('gallery-lightbox').classList.remove('open');
  document.getElementById('lightbox-content').innerHTML='';
  document.body.style.overflow='';
}

function renderProcess() {
  const el = document.getElementById('process-list');
  if (!DATA.process) return;
  const icons = ['💬','📊','🚀','📄'];
  el.innerHTML = DATA.process.map((s,i) => `
    <div class="process-item">
      <div class="process-left">
        <div class="process-icon-wrap" style="position:relative">
          <span>${icons[i]||s.icon||'⚡'}</span>
          <div class="process-num">${s.num}</div>
        </div>
        ${i < DATA.process.length-1 ? '<div class="process-line"></div>' : ''}
      </div>
      <div style="flex:1">
        <div class="process-content">
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
      </div>
    </div>`).join('');
}

function renderWhyUs() {
  const el = document.getElementById('why-cards');
  if (!DATA.whyUs) return;
  el.innerHTML = DATA.whyUs.map(w => `
    <div class="why-card">
      <div class="why-card-icon">${w.icon}</div>
      <div>
        <div class="why-card-title">${w.title}</div>
        <div class="why-card-desc">${w.desc}</div>
      </div>
    </div>`).join('');
}

function renderTestimonials() {
  const el = document.getElementById('testi-grid');
  if (!DATA.testimonials) return;
  el.innerHTML = DATA.testimonials.map((t,i) => `
    <div class="testi-card anim-in" style="animation-delay:${i*0.08}s">
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <div class="testi-footer">
        <div class="testi-author">
          <div class="testi-avatar">${t.initials}</div>
          <div>
            <div class="testi-name">${t.name}</div>
            <div class="testi-role">${t.role}</div>
          </div>
        </div>
        <button style="background:var(--white);border:1px solid var(--border);border-radius:50px;padding:4px 12px;font-size:11px;color:var(--gray);cursor:pointer">Visit ↗</button>
      </div>
    </div>`).join('');
}

function renderPricing() {
  if (!DATA.pricing) return;
  const P = DATA.pricing;
  const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  // Content Marketing
  setHTML('panel-content', `<div class="pricing-grid">${(P.content||[]).map(p => `
    <div class="pricing-card ${p.popular?'popular':''}">
      <div class="pricing-name">${p.name}</div>
      <div class="pricing-sub">${p.subtitle||''}</div>
      <div class="pricing-price">${p.price}<span class="pricing-period">${p.period||''}</span></div>
      <ul class="pricing-features">${(p.features||[]).map(f=>`<li>${f}</li>`).join('')}</ul>
      <button class="btn-pricing ${p.popular?'btn-pricing-fill':'btn-pricing-out'}" onclick="navScroll('contact')">Get Started</button>
    </div>`).join('')}</div>`);
  // Courses
  setHTML('panel-courses', `<div class="pricing-grid">${(P.courses||[]).map(p => `
    <div class="pricing-card ${p.best?'best':''}">
      <div class="pricing-name">${p.name}</div>
      <div class="pricing-sub">${p.subtitle||''}</div>
      <div class="pricing-price">${p.price}<span class="pricing-period"> ${p.period||''}</span></div>
      <ul class="pricing-features">${(p.features||[]).map(f=>`<li>${f}</li>`).join('')}</ul>
      <button class="btn-pricing ${p.best?'btn-pricing-fill':'btn-pricing-out'}" onclick="navScroll('contact')">Enroll Now</button>
    </div>`).join('')}</div>`);
  // YT
  setHTML('panel-yt', `<div class="pricing-grid">${(P.yt||[]).map(p => `
    <div class="pricing-card ${p.best?'best':''}">
      <div class="pricing-name">${p.name}</div>
      <div class="pricing-price" style="color:#e67e22">${p.price}<span class="pricing-period" style="font-size:13px;color:#aaa"> ${p.period||''}</span></div>
      <ul class="pricing-features">${(p.features||[]).map(f=>`<li>${f}</li>`).join('')}</ul>
      <button class="btn-pricing ${p.best?'btn-pricing-fill':'btn-pricing-out'}" style="${p.best?'background:#e67e22;border:none':''}" onclick="navScroll('contact')">Get Started</button>
    </div>`).join('')}</div>`);
  // One Time
  setHTML('panel-onetime', `<div class="pricing-grid">${(P.onetime||[]).map(p => `
    <div class="pricing-card ${p.best?'best':''}">
      <div class="pricing-name">${p.name}</div>
      <div class="pricing-price">${p.price}<span class="pricing-period"> one-time</span></div>
      <p style="font-size:12px;color:#888;margin:10px 0 14px;line-height:1.6">${p.desc||''}</p>
      <ul class="pricing-features"><li>One-time setup</li><li>No monthly charges</li></ul>
      <button class="btn-pricing ${p.best?'btn-pricing-fill':'btn-pricing-out'}" onclick="navScroll('contact')">Get Started</button>
    </div>`).join('')}</div>`);
}


function renderPortfolio() {
  const el = document.getElementById('portfolio-grid');
  if (!DATA.portfolio) return;
  el.innerHTML = DATA.portfolio.map(p => `
    <div class="portfolio-card">
      <div class="portfolio-banner">${p.icon}</div>
      <div class="portfolio-body">
        <div class="portfolio-cat">${p.category}</div>
        <div class="portfolio-title">${p.title}</div>
        <div class="portfolio-desc">${p.desc}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
          <span class="portfolio-result">📈 ${p.result}</span>
          <span class="portfolio-link">View →</span>
        </div>
      </div>
    </div>`).join('');
}

function renderTeam() {
  const el = document.getElementById('team-grid');
  if (!el || !DATA.team) return;
  el.innerHTML = DATA.team.map((m,i) => `
    <div class="team-card anim-in" style="animation-delay:${i*0.08}s">
      <div class="team-avatar">${m.initials}</div>
      <div class="team-name">${m.name}</div>
      <div class="team-role">${m.role}</div>
    </div>`).join('');
}

function renderFAQs() {
  const el = document.getElementById('faq-list');
  if (!DATA.faqs) return;
  el.innerHTML = DATA.faqs.map((f,i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" onclick="toggleFAQ(${i})">
        ${f.q}
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-a">${f.a}</div>
    </div>`).join('');
}

function renderContact() {
  if (!DATA.brand) return;
  const b = DATA.brand;
  const els = {
    'contact-phone': b.phone,
    'contact-email': b.email,
    'contact-insta': b.instagram,
    'footer-phone': b.phone,
    'footer-email': b.email,
    'footer-insta': b.instagram,
    'founder-name': b.founderName,
    'founder-role': b.founderTitle,
  };
  Object.entries(els).forEach(([id,val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
  // WhatsApp link
  document.getElementById('c-whatsapp').onclick = () => window.open(`https://wa.me/${b.phone.replace(/\D/g,'')}`, '_blank');
  document.getElementById('c-email').onclick = () => window.open(`mailto:${b.email}`, '_blank');
  document.getElementById('c-insta').onclick = () => window.open(`https://instagram.com/${b.instagram.replace('@','')}`, '_blank');
}

// ─── UI FUNCTIONS ─────────────────────────────────────────────────────────
const SECTION_PAGE = {
  hero: '/', home: '/',
  services: '/services', courses: '/services',
  about: '/about', founder: '/about', team: '/about', process: '/about', whyus: '/about', ecosystem: '/about',
  portfolio: '/portfolio', gallery: '/portfolio',
  pricing: '/pricing',
  contact: '/contact', consultation: '/contact', faq: '/contact'
};
function navScroll(id) {
  const el = document.getElementById(id);
  if (!el) {
    // section lives on another page — navigate there with a hash so it can scroll
    const page = SECTION_PAGE[id] || '/';
    window.location.href = page === '/' ? '/' : page + '#' + id;
    return;
  }
  const navHeight = 64;
  const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
  window.scrollTo({ top: top, behavior: 'smooth' });
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function openMenu() { document.getElementById('menu-overlay').classList.add('open'); }
function closeMenu() { document.getElementById('menu-overlay').classList.remove('open'); }
function openVideo() { document.getElementById('video-modal').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeVideo() { document.getElementById('video-modal').classList.remove('open'); document.body.style.overflow = ''; }

/* ─── HERO SLIDESHOW ─── */
(function initSlideshow() {
  var slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  var dotsWrap = document.getElementById('hero-dots');
  var idx = 0, timer;
  slides.forEach(function(_, i) {
    var d = document.createElement('button');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.onclick = function() { go(i); reset(); };
    dotsWrap.appendChild(d);
  });
  var dots = dotsWrap.querySelectorAll('.hero-dot');
  function go(n) {
    slides[idx].classList.remove('active'); dots[idx].classList.remove('active');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active'); dots[idx].classList.add('active');
  }
  function reset() { clearInterval(timer); timer = setInterval(function() { go(idx + 1); }, 4000); }
  reset();
})();

function switchTab(tab, btn) {
  document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pricing-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
}

function toggleFAQ(i) {
  const item = document.getElementById('faq-' + i);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

async function submitForm() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const platform = document.getElementById('f-platform').value.trim();
  const message = document.getElementById('f-msg').value.trim();
  if (!name || !email) { alert('Please fill in your name and email.'); return; }
  const btn = document.querySelector('.btn-submit');
  const orig = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  try {
    const res = await fetch('/api/public/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, platform, message })
    });
    if (!res.ok) throw new Error('failed');
    showToast("✅ Message sent! We'll get back to you within 24 hours.");
    ['f-name','f-email','f-platform','f-msg'].forEach(id => document.getElementById(id).value = '');
  } catch (e) {
    showToast('⚠️ Could not send right now. Please try again or WhatsApp us.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = orig; }
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (msg) t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

function toggleDark() {
  const dark = document.body.classList.toggle('dark');
  try { localStorage.setItem('alevoor-theme', dark ? 'dark' : 'light'); } catch(e) {}
  const tgl = document.querySelector('[onclick="toggleDark()"]');
  if (tgl) tgl.textContent = dark ? '☀' : '☽';
}
(function initTheme(){
  try {
    if (localStorage.getItem('alevoor-theme') === 'dark') {
      document.body.classList.add('dark');
      const tgl = document.querySelector('[onclick="toggleDark()"]');
      if (tgl) tgl.textContent = '☀';
    }
  } catch(e) {}
})();

// ─── SCROLL BEHAVIORS ─────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  // nav shadow
  document.getElementById('nav').style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.08)' : 'none';
  // fade-up animations
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
});

// ─── INIT ─────────────────────────────────────────────────────────────────
loadData();