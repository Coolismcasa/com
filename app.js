/* ═══════════════════════════════════════════════════════════
   COOLISM — App Logic
   ═══════════════════════════════════════════════════════════ */

const CATEGORIES = {
  shirts:  { label: 'Shirts',  color1: '#E33A3A', color2: '#A81E1E' },
  pants:   { label: 'Pants',   color1: '#8B6E54', color2: '#5C4736' },
  jackets: { label: 'Jackets', color1: '#333333', color2: '#0E0E0E' },
  hoodies: { label: 'Hoodies', color1: '#25355A', color2: '#131F3A' }
};

const PRODUCTS = [
  {
    name: 'Classic Red Tee',
    cat: 'shirts',
    price: 2490, old: 3200, tag: 'New',
    desc: 'A relaxed-fit tee cut from heavyweight 320 GSM cotton. Drop shoulders, ribbed collar, and a soft hand-feel that only gets better with every wash. Made for everyday wear, styled for anything.',
    sizes: ['S','M','L','XL','XXL'],
    colors: [
      { name: 'Red', hex: '#E33A3A' },
      { name: 'Navy', hex: '#0B1A30' },
      { name: 'Off-White', hex: '#F1EFE9' }
    ],
    fabric: '100% Combed Cotton — 320 GSM',
    care: 'Machine wash cold · Do not bleach · Iron on reverse',
    sku: 'CLM-SH-001'
  },
  {
    name: 'Royal Oxford Shirt',
    cat: 'shirts',
    price: 4990, old: null, tag: null,
    desc: 'A crisp Oxford weave with mother-of-pearl buttons and a clean cutaway collar. Structured enough for the office, soft enough for the weekend. Runs true to size.',
    sizes: ['S','M','L','XL'],
    colors: [
      { name: 'White', hex: '#F9F8F6' },
      { name: 'Sky', hex: '#A8C4E0' },
      { name: 'Navy', hex: '#0B1A30' }
    ],
    fabric: '100% Egyptian Cotton Oxford',
    care: 'Machine wash warm · Tumble dry low',
    sku: 'CLM-SH-002'
  },
  {
    name: 'Pleated Wide-Leg Trousers',
    cat: 'pants',
    price: 5890, old: 6990, tag: 'Bestseller',
    desc: 'Tailored with a single front pleat and a wide, flowing leg. Falls beautifully from the hip and moves with you. Sitting high on the waist for a timeless silhouette.',
    sizes: ['30','32','34','36','38'],
    colors: [
      { name: 'Brown', hex: '#6B5442' },
      { name: 'Charcoal', hex: '#2A2A2A' },
      { name: 'Cream', hex: '#E4DCC9' }
    ],
    fabric: 'Poly-wool blend — mid-weight',
    care: 'Dry clean only',
    sku: 'CLM-PT-001'
  },
  {
    name: 'Relaxed Linen Pants',
    cat: 'pants',
    price: 4290, old: null, tag: null,
    desc: 'Breathable pure linen with a soft elasticated back. Made for Karachi summers — light, airy, and comfortable all day long.',
    sizes: ['30','32','34','36'],
    colors: [
      { name: 'Sand', hex: '#D6C7A8' },
      { name: 'Off-White', hex: '#F1EFE9' },
      { name: 'Sage', hex: '#9CAE93' }
    ],
    fabric: '100% European Linen',
    care: 'Machine wash cold · Line dry',
    sku: 'CLM-PT-002'
  },
  {
    name: 'Moto Leather Jacket',
    cat: 'jackets',
    price: 18900, old: 22500, tag: 'Limited',
    desc: 'A classic asymmetrical biker silhouette in full-grain sheep leather. Heavy-duty YKK zips, quilted shoulder panels, and a soft viscose lining. Ages beautifully with every wear.',
    sizes: ['S','M','L','XL'],
    colors: [
      { name: 'Black', hex: '#0E0E0E' },
      { name: 'Espresso', hex: '#3A2C20' }
    ],
    fabric: 'Full-grain sheep leather · Viscose lining',
    care: 'Wipe clean · Condition leather twice a year',
    sku: 'CLM-JK-001'
  },
  {
    name: 'Navy Bomber Jacket',
    cat: 'jackets',
    price: 11900, old: null, tag: null,
    desc: 'Lightweight nylon bomber with ribbed cuffs and hem. Water-resistant shell, hidden interior pocket, and a clean minimal finish. The jacket you reach for every evening.',
    sizes: ['S','M','L','XL','XXL'],
    colors: [
      { name: 'Navy', hex: '#0B1A30' },
      { name: 'Olive', hex: '#4A5240' },
      { name: 'Black', hex: '#111111' }
    ],
    fabric: 'Recycled nylon shell · Quilted lining',
    care: 'Machine wash cold · Hang dry',
    sku: 'CLM-JK-002'
  },
  {
    name: 'Oversized Navy Hoodie',
    cat: 'hoodies',
    price: 6490, old: 7990, tag: 'Bestseller',
    desc: 'Cut with a dropped shoulder and a boxy fit that drapes perfectly. Brushed fleece inside for softness, double-layer hood for structure. The one hoodie you\'ll live in.',
    sizes: ['S','M','L','XL','XXL'],
    colors: [
      { name: 'Navy', hex: '#131F3A' },
      { name: 'Charcoal', hex: '#3A3A3A' },
      { name: 'Off-White', hex: '#F1EFE9' }
    ],
    fabric: '85% Cotton / 15% Poly · 400 GSM fleece',
    care: 'Machine wash cold · Tumble dry low',
    sku: 'CLM-HD-001'
  },
  {
    name: 'Fleece-Lined Zip Hoodie',
    cat: 'hoodies',
    price: 7290, old: null, tag: 'New',
    desc: 'Full-zip hoodie with a double-lined hood and a soft brushed interior. Two side pockets with hidden zips. Perfect layering piece for cool mornings and late nights.',
    sizes: ['S','M','L','XL'],
    colors: [
      { name: 'Navy', hex: '#131F3A' },
      { name: 'Grey', hex: '#8A8A8A' },
      { name: 'Black', hex: '#0E0E0E' }
    ],
    fabric: 'Cotton-poly blend · Fleece interior',
    care: 'Machine wash cold · Tumble dry low',
    sku: 'CLM-HD-002'
  }
];

const money = n => 'Rs ' + n.toLocaleString('en-PK');
const getCat = key => CATEGORIES[key] || { label: key, color1: '#333', color2: '#111' };

function productVisual(p, cls = 'card-placeholder') {
  const c = getCat(p.cat);
  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}" loading="lazy"
              onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
            <div class="${cls}" style="display:none;background:linear-gradient(140deg,${c.color1},${c.color2})">
              <span class="letter">${p.name.charAt(0)}</span>
              <span class="cat-badge">${c.label}</span>
            </div>`;
  }
  return `<div class="${cls}" style="background:linear-gradient(140deg,${c.color1},${c.color2})">
            <span class="letter">${p.name.charAt(0)}</span>
            <span class="cat-badge">${c.label}</span>
          </div>`;
}

function cartVisual(p) {
  const c = getCat(p.cat);
  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}"
              onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
            <div class="mini-letter" style="display:none;background:linear-gradient(140deg,${c.color1},${c.color2})">${p.name.charAt(0)}</div>`;
  }
  return `<div class="mini-letter" style="background:linear-gradient(140deg,${c.color1},${c.color2})">${p.name.charAt(0)}</div>`;
}

let io = null;

const grid = document.getElementById('productGrid');

function renderProducts(filter = 'all') {
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  if (!list.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:60px 0">No products in this category yet.</p>`;
    return;
  }
  grid.innerHTML = list.map((p, i) => `
    <article class="card reveal" data-product="${p.name}" style="transition-delay:${i * 50}ms">
      <div class="card-media">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        ${productVisual(p)}
        <button class="quick-add" data-name="${p.name}">Add to Bag</button>
      </div>
      <div class="card-body">
        <span class="cat">${getCat(p.cat).label}</span>
        <h3>${p.name}</h3>
        <div class="price">
          <span class="now">${money(p.price)}</span>
          ${p.old ? `<span class="was">${money(p.old)}</span>` : ''}
        </div>
      </div>
    </article>
  `).join('');
  observeReveals();
}

renderProducts();

document.getElementById('filters').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  renderProducts(chip.dataset.filter);
});

document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    const f = card.dataset.filter;
    const chip = document.querySelector(`.chip[data-filter="${f}"]`);
    if (chip) chip.click();
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  });
});

/* ═══════ PRODUCT DETAIL MODAL ═══════ */
const detailModal  = document.getElementById('detailModal');
const detailMedia  = document.getElementById('detailMedia');
const detailCat    = document.getElementById('detailCat');
const detailName   = document.getElementById('detailName');
const detailPrice  = document.getElementById('detailPrice');
const detailDesc   = document.getElementById('detailDesc');
const detailSizes  = document.getElementById('detailSizes');
const detailColors = document.getElementById('detailColors');
const detailQtyVal = document.getElementById('qtyValue');
const detailFabric = document.getElementById('detailFabric');
const detailCare   = document.getElementById('detailCare');
const detailSku    = document.getElementById('detailSku');
const detailAddBtn = document.getElementById('detailAddBtn');

let detailState = { product: null, size: null, color: null, qty: 1 };

function openDetail(productName) {
  const p = PRODUCTS.find(x => x.name === productName);
  if (!p) return;

  detailState.product = p;
  detailState.size  = p.sizes[0];
  detailState.color = p.colors[0].name;
  detailState.qty   = 1;

  detailMedia.innerHTML = productVisual(p, 'detail-placeholder');
  detailCat.textContent   = getCat(p.cat).label;
  detailName.textContent  = p.name;
  detailPrice.innerHTML   = `<span class="now">${money(p.price)}</span>${p.old ? `<span class="was">${money(p.old)}</span>` : ''}`;
  detailDesc.textContent  = p.desc || 'A premium piece from the Coolism collection.';
  detailFabric.textContent = p.fabric || '—';
  detailCare.textContent   = p.care || '—';
  detailSku.textContent    = p.sku || '—';

  detailSizes.innerHTML = p.sizes.map(s => `
    <button class="opt-btn ${s === detailState.size ? 'active' : ''}" data-size="${s}">${s}</button>
  `).join('');

  detailColors.innerHTML = p.colors.map(c => `
    <button class="color-btn ${c.name === detailState.color ? 'active' : ''}"
            data-color="${c.name}" title="${c.name}">
      <span class="swatch" style="background:${c.hex}"></span>
      <span class="color-name">${c.name}</span>
    </button>
  `).join('');

  detailQtyVal.textContent = detailState.qty;

  detailModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  detailModal.classList.remove('show');
  document.body.style.overflow = '';
}

grid.addEventListener('click', e => {
  const quick = e.target.closest('.quick-add');
  if (quick) {
    e.stopPropagation();
    const p = PRODUCTS.find(x => x.name === quick.dataset.name);
    if (!p) return;
    addToCart(p, p.sizes[0], p.colors[0].name, 1);
    const original = quick.textContent;
    quick.textContent = 'Added ✓';
    quick.classList.add('added');
    setTimeout(() => {
      quick.textContent = original;
      quick.classList.remove('added');
    }, 1400);
    return;
  }
  const card = e.target.closest('.card');
  if (card && card.dataset.product) openDetail(card.dataset.product);
});

detailSizes.addEventListener('click', e => {
  const btn = e.target.closest('[data-size]');
  if (!btn) return;
  detailState.size = btn.dataset.size;
  detailSizes.querySelectorAll('.opt-btn').forEach(b => b.classList.toggle('active', b === btn));
});

detailColors.addEventListener('click', e => {
  const btn = e.target.closest('[data-color]');
  if (!btn) return;
  detailState.color = btn.dataset.color;
  detailColors.querySelectorAll('.color-btn').forEach(b => b.classList.toggle('active', b === btn));
});

document.getElementById('qtyMinus').addEventListener('click', () => {
  if (detailState.qty > 1) {
    detailState.qty--;
    detailQtyVal.textContent = detailState.qty;
  }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  detailState.qty++;
  detailQtyVal.textContent = detailState.qty;
});

detailAddBtn.addEventListener('click', () => {
  if (!detailState.product) return;
  addToCart(detailState.product, detailState.size, detailState.color, detailState.qty);
  closeDetail();
});

document.getElementById('detailClose').addEventListener('click', closeDetail);
detailModal.addEventListener('click', e => { if (e.target === detailModal) closeDetail(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDetail(); closeAuth(); closeCart(); closeMobile(); }
});

/* ═══════ CART ═══════ */
let cart = [];
const cartDrawer = document.getElementById('cartDrawer');
const overlay    = document.getElementById('overlay');
const cartBody   = document.getElementById('cartBody');
const cartCount  = document.getElementById('cartCount');
const cartTotal  = document.getElementById('cartTotal');

function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

const lineKey = i => `${i.name}|${i.size}|${i.color}`;

function addToCart(product, size, color, qty) {
  const key = `${product.name}|${size}|${color}`;
  const existing = cart.find(i => lineKey(i) === key);
  if (existing) existing.qty += qty;
  else cart.push({ ...product, size, color, qty });
  renderCart();
  toast(`${product.name} (${size} · ${color}) added to bag`);
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  cartCount.textContent = count;
  cartCount.classList.toggle('show', count > 0);
  cartTotal.textContent = money(total);

  if (!cart.length) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Your bag is empty.<br>Time to fix that.</p>
      </div>`;
    return;
  }

  cartBody.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="ci-thumb">${cartVisual(i)}</div>
      <div class="ci-info">
        <h4>${i.name}</h4>
        <div class="ci-variant">${i.size} · ${i.color}</div>
        <div class="p">${money(i.price)} × ${i.qty}</div>
        <button class="ci-remove" data-key="${lineKey(i)}">Remove</button>
      </div>
    </div>
  `).join('');
}

cartBody.addEventListener('click', e => {
  const btn = e.target.closest('[data-key]');
  if (!btn) return;
  cart = cart.filter(i => lineKey(i) !== btn.dataset.key);
  renderCart();
});

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!cart.length) return toast('Your bag is empty');
  toast('Checkout coming soon — COD available');
});

renderCart();

/* ═══════ AUTH MODAL ═══════ */
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

function openAuth(tab = 'login') {
  authModal.classList.add('show');
  document.body.style.overflow = 'hidden';
  switchTab(tab);
}
function closeAuth() {
  authModal.classList.remove('show');
  document.body.style.overflow = '';
  clearErrors(loginForm);
  clearErrors(signupForm);
}
function switchTab(tab) {
  document.querySelectorAll('.tabs button').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab));
  loginForm.hidden  = tab !== 'login';
  signupForm.hidden = tab !== 'signup';
}

document.getElementById('accountBtn').addEventListener('click', () => openAuth('login'));
document.getElementById('accountIcon').addEventListener('click', () => openAuth('login'));
document.getElementById('mobileLogin').addEventListener('click', e => {
  e.preventDefault(); closeMobile(); openAuth('login');
});
document.getElementById('modalClose').addEventListener('click', closeAuth);
authModal.addEventListener('click', e => { if (e.target === authModal) closeAuth(); });
document.querySelectorAll('.tabs button').forEach(btn =>
  btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isPhone = v => /^03\d{9}$/.test(v.replace(/[\s-]/g, ''));

function setErr(input, bad) {
  const field = input.closest('[data-field]');
  field.classList.toggle('err', bad);
  return !bad;
}
function clearErrors(form) {
  form.querySelectorAll('[data-field]').forEach(f => f.classList.remove('err'));
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('li-email');
  const pass  = document.getElementById('li-pass');
  const ok = [
    setErr(email, !isEmail(email.value)),
    setErr(pass,  pass.value.length < 6)
  ].every(Boolean);
  if (!ok) return;
  closeAuth();
  toast('Welcome back to Coolism');
  loginForm.reset();
});

signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const first = document.getElementById('su-first');
  const last  = document.getElementById('su-last');
  const email = document.getElementById('su-email');
  const phone = document.getElementById('su-phone');
  const pass  = document.getElementById('su-pass');
  const terms = document.getElementById('su-terms');
  const ok = [
    setErr(first, first.value.trim().length < 2),
    setErr(last,  last.value.trim().length < 2),
    setErr(email, !isEmail(email.value)),
    setErr(phone, !isPhone(phone.value)),
    setErr(pass,  pass.value.length < 6)
  ].every(Boolean);
  if (!ok) return;
  if (!terms.checked) return toast('Please accept the Terms to continue');
  closeAuth();
  toast(`Welcome to Coolism, ${first.value.trim()}`);
  signupForm.reset();
});

document.querySelectorAll('[data-social]').forEach(btn =>
  btn.addEventListener('click', () => toast(`${btn.dataset.social} sign-in coming soon`)));

document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (!isEmail(input.value)) return toast('Please enter a valid email');
  toast("You're on the list — welcome to the circle");
  input.value = '';
});

const mobileMenu = document.getElementById('mobileMenu');
function closeMobile() { mobileMenu.classList.remove('open'); }
document.getElementById('hamburger').addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a:not(#mobileLogin)').forEach(a =>
  a.addEventListener('click', closeMobile));

const navWrap = document.getElementById('navWrap');
window.addEventListener('scroll', () => {
  navWrap.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function observeReveals() {
  const items = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  }
  items.forEach(el => io.observe(el));
}
observeReveals();

window.addEventListener('load', () => {
  document.querySelectorAll('.reveal:not(.in)').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('in');
    }
  });
});

const mq = document.getElementById('marquee');
mq.innerHTML += mq.innerHTML;
