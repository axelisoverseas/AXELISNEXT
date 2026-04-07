const fs = require('fs');
const path = require('path');

// Execute relative to the root of the project
const csvPath = path.join(__dirname, '..', '.next', 'axelis_university_logos.csv');
const domainJsonPath = path.join(__dirname, '..', 'src', 'data', 'universityDomains.json');

const csv = fs.readFileSync(csvPath, 'utf8');

let domainData = {};
try {
  domainData = JSON.parse(fs.readFileSync(domainJsonPath, 'utf8'));
} catch (e) {
  console.log('Error reading domains json, creating new one');
}

const lines = csv.split('\n');
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  let result = [];
  let inQuotes = false;
  let word = '';
  for(let j=0; j<lines[i].length; j++) {
    const char = lines[i][j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(word);
      word = '';
    } else {
      word += char;
    }
  }
  result.push(word);
  
  if (result.length >= 2) {
    let name = result[0].trim().replace(/^"|"$/g, '');
    let domain = result[1].trim().replace(/^"|"$/g, '');
    if (name && domain) {
      domainData[name] = domain;
    }
  }
}

fs.writeFileSync(domainJsonPath, JSON.stringify(domainData, null, 2));
console.log('Merged successfully 🎉 universityDomains.json updated with CSV domain data.');
