(() => {
 const data = document.getElementById('enquiry-tour-data');
 if (!data) return;
 const tours = JSON.parse(data.textContent);
 const params = new URLSearchParams(location.search);
 const slug = params.get('tour_slug');
 const fallbackGroup = { 'rock-climbing':'rock-data', 'rafting':'rafting-data', 'bike-tours':'bike-data' }[params.get('trip_kind')];
 const tour = tours.find(item => item.slug === slug || (slug === 'dhaulagiri-circuit' && item.slug === 'dhaulagiri-circuit-trek')) || (fallbackGroup && params.get('trip_name') ? { title:params.get('trip_name'), group:fallbackGroup, image:document.getElementById('sidebar-tour-image').src, days:'', url:'' } : null);
 const mountain = params.get('mountain');
 const categories = { 'trek-data':'Trekking', 'peak-data':'Peak climbing', '7000m-data':'Expedition', '8000m-data':'Expedition', 'bike-data':'Mountain biking', 'rock-data':'Rock climbing', 'rafting-data':'Rafting' };
 const field = document.getElementById('id_tour_name');
 const image = document.getElementById('sidebar-tour-image');
 image.addEventListener('error', () => { image.src = image.dataset.fallback; }, {once:true});
 image.dataset.fallback = image.src;
 if (!tour && !mountain) return;
 const name = tour ? tour.title : mountain + ' Expedition';
 field.value = name;
 field.readOnly = true;
 // Preserve the selected trip in the submitted form without an extra visible field.
 document.getElementById('enquiry-tour-field').hidden = true;
 document.getElementById('sidebar-tour-name').textContent = name;
 document.getElementById('enquiry-heading').textContent = tour?.group === 'trek-data' ? 'Let’s plan your trek.' : (!tour || ['peak-data','7000m-data','8000m-data'].includes(tour.group) || tour.group === 'rock-data') ? 'Let’s plan your climb.' : 'Let’s plan your journey.';
 if (tour) {
  image.src = tour.image;
  image.alt = name;
  document.getElementById('enquiry-trip-category').textContent = categories[tour.group];
  if (tour.days) { const duration = document.getElementById('enquiry-trip-duration'); duration.textContent = tour.days + ' days'; duration.hidden = false; }
  if (tour.url && tour.url !== '/') {
   const link = document.getElementById('enquiry-trip-link'); link.href = tour.url; link.textContent = 'View trip details';
   const crumb = document.getElementById('enquiry-trip-breadcrumb'); crumb.href = tour.url; crumb.textContent = name; crumb.hidden = false;
   document.getElementById('enquiry-trip-divider').hidden = false;
  }
 } else {
  document.getElementById('enquiry-trip-category').textContent = 'Expedition';
  document.getElementById('id_user_remarks').value = 'I would like to enquire about an expedition to ' + mountain + '.';
 }
})();
