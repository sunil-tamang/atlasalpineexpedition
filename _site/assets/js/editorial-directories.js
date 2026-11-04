(() => {
 const buttons=[...document.querySelectorAll('[data-people-filter]')];
 if(!buttons.length)return;
 const cards=[...document.querySelectorAll('[data-people-role]')];
 function filter(role){let first=true,count=0;cards.forEach(card=>{const show=role==='all'||card.dataset.peopleRole===role;card.hidden=!show;card.classList.toggle('is-featured',show&&first);if(show){first=false;count++;}});buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.peopleFilter===role)));document.querySelector('.people-empty').hidden=count!==0;document.getElementById('people-filter-count').textContent=`${count} team profiles`;}
 buttons.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.peopleFilter)));
 filter('all');
})();
