// Email notification service using EmailJS
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  publicKey: '_Y2YfJoBjHfDtgRvC', // Your actual public key
  serviceId: 'service_9rwmia6', // Primary service ID (info service removed - will be CC'd from dashboard)
  templateId: 'template_mx98j9h', // Your actual template ID
  // Email recipient
  fallbackEmail: 'axelisoverseas@overseeducation.com'
};

// Initialize EmailJS
const initializeEmailJS = () => {
  try {
    if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      console.log('📧 EmailJS initialized successfully');
      return true;
    } else {
      console.warn('⚠️ EmailJS public key not configured - using fallback logging');
      return false;
    }
  } catch (error) {
    console.error('❌ EmailJS initialization failed:', error);
    return false;
  }
};

// Format lead data for email template
const formatLeadDataForEmail = (leadData) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      return dateString || 'Not provided';
    }
  };

  return {
    // Lead Information
    lead_name: leadData.fullName || 'Not provided',
    lead_email: leadData.email || 'Not provided',
    lead_phone: leadData.phone || 'Not provided',
    lead_country: leadData.country || 'Not provided',
    lead_service: leadData.service || 'Not provided',
    lead_preferred_time: leadData.preferredTime || 'Not provided',
    lead_message: leadData.message || 'No additional message',
    
    // Source Information
    lead_source: leadData.source || 'website',
    lead_trigger: leadData.trigger || 'form',
    lead_page: leadData.page || 'Unknown page',
    
    // Timestamp
    submission_time: formatDate(leadData.timestamp),
    
    // Technical Information
    user_agent: leadData.userAgent ? leadData.userAgent.substring(0, 100) + '...' : 'Not available',
    referrer: leadData.referrer || 'Direct',
    
    // Email Recipient
    to_email: EMAILJS_CONFIG.fallbackEmail,
    
    // Email Subject
    email_subject: `🚨 New Lead Alert: ${leadData.fullName || 'Unknown'} - ${leadData.country || 'Unknown Country'}`,
    
    // Company Information
    company_name: 'Axelis Overseas',
    website_url: 'https://overseeducation.com'
  };
};

// Send lead notification email
export const sendLeadNotificationEmail = async (leadData) => {
  try {
    console.log('📧 Preparing to send lead notification email for:', leadData.fullName);
    
    const isEmailJSConfigured = initializeEmailJS();
    const emailTemplateData = formatLeadDataForEmail(leadData);
    
    if (isEmailJSConfigured) {
      // Send email via EmailJS
      console.log('📤 Sending email via EmailJS...');

      try {
        console.log('📧 Sending to primary service:', EMAILJS_CONFIG.serviceId);
        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          emailTemplateData,
          EMAILJS_CONFIG.publicKey
        );

        console.log('✅ Lead notification email sent successfully:', response);
        return {
          success: true,
          method: 'emailjs',
          response: response,
          recipient: EMAILJS_CONFIG.fallbackEmail
        };

      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        throw new Error('Email service failed: ' + emailError.message);
      }
      
    } else {
      // Fallback: Log email details for development
      console.log('📧 EmailJS not configured - logging email details:');
      console.log('📧 Email Template Data:', emailTemplateData);
      
      // Show browser notification for development
      if (typeof window !== 'undefined' && window.Notification) {
        try {
          if (Notification.permission === 'granted') {
            new Notification('New Lead Received!', {
              body: `${leadData.fullName} from ${leadData.country}`,
              icon: '/favicon.ico'
            });
          } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
              new Notification('New Lead Received!', {
                body: `${leadData.fullName} from ${leadData.country}`,
                icon: '/favicon.ico'
              });
            }
          }
        } catch (notificationError) {
          console.log('Browser notifications not available:', notificationError);
        }
      }
      
      return {
        success: true,
        method: 'fallback_logging',
        message: 'Email details logged to console (EmailJS not configured)'
      };
    }
    
  } catch (error) {
    console.error('❌ Failed to send lead notification email:', error);
    
    // Emergency fallback - at least log the lead
    console.error('🚨 CRITICAL: New lead received but email failed!');
    console.error('🚨 Lead Details:', {
      name: leadData.fullName,
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country,
      service: leadData.service,
      timestamp: leadData.timestamp
    });
    
    return {
      success: false,
      error: error.message,
      leadData: leadData
    };
  }
};

// Test email notification function
export const testEmailNotification = async () => {
  const testLead = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    country: 'Test Country',
    service: 'Test Service',
    preferredTime: 'Anytime',
    message: 'This is a test lead for email notification',
    source: 'admin_test',
    trigger: 'test',
    page: '/admin',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: 'Direct'
  };

  console.log('🧪 Testing email notification with test lead...');
  return await sendLeadNotificationEmail(testLead);
};

// Generate 5 test emails with different scenarios
export const generateFiveTestEmails = async () => {
  console.log('🧪 Generating 5 test emails...');

  const testLeads = [
    {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0101',
      country: 'Netherlands',
      service: 'University Application',
      preferredTime: 'Morning (9 AM - 12 PM)',
      message: 'I want to study Computer Science in Netherlands. Please help me with university applications.',
      source: 'cta_button',
      trigger: 'homepage_cta',
      page: '/',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: 'https://google.com'
    },
    {
      fullName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+44-20-7946-0958',
      country: 'Germany',
      service: 'Scholarship Assistance',
      preferredTime: 'Afternoon (12 PM - 5 PM)',
      message: 'Looking for scholarship opportunities for Masters in Engineering in Germany.',
      source: 'contact_form',
      trigger: 'contact_form_submission',
      page: '/contact',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: 'Direct'
    },
    {
      fullName: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+1-416-555-0199',
      country: 'Canada',
      service: 'Visa Guidance',
      preferredTime: 'Evening (5 PM - 8 PM)',
      message: 'Need help with student visa application for Canada. What documents are required?',
      source: 'whatsapp_widget',
      trigger: 'predefined_message',
      page: '/services/visa-guidance',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: 'https://facebook.com'
    },
    {
      fullName: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '+61-2-9876-5432',
      country: 'Australia',
      service: 'Complete Study Abroad Package',
      preferredTime: 'Anytime',
      message: 'I need complete assistance for studying in Australia - from university selection to visa.',
      source: 'exit_intent_modal',
      trigger: 'exit_intent',
      page: '/about',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: 'https://linkedin.com'
    },
    {
      fullName: 'David Rodriguez',
      email: 'david.r@example.com',
      phone: '+34-91-123-4567',
      country: 'United Kingdom',
      service: 'Education Loans',
      preferredTime: 'Morning (9 AM - 12 PM)',
      message: 'Need information about education loans for studying MBA in UK. What are the options?',
      source: 'timed_modal',
      trigger: 'timed_popup',
      page: '/services/education-loans',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: 'https://instagram.com'
    }
  ];

  const results = [];

  for (let i = 0; i < testLeads.length; i++) {
    const lead = testLeads[i];
    console.log(`📧 Sending test email ${i + 1}/5 for ${lead.fullName}...`);

    try {
      // Add a small delay between emails to avoid rate limiting
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      }

      const result = await sendLeadNotificationEmail(lead);
      results.push({
        leadName: lead.fullName,
        success: result.success,
        result: result
      });

      console.log(`✅ Test email ${i + 1} sent for ${lead.fullName}`);
    } catch (error) {
      console.error(`❌ Test email ${i + 1} failed for ${lead.fullName}:`, error);
      results.push({
        leadName: lead.fullName,
        success: false,
        error: error.message
      });
    }
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`🎉 Test email batch complete: ${successCount}/5 emails sent successfully`);

  return {
    success: successCount > 0,
    totalSent: successCount,
    totalAttempted: 5,
    results: results
  };
};

// Configuration helper
export const updateEmailJSConfig = (config) => {
  Object.assign(EMAILJS_CONFIG, config);
  console.log('📧 EmailJS configuration updated:', EMAILJS_CONFIG);
};

// Update template ID if different from default
export const updateTemplateId = (templateId) => {
  EMAILJS_CONFIG.templateId = templateId;
  console.log('📧 Template ID updated to:', templateId);
};

// Get current configuration (for admin panel)
export const getEmailJSConfig = () => {
  return {
    ...EMAILJS_CONFIG,
    publicKey: EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY' ? 'Not configured' : 'Configured',
    serviceId: EMAILJS_CONFIG.serviceId, // Show actual service ID
    templateId: EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID' ? 'Not configured' : 'Configured',
    serviceConfigured: true, // Service ID is configured
    recipient: EMAILJS_CONFIG.fallbackEmail
  };
};

export default {
  sendLeadNotificationEmail,
  testEmailNotification,
  updateEmailJSConfig,
  getEmailJSConfig
};
