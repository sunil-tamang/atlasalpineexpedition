# Optimized image integration

Jekyll build: PASSED. Destination: /private/tmp/atlas-optimized-integrated. No preview or server started.

- Integrated 263 existing optimized WebP files into matching assets/css/images folders. No recompression.
- Updated 84 source files ({'.html': 68, '.yml': 12, '.css': 2, '.scss': 1, '.js': 1}): image references only, gallery discovery, affiliation de-duplication, and corrected metadata image prefixes.
- Added _data/optimized-images.yml for dynamic/numbered galleries, without custom plugins.
- All 263 integrated assets decoded successfully and matched optimization and build output byte-for-byte. Originals and SVG unchanged by integration; transparency preserved in the pre-generated assets.
- Verified 63 shared trip-gallery pages and 861 main/thumbnail/modal image references: all resolve, including URL-encoded filenames.
- No rendered original reference has an integrated optimized counterpart still unused.
- Preserved newer original: ['assets/css/images/treks/three-passes/1.jpg'].
- Originals already absent before integration: ['assets/css/images/home1.jpg', 'assets/css/images/homer.jpg']; their saved optimized copies were integrated.
- Fixed 8 broken path aliases using existing matching files. Corrected structured-data /assets/images/ prefixes to /assets/css/images/.

## Remaining references and errors

471 unique rendered JPG/JPEG/PNG paths remain; 260 exist. Retained formats include encodings already smaller than WebP, animations, graphics, and a newer original.

213 unresolved local image paths remain in pre-existing content/CSS: old India tour galleries, absent background/thumbnail files, the ATTA logo, and an Everest route map. None is an integrated WebP path. No matching local asset was found; unrelated stock images or invented logos were not substituted. See integration-validation.json for exact paths and affected pages. External images were not fetched.

Because originals are retained, repository disk usage increases. The website now requests the smaller integrated assets wherever available. Crops, layout CSS, navigation and animations were preserved.

## Changed source files

- _activities/old-rafting.html
- _activities/peak-climbing.html
- _activities/rafting.html
- _activities/rock-climbing.html
- _bike-tours/leh-manali-bike-tour.html
- _data/7000m-data.yml
- _data/8000m-data.yml
- _data/8000m-ddata.yml
- _data/bike-data.yml
- _data/brands.yml
- _data/navigation-secondary.yml
- _data/optimized-images.yml
- _data/peak-data.yml
- _data/rafting-data.yml
- _data/rock-data.yml
- _data/team.yml
- _data/trek-data.yml
- _escape-trips/spiti-valley-escape.html
- _includes/activity-directory-hero.html
- _includes/site-footer.html
- _includes/trip-day-viewer.html
- _includes/trip-intro.html
- _layouts/activities.html
- _layouts/bike-tour.html
- _layouts/camp.html
- _layouts/default.html
- _layouts/india.html
- _layouts/old-rafting.html
- _layouts/para.html
- _layouts/peak.html
- _layouts/rafting.html
- _layouts/rock.html
- _layouts/template.html
- _layouts/trek.html
- _legal/faq.html
- _legal/gear-list.html
- _peaks/ama-dablam.html
- _peaks/annapurna.html
- _peaks/baruntse.html
- _peaks/cho-oyu.html
- _peaks/dhaulagiri.html
- _peaks/everest.html
- _peaks/himlung-himal.html
- _peaks/island-peak.html
- _peaks/kanchenjunga.html
- _peaks/lhotse.html
- _peaks/lobuche-peak.html
- _peaks/makalu.html
- _peaks/manaslu.html
- _peaks/mera-peak.html
- _peaks/pumori.html
- _peaks/tharpu-peak.html
- _posts/2023-01-15-everest-base-camp-trek.html
- _posts/2023-01-18-Swayambhunath-Stupa-Discover-the-Spiritual-Hub-of-Nepal.html
- _posts/2023-04-13-massive-avalanche-on-mount-everest-results-in-three-missing-climbers.html
- _posts/2023-04-17-annapurna-has-kicked-off-the-season-with-a-triumphant-first-ascent.html
- _posts/2023-04-18-Mourning-Pasang-Lama-Seru-the-Khumbu-Trail-Builder.html
- _posts/2023-04-18-There-is-a-missing-climber-on-Annapurna.html
- _posts/2024-04-18-Tragic-News-Famous-Climber-Noel-Hanna-Passes-Away-on-Annapurna.html
- _posts/2024-09-20-After-being-missing-for-3-days-an-Indian-climber-was-rescued-from-a-crevasse.html
- _posts/2025-01-27-Pemba-Gelje-Sherpa-Sets-New-Speed-Record-on-Manaslu-Tyler-Andrews-Forced-to-Turn-Back.html
- _rafting/beas-river-rafting.html
- _rafting/rafting-in-kullu-manali.html
- _rafting/tamur-river-rafting.html
- _rafting/trishuli-river-rafting.html
- _rock-climbing/hattiban.html
- _sass/style.css
- _sass/style.scss
- _treks/beas-kund.html
- _treks/bhrigu-lake.html
- _treks/everest-base-camp.html
- _treks/fungni-top.html
- _treks/hampta-pass.html
- _treks/kufri.html
- _treks/luxury-everest-base-camp.html
- _treks/manaslu-base-camp.html
- _treks/panch-pokhari.html
- _treks/pikey-peak.html
- about.html
- assets/css/home.css
- assets/js/cart.js
- enquiry.html
- index.html
- somthing.html
