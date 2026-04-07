import json
import urllib.request
import urllib.parse
import time
import os

def fetch_domain(uni_name):
    # Try direct search
    url = f"http://universities.hipolabs.com/search?name={urllib.parse.quote(uni_name)}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and len(data) > 0 and 'domains' in data[0] and len(data[0]['domains']) > 0:
                return data[0]['domains'][0]
    except Exception as e:
        print(f"Error fetching {uni_name}: {e}")
    return None

def main():
    programs_path = 'src/data/programsData.json'
    out_path = 'src/data/universityDomains.json'
    
    with open(programs_path, 'r', encoding='utf-8') as f:
        programs = json.load(f)
        
    unis = sorted(list(set(p['university'] for p in programs if 'university' in p)))
    print(f"Total unique universities: {len(unis)}")
    
    # Load existing to resume if needed
    domain_map = {}
    if os.path.exists(out_path):
        with open(out_path, 'r', encoding='utf-8') as f:
            domain_map = json.load(f)
            
    for i, uni in enumerate(unis):
        if uni in domain_map and domain_map[uni]:
            continue
            
        print(f"[{i+1}/{len(unis)}] Fetching domain for: {uni}")
        
        # Heuristics for better search names
        search_name = uni.split(',')[0].strip() # "Middlesex university, London" -> "Middlesex university"
        search_name = search_name.split(' - ')[0].strip() 
        
        domain = fetch_domain(search_name)
        if not domain:
            # try even shorter
            search_name2 = search_name.replace("University of Applied Sciences", "").replace("University", "").strip()
            if search_name2:
                domain = fetch_domain(search_name2)
                
        if domain:
            domain_map[uni] = domain
            print(f" -> Found: {domain}")
        else:
            domain_map[uni] = None
            print(f" -> Not found")
            
        time.sleep(0.1) # Be nice to the API
        
        if i % 25 == 0:
            with open(out_path, 'w', encoding='utf-8') as f:
                json.dump(domain_map, f, indent=2)

    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(domain_map, f, indent=2)
    print("Done!")

if __name__ == "__main__":
    main()
