# Local SEO improvements

Implemented without changing page layouts, public trip URLs, or visible trip copy:

- Corrected site.name to Atlas Alpine Expedition and removed unsupported wording from the default description.
- Corrected robots.txt to advertise this site's XML sitemap instead of above8000.com.
- Added a shared SEO head: escaped/normalized descriptions, branded titles, a single robots directive and canonical URL, Open Graph and Twitter metadata, and verified local sharing-image fallbacks.
- Added Organization, WebSite and page/article structured data using known company information. Removed outdated TouristInformationCenter blocks with conflicting names, unverified price ranges, addresses and contact details.
- Improved search titles for the homepage, activity directories, About, Contact and News without changing visible headings.
- Normalized legacy company names in front matter only; attributed article body content was preserved.
- Prefer existing team data over stale placeholder profile descriptions in metadata.
- Keep profiles explicitly marked placeholder available at their existing URLs but noindex them. The enquiry page and old utility page are also noindex.
- Added an explicit XML sitemap that omits redirects, noindex/sample profiles, unpublished collections and non-page assets. It does not invent last-modified dates.
- Reused the redirect layout for /activities/peak-climbing/ to avoid a nested duplicate HTML document. This is a static redirect, not an HTTP 301 configuration.
- Excluded developer scripts and AGENTS.md from generated public output.

## Verification

Jekyll build passed without warnings in the final run.
141 pages checked; 135 unique sitemap URLs; 7 noindex pages in the shared layout.
Zero duplicate/missing head metadata errors and zero invalid JSON-LD blocks in checked pages.
All selected sharing images exist in the build. Sitemap URLs resolve to generated files (including existing extensionless .html routes).

Repeat:

```sh
bundle exec jekyll build --destination /private/tmp/atlas-seo-check --disable-disk-cache
python3 scripts/check-seo.py /private/tmp/atlas-seo-check
```

## Requires genuine business content or external access

- Replace sample reviews with approved client quotations and their actual authors. Names alone cannot make sample quotations genuine. Sample records remain clearly labeled; no review-rating schema was added.
- Supply accurate guide credentials, expedition records, itineraries, durations and current pricing where incomplete. No mountaineering or safety details were invented.
- Resolve remaining legacy missing images from the image integration report when the actual assets become available. No arbitrary replacement scenery or logos were substituted.
- Verify the live domain in Search Console, submit /sitemap.xml, and monitor impressions, indexing and enquiries after deployment.
- Configure hosting-level permanent redirects if supported; no deployment or hosting changes were performed.
- Verify Google Business Profile details and collect genuine reviews.

No preview, commit, push, deployment, image generation, or recompression was performed. These local improvements do not guarantee a first-page ranking.
