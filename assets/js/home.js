// Native scrolling keeps expedition cards usable without a carousel library.
(() => {
  const track = document.getElementById('home-expedition-track');
  if (!track) return;
  const buttons = Array.from(document.querySelectorAll('[data-slide]'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function update() {
    const end = track.scrollWidth - track.clientWidth;
    buttons.forEach(button => {
      button.disabled = Number(button.dataset.slide) < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= end - 2;
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    const card = track.querySelector('.home-expedition-card');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 18;
    track.scrollBy({ left: Number(button.dataset.slide) * (card.getBoundingClientRect().width + gap), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
