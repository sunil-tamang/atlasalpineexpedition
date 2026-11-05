(() => {
 const root = document.querySelector('.trip-reference');
 if (!root) return;
 const tabs = [...root.querySelectorAll('[data-trip-tab]')];
 const sections = [...root.querySelectorAll('.material > .trek--section, .material > .trip-gallery')];
 let group = 'overview';
 sections.forEach(section => {
  if (section.id === 'trip-itinerary') section.dataset.tripPanel = 'itinerary';
  else if (section.id === 'trip-map') section.dataset.tripPanel = 'map';
  else { if (section.id === 'trip-inclusions') group = 'inclusions'; if (section.id === 'trip-faq') group = 'faq'; section.dataset.tripPanel = group; }
 });
 tabs.forEach(tab => { if (!root.querySelector(tab.hash)) tab.hidden = true; });
 const map = root.querySelector('#trip-map');
 const hasMap = !!map?.querySelector('img[src]:not([src=""]),iframe[src]');
 const mapTab = tabs.find(tab => tab.dataset.tripTab === 'map');
 if (!hasMap && mapTab) mapTab.hidden = true;
 function selectTab(name, updateHash = false) {
  const target = tabs.find(tab => tab.dataset.tripTab === name && !tab.hidden);
  if (!target) return;
  sections.forEach(section => { section.hidden = section.dataset.tripPanel !== name; });
  tabs.forEach(tab => { const selected = tab === target; tab.setAttribute('aria-selected',String(selected)); tab.tabIndex = selected ? 0 : -1; });
  if (updateHash) history.replaceState(null,'',target.getAttribute('href'));
 }
 root.querySelector('.trip-reference-tabs').setAttribute('role','tablist');
 tabs.forEach((tab,index) => {
  tab.setAttribute('role','tab');tab.setAttribute('aria-controls',tab.hash.slice(1));
  tab.addEventListener('click',event => { event.preventDefault(); selectTab(tab.dataset.tripTab,true); });
  tab.addEventListener('keydown',event => {
   if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
   event.preventDefault();const available = tabs.filter(item => !item.hidden);const i = available.indexOf(tab);
   const next = event.key === 'Home' ? available[0] : event.key === 'End' ? available.at(-1) : available[(i + (event.key === 'ArrowRight' ? 1 : -1) + available.length) % available.length];
   selectTab(next.dataset.tripTab,true);next.focus();
  });
 });
 root.classList.add('is-enhanced');
 const hasDays = !!root.querySelector('.trip-day-panel');
 const itineraryTab = tabs.find(tab => tab.dataset.tripTab === 'itinerary');
 if (!hasDays && itineraryTab) itineraryTab.hidden = true;
 const initial = tabs.find(tab => tab.hash === location.hash && !tab.hidden);
 selectTab(initial?.dataset.tripTab || (hasDays ? 'itinerary' : 'overview'));
 window.addEventListener('hashchange',() => { const tab = tabs.find(item => item.hash === location.hash);if(tab)selectTab(tab.dataset.tripTab); });
 const days = [...root.querySelectorAll('.trip-day-panel')];
 const buttons = [...root.querySelectorAll('[data-day-select]')];
 buttons.forEach(button => { const label = button.querySelector('span:last-child'); if (label) label.textContent = label.textContent.replace(/^\s*day\s*\d+\s*[-–—:.]?\s*/i,''); });
 days.forEach(panel => { const title = panel.querySelector('h3'); if (title) title.textContent = title.textContent.replace(/^\s*day\s*\d+\s*[-–—:.]?\s*/i,''); });
 let day = 0;
 function selectDay(index) {
  day = Math.max(0,Math.min(index,days.length-1));
  days.forEach((panel,i) => { panel.hidden = i !== day; });
  buttons.forEach((button,i) => { if (i === day) button.setAttribute('aria-current','step');else button.removeAttribute('aria-current'); });
  root.querySelector('.trip-day-count').textContent = `Day ${String(day+1).padStart(2,'0')} of ${days.length}`;
  root.querySelector('[data-day-step="-1"]').disabled = day === 0;
  root.querySelector('[data-day-step="1"]').disabled = day === days.length-1;
 }
 if (days.length) {
  root.querySelector('.trip-day-sidebar').hidden = false;root.querySelector('.trip-day-controls').hidden = false;
  buttons.forEach((button,i) => button.addEventListener('click',() => selectDay(i)));
  root.querySelectorAll('[data-day-step]').forEach(button => button.addEventListener('click',() => { selectDay(day+Number(button.dataset.dayStep));buttons[day].scrollIntoView({block:'nearest',behavior:'instant'}); }));
  const expand = root.querySelector('.trip-days-expand');
  if (days.length <= 6) expand.hidden = true;
  expand.addEventListener('click',() => { const expanded = expand.getAttribute('aria-expanded') !== 'true';expand.setAttribute('aria-expanded',String(expanded));root.querySelector('.trip-day-list').classList.toggle('is-expanded',expanded);expand.textContent = expanded ? 'Show fewer days ↑' : `View all ${days.length} days ↓`; });
  selectDay(0);
 }
 const dialog = root.querySelector('.trip-photo-dialog');
 const mainImage = root.querySelector('.trip-intro-main-image');
 const thumbs = [...root.querySelectorAll('.trip-photo-trigger')];
 if (mainImage && thumbs.length) {
  const reduce = matchMedia('(prefers-reduced-motion:reduce)');
  let request = 0, swapTimer;
  function markSelected(source) {
   thumbs.forEach(button => button.setAttribute('aria-pressed',String(button.querySelector('img').src === source)));
  }
  function selectPhoto(button) {
   const photo = button.querySelector('img');
   const token = ++request;
   clearTimeout(swapTimer);
   mainImage.classList.remove('is-image-changing');
   mainImage.setAttribute('aria-busy','false');
   if (mainImage.src === photo.src) { markSelected(photo.src); return; }
   mainImage.setAttribute('aria-busy','true');
   const preload = new Image();
   preload.onload = () => {
    if (token !== request) return;
    mainImage.classList.add('is-image-changing');
    swapTimer = setTimeout(() => {
     if (token !== request) return;
     mainImage.src = photo.src;
     const fullPhoto = dialog?.querySelector(`#trip-photo-${button.dataset.photoIndex} img`);
     mainImage.alt = fullPhoto?.alt || button.getAttribute('aria-label');
     markSelected(photo.src);
     mainImage.setAttribute('aria-busy','false');
     requestAnimationFrame(() => { if (token === request) mainImage.classList.remove('is-image-changing'); });
    },reduce.matches ? 0 : 140);
   };
   preload.onerror = () => { if (token === request) mainImage.setAttribute('aria-busy','false'); };
   preload.src = photo.src;
  }
  thumbs.forEach(button => button.addEventListener('click',() => selectPhoto(button)));
  markSelected(mainImage.src);
 }
 // The large image still opens the existing full-gallery dialog.
 if (dialog && mainImage) {
  const openGallery = () => {
   dialog.showModal();
   const photo = [...dialog.querySelectorAll('.trip-dialog-grid img')].find(image => image.src === mainImage.src);
   photo?.closest('figure').scrollIntoView({block:'nearest'});
  };
  mainImage.addEventListener('click',openGallery);
  mainImage.addEventListener('keydown',event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openGallery(); } });
  dialog.querySelector('.trip-photo-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
  dialog.addEventListener('close',() => mainImage.focus());
 }
})();
