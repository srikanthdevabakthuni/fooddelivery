/* ===================================================
   FoodHub India — Shared App Logic
   js/app.js
=================================================== */

// ── CART DATA STORE ──────────────────────────────────

const FoodHub = (() => {

  /* ---------- cart helpers ---------- */
  const getCart = () => JSON.parse(localStorage.getItem('fh_cart') || '[]');
  const saveCart = (cart) => {
    localStorage.setItem('fh_cart', JSON.stringify(cart));
    updateCartBadge();
  };

  const addToCart = (item) => {
    const cart = getCart();
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
    showToast(`🛒 ${item.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    const cart = getCart().filter(c => c.id !== id);
    saveCart(cart);
  };

  const changeQty = (id, delta) => {
    const cart = getCart();
    const item = cart.find(c => c.id === id);
    if (item) {
      item.qty = Math.max(1, item.qty + delta);
    }
    saveCart(cart);
  };

  const getTotal = () => {
    return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const getCount = () => {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  };

  const clearCart = () => {
    localStorage.removeItem('fh_cart');
    updateCartBadge();
  };

  /* ---------- badge ---------- */
  const updateCartBadge = () => {
    const badges = document.querySelectorAll('.badge-count');
    const count = getCount();
    badges.forEach(b => {
      b.textContent = count;
      b.style.transform = count > 0 ? 'scale(1)' : 'scale(0)';
    });
  };

  /* ---------- toast ---------- */
  const showToast = (msg) => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'fh-toast';
    toast.innerHTML = `<span class="icon">🍽️</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(60px)';
      toast.style.transition = '0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  };

  /* ---------- format currency ---------- */
  const formatINR = (amount) => '₹' + Math.round(amount).toLocaleString('en-IN');

  /* ---------- public API ---------- */
  return { getCart, addToCart, removeFromCart, changeQty, getTotal, getCount, clearCart, showToast, updateCartBadge, formatINR };
})();


// ── NAVBAR ──────────────────────────────────────────

const initNavbar = () => {
  const header = document.querySelector('.navbar');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // active link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('href') === page) l.classList.add('active-link');
  });
};


// ── SCROLL ANIMATIONS ───────────────────────────────

const initScrollAnimations = () => {
  const els = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
};


// ── MOBILE MENU CLOSE ON LINK ────────────────────────

const initMobileMenu = () => {
  document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.querySelector('#navbarNav');
      if (collapse && collapse.classList.contains('show')) {
        toggler && toggler.click();
      }
    });
  });
};


// ── INIT ON LOAD ─────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  FoodHub.updateCartBadge();
  initNavbar();
  initScrollAnimations();
  initMobileMenu();
});