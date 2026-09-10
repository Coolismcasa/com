/* ═══════════════════════════════════════════════════════════
   COOLISM — App Logic
   Add a product = add one line to PRODUCTS below.
   Example:
     { name: 'Linen Shirt', cat: 'shirts', price: 3490, old: 4290, tag: 'New' },
   Add `image: 'shirt.jpg'` to a product to use a real photo
   (put the photo in the same folder).
   ═══════════════════════════════════════════════════════════ */

const CATEGORIES = {
  shirts:  { label: 'Shirts',  color1: '#E33A3A', color2: '#A81E1E' },
  pants:   { label: 'Pants',   color1: '#8B6E54', color2: '#5C4736' },
  jackets: { label: 'Jackets', color1: '#333333', color2: '#0E0E0E' },
  hoodies: { label: 'Hoodies', color1: '#25355A', color2: '#131F3A' }
};

const PRODUCTS = [
  { name: 'Classic Red Tee',           cat: 'shirts',  price: 2490,  old: 3200,  tag: 'New'        },
  { name: 'Royal Oxford Shirt',        cat: 'shirts',  price: 4990,  old: null,  tag: null         },
  { name: 'Pleated Wide-Leg Trousers', cat: 'pants',   price: 5890,  old: 6990,  tag: 'Bestseller' },
  { name: 'Relaxed Linen Pants',       cat: 'pants',   price: 4290,  old: null,  tag: null         },
  { name: 'Moto Leather Jacket',       cat: 'jackets', price: 18900, old: 22500, tag: 'Limited'    },
  { name: 'Navy Bomber Jacket',        cat: 'jackets', price: 11900, old: null,  tag: null         },
  { name: 'Oversized Navy Hoodie',     cat: 'hoodies', price: 6490,  old: 7990,  tag: 'Bestseller' },
  { name: 'Fleece-Lined Zip Hoodie',   cat: 'hoodies', price: 7290,  old: null,  tag: 'New'        }
];

const money = n => 'Rs ' + n.toLocaleString('en-PK');
const getCat = key => CATEGORIES[key] || { label: key, color1: '#333', color2: '#111' };

function productVisual(p) {
  const c = getCat(p.cat);
  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}" loading="lazy"
              onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
            <div class="card-placeholder" style="display:none;background:linear-gradient(140deg,${c.color1},${c.color2})">
              <span class="letter">${p.name.charAt(0)}</span>
              <span class="cat-badge">${c.label}</span>
            </div>`;
  }
  return `<div class="card-placeholder" style="background:linear-gradient(140deg,${c.color1},${c.color2})">
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
    <article class="card reveal" style="transition-delay:${i * 50}ms">
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

function addToCart(name) {
  const product = PRODUCTS.find(p => p.name === name);
  if (!product) return;
  const line = cart.find(i => i.name === name);
  if (line) line.qty += 1;
  else cart.push({ ...product, qty: 1 });
  renderCart();
  toast(`${product.name} added to bag`);
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
        <div class="p">${money(i.price)} × ${i.qty}</div>
        <button class="ci-remove" data-remove="${i.name}">Remove</button>
      </div>
    </div>
  `).join('');
}

cartBody.addEventListener('click', e => {
  const btn = e.target.closest('[data-remove]');
  if (!btn) return;
  cart = cart.filter(i => i.name !== btn.dataset.remove);
  renderCart();
});

grid.addEventListener('click', e => {
  const btn = e.target.closest('.quick-add');
  if (!btn) return;
  addToCart(btn.dataset.name);
  const original = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('added');
  }, 1400);
});

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!cart.length) return toast('Your bag is empty');
  toast('Checkout coming soon — COD available');
});

renderCart();

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
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeAuth(); closeCart(); closeMobile(); }
});
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