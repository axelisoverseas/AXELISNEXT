import json
import time
from duckduckgo_search import DDGS
from urllib.parse import urlparse

with open('src/data/programsData.json', 'r') as f:
    programs = json.load(f)
    
with open('src/data/universityDomains.json', 'r') as f:
    domains = json.load(f)

# Get all unique universities
unique_unis = list(set([str(p.get('university', '')).strip() for p in programs if p.get('university')]))

print(f"Total unique universities: {len(unique_unis)}")

updated = 0
ddgs = DDGS()

for uni in unique_unis:
    if not uni or uni == 'nan': continue
    
    # Check if we already have it
    if uni in domains and domains[uni]:
        continue
        
    print(f"Searching domain for: {uni}")
    try:
        results = list(ddgs.text(uni + " university official website", max_results=3))
        if results:
            for res in results:
                url = res.get('href', '')
                if 'wikipedia' not in url and 'facebook' not in url and 'linkedin' not in url and 'DAAD' not in res.get('title', ''):
                    domain = urlparse(url).netloc.replace('www.', '')
                    if domain:
                        print(f"✅ Found: {domain}")
                        domains[uni] = domain
                        updated += 1
                        break
        time.sleep(2)
    except Exception as e:
        print(f"❌ Error for {uni}: {e}")
        time.sleep(3)

print(f"\nFinished. Added {updated} new domains.")

with open('src/data/universityDomains.json', 'w') as f:
    json.dump(domains, f, indent=2)

