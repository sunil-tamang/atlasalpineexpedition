(() => {
 const form = document.querySelector('[data-activity-filters]');
 if (!form) return;
 const controls = [];
 let open = null, search = '', searchTimer;
 function close(restoreFocus = false) {
  if (!open) return;
  const previous = open;
  previous.menu.hidden = true;previous.button.setAttribute('aria-expanded','false');open = null;
  if (restoreFocus) previous.button.focus();
 }
 function position(control) {
  const rect = control.button.getBoundingClientRect();
  const width = Math.min(Math.max(rect.width,220),window.innerWidth-24);
  const below = window.innerHeight-rect.bottom-16, above = rect.top-16;
  const down = below >= Math.min(260,above);
  control.menu.style.width = width+'px';
  control.menu.style.maxHeight = Math.max(80,Math.min(300,down?below:above))+'px';
  control.menu.style.left = Math.max(12,Math.min(rect.left,window.innerWidth-width-12))+'px';
  const height = control.menu.getBoundingClientRect().height;
  control.menu.style.top = (down?rect.bottom+6:Math.max(8,rect.top-height-6))+'px';
 }
 function refresh(control) {
  const selected = [...control.select.options].find(option => option.value === control.select.value);
  control.button.textContent = selected?.text || control.label;
  control.button.setAttribute('aria-label',control.label+': '+control.button.textContent);
  control.menu.replaceChildren();
  [...control.select.options].forEach((option,index) => {
   const item = document.createElement('button');item.type='button';item.className='activity-filter-option';
   item.setAttribute('role','option');item.setAttribute('aria-selected',String(option.value===control.select.value));item.tabIndex=-1;
   item.textContent=option.text;item.disabled=option.disabled;item.dataset.index=String(index);
   item.addEventListener('click',() => {control.select.value=option.value;control.select.dispatchEvent(new Event('change',{bubbles:true}));close(true);});
   control.menu.append(item);
  });
  if (open===control) position(control);
 }
 function show(control,last = false) {
  close();search='';refresh(control);control.menu.hidden=false;control.button.setAttribute('aria-expanded','true');open=control;position(control);
  const options=[...control.menu.querySelectorAll('[role=option]:not(:disabled)')];
  (options.find(option=>option.getAttribute('aria-selected')==='true') || (last?options.at(-1):options[0]))?.focus({preventScroll:true});
 }
 form.querySelectorAll('select').forEach(select => {
  const label = document.querySelector('label[for="'+select.id+'"]')?.textContent.trim() || select.name;
  const button=document.createElement('button');button.type='button';button.className='activity-select-button';button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');
  const menu=document.createElement('div');menu.className='activity-filter-options';menu.id=select.id+'-options';menu.hidden=true;menu.setAttribute('role','listbox');menu.setAttribute('aria-label',label);
  button.setAttribute('aria-controls',menu.id);select.after(button);document.body.append(menu);
  const control={select,button,menu,label};controls.push(control);refresh(control);select.hidden=true;
  button.addEventListener('click',()=>{if(open===control)close();else show(control);});
  button.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();show(control,event.key==='ArrowUp');}});
  menu.addEventListener('keydown',event=>{
   const options=[...menu.querySelectorAll('[role=option]:not(:disabled)')],index=options.indexOf(document.activeElement);
   if(event.key==='Escape'){event.preventDefault();close(true);return;}
   if(event.key==='Tab'){close(true);return;}
   if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
    event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?options.length-1:(index+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;options[next]?.focus();return;
   }
   if(event.key.length===1 && event.key!==' ' && !event.ctrlKey && !event.metaKey && !event.altKey){
    event.preventDefault();clearTimeout(searchTimer);search+=event.key.toLocaleLowerCase();options.find(option=>option.textContent.toLocaleLowerCase().startsWith(search))?.focus();searchTimer=setTimeout(()=>{search='';},700);
   }
  });
 });
 const sync = () => controls.forEach(refresh);
 form.addEventListener('change',sync);form.addEventListener('reset',sync);
 document.querySelector('[data-show-all-activities]')?.addEventListener('click',sync);
 window.addEventListener('popstate',sync);
 document.addEventListener('pointerdown',event=>{if(open && !event.composedPath().includes(open.menu) && !event.composedPath().includes(open.button))close();});
 form.addEventListener('scroll',()=>close(),{passive:true});
 window.addEventListener('resize',()=>close());
 window.addEventListener('scroll',()=>{if(open)position(open);},{passive:true});
})();
