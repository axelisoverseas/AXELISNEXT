const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../.next/axelis_university_logos.csv');
const domainsPath = path.join(__dirname, '../src/data/universityDomains.json');

function parseCSV(content) {
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const results = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // Simple CSV parser that handles quotes
        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
        const matches = lines[i].match(regex);
        
        if (matches && matches.length >= 2) {
            const name = matches[0].replace(/"/g, '').trim();
            const domain = matches[1].replace(/"/g, '').trim();
            results.push({ name, domain });
        }
    }
    return results;
}

async function run() {
    if (!fs.existsSync(csvPath)) {
        console.error(`CSV file not found at: ${csvPath}`);
        return;
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const csvData = parseCSV(csvContent);
    const domains = JSON.parse(fs.readFileSync(domainsPath, 'utf8'));

    console.log(`Processing ${csvData.length} entries from CSV...`);

    let updatedCount = 0;
    let newCount = 0;

    csvData.forEach(entry => {
        if (entry.name && entry.domain && entry.domain !== 'null') {
            if (domains[entry.name]) {
                if (domains[entry.name] !== entry.domain) {
                    domains[entry.name] = entry.domain;
                    updatedCount++;
                }
            } else {
                domains[entry.name] = entry.domain;
                newCount++;
            }
        }
    });

    fs.writeFileSync(domainsPath, JSON.stringify(domains, null, 2));
    console.log(`Finished synchronization!`);
    console.log(`- Updated: ${updatedCount} domains`);
    console.log(`- New entries: ${newCount} domains`);
    console.log(`Total domains in database: ${Object.keys(domains).length}`);
}

run();
