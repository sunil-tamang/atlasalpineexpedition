# Atlas Alpine local image optimization

Original: 372.63 MiB. Optimized delivery tree: 225.04 MiB.
Saved: 147.59 MiB (39.61%).
Files: 673; images: 614; optimized: 264; unchanged/skipped: 409.
Decode/processing errors: 0.
Duplicate groups: 65; images exceeding 2560px: 99.
Potentially unused (no detected literal reference): 471.

## Review before integration
- Originals and source references were not changed. Copies mirror the original paths under this folder.
- report.json lists duplicates, oversize dimensions, usage bounds, quality-gate results and every file's status. inventory.csv is the compact spreadsheet version.
- dynamic-reference-notes.json flags constructed asset paths requiring manual integration review.
- reference-changes.json lists proposed URL extension changes and matching source lines. Existing URLs will remain unchanged until integration is approved.
- Unreferenced is a candidate list, not proof of non-use: Liquid, JS and CSS can construct gallery paths dynamically. Do not delete these files automatically.
- Photos use quality 84 and Lanczos downsampling with no cropping/upscaling. Unknown/shared hero and gallery usage is capped at 2560px; team portraits at 1600px. Graphics retain dimensions and use lossless WebP. SVG is unchanged.
- Tagged images are converted to sRGB; EXIF orientation is applied. Metadata is stripped. Alpha is checked for lossless graphics.
- Every raster is decoded, and every converted file is decoded again. PSNR is a conservative automated compression guard against the resized source, not a guarantee of visually indistinguishable quality. Images below 32dB are retained unchanged. No AI or individual photo analysis was used.
- Existing WebP, animation, non-image files, filename collisions, and larger encodings are copied unchanged. No originals are removed or replaced.
- This output starts with an underscore and is not published by Jekyll by default. It is a review artifact, not an integrated deployment.

## Reuse
```sh
python3 -m venv /private/tmp/atlas-image-tools
/private/tmp/atlas-image-tools/bin/pip install Pillow
/private/tmp/atlas-image-tools/bin/python scripts/optimize-images.py
```
Rerun after adding images. Use --output _image-optimization-new for a fresh isolated run. Use --quality 85 or --max-edge 3200 for less aggressive encoding/resizing. Website dependencies are not changed.
