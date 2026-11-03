(() => {
 const header = document.querySelector('.atlas-header');
 if (!header) return;
 const nav = header.querySelector('.atlas-navigation');
 const mobile = header.querySelector('.atlas-mobile-toggle');
 const triggers = Array.from(header.querySelectorAll('.atlas-menu-toggle'));
 const desktop = matchMedia('(min-width:1024px)');
 const hover = matchMedia('(hover:hover)');
 const reduce = matchMedia('(prefers-reduced-motion:reduce)');
 const panels = triggers.map(t => document.getElementById(t.getAttribute('aria-controls')));
 function panelFor(trigger) { return panels[triggers.indexOf(trigger)]; }
 const mobileScreen = document.createElement('div');
 mobileScreen.id = 'atlas-mobile-screen';
 mobileScreen.className = 'atlas-mobile-screen';
 mobileScreen.hidden = true;
 header.append(mobileScreen);
 let mobileTrigger = null, mobileCategory = null;
 let inertContent = [];
 function mobileRow(label, action) {
  const row = document.createElement('button');
  row.type = 'button'; row.className = 'atlas-mobile-row'; row.textContent = label;
  row.addEventListener('click',action); return row;
 }
 function renderMobileLevel() {
  mobileScreen.replaceChildren();
  const back = document.createElement('button');
  back.type = 'button'; back.className = 'atlas-mobile-back';
  back.textContent = mobileCategory ? mobileCategory.textContent.trim() : mobileTrigger.textContent.trim();
  back.setAttribute('aria-label','Back from ' + back.textContent);
  back.addEventListener('click', () => {
   if (mobileCategory) { mobileCategory = null; renderMobileLevel(); return; }
   const previous = mobileTrigger;
   mobileTrigger = null; active = null;
   triggers.forEach(t => t.setAttribute('aria-expanded','false'));
   header.classList.remove('is-mobile-submenu','is-menu-open'); mobileScreen.hidden = true;
   previous.focus();
  });
  mobileScreen.append(back);
  const rows = document.createElement('div'); rows.className = 'atlas-mobile-rows';
  const panel = panelFor(mobileTrigger);
  if (mobileCategory) {
   const content = document.getElementById(mobileCategory.getAttribute('aria-controls'));
   content.querySelectorAll('.atlas-trek-links a').forEach(link => rows.append(link.cloneNode(true)));
  } else {
   const categories = Array.from(panel.querySelectorAll('[role=tab]'));
   if (categories.length) categories.forEach(tab => rows.append(mobileRow(tab.textContent.trim(), () => { mobileCategory = tab; renderMobileLevel(); })));
   else panel.querySelectorAll('.atlas-trek-links a').forEach(link => rows.append(link.cloneNode(true)));
  }
  mobileScreen.append(rows);
  const all = panel.querySelector('.atlas-all');
  if (all) { const link = all.cloneNode(true); link.classList.add('atlas-mobile-all'); mobileScreen.append(link); }
  mobileScreen.hidden = false;
  header.classList.add('is-mobile-submenu');
  back.focus({preventScroll:true});
  header.scrollTop = 0;
 }
 function openMobileLevel(trigger) {
  dismiss(false);
  active = trigger; mobileTrigger = trigger; mobileCategory = null;
  header.classList.add('is-menu-open');
  triggers.forEach(t => t.setAttribute('aria-expanded',String(t === trigger)));
  renderMobileLevel();
 }
 let active = null, leaveTimer, fadeTimer, openingTimer, focusTimer;
 let pointerInside = false;
 function settle() {
  clearTimeout(fadeTimer);
  panels.forEach(p => { p.classList.remove('is-closing'); p.hidden = true; });
 }
 function show(trigger) {
  clearTimeout(leaveTimer); clearTimeout(fadeTimer); clearTimeout(focusTimer);
  if (active === trigger) return;
  const opening = !header.classList.contains('is-menu-open');
  clearTimeout(openingTimer);
  header.classList.toggle('is-opening', opening && !reduce.matches);
  // Transfer focus before hiding a panel, avoiding a null-relatedTarget close race.
  if (active) {
   const previous = panelFor(active);
   if (previous.contains(document.activeElement)) trigger.focus({ preventScroll: true });
  }
  active = trigger;
  panels.forEach((p,i) => { p.classList.remove('is-closing'); p.hidden = triggers[i] !== trigger; });
  header.classList.add('is-menu-open');
  triggers.forEach(t => t.setAttribute('aria-expanded', String(t === trigger)));
  if (opening) openingTimer = setTimeout(() => header.classList.remove('is-opening'), 140);
 }
 function dismiss(animate = true) {
  clearTimeout(leaveTimer); clearTimeout(fadeTimer); clearTimeout(openingTimer); clearTimeout(focusTimer);
  header.classList.remove('is-opening');
  const panel = active && panelFor(active);
  active = null;
  triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
  if (animate && panel && desktop.matches && !reduce.matches) {
   panel.classList.add('is-closing');
   fadeTimer = setTimeout(() => {
    if (active) return;
    settle(); header.classList.remove('is-menu-open');
   }, 140);
  } else { settle(); header.classList.remove('is-menu-open'); }
 }
 function closeMobile() {
  mobileScreen.hidden = true; mobileScreen.replaceChildren();
  mobileTrigger = null; mobileCategory = null;
  header.classList.remove('is-mobile-submenu');
  document.body.classList.remove('atlas-mobile-menu-open');
  inertContent.forEach(([element,previous]) => { element.inert = previous; }); inertContent = [];
  mobile.setAttribute('aria-label','Open navigation');
  nav.classList.remove('is-open'); header.classList.remove('is-mobile-open'); mobile.setAttribute('aria-expanded','false');
 }
 function arrange() {
  dismiss(false); closeMobile();
  triggers.forEach((trigger,i) => {
   header.append(panels[i]);
   trigger.setAttribute('aria-controls', desktop.matches ? panels[i].id : mobileScreen.id);
  });
 }
 triggers.forEach((trigger,i) => {
  trigger.addEventListener('mouseenter', () => { pointerInside = true; if (desktop.matches && hover.matches) show(trigger); });
  trigger.addEventListener('click', event => {
   if (!desktop.matches) { event.preventDefault(); openMobileLevel(trigger); return; }
   if (trigger.tagName === 'A' && active === trigger) return;
   event.preventDefault(); active === trigger ? dismiss() : show(trigger);
  });
  trigger.addEventListener('keydown', event => {
   if (event.key === 'ArrowDown' || event.key === ' ') {
    event.preventDefault();
    if (!desktop.matches) { openMobileLevel(trigger); return; }
    show(trigger); panels[i].querySelector('button,a')?.focus();
   }
   if (desktop.matches && ['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? triggers.length-1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + triggers.length) % triggers.length;
    if (active) show(triggers[next]); triggers[next].focus();
   }
  });
 });
 const whatsapp = header.querySelector('.atlas-whatsapp');
 whatsapp?.addEventListener('mouseenter', () => { if (desktop.matches && hover.matches) dismiss(); });
 whatsapp?.addEventListener('focus', () => dismiss(false));
 header.addEventListener('mouseenter', () => { pointerInside = true; clearTimeout(leaveTimer); });
 header.addEventListener('mouseleave', () => {
  pointerInside = false;
  if (desktop.matches && hover.matches) leaveTimer = setTimeout(() => dismiss(),180);
 });
 header.addEventListener('keydown', event => {
  if (!desktop.matches && mobile.getAttribute('aria-expanded') === 'true' && event.key === 'Tab') {
   const focusable = Array.from(header.querySelectorAll('a[href],button:not([disabled])')).filter(el => el.getClientRects().length);
   const first = focusable[0], last = focusable[focusable.length-1];
   if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
   else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
   return;
  }
  if (event.key !== 'Escape') return;
  event.preventDefault(); const target = desktop.matches ? active || mobile : mobile; dismiss(false); if (!desktop.matches) closeMobile(); target.focus();
 });
 header.addEventListener('focusout', () => {
  clearTimeout(focusTimer);
  focusTimer = setTimeout(() => {
   if (!header.contains(document.activeElement) && !(desktop.matches && hover.matches && pointerInside)) dismiss(false);
  }, 0);
 });
 document.addEventListener('click', event => { if (!header.contains(event.target)) { dismiss(); closeMobile(); } });
 mobile.addEventListener('click', () => {
  const open = mobile.getAttribute('aria-expanded') !== 'true';
  if (!open) { dismiss(false); closeMobile(); return; }
  nav.classList.add('is-open'); header.classList.add('is-mobile-open'); mobile.setAttribute('aria-expanded','true');
  mobile.setAttribute('aria-label','Close navigation');
  document.body.classList.add('atlas-mobile-menu-open');
  inertContent = Array.from(document.querySelectorAll('main,body > footer')).map(element => [element,element.inert]);
  inertContent.forEach(([element]) => { element.inert = true; });
 });
 header.querySelectorAll('[role=tablist]').forEach(list => {
  const tabs = Array.from(list.querySelectorAll('[role=tab]'));
  function select(tab) { tabs.forEach(t => { const selected = t === tab; t.setAttribute('aria-selected',String(selected)); t.tabIndex = selected ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).hidden = !selected; }); }
  tabs.forEach((tab,i) => {
   tab.addEventListener('click', () => select(tab));
   tab.addEventListener('mouseenter', () => { if (desktop.matches && hover.matches) select(tab); });
   tab.addEventListener('keydown', event => {
    const key = event.key;
    if (!['ArrowUp','ArrowDown','Home','End'].includes(key)) return;
    event.preventDefault();
    const index = key === 'Home' ? 0 : key === 'End' ? tabs.length-1 : (i + (key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length;
    select(tabs[index]); tabs[index].focus();
   });
  });
 });
 desktop.addEventListener('change',arrange);
 arrange();
})();
