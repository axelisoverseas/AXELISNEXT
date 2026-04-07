const fs = require('fs');
const http = require('http');

const dataPath = './src/data/programsData.json';
const domainsPath = './src/data/universityDomains.json';

async function fetchDomain(uniName) {
    return new Promise((resolve) => {
        // Encode only the name, taking first core words to maximize hits
        const searchQuery = encodeURIComponent(uniName.split(' - ')[0].replace('University of Applied Sciences', '').split(',')[0].trim());
        const url = `http://universities.hipolabs.com/search?name=${searchQuery}`;
        
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed && parsed.length > 0 && parsed[0].domains && parsed[0].domains.length > 0) {
                        resolve(parsed[0].domains[0]);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function run() {
    const programs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const domains = JSON.parse(fs.readFileSync(domainsPath, 'utf8'));
    
    // Get all unique universities
    const uniqueUnis = [...new Set(programs.map(p => p.university).filter(Boolean))];
    
    console.log(`Checking ${uniqueUnis.length} universities...`);
    
    let updatedCount = 0;
    
    for (const uni of uniqueUnis) {
        if (!domains[uni] || domains[uni] === null) {
            console.log(`Fetching domain for: ${uni}`);
            const domain = await fetchDomain(uni);
            if (domain) {
                console.log(`Found domain: ${domain}`);
                domains[uni] = domain;
                updatedCount++;
            } else {
                domains[uni] = null; // Mark as null so we know we checked
            }
            // Sleep to avoid rate limiting
            await new Promise(r => setTimeout(r, 200));
        }
    }
    
    fs.writeFileSync(domainsPath, JSON.stringify(domains, null, 2));
    console.log(`Updated ${updatedCount} domains!`);
}

run();
