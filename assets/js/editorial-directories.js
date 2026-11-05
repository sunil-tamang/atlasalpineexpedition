(() => {
 const root = document.querySelector('.team-page');
 if (!root) return;
 const categories = [...root.querySelectorAll('[data-team-category]')];
 const specialties = [...root.querySelectorAll('[data-team-specialty]')];
 const cards = [...root.querySelectorAll('[data-team-member]')];
 const specialtyNav = root.querySelector('.team-specialty-nav');
 const count = root.querySelector('#team-filter-count');
 const heading = root.querySelector('#team-category-heading');
 let category = 'board-of-directors', specialty = 'all';
 function render() {
  let visible = 0;
  const isField = category === 'field-staff';
  specialtyNav.hidden = !isField;
  categories.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.teamCategory === category)));
  specialties.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.teamSpecialty === specialty)));
  cards.forEach(card => {
   const show = card.dataset.category === category && (!isField || specialty === 'all' || card.dataset.specialty === specialty);
   card.hidden = !show;
   if (show) visible++;
  });
  const label = categories.find(button => button.dataset.teamCategory === category).textContent.trim();
  const selectedSpecialty = specialties.find(button => button.dataset.teamSpecialty === specialty).textContent.trim();
  heading.textContent = isField && specialty !== 'all' ? `${label} / ${selectedSpecialty}` : label;
  count.textContent = `${heading.textContent}: ${visible} ${visible === 1 ? 'profile' : 'profiles'}`;
  root.querySelector('.team-empty').hidden = visible !== 0;
 }
 categories.forEach(button => button.addEventListener('click',() => { category = button.dataset.teamCategory; specialty = 'all'; render(); }));
 specialties.forEach(button => button.addEventListener('click',() => { specialty = button.dataset.teamSpecialty; render(); }));
 [categories,specialties].forEach(buttons => buttons.forEach((button,index) => button.addEventListener('keydown',event => {
  if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? buttons[0] : event.key === 'End' ? buttons.at(-1) : buttons[(index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length];
  next.focus(); next.click();
 })));
 root.querySelectorAll('[data-team-dialog]').forEach(button => {
  const dialog = document.getElementById(button.dataset.teamDialog);
  if (!dialog) return;
  button.addEventListener('click',() => dialog.showModal());
  dialog.querySelector('[data-team-close]').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
  dialog.addEventListener('close',() => button.focus());
 });
 render();
})();
