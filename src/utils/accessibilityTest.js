// Accessibility Testing Utilities
// WCAG AA Compliance Testing for Color Contrast Ratios

/**
 * Calculate the relative luminance of a color
 * @param {string} hex - Hex color code (e.g., '#1B365D')
 * @returns {number} - Relative luminance value
 */
function getLuminance(hex) {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Apply gamma correction
  const sRGB = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color (hex)
 * @param {string} color2 - Second color (hex)
 * @returns {number} - Contrast ratio
 */
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param {number} ratio - Contrast ratio
 * @param {string} level - 'normal' or 'large' text
 * @returns {object} - Compliance status
 */
function checkWCAGCompliance(ratio, level = 'normal') {
  const minRatio = level === 'large' ? 3.0 : 4.5;
  const minRatioAAA = level === 'large' ? 4.5 : 7.0;
  
  return {
    ratio: ratio.toFixed(2),
    passesAA: ratio >= minRatio,
    passesAAA: ratio >= minRatioAAA,
    level: level,
    minRequired: minRatio
  };
}

// Professional Color Palette
const colors = {
  // Primary Navy Blue
  primary600: '#1B365D',
  primary700: '#162B4A',
  primary800: '#0F1F35',
  primary100: '#E1E8ED',
  primary50: '#F0F4F8',
  
  // Neutral Grays
  neutral900: '#171717',
  neutral800: '#262626',
  neutral700: '#404040',
  neutral600: '#525252',
  neutral500: '#737373',
  neutral400: '#A3A3A3',
  neutral300: '#D4D4D4',
  neutral200: '#E5E5E5',
  neutral100: '#F5F5F5',
  neutral50: '#FAFAFA',
  
  // Pure colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Status colors
  success500: '#16A34A',
  warning500: '#D97706',
  error500: '#DC2626'
};

// Test all critical color combinations
const testCombinations = [
  // Primary text combinations
  { name: 'Black text on white background', fg: colors.black, bg: colors.white, level: 'normal' },
  { name: 'Black text on neutral-50 background', fg: colors.black, bg: colors.neutral50, level: 'normal' },
  { name: 'Black text on neutral-100 background', fg: colors.black, bg: colors.neutral100, level: 'normal' },
  
  // Primary button combinations
  { name: 'White text on primary-600 background', fg: colors.white, bg: colors.primary600, level: 'normal' },
  { name: 'White text on primary-700 background', fg: colors.white, bg: colors.primary700, level: 'normal' },
  
  // Secondary text combinations
  { name: 'Neutral-700 text on white background', fg: colors.neutral700, bg: colors.white, level: 'normal' },
  { name: 'Neutral-600 text on white background', fg: colors.neutral600, bg: colors.white, level: 'normal' },
  { name: 'Neutral-600 text on neutral-50 background', fg: colors.neutral600, bg: colors.neutral50, level: 'normal' },
  
  // Interactive elements
  { name: 'Primary-600 text on white background', fg: colors.primary600, bg: colors.white, level: 'normal' },
  { name: 'Primary-600 text on neutral-50 background', fg: colors.primary600, bg: colors.neutral50, level: 'normal' },
  
  // Status colors
  { name: 'Success-500 text on white background', fg: colors.success500, bg: colors.white, level: 'normal' },
  { name: 'Warning-500 text on white background', fg: colors.warning500, bg: colors.white, level: 'normal' },
  { name: 'Error-500 text on white background', fg: colors.error500, bg: colors.white, level: 'normal' },
  
  // Large text combinations (headings)
  { name: 'Black headings on white background', fg: colors.black, bg: colors.white, level: 'large' },
  { name: 'Primary-600 headings on white background', fg: colors.primary600, bg: colors.white, level: 'large' },
];

/**
 * Run accessibility tests for all color combinations
 * @returns {object} - Test results
 */
export function runAccessibilityTests() {
  console.log('🔍 Running WCAG AA Accessibility Tests for Axelis Color Palette\n');
  
  const results = {
    passed: 0,
    failed: 0,
    details: []
  };
  
  testCombinations.forEach(test => {
    const ratio = getContrastRatio(test.fg, test.bg);
    const compliance = checkWCAGCompliance(ratio, test.level);
    
    const result = {
      name: test.name,
      foreground: test.fg,
      background: test.bg,
      level: test.level,
      ...compliance
    };
    
    results.details.push(result);
    
    if (compliance.passesAA) {
      results.passed++;
      console.log(`✅ ${test.name}: ${compliance.ratio}:1 (PASSES)`);
    } else {
      results.failed++;
      console.log(`❌ ${test.name}: ${compliance.ratio}:1 (FAILS - needs ${compliance.minRequired}:1)`);
    }
  });
  
  console.log(`\n📊 Test Summary:`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${((results.passed / testCombinations.length) * 100).toFixed(1)}%`);
  
  return results;
}

/**
 * Generate accessibility report
 * @returns {string} - HTML report
 */
export function generateAccessibilityReport() {
  const results = runAccessibilityTests();
  
  let html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1B365D; border-bottom: 2px solid #1B365D; padding-bottom: 10px;">
        Axelis Website Accessibility Report
      </h1>
      <p style="color: #404040; font-size: 16px; line-height: 1.6;">
        This report tests the color contrast ratios of the Axelis website against WCAG AA accessibility standards.
      </p>
      
      <div style="background: #F0F4F8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #1B365D; margin-top: 0;">Summary</h2>
        <p><strong>Total Tests:</strong> ${testCombinations.length}</p>
        <p><strong>Passed:</strong> <span style="color: #16A34A;">${results.passed}</span></p>
        <p><strong>Failed:</strong> <span style="color: #DC2626;">${results.failed}</span></p>
        <p><strong>Success Rate:</strong> ${((results.passed / testCombinations.length) * 100).toFixed(1)}%</p>
      </div>
      
      <h2 style="color: #1B365D;">Detailed Results</h2>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #1B365D; color: white;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Test Case</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Contrast Ratio</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">WCAG AA</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Text Level</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  results.details.forEach(result => {
    const statusColor = result.passesAA ? '#16A34A' : '#DC2626';
    const statusText = result.passesAA ? 'PASS' : 'FAIL';
    
    html += `
      <tr style="border-bottom: 1px solid #E5E5E5;">
        <td style="padding: 12px; border: 1px solid #ddd;">${result.name}</td>
        <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">${result.ratio}:1</td>
        <td style="padding: 12px; border: 1px solid #ddd; color: ${statusColor}; font-weight: bold;">${statusText}</td>
        <td style="padding: 12px; border: 1px solid #ddd; text-transform: capitalize;">${result.level}</td>
      </tr>
    `;
  });
  
  html += `
          </tbody>
        </table>
      </div>
      
      <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1B365D; margin-top: 0;">WCAG AA Standards</h3>
        <ul style="color: #404040; line-height: 1.6;">
          <li><strong>Normal text:</strong> Minimum contrast ratio of 4.5:1</li>
          <li><strong>Large text:</strong> Minimum contrast ratio of 3.0:1</li>
          <li><strong>Large text definition:</strong> 18pt+ or 14pt+ bold</li>
        </ul>
      </div>
    </div>
  `;
  
  return html;
}

// Export for use in development
export { colors, getContrastRatio, checkWCAGCompliance };
