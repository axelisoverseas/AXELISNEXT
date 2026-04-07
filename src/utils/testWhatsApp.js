// WhatsApp Integration Test Utility
import { sendWhatsAppNotification, testWhatsAppConnection } from '../services/whatsappService';

// Test the WhatsApp integration with sample data
export const runWhatsAppTest = async () => {
  console.log('🧪 Starting WhatsApp Integration Test...');
  
  // Format phone number correctly
  const formatPhoneNumber = (number) => {
    if (!number) return null;
    const cleanNumber = number.toString().replace(/\D/g, '');
    if (cleanNumber.length === 10 && cleanNumber.startsWith('9')) {
      return '91' + cleanNumber;
    }
    return cleanNumber.length === 12 ? cleanNumber : '91' + cleanNumber;
  };

  const testLead = {
    fullName: 'Test User - WhatsApp Integration',
    email: 'test@axelisoverseas.com',
    phone: formatPhoneNumber(import.meta.env.VITE_WHATSAPP_NOTIFICATION_NUMBER),
    country: 'Netherlands',
    service: 'University Application Assistance',
    preferredTime: 'Morning (9 AM - 12 PM)',
    trigger: 'manual-test'
  };

  try {
    console.log('📋 Test Lead Data:', testLead);
    console.log('🔑 Environment Variables Check:');
    console.log('- JWT Token:', import.meta.env.VITE_AISENSY_JWT_TOKEN ? '✅ Present' : '❌ Missing');
    console.log('- Notification Number:', import.meta.env.VITE_WHATSAPP_NOTIFICATION_NUMBER || '❌ Missing');
    console.log('- Backup Number:', import.meta.env.VITE_WHATSAPP_BACKUP_NUMBER || '⚠️ Not set');
    console.log('- Client ID:', import.meta.env.VITE_AISENSY_CLIENT_ID || '⚠️ Not set');
    console.log('- Base URL:', import.meta.env.VITE_AISENSY_BASE_URL || '⚠️ Not set');

    const result = await sendWhatsAppNotification(testLead);
    
    if (result.success) {
      console.log('✅ WhatsApp Test PASSED!');
      console.log('📱 Message ID:', result.messageId);
      console.log('🎯 Provider:', result.provider);
      console.log('📞 Destination:', result.destination || 'Unknown');
      
      return {
        success: true,
        message: 'WhatsApp integration is working correctly!',
        details: result
      };
    } else {
      console.log('❌ WhatsApp Test FAILED!');
      console.log('🚨 Error:', result.error);
      console.log('🔄 Fallback Used:', result.fallbackUsed ? 'Yes' : 'No');
      
      return {
        success: false,
        message: 'WhatsApp integration failed, but fallback may have worked',
        details: result
      };
    }
    
  } catch (error) {
    console.error('🔥 WhatsApp Test ERROR:', error);
    return {
      success: false,
      message: 'WhatsApp test encountered an error',
      error: error.message
    };
  }
};

// Test connection only (lighter test)
export const testConnection = async () => {
  console.log('🔗 Testing WhatsApp Connection...');
  
  try {
    const result = await testWhatsAppConnection();
    
    if (result.success) {
      console.log('✅ Connection Test PASSED!');
      return { success: true, message: 'WhatsApp connection is working!' };
    } else {
      console.log('❌ Connection Test FAILED!');
      console.log('Error:', result.error);
      return { success: false, message: 'WhatsApp connection failed', error: result.error };
    }
    
  } catch (error) {
    console.error('🔥 Connection Test ERROR:', error);
    return { success: false, message: 'Connection test error', error: error.message };
  }
};

// Add test button to console (for development)
export const addTestButton = () => {
  if (typeof window !== 'undefined' && import.meta.env.VITE_APP_ENV === 'development') {
    // Add global test functions for easy access in browser console
    window.testWhatsApp = runWhatsAppTest;
    window.testWhatsAppConnection = testConnection;
    
    console.log('🧪 WhatsApp Test Functions Added to Window:');
    console.log('- Run: window.testWhatsApp()');
    console.log('- Test Connection: window.testWhatsAppConnection()');
  }
};

// Environment validation
export const validateEnvironment = () => {
  const required = [
    'VITE_AISENSY_JWT_TOKEN',
    'VITE_WHATSAPP_NOTIFICATION_NUMBER'
  ];
  
  const optional = [
    'VITE_WHATSAPP_BACKUP_NUMBER',
    'VITE_AISENSY_CLIENT_ID',
    'VITE_AISENSY_BASE_URL'
  ];
  
  console.log('🔍 Environment Variables Validation:');
  
  const missing = [];
  const present = [];
  
  required.forEach(key => {
    if (import.meta.env[key]) {
      present.push(key);
      console.log(`✅ ${key}: Present`);
    } else {
      missing.push(key);
      console.log(`❌ ${key}: Missing`);
    }
  });
  
  optional.forEach(key => {
    if (import.meta.env[key]) {
      console.log(`✅ ${key}: Present`);
    } else {
      console.log(`⚠️ ${key}: Not set (optional)`);
    }
  });
  
  return {
    isValid: missing.length === 0,
    missing,
    present,
    message: missing.length === 0 
      ? 'All required environment variables are present' 
      : `Missing required variables: ${missing.join(', ')}`
  };
};

export default {
  runWhatsAppTest,
  testConnection,
  addTestButton,
  validateEnvironment
};
