/* ==========================================================================
   Memoirist — Emily Liao
   Main JavaScript
   ========================================================================== */

/* --------------------------------------------------------------------------
   Mobile navigation toggle
   -------------------------------------------------------------------------- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close menu when a link is tapped
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
}());

/* --------------------------------------------------------------------------
   Active nav link
   -------------------------------------------------------------------------- */
(function () {
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (href && path.endsWith(href)) a.classList.add('active');
  });
}());

/* --------------------------------------------------------------------------
   Scroll reveal — staggered entrance animations
   -------------------------------------------------------------------------- */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = Number(el.dataset.revealDelay || 0);
      setTimeout(() => el.classList.add('revealed'), delay);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}());

/* --------------------------------------------------------------------------
   Hero parallax — subtle depth on scroll
   -------------------------------------------------------------------------- */
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    if (scrollY <= hero.offsetHeight) {
      // Shift background at 0.4× scroll rate — noticeable depth, still refined
      hero.style.backgroundPositionY = 'calc(50% + ' + (scrollY * 0.4) + 'px)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}());

/* --------------------------------------------------------------------------
   FAQ accordion
   -------------------------------------------------------------------------- */
(function () {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Re-open if it was closed
      if (!wasOpen) item.classList.add('open');
    });
  });
}());
