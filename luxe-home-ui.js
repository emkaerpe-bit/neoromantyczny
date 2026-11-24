if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}
if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.classList.add('bg-obsidian/60', 'backdrop-blur-xl', 'border', 'border-white/10', 'shadow-2xl', 'top-4');
    nav.classList.remove('top-6');
  } else {
    nav.classList.remove('bg-obsidian/60', 'backdrop-blur-xl', 'border', 'border-white/10', 'shadow-2xl', 'top-4');
    nav.classList.add('top-6');
  }
});

if (window.gsap) {
  window.gsap.to('.parallax-bg', {
    yPercent: 20, ease: 'none',
    scrollTrigger: { trigger: '#sekret', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  window.gsap.to('.stagger-text', {
    scrollTrigger: { trigger: '#sekret', start: 'top 70%' },
    y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out'
  });
  window.gsap.to('.feature-card', {
    scrollTrigger: { trigger: '#mechanizm', start: 'top 75%' },
    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out'
  });
  window.gsap.to('.offer-entry', {
    scrollTrigger: { trigger: '#oferta', start: 'top 80%' },
    y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'power4.out'
  });
  window.gsap.fromTo('.animated-cursor',
    { x: 30, y: 30, opacity: 0.2 },
    { x: -15, y: -15, opacity: 1, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' }
  );
}

const shufflerWrapper = document.getElementById('shuffler');
if (shufflerWrapper && shufflerWrapper.children.length > 0) {
  const shufflerCount = shufflerWrapper.children.length;
  let currentIdx = 0;
  setInterval(() => {
    currentIdx = (currentIdx + 1) % shufflerCount;
    shufflerWrapper.style.transform = `translateY(-${currentIdx * 3.5}rem)`;
  }, 1500);
}

function revealHashTarget(hashStr, smooth) {
  if (!hashStr || hashStr === '#' || !hashStr.startsWith('#')) return false;
  let target = null;
  try { target = document.querySelector(hashStr); } catch (_e) { return false; }
  if (!target) return false;
  const det = target.tagName === 'DETAILS' ? target : target.closest('details');
  if (det && !det.open) det.open = true;
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  return true;
}

// biome-ignore lint/security/noSecrets: CSS anchor selector
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (revealHashTarget(href, true)) e.preventDefault();
  });
});

if (window.location.hash) {
  revealHashTarget(window.location.hash, false);
}
window.addEventListener('hashchange', () => {
  revealHashTarget(window.location.hash, true);
});

// biome-ignore lint/security/noSecrets: CSS Stripe link selector
document.querySelectorAll('a[href*="stripe.com"]').forEach(link => {
  link.addEventListener('click', function () {
    const eventId = 'atc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const consent = window.neoConsent && window.neoConsent.get();
    if (consent && consent.marketing && typeof window.fbq !== 'undefined') {
      window.fbq('track', 'AddToCart', {
        value: 47.00, currency: 'PLN', content_name: 'Zodiakalny Prezentownik', content_type: 'product'
      }, { eventID: eventId });
    }
    if (consent && consent.analytics && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'add_to_cart', {
        currency: 'PLN', value: 47.00,
        items: [{ item_id: 'prezentownik_47', item_name: 'Zodiakalny Prezentownik', price: 47.00, quantity: 1 }]
      });
    }
  });
});
