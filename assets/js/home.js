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

// Homepage hero: one film, two stills, and a single cancellable rotation timer.
(() => {
 const hero = document.querySelector('.home-landing');
 if (!hero) return;
 const slides = [...hero.querySelectorAll('[data-hero-slide]')];
 const controls = hero.querySelector('.home-hero-controls');
 const dots = [...hero.querySelectorAll('[data-hero-select]')];
 const button = hero.querySelector('.home-landing-film-toggle');
 const video = hero.querySelector('video');
 const reduce = matchMedia('(prefers-reduced-motion:reduce)');
 let active = 0, paused = reduce.matches, visible = true, hovering = false, pointerPause = null, timer, changeRequest = 0, playRequest = 0, filmAvailable = true;
 const canRun = () => !paused && !document.hidden && visible;
 function labels() {
  button.hidden = reduce.matches;
  button.querySelector('.home-film-icon').textContent = paused ? '▷' : 'Ⅱ';
  button.querySelector('.home-film-label').textContent = paused ? 'Play slideshow' : active === 0 && filmAvailable ? 'Pause film' : 'Pause slideshow';
  button.setAttribute('aria-label',paused ? 'Play slideshow and film' : 'Pause slideshow and film');
  button.setAttribute('aria-pressed',String(paused));
 }
 function sync() {
  clearTimeout(timer);
  const request = ++playRequest;
  if (video) {
   if (active === 0 && canRun() && !reduce.matches && filmAvailable) {
    video.muted = true;
    const attempt = video.play();
    attempt?.then(() => { if (request !== playRequest && (active !== 0 || !canRun())) video.pause(); }).catch(() => { video.classList.remove('is-playing'); });
   } else video.pause();
  }
  if (canRun() && !hovering && !reduce.matches) {
   slides[(active + 1) % slides.length].querySelector('img').loading = 'eager';
   timer = setTimeout(() => select(active + 1),7500);
  }
  labels();
 }
 function select(index,announce = false) {
  clearTimeout(timer);
  const request = ++changeRequest;
  const next = (index + slides.length) % slides.length;
  const image = slides[next].querySelector('img');
  image.loading = 'eager';
  const reveal = () => {
  if (request !== changeRequest) return;
  active = next;
  slides.forEach((slide,i) => {
   slide.classList.toggle('is-active',i === active);
   slide.inert = i !== active;
   slide.setAttribute('aria-hidden',String(i !== active));
   if (i === active) slide.querySelector('img').loading = 'eager';
  });
  dots.forEach((dot,i) => { if (i === active) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
  if (announce) hero.querySelector('.home-hero-status').textContent = slides[active].getAttribute('aria-label');
  sync();
  };
  if (image.complete && image.naturalWidth) reveal();
  else if (image.decode) image.decode().then(reveal).catch(() => { if (request === changeRequest) sync(); });
  else image.addEventListener('load',reveal,{once:true});
 }
 dots.forEach(dot => dot.addEventListener('click',() => select(Number(dot.dataset.heroSelect),true)));
 button.addEventListener('pointerdown',() => { pointerPause = paused; });
 button.addEventListener('click',() => { paused = !(pointerPause ?? paused); pointerPause = null; sync(); });
 hero.addEventListener('keydown',event => {
  if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault(); paused = true;
  select(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1),true);
 });
 hero.addEventListener('focusin',() => { paused = true; sync(); });
 hero.addEventListener('mouseenter',() => { hovering = true; clearTimeout(timer); });
 hero.addEventListener('mouseleave',() => { hovering = false; sync(); });
 document.addEventListener('visibilitychange',sync);
 reduce.addEventListener('change',() => { if (reduce.matches) paused = true; sync(); });
 if (video) {
  video.addEventListener('playing',() => { if (active !== 0 || !canRun() || reduce.matches) { video.pause(); return; } video.classList.add('is-playing'); });
  const unavailable = () => { filmAvailable = false; video.classList.remove('is-playing'); labels(); };
  video.addEventListener('error',unavailable);
  video.querySelector('source')?.addEventListener('error',unavailable);
 }
 if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); },{threshold:0}).observe(hero);
 controls.hidden = false;
 sync();
})();
// Homepage guides: circular portrait selection, pointer gestures and horizontal trackpads.
(() => {
 const section = document.querySelector('.home-guides-carousel');
 if (!section) return;
 const viewport = section.querySelector('.home-guide-carousel');
 const track = section.querySelector('.home-guide-track');
 const cards = [...track.querySelectorAll('[data-guide-card]')];
 if (!cards.length) return;
 const controls = [...section.querySelectorAll('[data-guide-step]')];
 const status = section.querySelector('#home-guide-status');
 let active = Math.max(0,cards.findIndex(card => card.hasAttribute('data-guide-featured')));
 let pointer = null, suppressClickUntil = 0, wheelTotal = 0, lastWheel = 0, wheelLockUntil = 0;
 const wrap = index => (index % cards.length + cards.length) % cards.length;
 function draw(announce = true) {
  const width = cards[active].offsetWidth;
  const gap = width < 350 ? 10 : 12;
  cards.forEach((card,index) => {
   let offset = wrap(index - active);
   if (offset > cards.length / 2) offset -= cards.length;
   const distance = Math.abs(offset);
   const scale = distance === 0 ? 1 : distance === 1 ? .76 : .6;
   const x = distance === 0 ? 0 : Math.sign(offset) * (distance === 1 ? width * .88 + gap : width * (1.56 + (distance - 2) * .62) + gap * distance);
   card.style.setProperty('--guide-x',`${x}px`);
   card.style.setProperty('--guide-scale',String(scale));
   card.style.setProperty('--guide-opacity',distance > 2 ? '0' : distance === 0 ? '1' : distance === 1 ? '.72' : '.38');
   card.inert = distance > 2;
   card.setAttribute('aria-hidden',String(distance > 2));
   card.style.setProperty('--guide-layer',String(5 - Math.min(distance,4)));
   card.classList.toggle('is-active',index === active);
   card.tabIndex = index === active ? 0 : -1;
   card.setAttribute('aria-label',index === active ? (card.dataset.guidePlaceholder ? `View team directory — ${card.dataset.guideName}, sample profile` : `View ${card.dataset.guideName}’s profile`) : `Feature ${card.dataset.guideName}${card.dataset.guidePlaceholder ? ', sample profile' : ''}`);
   if (index === active) card.setAttribute('aria-current','true'); else card.removeAttribute('aria-current');
   const caption = card.querySelector('.home-guide-caption');
   caption.setAttribute('aria-hidden',String(index !== active));
  });
  if (announce) status.textContent = `${cards[active].dataset.guideName}, ${cards[active].dataset.guideRole}${cards[active].dataset.guidePlaceholder ? ", sample profile" : ""}. Guide ${active + 1} of ${cards.length}.`;
 }
 function select(index, focus = false) {
  active = wrap(index);
  track.style.setProperty('--guide-drag','0px');
  draw();
  if (focus) cards[active].focus({preventScroll:true});
 }
 cards.forEach((card,index) => card.addEventListener('click',event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (index !== active) { event.preventDefault(); select(index); }
 }));
 controls.forEach(button => {
  button.hidden = cards.length < 2;
  button.addEventListener('click',() => select(active + Number(button.dataset.guideStep)));
 });
 viewport.addEventListener('keydown',event => {
  if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1);
  select(next,!!event.target.closest('[data-guide-card]'));
 });
 track.addEventListener('dragstart',event => event.preventDefault());
 track.addEventListener('click',event => {
  if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
 },true);
 track.addEventListener('pointerdown',event => {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
  pointer = {id:event.pointerId,x:event.clientX,y:event.clientY,delta:0,dragging:false};
  // Capture at gesture start: touch links otherwise retain implicit capture.
  track.setPointerCapture(event.pointerId);
 });
 track.addEventListener('pointermove',event => {
  if (!pointer || pointer.id !== event.pointerId) return;
  const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
  if (!pointer.dragging) {
   if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { pointer = null; return; }
   if (Math.abs(dx) < 9 || Math.abs(dx) <= Math.abs(dy)) return;
   pointer.dragging = true;
   track.setPointerCapture(event.pointerId);
   track.classList.add('is-dragging');
  }
  pointer.delta = dx;
  const limit = cards[active].offsetWidth * .6;
  track.style.setProperty('--guide-drag',`${Math.max(-limit,Math.min(limit,dx))}px`);
 });
 function finishPointer(event,cancelled = false) {
  if (!pointer || pointer.id !== event.pointerId) return;
  const gesture = pointer; pointer = null;
  track.classList.remove('is-dragging');
  if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  if (gesture.dragging) {
   suppressClickUntil = performance.now() + 350;
   const step = !cancelled && Math.abs(gesture.delta) > 35 ? (gesture.delta < 0 ? 1 : -1) : 0;
   select(active + step);
  }
 }
 track.addEventListener('pointerup',event => finishPointer(event));
 track.addEventListener('pointercancel',event => finishPointer(event,true));
 track.addEventListener('lostpointercapture',event => {
  if (event.target === track) finishPointer(event,true);
 });
 track.addEventListener('pointerleave',event => { if (event.pointerType === 'mouse' && pointer && pointer.id === event.pointerId && !pointer.dragging && !track.hasPointerCapture(event.pointerId)) pointer = null; });
 track.addEventListener('wheel',event => {
  const dx = event.deltaX || (event.shiftKey ? event.deltaY : 0);
  const dy = event.shiftKey ? 0 : event.deltaY;
  if (!dx || Math.abs(dx) <= Math.abs(dy) || cards.length < 2) return;
  event.preventDefault();
  const now = performance.now();
  if (now < wheelLockUntil) return;
  if (now - lastWheel > 160) wheelTotal = 0;
  lastWheel = now;
  wheelTotal += dx * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1);
  if (Math.abs(wheelTotal) >= 45) {
   select(active + (wheelTotal > 0 ? 1 : -1));
   wheelTotal = 0; wheelLockUntil = now + 450;
  }
 },{passive:false});
 function resize() {
  track.classList.add('is-initializing');
  draw(false);
  requestAnimationFrame(() => track.classList.remove('is-initializing'));
 }
 track.classList.add('is-initializing','is-ready');
 draw();
 requestAnimationFrame(() => track.classList.remove('is-initializing'));
 if ('ResizeObserver' in window) new ResizeObserver(resize).observe(track);
 else window.addEventListener('resize',resize);
})();
