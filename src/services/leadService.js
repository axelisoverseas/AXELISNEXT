// Lead management service - using mock service for development
import {
  storeLead as mockStoreLead,
  getLeads as mockGetLeads,
  updateLeadStatus as mockUpdateLeadStatus,
  getLeadAnalytics as mockGetLeadAnalytics
} from './mockLeadService';
import { sendLeadNotificationEmail } from './emailNotificationService';

export const storeLead = async (leadData) => {
  try {
    console.log('💾 Storing lead using mock service:', leadData.fullName);

    // Add additional metadata
    const enrichedData = {
      ...leadData,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent.substring(0, 200),
      referrer: document.referrer || 'Direct'
    };

    // Use mock service for local tracking
    const result = await mockStoreLead(enrichedData);
    
    // Fire Google Sheets Webhook (Async)
    const googleSheetWebhookUrl = 'https://script.google.com/macros/s/AKfycbwqjbEODqnCsiGugbDQQpPBflufOgG7pT_jCNAMclWZBG-GTteZQIT2V17z9eEcTywJ2w/exec';
    
    // We fire this catch-less so the UI doesn't hang if Google is slow
    fetch(googleSheetWebhookUrl, {
      method: 'POST',
      mode: 'no-cors', // Standard for Google Apps Script Webhooks
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedData)
    }).then(() => {
      console.log('📡 Lead successfully routed to Google Sheets');
    }).catch(err => {
      console.error('⚠️ Google Sheets routing failed:', err);
    });

    // Fire EmailJS Notification (Secondary layer)

    // If lead storage is successful, send email notification
    if (result.success) {
      console.log('📧 Sending email notification for lead:', leadData.fullName);
      try {
        await sendLeadNotificationEmail(enrichedData);
        console.log('✅ Email notification sent successfully');
      } catch (emailError) {
        console.error('⚠️ Email notification failed:', emailError);
        // Don't fail the entire lead storage if email fails
      }
    }

    return result;

  } catch (error) {
    console.error('🔥 Lead storage error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const getLeads = async (page = 1, limit = 20, filters = {}) => {
  try {
    return await mockGetLeads(page, limit, filters);
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

export const updateLeadStatus = async (leadId, status, notes = '') => {
  try {
    return await mockUpdateLeadStatus(leadId, status, notes);
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }
};

export const getLeadAnalytics = async (days = 30) => {
  try {
    return await mockGetLeadAnalytics(days);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export default {
  storeLead,
  getLeads,
  updateLeadStatus,
  getLeadAnalytics
};