// Helper function to format phone number correctly
const formatPhoneNumber = (number) => {
  if (!number) return null;

  // Remove all non-digits
  const cleanNumber = number.toString().replace(/\D/g, '');

  // If it's a 10-digit Indian number, add country code
  if (cleanNumber.length === 10 && cleanNumber.startsWith('9')) {
    return '91' + cleanNumber;
  }

  // If it already has country code, return as is
  if (cleanNumber.length === 12 && cleanNumber.startsWith('91')) {
    return cleanNumber;
  }

  // For other cases, assume it needs 91 prefix
  return '91' + cleanNumber;
};

// Open WhatsApp chat for user
export const openWhatsAppChat = (leadData) => {
  try {
    console.log('📱 Opening WhatsApp chat for user with lead data:', leadData);

    // Axelis Overseas WhatsApp number
    const whatsappNumber = '919999878398'; // Your business WhatsApp number

    // Create pre-filled message with lead data
    const message = `Hi! I'm interested in studying abroad.

📋 My Details:
• Name: ${leadData.fullName || 'Not provided'}
• Email: ${leadData.email || 'Not provided'}
• Phone: ${leadData.phone || 'Not provided'}
• Country of Interest: ${leadData.country || 'Not provided'}
• Service Needed: ${leadData.service || 'Not provided'}
• Preferred Call Time: ${leadData.preferredTime || 'Not provided'}

${leadData.message ? `Additional Message: ${leadData.message}` : ''}

I would like to discuss my study abroad options. Thank you!`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    console.log('🔗 WhatsApp URL:', whatsappUrl);

    // Open WhatsApp in new tab
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (newWindow) {
      console.log('✅ WhatsApp chat opened successfully');
      return {
        success: true,
        url: whatsappUrl,
        number: whatsappNumber
      };
    } else {
      throw new Error('Failed to open WhatsApp - popup blocked?');
    }

  } catch (error) {
    console.error('❌ Failed to open WhatsApp chat:', error);

    // Fallback - try basic WhatsApp URL
    try {
      const fallbackUrl = 'https://wa.me/919999878398';
      window.open(fallbackUrl, '_blank');
      return {
        success: false,
        error: error.message,
        fallbackUsed: true,
        url: fallbackUrl
      };
    } catch (fallbackError) {
      console.error('❌ Even WhatsApp fallback failed:', fallbackError);
      return {
        success: false,
        error: error.message,
        fallbackError: fallbackError.message
      };
    }
  }
};

// AiSensy WhatsApp Business API service with updated credentials
export const sendWhatsAppNotification = async (leadData) => {
  try {
    console.log('🚀 Sending WhatsApp notification via AiSensy for lead:', leadData.fullName);

    // Format phone numbers correctly
    const notificationNumber = formatPhoneNumber(import.meta.env.VITE_WHATSAPP_NOTIFICATION_NUMBER);
    const backupNumber = formatPhoneNumber(import.meta.env.VITE_WHATSAPP_BACKUP_NUMBER);

    console.log('📱 Formatted notification number:', notificationNumber);
    console.log('📱 Formatted backup number:', backupNumber);

    // Enhanced lead data with environment variables
    const enhancedLeadData = {
      ...leadData,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent.substring(0, 100),
      referrer: document.referrer || 'Direct',
      // Add environment config with formatted numbers
      notificationNumber: notificationNumber,
      backupNumber: backupNumber,
      jwtToken: import.meta.env.VITE_AISENSY_JWT_TOKEN
    };

    const response = await fetch('/api/whatsapp-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_AISENSY_JWT_TOKEN}`,
        'X-AiSensy-Client-Id': import.meta.env.VITE_AISENSY_CLIENT_ID
      },
      body: JSON.stringify({
        leadData: enhancedLeadData
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ AiSensy WhatsApp notification sent successfully:', result);
      return {
        success: true,
        messageId: result.messageId,
        message: result.message,
        provider: 'AiSensy',
        timestamp: new Date().toISOString()
      };
    } else {
      console.error('❌ AiSensy API failed:', result);

      // Enhanced fallback with new number
      const fallbackMessage = `🚨 NEW LEAD - AXELIS OVERSEAS 🚨

👤 Name: ${leadData.fullName}
📧 Email: ${leadData.email}
📱 Phone: ${leadData.phone}
🌍 Country: ${leadData.country}
🎓 Service: ${leadData.service}
⏰ Preferred Time: ${leadData.preferredTime}

📅 Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🌐 Source: Website Lead Form

Please contact ASAP! 💪`;

      const whatsappWebUrl = `https://wa.me/${notificationNumber}?text=${encodeURIComponent(fallbackMessage)}`;

      // Open in new tab as fallback
      window.open(whatsappWebUrl, '_blank');

      return {
        success: false,
        error: result.error || 'AiSensy API failed',
        fallbackUsed: true,
        provider: 'AiSensy',
        fallbackUrl: whatsappWebUrl
      };
    }

  } catch (error) {
    console.error('🔥 AiSensy WhatsApp service error:', error);

    // Enhanced fallback with new environment variables
    const fallbackMessage = `🚨 NEW LEAD - AXELIS OVERSEAS 🚨

👤 Name: ${leadData.fullName}
📧 Email: ${leadData.email}
📱 Phone: ${leadData.phone}
🌍 Country: ${leadData.country}

📅 Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🌐 Source: Website Lead Form

System Error - Please contact immediately! 🚨`;

    const whatsappWebUrl = `https://wa.me/${notificationNumber}?text=${encodeURIComponent(fallbackMessage)}`;
    window.open(whatsappWebUrl, '_blank');

    return {
      success: false,
      error: error.message,
      fallbackUsed: true,
      provider: 'AiSensy',
      fallbackUrl: whatsappWebUrl
    };
  }
};

// Test AiSensy WhatsApp API connection with new credentials
export const testWhatsAppConnection = async () => {
  try {
    const testLead = {
      fullName: 'AiSensy API Test User',
      email: 'test@axelisoverseas.com',
      phone: formatPhoneNumber(import.meta.env.VITE_WHATSAPP_NOTIFICATION_NUMBER),
      country: 'India',
      service: 'AiSensy WhatsApp API Connection Test',
      preferredTime: 'Now',
      source: 'API Connection Test'
    };

    console.log('🧪 Testing WhatsApp connection with new credentials...');
    const result = await sendWhatsAppNotification(testLead);

    if (result.success) {
      console.log('✅ WhatsApp connection test successful!');
    } else {
      console.log('❌ WhatsApp connection test failed:', result.error);
    }

    return result;
  } catch (error) {
    console.error('AiSensy WhatsApp test failed:', error);
    return {
      success: false,
      error: error.message,
      provider: 'AiSensy',
      timestamp: new Date().toISOString()
    };
  }
};

// Send direct message via AiSensy
export const sendDirectMessage = async (phoneNumber, message) => {
  try {
    const response = await fetch('/api/whatsapp-direct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: phoneNumber,
        message: message
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Direct message failed:', error);
    return { success: false, error: error.message };
  }
};

export default {
  sendWhatsAppNotification,
  testWhatsAppConnection,
  sendDirectMessage
};