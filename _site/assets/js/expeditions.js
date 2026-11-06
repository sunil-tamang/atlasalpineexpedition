(() => {
 const form = document.querySelector('[data-activity-filters]');
 if (!form) return;
 const cards = [...document.querySelectorAll('#expedition-grid .expedition-card')];
 const count = document.getElementById('expedition-result-count');
 const empty = document.getElementById('expedition-empty');
 const duration = form.querySelector('[name=duration]');
 const country = form.querySelector('[name=country]');
 const region = form.querySelector('[name=region]');
 const altitudes = [...form.querySelectorAll('input[name=altitude]')];
 const defaults = {altitude:form.dataset.defaultAltitude || 'all',country:form.dataset.defaultCountry || 'all',region:form.dataset.defaultRegion || 'all',duration:'all'};
 const singular = form.dataset.resultSingular || 'Trip', plural = form.dataset.resultPlural || 'Trips';
 const alias = value => ['everest-regions','khumbu','khumbu-region','hinku'].includes(value) ? 'everest' : value;
 function chooseAltitude(value) {
  const valid = altitudes.some(input => input.value === value) ? value : defaults.altitude;
  altitudes.forEach(input => { input.checked = input.value === valid; });
 }
 function regions(preferred = 'all') {
  const available = new Map();
  cards.forEach(card => { if (!country || country.value === 'all' || card.dataset.country === country.value) available.set(card.dataset.region,card.dataset.regionLabel); });
  region.replaceChildren(new Option('All Regions','all'));
  [...available].sort((a,b) => a[1].localeCompare(b[1])).forEach(([value,label]) => region.add(new Option(label,value)));
  const selected = alias(preferred);
  region.value = selected === 'all' || available.has(selected) ? selected : 'all';
 }
 function durationMatches(card,value) {
  if (value === 'all') return true;
  const days = Number(card.dataset.days);
  if (value === 'unknown') return !Number.isFinite(days) || days <= 0;
  if (!Number.isFinite(days) || days <= 0) return false;
  return value === 'up-to-7' ? days <= 7 : value === '8-14' ? days >= 8 && days <= 14 : value === '15-21' ? days >= 15 && days <= 21 : value === '22-30' ? days >= 22 && days <= 30 : value === '31plus' && days >= 31;
 }
 function state() { return {altitude:altitudes.find(input => input.checked)?.value || 'all',country:country?.value || 'all',region:region.value,duration:duration.value}; }
 function apply(updateUrl = true) {
  const previous = new Map();
  if (updateUrl && window.AtlasMotion?.enabled()) cards.filter(card => !card.hidden).forEach(card => previous.set(card,card.getBoundingClientRect()));
  const values = state();let total = 0;
  cards.forEach(card => {
   const match = (values.altitude === 'all' || card.dataset.altitude === values.altitude) && (values.country === 'all' || card.dataset.country === values.country) && (values.region === 'all' || card.dataset.region === values.region) && durationMatches(card,values.duration);
   card.hidden = !match;if (match) total++;
  });
  count.textContent = `${total} of ${cards.length} ${cards.length === 1 ? singular : plural}`;empty.hidden = total !== 0;
  if (updateUrl) {
   document.dispatchEvent(new CustomEvent('atlas:results-updated',{detail:{cards,previous}}));
   const url = new URL(location.href);
   Object.entries(values).forEach(([key,value]) => { url.searchParams.delete(key);if (value !== defaults[key]) url.searchParams.set(key,value); });
   history.replaceState(null,'',url.pathname + url.search + url.hash);
  }
 }
 function restore() {
  const params = new URLSearchParams(location.search);
  chooseAltitude(params.get('altitude') || defaults.altitude);
  if (country) { const value = params.get('country') || defaults.country;country.value = [...country.options].some(option => option.value === value) ? value : defaults.country; }
  regions(params.get('region') || (!country || country.value === defaults.country ? defaults.region : 'all'));
  const selected = params.get('duration') || 'all';duration.value = [...duration.options].some(option => option.value === selected) ? selected : 'all';
  apply(false);
 }
 form.addEventListener('change',event => { if (event.target === country) regions();apply(); });
 form.addEventListener('submit',event => { event.preventDefault();apply(); });
 form.addEventListener('reset',event => { event.preventDefault();chooseAltitude(defaults.altitude);if (country) country.value = defaults.country;regions(defaults.region);duration.value = 'all';apply(); });
 document.querySelector('[data-show-all-activities]')?.addEventListener('click',() => {chooseAltitude('all');if (country) country.value='all';regions('all');duration.value='all';apply();});
 window.addEventListener('popstate',restore);
 restore();
})();
