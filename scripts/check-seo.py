from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,xml.etree.ElementTree as ET
import argparse
parser=argparse.ArgumentParser(description='Check metadata, JSON-LD, sharing images and sitemap in an existing Jekyll build.')
parser.add_argument('site',type=Path,help='Jekyll output directory')
args=parser.parse_args()
root=args.site.resolve()
class Head(HTMLParser):
 def __init__(self):super().__init__();self.head=False;self.meta=[];self.canon=[];self.titles=0;self.ld=False;self.buf='';self.json=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='head':self.head=True
  if t=='meta' and self.head:self.meta.append(a)
  if t=='title' and self.head:self.titles+=1
  if t=='link' and a.get('rel')=='canonical':self.canon.append(a['href'])
  if t=='script' and a.get('type')=='application/ld+json':self.ld=True;self.buf=''
 def handle_data(self,s):
  if self.ld:self.buf+=s
 def handle_endtag(self,t):
  if t=='head':self.head=False
  if t=='script' and self.ld:self.json.append(self.buf);self.ld=False
errors=[];pages=0;noindex=set();schemas=[]
for f in root.rglob('*.html'):
 if 'assets' in f.parts:continue
 h=Head();h.feed(f.read_text(errors='replace'))
 if not any(m.get('property')=='og:site_name' for m in h.meta):continue
 pages+=1
 for name in ['description','robots']:
  ms=[m for m in h.meta if m.get('name')==name]
  if len(ms)!=1 or not ms[0].get('content','').strip():errors.append((str(f.relative_to(root)),name))
 if h.titles!=1 or len(h.canon)!=1:errors.append((str(f.relative_to(root)),'title/canonical'))
 if any('noindex' in m.get('content','') for m in h.meta if m.get('name')=='robots'):noindex.update(h.canon)
 for m in h.meta:
  if m.get('property')=='og:image' and not (root/unquote(urlsplit(m['content']).path).lstrip('/')).is_file():errors.append((str(f.relative_to(root)),'og:image'))
 for data in h.json:
  try:json.loads(data)
  except Exception as e:schemas.append((str(f.relative_to(root)),str(e)))
urls=[e.text for e in ET.parse(root/'sitemap.xml').findall('.//{*}loc')]
assert len(urls)==len(set(urls))
for url in urls:
 p=root/unquote(urlsplit(url).path).lstrip('/')
 assert p.is_file() or (p/'index.html').is_file() or Path(str(p)+'.html').is_file(),url
 assert url not in noindex,('Noindex URL in sitemap',url)
 assert '/peak-climbing/' not in url,url
assert 'https://atlasalpineexpedition.com/sitemap.xml' in (root/'robots.txt').read_text()
r={'pages':pages,'sitemap_urls':len(urls),'noindex_pages':sorted(noindex),'metadata_errors':errors,'schema_errors':schemas}
assert not errors,errors
assert not schemas,schemas
print('Pages:',pages,'sitemap URLs:',len(urls),'noindex pages:',len(noindex),'metadata errors:',errors,'JSON errors:',schemas[:10])
