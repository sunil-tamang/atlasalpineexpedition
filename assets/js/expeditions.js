(() => {
 const form = document.getElementById('expedition-filters');
 if (!form) return;
 const cards = Array.from(document.querySelectorAll('.expedition-card'));
 const count = document.getElementById('expedition-result-count');
 const empty = document.getElementById('expedition-empty');
 const inputs = Array.from(form.querySelectorAll('input[type=checkbox]'));
 const groups = Array.from(new Set(inputs.map(input => input.name)));
 const singular = form.dataset.resultSingular || 'Expedition';
 const plural = form.dataset.resultPlural || 'Expeditions';
 form.querySelectorAll('[data-filter-count]').forEach(label => {
  const [group,value] = label.dataset.filterCount.split(':');
  const total = cards.filter(card => card.dataset[group] === value).length;
  label.textContent = '(' + total + ')';
  if (!total) label.closest('label').querySelector('input').disabled = true;
 });
 function apply(updateUrl = true) {
  const values = new FormData(form);
  let total = 0;
  cards.forEach(card => {
   const match = groups.every(group => { const selected = values.getAll(group); return !selected.length || selected.includes(card.dataset[group]); });
   card.hidden = !match; if (match) total++;
  });
  count.textContent = total + ' ' + (total === 1 ? singular : plural);
  empty.hidden = total !== 0;
  if (updateUrl) {
   const url = new URL(location.href);
   groups.forEach(group => { url.searchParams.delete(group); values.getAll(group).forEach(value => url.searchParams.append(group,value)); });
   history.replaceState(null,'',url.pathname + url.search + url.hash);
  }
 }
 form.addEventListener('change',() => apply());
 form.addEventListener('submit',event => { event.preventDefault(); apply(); });
 form.addEventListener('reset',() => { setTimeout(() => apply(),0); });
 const params = new URLSearchParams(location.search);
 inputs.forEach(input => {
  input.checked = params.getAll(input.name).includes(input.value);
  if (input.checked) input.disabled = false;
 });
 apply(false);
})();
