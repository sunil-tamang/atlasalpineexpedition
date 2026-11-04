(() => {
 const track = document.getElementById('home-journeys-track');
 if (!track) return;
 const cards = Array.from(track.querySelectorAll('.home-journey-card'));
 const dots = Array.from(document.querySelectorAll('[data-journey-index]'));
 const reduce = matchMedia('(prefers-reduced-motion:reduce)');
 let active = 0, manualScroll = false;
 function mark(index) {
  active = index;
  dots.forEach((dot,i) => { if (i === active) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
 }
 function select(index, focus = true) {
  manualScroll = false;
  mark((index + cards.length) % cards.length);
  const stride = cards[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 16);
  track.scrollTo({ left: Math.min(active * stride, track.scrollWidth - track.clientWidth), behavior: reduce.matches ? 'auto' : 'smooth' });
  if (focus) cards[active].focus({preventScroll:true});
 }
 dots.forEach((dot,i) => dot.addEventListener('click', () => select(i)));
 document.querySelectorAll('[data-journey-step]').forEach(button => button.addEventListener('click', () => select(active + Number(button.dataset.journeyStep))));
 track.addEventListener('keydown', event => {
  if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault(); select(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length-1 : active + (event.key === 'ArrowRight' ? 1 : -1));
 });
 track.addEventListener('pointerdown', () => { manualScroll = true; }, {passive:true});
 track.addEventListener('scroll', () => {
  if (!manualScroll || track.scrollWidth <= track.clientWidth + 2) return;
  const center = track.getBoundingClientRect().left + track.clientWidth / 2;
  let nearest = 0, distance = Infinity;
  cards.forEach((card,i) => { const rect = card.getBoundingClientRect(); const d = Math.abs(rect.left + rect.width / 2 - center); if (d < distance) { distance = d; nearest = i; } });
  mark(nearest);
 }, {passive:true});
})();

// Reviews rotate independently of the journey cards, with accessible pause controls.
(() => {
 const section = document.querySelector('.home-reviews');
 if (!section) return;
 const track = section.querySelector('.home-reviews-track');
 const reviews = Array.from(track.querySelectorAll('.home-review'));
 if (!reviews.length) return;
 const pause = section.querySelector('.home-reviews-pause');
 const dots = Array.from(section.querySelectorAll('[data-review-select]'));
 const reduce = matchMedia('(prefers-reduced-motion:reduce)');
 const medium = matchMedia('(min-width:641px)');
 const wide = matchMedia('(min-width:1024px)');
 const hover = matchMedia('(hover:hover)');
 let active = 0, timer, userPaused = reduce.matches, hovered = false;
 function visibleCount() { return wide.matches ? 3 : medium.matches ? 2 : 1; }
 function render(animate = true) {
  reviews.forEach((_,offset) => track.append(reviews[(active + offset) % reviews.length]));
  Array.from(track.children).forEach((review,i) => { review.hidden = i >= visibleCount(); });
  dots.forEach((dot,i) => { if (i === active) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
  track.classList.remove('is-changing');
  if (animate && !reduce.matches) { void track.offsetWidth; track.classList.add('is-changing'); }
 }
 function schedule() {
  clearInterval(timer);
  pause.textContent = userPaused ? 'Play slideshow' : 'Pause slideshow';
  pause.setAttribute('aria-pressed',String(userPaused));
  if (userPaused || hovered || document.hidden || section.contains(document.activeElement)) return;
  timer = setInterval(() => { active = (active + 1) % reviews.length; render(); },6500);
 }
 function move(index) { active = (index + reviews.length) % reviews.length; render(); schedule(); }
 section.querySelectorAll('[data-review-step]').forEach(button => button.addEventListener('click', () => move(active + Number(button.dataset.reviewStep))));
 dots.forEach((dot,i) => dot.addEventListener('click', () => move(i)));
 pause.addEventListener('click', () => { userPaused = !userPaused; schedule(); });
 section.addEventListener('mouseenter', () => { if (hover.matches) { hovered = true; schedule(); } });
 section.addEventListener('mouseleave', () => { hovered = false; schedule(); });
 section.addEventListener('focusin',schedule);
 section.addEventListener('focusout', () => setTimeout(schedule,0));
 document.addEventListener('visibilitychange',schedule);
 reduce.addEventListener('change', () => { userPaused = reduce.matches; render(false); schedule(); });
 medium.addEventListener('change', () => render(false)); wide.addEventListener('change', () => render(false));
 render(false); schedule();
})();

// The continuous logo strip can be paused and respects reduced motion.
(() => {
 const section = document.querySelector('.home-brands');
 if (!section) return;
 const button = section.querySelector('.home-brands-toggle');
 const reduce = matchMedia('(prefers-reduced-motion:reduce)');
 let paused = false;
 function update() {
  section.classList.toggle('is-brand-paused', paused || reduce.matches || document.hidden);
  button.disabled = reduce.matches;
  button.setAttribute('aria-pressed',String(paused || reduce.matches));
  button.textContent = reduce.matches ? 'Reduced motion enabled' : paused ? 'Play logos' : 'Pause logos';
 }
 button.addEventListener('click', () => { paused = !paused; update(); });
 reduce.addEventListener('change',update);
 document.addEventListener('visibilitychange',update);
 update();
})();

// Decorative hero film: explicit pause control and a still image for reduced motion.
(() => {
 const video = document.getElementById('home-banner-film');
 const button = document.querySelector('.home-landing-film-toggle');
 if (!video || !button) return;
 const reduce = matchMedia('(prefers-reduced-motion:reduce)');
 let userPaused = reduce.matches;
 function sync() {
  const playing = !video.paused;
  button.querySelector('.home-film-label').textContent = playing ? 'Pause film' : 'Play film';
  button.querySelector('.home-film-icon').textContent = playing ? 'Ⅱ' : '▷';
  button.setAttribute('aria-label', playing ? 'Pause background film' : 'Play background film');
 }
 function play() { video.muted = true; const attempt = video.play(); if (attempt) attempt.catch(sync); }
 video.addEventListener('playing', () => { video.classList.add('is-playing'); sync(); });
 video.addEventListener('pause', sync);
 function unavailable() { video.classList.remove('is-playing'); button.hidden = true; }
 video.addEventListener('error', unavailable);
 video.querySelector('source').addEventListener('error', unavailable);
 button.hidden = false;
 button.addEventListener('click', () => { userPaused = !video.paused; if (userPaused) video.pause(); else play(); });
 document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else if (!userPaused) play(); });
 reduce.addEventListener('change', () => { if (reduce.matches) { userPaused = true; video.pause(); video.classList.remove('is-playing'); } });
 if (!userPaused) play();
})();
