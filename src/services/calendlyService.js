// Calendly API Integration Service
// Documentation: https://developer.calendly.com/how-to-display-the-scheduling-page-for-users-of-your-app

const CALENDLY_CONFIG = {
  // Personal Access Token
  accessToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzU1NDU3MzE3LCJqdGkiOiIyYzEzOTI1ZC1kNTgyLTQyMmUtYmZhNC03MjViMTFkOWZiNDAiLCJ1c2VyX3V1aWQiOiI3ZDg3NWFhYS05YTJlLTQ1MWEtOGZmYy04YmMzOTc0N2VmZGIifQ.EKdjabrDeBtlf_4j8zxQDnSjmUcf2W8S0JLY27b65D0OZYYNYWeoKrd2knUf9wny11JU4iLhI_4joncplKApKw',
  
  // API Base URL
  apiBaseUrl: 'https://api.calendly.com',
  
  // User UUID (extracted from token)
  userUuid: '7d875aaa-9a2e-451a-8ffc-8bc39747efdb',
  
  // Default scheduling page URL (will be fetched dynamically)
  defaultSchedulingUrl: 'https://calendly.com/axelisoverseas/counsellingsession'
};

// Get user information
export const getCalendlyUser = async () => {
  try {
    console.log('📅 Fetching Calendly user information...');
    
    const response = await fetch(`${CALENDLY_CONFIG.apiBaseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CALENDLY_CONFIG.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Calendly API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Calendly user data:', data);
    
    return {
      success: true,
      user: data.resource,
      schedulingUrl: data.resource.scheduling_url
    };
    
  } catch (error) {
    console.error('❌ Failed to fetch Calendly user:', error);
    return {
      success: false,
      error: error.message,
      fallbackUrl: CALENDLY_CONFIG.defaultSchedulingUrl
    };
  }
};

// Get event types for the user
export const getCalendlyEventTypes = async () => {
  try {
    console.log('📅 Fetching Calendly event types...');
    
    const userUri = `https://api.calendly.com/users/${CALENDLY_CONFIG.userUuid}`;
    
    const response = await fetch(`${CALENDLY_CONFIG.apiBaseUrl}/event_types?user=${encodeURIComponent(userUri)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CALENDLY_CONFIG.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Calendly API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Calendly event types:', data);
    
    return {
      success: true,
      eventTypes: data.collection,
      count: data.collection.length
    };
    
  } catch (error) {
    console.error('❌ Failed to fetch Calendly event types:', error);
    return {
      success: false,
      error: error.message,
      eventTypes: []
    };
  }
};

// Get the primary scheduling URL
export const getSchedulingUrl = async (eventTypeName = null) => {
  return {
    success: true,
    url: CALENDLY_CONFIG.defaultSchedulingUrl,
    source: 'hardcoded'
  };
};

// Open Calendly scheduling page
export const openCalendlyScheduling = async (leadData = null, eventTypeName = null) => {
  try {
    console.log('📅 Opening Calendly scheduling...', { leadData, eventTypeName });
    
    // Get the appropriate scheduling URL
    const urlResult = await getSchedulingUrl(eventTypeName);
    let schedulingUrl = urlResult.url;
    
    // Add prefill parameters if lead data is provided
    if (leadData) {
      const params = new URLSearchParams();
      
      // Calendly prefill parameters
      if (leadData.fullName) {
        params.append('name', leadData.fullName);
      }
      if (leadData.email) {
        params.append('email', leadData.email);
      }
      if (leadData.phone) {
        params.append('phone', leadData.phone);
      }
      
      // Add custom fields if available
      if (leadData.country) {
        params.append('a1', leadData.country); // Custom field 1
      }
      if (leadData.service) {
        params.append('a2', leadData.service); // Custom field 2
      }
      
      // Append parameters to URL
      if (params.toString()) {
        schedulingUrl += (schedulingUrl.includes('?') ? '&' : '?') + params.toString();
      }
    }
    
    console.log('🔗 Final scheduling URL:', schedulingUrl);
    
    // Open in new tab
    const newWindow = window.open(schedulingUrl, '_blank', 'noopener,noreferrer');
    
    if (newWindow) {
      console.log('✅ Calendly scheduling page opened successfully');
      return {
        success: true,
        url: schedulingUrl,
        source: urlResult.source
      };
    } else {
      throw new Error('Failed to open new window - popup blocked?');
    }
    
  } catch (error) {
    console.error('❌ Failed to open Calendly scheduling:', error);
    
    // Emergency fallback - try default URL
    try {
      window.open(CALENDLY_CONFIG.defaultSchedulingUrl, '_blank');
      return {
        success: false,
        error: error.message,
        fallbackUsed: true,
        url: CALENDLY_CONFIG.defaultSchedulingUrl
      };
    } catch (fallbackError) {
      console.error('❌ Even fallback failed:', fallbackError);
      return {
        success: false,
        error: error.message,
        fallbackError: fallbackError.message
      };
    }
  }
};

// Embed Calendly widget inline
export const embedCalendlyWidget = (containerId, leadData = null, eventTypeName = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('📅 Embedding Calendly widget...', { containerId, leadData, eventTypeName });
      
      // Get scheduling URL
      const urlResult = await getSchedulingUrl(eventTypeName);
      let schedulingUrl = urlResult.url;
      
      // Add prefill parameters
      if (leadData) {
        const params = new URLSearchParams();
        if (leadData.fullName) params.append('name', leadData.fullName);
        if (leadData.email) params.append('email', leadData.email);
        if (leadData.phone) params.append('phone', leadData.phone);
        if (leadData.country) params.append('a1', leadData.country);
        if (leadData.service) params.append('a2', leadData.service);
        
        if (params.toString()) {
          schedulingUrl += (schedulingUrl.includes('?') ? '&' : '?') + params.toString();
        }
      }
      
      // Load Calendly embed script if not already loaded
      if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          initializeWidget();
        };
        script.onerror = () => {
          reject(new Error('Failed to load Calendly script'));
        };
        document.head.appendChild(script);
      } else {
        initializeWidget();
      }
      
      function initializeWidget() {
        try {
          window.Calendly.initInlineWidget({
            url: schedulingUrl,
            parentElement: document.getElementById(containerId),
            prefill: leadData ? {
              name: leadData.fullName,
              email: leadData.email,
              customAnswers: {
                a1: leadData.country,
                a2: leadData.service
              }
            } : {}
          });
          
          console.log('✅ Calendly widget embedded successfully');
          resolve({
            success: true,
            url: schedulingUrl,
            containerId: containerId
          });
          
        } catch (embedError) {
          console.error('❌ Failed to embed Calendly widget:', embedError);
          reject(embedError);
        }
      }
      
    } catch (error) {
      console.error('❌ Failed to embed Calendly widget:', error);
      reject(error);
    }
  });
};

// Test Calendly API connection
export const testCalendlyConnection = async () => {
  try {
    console.log('🧪 Testing Calendly API connection...');
    
    const userResult = await getCalendlyUser();
    const eventTypesResult = await getCalendlyEventTypes();
    
    return {
      success: userResult.success && eventTypesResult.success,
      user: userResult.success ? userResult.user : null,
      eventTypes: eventTypesResult.success ? eventTypesResult.eventTypes : [],
      errors: {
        user: userResult.success ? null : userResult.error,
        eventTypes: eventTypesResult.success ? null : eventTypesResult.error
      }
    };
    
  } catch (error) {
    console.error('❌ Calendly connection test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  getCalendlyUser,
  getCalendlyEventTypes,
  getSchedulingUrl,
  openCalendlyScheduling,
  embedCalendlyWidget,
  testCalendlyConnection
};
