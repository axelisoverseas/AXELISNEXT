// Test WhatsApp Integration by sending a real message
import { sendWhatsAppNotification } from '../services/whatsappService';

export const sendTestMessage = async () => {
  console.log('🧪 Sending Test WhatsApp Message...');
  
  const testLead = {
    fullName: 'Test User - WhatsApp Integration Check',
    email: 'test@axelisoverseas.com',
    phone: '918970224250',
    country: 'Netherlands',
    service: 'WhatsApp Integration Test',
    preferredTime: 'Now - Testing',
    trigger: 'manual-test',
    source: 'Integration Test'
  };

  try {
    console.log('📋 Test Lead Data:', testLead);
    console.log('📱 Target Number: 918970224250');
    console.log('🔑 Environment Check:');
    console.log('- JWT Token:', import.meta.env.VITE_AISENSY_JWT_TOKEN ? '✅ Present' : '❌ Missing');
    console.log('- Phone Number:', import.meta.env.VITE_WHATSAPP_NOTIFICATION_NUMBER || '❌ Missing');
    console.log('- Base URL:', import.meta.env.VITE_AISENSY_BASE_URL || '❌ Missing');

    const result = await sendWhatsAppNotification(testLead);
    
    if (result.success) {
      console.log('✅ TEST MESSAGE SENT SUCCESSFULLY!');
      console.log('📱 Message ID:', result.messageId);
      console.log('🎯 Provider:', result.provider);
      console.log('📞 Destination:', result.destination);
      console.log('⏰ Timestamp:', result.timestamp);
      
      alert('✅ Test message sent successfully! Check your WhatsApp (918970224250)');
      
      return {
        success: true,
        message: 'Test WhatsApp message sent successfully!',
        details: result
      };
    } else {
      console.log('❌ TEST MESSAGE FAILED!');
      console.log('🚨 Error:', result.error);
      console.log('🔄 Fallback Used:', result.fallbackUsed ? 'Yes' : 'No');
      console.log('🔗 Fallback URL:', result.fallbackUrl);
      
      if (result.fallbackUsed) {
        alert('⚠️ API failed but WhatsApp Web opened as fallback. Check if WhatsApp Web opened with the message.');
      } else {
        alert('❌ Test message failed: ' + result.error);
      }
      
      return {
        success: false,
        message: 'Test message failed but fallback may have worked',
        details: result
      };
    }
    
  } catch (error) {
    console.error('🔥 TEST ERROR:', error);
    alert('🔥 Test error: ' + error.message);
    
    return {
      success: false,
      message: 'Test encountered an error',
      error: error.message
    };
  }
};

// Direct API test
export const testAPIDirectly = async () => {
  console.log('🔧 Testing API Directly...');
  
  const testData = {
    fullName: 'Direct API Test',
    email: 'api-test@axelisoverseas.com',
    phone: '918970224250',
    country: 'India',
    service: 'Direct API Test',
    preferredTime: 'Now',
    notificationNumber: '918970224250',
    jwtToken: import.meta.env.VITE_AISENSY_JWT_TOKEN
  };

  try {
    const response = await fetch('/api/whatsapp-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_AISENSY_JWT_TOKEN}`,
      },
      body: JSON.stringify({ leadData: testData })
    });

    const result = await response.json();
    
    console.log('📡 API Response Status:', response.status);
    console.log('📡 API Response:', result);
    
    if (response.ok && result.success) {
      console.log('✅ DIRECT API TEST SUCCESSFUL!');
      alert('✅ Direct API test successful! Check WhatsApp (918970224250)');
      return { success: true, data: result };
    } else {
      console.log('❌ DIRECT API TEST FAILED!');
      alert('❌ Direct API test failed: ' + (result.error || 'Unknown error'));
      return { success: false, error: result.error || 'API call failed' };
    }
    
  } catch (error) {
    console.error('🔥 DIRECT API ERROR:', error);
    alert('🔥 Direct API error: ' + error.message);
    return { success: false, error: error.message };
  }
};

// Add to window for easy testing
if (typeof window !== 'undefined') {
  window.sendTestMessage = sendTestMessage;
  window.testAPIDirectly = testAPIDirectly;
  
  console.log('🧪 Test Functions Available:');
  console.log('- window.sendTestMessage() - Full integration test');
  console.log('- window.testAPIDirectly() - Direct API test');
}

export default {
  sendTestMessage,
  testAPIDirectly
};
