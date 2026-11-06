/* Progressive enhancement: no hidden-content CSS, scroll handlers or animation library. */
(() => {
 const preference = matchMedia('(prefers-reduced-motion: reduce)');
 const supported = typeof Element.prototype.animate === 'function';
 const running = new Map(), seen = new WeakSet();
 let observer;
 const enabled = () => supported && !preference.matches;
 function cancel(element) { running.get(element)?.cancel(); running.delete(element); }
 function play(element,frames,options = {}) {
  const {allowFocus = false,...timing} = options;
  if (!element || !enabled() || element.hidden || (!allowFocus && element.contains(document.activeElement))) return;
  cancel(element);
  const animation = element.animate(frames,{duration:560,easing:'cubic-bezier(.22,.61,.36,1)',...timing});
  running.set(element,animation);
  const cleanup = () => { if (running.get(element) === animation) running.delete(element); };
  animation.onfinish = cleanup; animation.oncancel = cleanup;
 }
 window.AtlasMotion = {
  enabled,
  menu(element,direction = 1) {
   play(element,[{opacity:.75,transform:`translateX(${direction * 18}px)`},{opacity:1,transform:'translateX(0)'}],{duration:280,allowFocus:true});
  }
 };
 document.addEventListener('atlas:results-updated',event => {
  const {cards,previous} = event.detail;
  cards.forEach(cancel);
  if (!enabled()) return;
  let stagger = 0;
  cards.filter(card => !card.hidden).forEach(card => {
   const rect = card.getBoundingClientRect();
   if (rect.top >= innerHeight || rect.bottom <= 0 || stagger >= 12) return;
   const old = previous.get(card);
   const x = old ? Math.max(-24,Math.min(24,old.left - rect.left)) : 0;
   const y = old ? Math.max(-12,Math.min(12,old.top - rect.top)) : 5;
   play(card,[{opacity:old ? .9 : .65,transform:`translate(${x}px,${y}px)`},{opacity:1,transform:'translate(0,0)'}],{duration:320,delay:Math.min(stagger++,4)*25});
  });
 });
 function initReveals() {
  if (!enabled() || !('IntersectionObserver' in window)) return;
  // Animate section wrappers OR their headings, avoiding compounded nested reveals.
  const sections = [...document.querySelectorAll('main section,.site-content section,main > article,.site-content > article')]
   .filter(el => !el.closest('[role=tabpanel],dialog,.trip-day-panels') && !el.parentElement.closest('section,article'));
  const headings = [...document.querySelectorAll('main h1,main h2,.site-content h1,.site-content h2')]
   .filter(el => !sections.some(section => section.contains(el)) && !el.closest('[hidden],dialog,[role=tabpanel],.home-guide-track,.trip-day-panels'));
  observer = new IntersectionObserver(entries => {
   entries.forEach(({target,isIntersecting}) => {
    if (!isIntersecting) return;
    observer.unobserve(target);
    if (seen.has(target)) return;
    seen.add(target);
    play(target,[{opacity:.65,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}]);
   });
  },{threshold:0,rootMargin:'0px 0px -24px 0px'});
  new Set([...sections,...headings]).forEach(el => {
   const rect = el.getBoundingClientRect();
   // Already-visible content stays stable on startup and browser history restoration.
   if (rect.top < innerHeight || el.closest('[hidden]')) { seen.add(el); return; }
   observer.observe(el);
  });
  document.querySelectorAll('.home-landing-image,.home-landing-video,.activity-directory-hero > img,.story-hero + .story-panorama img').forEach(el => {
   play(el,[{opacity:.85,transform:'scale(1.018)'},{opacity:1,transform:'scale(1)'}],{duration:1000});
  });
 }
 preference.addEventListener('change',() => {
  if (!preference.matches) return;
  observer?.disconnect(); running.forEach(animation => animation.cancel()); running.clear();
 });
 initReveals();
})();
