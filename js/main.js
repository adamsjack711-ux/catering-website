/* ── NAVBAR: scroll shadow + active link highlighting ───────── */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled shadow
  navbar.classList.toggle('scrolled', window.scrollY > 10);

  // Active section highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── MOBILE NAV TOGGLE ──────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ── MENU FILTER ────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards  = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    menuCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter.toLowerCase();
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ── BOOKING FORM VALIDATION ────────────────────────────────── */
const form = document.getElementById('bookForm');

function setError(inputId, errorId, msg) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (msg) {
    input.classList.add('error');
    error.textContent = msg;
    return false;
  } else {
    input.classList.remove('error');
    error.textContent = '';
    return true;
  }
}

function validateForm() {
  let valid = true;

  const name = document.getElementById('name').value.trim();
  valid = setError('name', 'nameError', name ? '' : 'Please enter your name.') && valid;

  const email = document.getElementById('email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  valid = setError('email', 'emailError', emailOk ? '' : 'Please enter a valid email.') && valid;

  const date = document.getElementById('eventDate').value;
  valid = setError('eventDate', 'dateError', date ? '' : 'Please select an event date.') && valid;

  const guests = document.getElementById('guests').value;
  valid = setError('guests', 'guestsError', guests && guests > 0 ? '' : 'Please enter guest count.') && valid;

  const type = document.getElementById('eventType').value;
  valid = setError('eventType', 'typeError', type ? '' : 'Please select an event type.') && valid;

  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateForm()) {
    form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    document.getElementById('formSuccess').classList.add('show');
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
  }
});

// Clear errors on input
form.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errEl = document.getElementById(el.id + 'Error');
    if (errEl) errEl.textContent = '';
  });
});
