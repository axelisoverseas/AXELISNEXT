// Quick EmailJS Test Utility
import emailjs from '@emailjs/browser';

// Test EmailJS configuration
export const quickEmailTest = async () => {
  console.log('🧪 Quick EmailJS Configuration Test...');
  
  const config = {
    publicKey: '_Y2YfJoBjHfDtgRvC',
    axelisServiceId: 'service_9rwmia6',
    infoServiceId: 'service_kekkssd',
    templateId: 'template_mx98j9h'
  };
  
  try {
    // Initialize EmailJS
    emailjs.init(config.publicKey);
    console.log('✅ EmailJS initialized with public key:', config.publicKey);
    
    // Test data
    const testData = {
      email_subject: '🧪 EmailJS Configuration Test - Axelis Overseas',
      lead_name: 'Test Configuration',
      lead_email: 'test@example.com',
      lead_phone: '+1-555-TEST',
      lead_country: 'Test Country',
      lead_service: 'Configuration Test',
      lead_preferred_time: 'Anytime',
      lead_message: 'This is a configuration test to verify EmailJS setup is working correctly.',
      lead_source: 'configuration_test',
      lead_trigger: 'admin_test',
      lead_page: '/admin',
      submission_time: new Date().toLocaleString(),
      referrer: 'Direct',
      company_name: 'Axelis Overseas',
      website_url: 'https://overseeducation.com',
      to_email: 'axelisoverseas@overseeducation.com',
      cc_email: 'info@overseeducation.com'
    };
    
    console.log('📧 Testing Axelis service:', config.axelisServiceId);
    const axelisResult = await emailjs.send(
      config.axelisServiceId,
      config.templateId,
      testData,
      config.publicKey
    );
    
    console.log('✅ Axelis service test result:', axelisResult);
    
    // Small delay before second email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('📧 Testing Info service:', config.infoServiceId);
    const infoResult = await emailjs.send(
      config.infoServiceId,
      config.templateId,
      testData,
      config.publicKey
    );
    
    console.log('✅ Info service test result:', infoResult);
    
    return {
      success: true,
      axelisResult,
      infoResult,
      message: 'Both services tested successfully!'
    };
    
  } catch (error) {
    console.error('❌ EmailJS test failed:', error);
    return {
      success: false,
      error: error.message,
      details: error
    };
  }
};

// Run test from browser console
if (typeof window !== 'undefined') {
  window.testEmailJS = quickEmailTest;
  console.log('🧪 EmailJS test function available as window.testEmailJS()');
}
