const fs = require('fs');
const glob = require('glob');
const lucide = require('lucide-react');

const allIcons = Object.keys(lucide);

glob("src/**/*.{js,jsx}", (err, files) => {
  let hasError = false;
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
    if (match) {
      const imports = match[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean);
      imports.forEach(icon => {
        if (!allIcons.includes(icon) && icon !== 'lucide-react') {
          console.error(`File ${file} imports missing icon: ${icon}`);
          hasError = true;
        }
      });
    }
  });
  if (!hasError) console.log("All imported lucide-react icons are valid.");
});
