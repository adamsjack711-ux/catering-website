/* ── MOBILE NAV TOGGLE ──────────────────────────────────────── */
const navToggle  = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ── FILTER ─────────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const allItems   = () => [...document.querySelectorAll('.gallery-item')];

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    allItems().forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
    });
    // Rebuild visible index for lightbox
    buildVisible();
  });
});

/* ── LIGHTBOX ───────────────────────────────────────────────── */
const lightbox       = document.getElementById('lightbox');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxImgWrap= document.getElementById('lightboxImgWrap');
const lightboxCaption= document.getElementById('lightboxCaption');
const lightboxPrev   = document.getElementById('lightboxPrev');
const lightboxNext   = document.getElementById('lightboxNext');

let visibleItems = [];
let currentIndex = 0;

function buildVisible() {
  visibleItems = allItems().filter(i => !i.classList.contains('hidden'));
}
buildVisible();

function openLightbox(index) {
  currentIndex = index;
  showItem(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showItem(index) {
  const item = visibleItems[index];
  if (!item) return;

  const img   = item.querySelector('img');
  const ph    = item.querySelector('.gallery-img-placeholder');
  const caption = item.dataset.caption || '';

  lightboxImgWrap.innerHTML = '';
  if (img) {
    const clone = document.createElement('img');
    clone.src = img.src;
    clone.alt = img.alt;
    lightboxImgWrap.appendChild(clone);
  } else if (ph) {
    // Placeholder: recreate the gradient div
    const div = document.createElement('div');
    div.className = 'lb-placeholder';
    div.style.cssText = ph.style.cssText; // copies --grad variable
    lightboxImgWrap.appendChild(div);
  }

  lightboxCaption.textContent = caption;

  // Hide arrows if only one item
  lightboxPrev.style.visibility = visibleItems.length > 1 ? 'visible' : 'hidden';
  lightboxNext.style.visibility = visibleItems.length > 1 ? 'visible' : 'hidden';
}

// Open on item click
document.getElementById('galleryGrid').addEventListener('click', e => {
  const item = e.target.closest('.gallery-item');
  if (!item || item.classList.contains('hidden')) return;
  const index = visibleItems.indexOf(item);
  if (index !== -1) openLightbox(index);
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showItem(currentIndex);
});
lightboxNext.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showItem(currentIndex);
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showItem(currentIndex); }
  if (e.key === 'ArrowRight')  { currentIndex = (currentIndex + 1) % visibleItems.length; showItem(currentIndex); }
});
