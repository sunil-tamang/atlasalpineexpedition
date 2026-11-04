(() => {
 const search = document.getElementById('faq-search');
 if (search) {
  const buttons = [...document.querySelectorAll('[data-faq-category]')];
  const questions = [...document.querySelectorAll('[data-faq-group]')];
  let category = 'all';
  function filter() {
   const query = search.value.trim().toLocaleLowerCase();let count = 0;
   questions.forEach(question => { const show = (category === 'all' || question.dataset.faqGroup === category) && question.textContent.toLocaleLowerCase().includes(query);question.hidden = !show;if (show) count++; });
   buttons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.faqCategory === category)));
   document.getElementById('faq-results-heading').textContent = buttons.find(button => button.dataset.faqCategory === category).textContent;
   document.getElementById('faq-results-count').textContent = `${count} questions`;
   document.getElementById('faq-no-results').hidden = count !== 0;
  }
  buttons.forEach(button => button.addEventListener('click',() => {category = button.dataset.faqCategory;filter();}));
  search.addEventListener('input',filter);
  document.getElementById('faq-show-all').addEventListener('click',() => { category='all';search.value='';filter();search.focus(); });
  filter();
 }
 const providerTabs = [...document.querySelectorAll('[data-provider-tab]')];
 const providerPanels = [...document.querySelectorAll('[data-provider-panel]')];
 function providerSelect(tab) {providerTabs.forEach(button => button.setAttribute('aria-pressed',String(button===tab)));providerPanels.forEach(panel => {panel.hidden=panel.dataset.providerPanel!==tab.dataset.providerTab;});}
 providerTabs.forEach(tab => tab.addEventListener('click',()=>providerSelect(tab)));
 if(providerTabs.length)providerSelect(providerTabs[0]);
 document.querySelectorAll('.resource-filter-tabs').forEach(list => {
  const buttons=[...list.querySelectorAll('button')];
  list.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const index=buttons.indexOf(event.target);if(index<0)return;event.preventDefault();const next=event.key==='Home'?buttons[0]:event.key==='End'?buttons.at(-1):buttons[(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length];next.focus();next.click();});
 });
 const links=[...document.querySelectorAll('.resource-toc nav a')];
 const targets=links.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
 if(targets.length && 'IntersectionObserver' in window) {
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(!visible.length)return;links.forEach(link=>{const active=link.hash==='#'+visible[0].target.id;link.classList.toggle('is-current',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});},{rootMargin:'-5% 0px -65% 0px',threshold:0});
  targets.forEach(target=>observer.observe(target));
 }
})();
