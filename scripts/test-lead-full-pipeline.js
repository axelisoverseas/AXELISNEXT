const fetch = require('node-fetch');

async function testFullLeadStack() {
  console.log('🧪 Starting Full Lead Pipeline Test...');
  
  const testLead = {
    fullName: 'Test Lead via AI Assistant',
    email: 'test-ai@axelis.com',
    phone: '+91 8970224250',
    country: 'Canada',
    service: 'AI Verification Service',
    message: 'Testing the automated email notification and sheet connection.',
    source: 'ai_verification_script',
    timestamp: new Date().toISOString()
  };

  const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwqjbEODqnCsiGugbDQQpPBflufOgG7pT_jCNAMclWZBG-GTteZQIT2V17z9eEcTywJ2w/exec';

  console.log('📤 Routing lead to Google Sheets...');
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(testLead)
    });
    
    console.log('✅ Sheet Routing Triggered.');
    console.log('📬 IMPORTANT: If you have already added the Apps Script code, you should receive an email shortly at axelisoverseas@overseeducation.com');
  } catch (err) {
    console.error('❌ Pipeline Error:', err);
  }
}

testFullLeadStack();
