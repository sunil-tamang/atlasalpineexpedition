#!/usr/bin/env python3
"""Local, non-destructive image optimizer. Requires Pillow (pip install Pillow).
Run from anywhere: python scripts/optimize-images.py
Outputs are under _image-optimization (excluded by Jekyll's underscore rule).
No originals or website references are modified. Review report.md before integration.
"""
import argparse, concurrent.futures, csv, hashlib, io, json, math, os, re, shutil
from collections import Counter, defaultdict
from pathlib import Path
from PIL import Image, ImageChops, ImageCms, ImageOps, features

VERSION = 1
IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif', '.tif', '.tiff'}
TEXT_EXTS = {'.html', '.liquid', '.css', '.scss', '.js', '.md', '.markdown', '.yml', '.yaml'}

def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''): h.update(block)
    return h.hexdigest()

def psnr(a, b):
    hist = ImageChops.difference(a.convert('RGB'), b.convert('RGB')).histogram()
    mse = sum(n * (i % 256) ** 2 for i, n in enumerate(hist)) / (a.width * a.height * 3)
    return round(10 * math.log10(255 ** 2 / mse), 2) if mse else 99.0

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--source', default='assets/css/images')
    parser.add_argument('--output', default='_image-optimization')
    parser.add_argument('--quality', type=int, choices=range(80,86), default=84)
    parser.add_argument('--workers', type=int, default=4)
    parser.add_argument('--max-edge', type=int, default=2560)
    args = parser.parse_args()
    root = args.root.resolve(); source = (root / args.source).resolve(); output = (root / args.output).resolve()
    if source == output or source in output.parents or output in source.parents:
        raise SystemExit('Source and output must be separate, non-nested directories.')
    if not features.check('webp'): raise SystemExit('Pillow needs WebP support.')
    output.mkdir(parents=True, exist_ok=True)
    files = sorted(p for p in source.rglob('*') if p.is_file())
    assets = [p for p in files if p.suffix.lower() in IMAGE_EXTS]
    # Inspect source text only for image references. Exclude generated output, VCS,
    # dependencies, and binary asset trees; no unrelated file contents are read.
    texts = []
    for directory, dirs, names in os.walk(root):
        dirs[:] = [d for d in dirs if d not in {'.git','node_modules','vendor','_site','.jekyll-cache','.sass-cache',output.name,'scripts'}
                   and (Path(directory)/d).resolve() != source]
        for name in names:
            p = Path(directory)/name
            if p.suffix.lower() in TEXT_EXTS:
                for number,line in enumerate(p.read_text(errors='replace').splitlines(),1):
                    if re.search(r'\.(?:jpe?g|png|webp|svg|gif)|images/|custom_bg|custom_thumb',line,re.I):
                        texts.append((str(p.relative_to(root)),number,line))
    names = Counter(p.name for p in assets)
    references = defaultdict(list)
    for p in assets:
        rel = p.relative_to(source).as_posix(); full = p.relative_to(root).as_posix()
        for file,number,line in texts:
            if p.name not in line: continue
            if full in line or rel in line or names[p.name] == 1:
                references[full].append({'file':file,'line':number,'text':line.strip(),
                                        'confidence':'literal' if full in line or rel in line else 'unique filename; review context'})
    hashes = {}; duplicate_groups = defaultdict(list)
    for p in files:
        hashes[p] = digest(p); duplicate_groups[hashes[p]].append(str(p.relative_to(root)))
    duplicates = [v for v in duplicate_groups.values() if len(v)>1]
    destinations = Counter(str(p.with_suffix('.webp')).lower() for p in assets)
    def process(p):
        full = p.relative_to(root).as_posix(); rel = p.relative_to(source)
        target = output / args.source / rel
        record = {'original':full,'output':'','original_bytes':p.stat().st_size,'optimized_bytes':0,
                  'status':'unchanged','reason':'','original_width':None,'original_height':None,
                  'width':None,'height':None,'usage':'','psnr_db':None,'decoded':None,'sha256':hashes[p]}
        target.parent.mkdir(parents=True, exist_ok=True)
        ext = p.suffix.lower()
        def retain(reason):
            record.update(width=record['original_width'],height=record['original_height'])
            shutil.copy2(p,target)
            record.update(output=str(target.relative_to(output)),optimized_bytes=p.stat().st_size,reason=reason)
            return record
        if ext not in IMAGE_EXTS: return retain('Non-image file: copied unchanged')
        if ext == '.svg': return retain('SVG unchanged')
        try:
            with Image.open(p) as original:
                original.load()
                record.update(original_width=original.width,original_height=original.height,decoded=True)
                if getattr(original,'n_frames',1)>1: return retain('Animated image preserved unchanged')
                if ext not in {'.jpg','.jpeg','.png'}: return retain('Existing image format preserved unchanged')
                im = ImageOps.exif_transpose(original)
                icc = original.info.get('icc_profile')
                if icc:
                    # Convert tagged photos to standard sRGB before discarding metadata.
                    im = ImageCms.profileToProfile(im,ImageCms.ImageCmsProfile(io.BytesIO(icc)),ImageCms.createProfile('sRGB'),outputMode='RGBA' if 'A' in im.getbands() else 'RGB')
                elif im.mode not in {'RGB','RGBA','L','LA','P'}: im = im.convert('RGB')
                graphic = ext == '.png' or any(x in rel.as_posix().lower() for x in ('affil/','logo','contour','map'))
                refs = references[full]
                # Galleries and unknown/dynamic uses retain a generous 2560px edge.
                # Team portraits are used in the CV and carousel, never full-width heroes.
                team = 'team/' in rel.as_posix().lower()
                bound = min(args.max_edge,1600) if team and not graphic else args.max_edge
                if graphic: bound = max(im.size) # no resizing logos, maps or graphics
                record['usage'] = 'lossless graphic; original dimensions' if graphic else ('portrait/profile: 1600px max edge' if team else 'hero/gallery/unknown: 2560px max edge')
                im.thumbnail((bound,bound),Image.Resampling.LANCZOS)
                record.update(width=im.width,height=im.height)
                if destinations[str(p.with_suffix('.webp')).lower()] > 1:
                    return retain('WebP filename collision: original retained')
                candidate = io.BytesIO()
                im.save(candidate,'WEBP',quality=args.quality,lossless=graphic,method=5,exact=True)
                data = candidate.getvalue()
                with Image.open(io.BytesIO(data)) as check:
                    check.load()
                    if check.size != im.size: raise ValueError('Decoded dimensions differ')
                    if not graphic:
                        record['psnr_db'] = psnr(im,check)
                        if record['psnr_db'] < 32:
                            return retain('Conservative quality gate: PSNR below 32dB; original retained')
                    if graphic and 'A' in im.getbands():
                        if ImageChops.difference(im.convert('RGBA').getchannel('A'),check.convert('RGBA').getchannel('A')).getbbox():
                            raise ValueError('Transparency differs')
                if len(data) >= p.stat().st_size: return retain('Conversion not smaller: original retained')
                target = target.with_suffix('.webp'); target.write_bytes(data)
                with Image.open(target) as check: check.load()
                record.update(output=str(target.relative_to(output)),optimized_bytes=len(data),status='optimized',reason='lossless WebP' if graphic else 'WebP quality '+str(args.quality))
                return record
        except Exception as error:
            record['decoded'] = False
            return retain('Processing/decoding error: '+str(error))
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        records = list(pool.map(process,files))
    before = sum(r['original_bytes'] for r in records); after=sum(r['optimized_bytes'] for r in records)
    modified_originals = [str(p.relative_to(root)) for p in files if digest(p) != hashes[p]]
    if modified_originals: raise RuntimeError('Source images changed during processing: '+str(modified_originals))
    dynamic_references = [{'file':file,'line':number,'text':line.strip()} for file,number,line in texts if ('append:' in line or '${' in line or 'site.static_files' in line) and ('images/' in line or '.jpg' in line or '.png' in line)]
    (output/'dynamic-reference-notes.json').write_text(json.dumps(dynamic_references,indent=2))
    changes=[]
    for r in records:
        if r['status']=='optimized':
            changes.append({'old':r['original'],'proposed':r['output'],
                            'references':references[r['original']],
                            'note':'Review dynamic gallery .jpg construction and front-matter prefixes before applying. No references were changed.'})
    potential_unused=[r['original'] for r in records if Path(r['original']).suffix.lower() in IMAGE_EXTS and not references[r['original']]]
    oversize=[r for r in records if r['original_width'] and max(r['original_width'],r['original_height'])>args.max_edge]
    summary={'original_bytes':before,'optimized_bytes':after,'saved_bytes':before-after,'savings_percent':round((before-after)*100/before,2),
             'total_files':len(records),'image_files':len(assets),'optimized_files':sum(r['status']=='optimized' for r in records),
             'skipped_or_unchanged':sum(r['status']!='optimized' for r in records),'decode_errors':sum(r['decoded'] is False for r in records),
             'duplicate_groups':len(duplicates),'oversized_images':len(oversize),'potentially_unused_images':len(potential_unused),'script_version':VERSION,'originals_verified_unchanged':len(files)}
    report={'summary':summary,'files':records,'duplicates':duplicates,'oversized_images':oversize,'potentially_unused':potential_unused}
    (output/'report.json').write_text(json.dumps(report,indent=2))
    (output/'reference-changes.json').write_text(json.dumps(changes,indent=2))
    with (output/'inventory.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(records[0]));w.writeheader();w.writerows(records)
    (output/'report.md').write_text(f'''# Atlas Alpine local image optimization

Original: {before/1024**2:.2f} MiB. Optimized delivery tree: {after/1024**2:.2f} MiB.
Saved: {(before-after)/1024**2:.2f} MiB ({summary['savings_percent']}%).
Files: {len(records)}; images: {len(assets)}; optimized: {summary['optimized_files']}; unchanged/skipped: {summary['skipped_or_unchanged']}.
Decode/processing errors: {summary['decode_errors']}.
Duplicate groups: {len(duplicates)}; images exceeding {args.max_edge}px: {len(oversize)}.
Potentially unused (no detected literal reference): {len(potential_unused)}.

## Review before integration
- Originals and source references were not changed. Copies mirror the original paths under this folder.
- report.json lists duplicates, oversize dimensions, usage bounds, quality-gate results and every file's status. inventory.csv is the compact spreadsheet version.
- dynamic-reference-notes.json flags constructed asset paths requiring manual integration review.
- reference-changes.json lists proposed URL extension changes and matching source lines. Existing URLs will remain unchanged until integration is approved.
- Unreferenced is a candidate list, not proof of non-use: Liquid, JS and CSS can construct gallery paths dynamically. Do not delete these files automatically.
- Photos use quality {args.quality} and Lanczos downsampling with no cropping/upscaling. Unknown/shared hero and gallery usage is capped at {args.max_edge}px; team portraits at 1600px. Graphics retain dimensions and use lossless WebP. SVG is unchanged.
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
''')
    print(json.dumps(summary,indent=2),flush=True)
if __name__=='__main__': main()
