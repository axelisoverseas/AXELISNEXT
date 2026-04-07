// Mock Lead Service for Development (Client-side storage)
// This simulates a backend API using localStorage

const STORAGE_KEY = 'axelis_leads_db';
const ANALYTICS_KEY = 'axelis_analytics_db';

// Initialize mock data
const initializeMockData = () => {
  console.log('🔧 Initializing mock lead data...');

  if (!localStorage.getItem(STORAGE_KEY)) {
    console.log('📦 Creating initial mock leads...');
    const mockLeads = [
      {
        id: 1,
        full_name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        country: 'Netherlands',
        service: 'University Application',
        preferred_time: 'Morning (9 AM - 12 PM)',
        status: 'new',
        source: 'website',
        trigger_type: 'cta',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        full_name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9876543211',
        country: 'Germany',
        service: 'Scholarship Assistance',
        preferred_time: 'Afternoon (12 PM - 5 PM)',
        status: 'contacted',
        source: 'website',
        trigger_type: 'widget',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockLeads));
    console.log('✅ Mock leads created:', mockLeads.length, 'leads');
  } else {
    const existingLeads = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log('📋 Found existing leads:', existingLeads.length, 'leads');
  }
};

// Get all leads from localStorage
const getLeadsFromStorage = () => {
  initializeMockData();
  const leads = localStorage.getItem(STORAGE_KEY);
  return leads ? JSON.parse(leads) : [];
};

// Save leads to localStorage
const saveLeadsToStorage = (leads) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
};

// Generate next ID
const getNextId = () => {
  const leads = getLeadsFromStorage();
  return leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1;
};

// Store lead (simulates API call)
export const storeLead = async (leadData) => {
  try {
    console.log('💾 Storing lead in mock database:', leadData.fullName);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate required fields
    if (!leadData.fullName || !leadData.email || !leadData.phone) {
      throw new Error('Missing required fields: fullName, email, phone');
    }

    const leads = getLeadsFromStorage();
    const newLead = {
      id: getNextId(),
      full_name: leadData.fullName,
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country || 'Not specified',
      service: leadData.service || 'General Inquiry',
      preferred_time: leadData.preferredTime || 'Anytime',
      message: leadData.message || null,
      status: 'new',
      source: leadData.source || 'website',
      trigger_type: leadData.trigger || 'form',
      utm_source: leadData.utmSource || null,
      utm_medium: leadData.utmMedium || null,
      utm_campaign: leadData.utmCampaign || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    leads.unshift(newLead); // Add to beginning
    saveLeadsToStorage(leads);

    console.log('✅ Lead stored successfully with ID:', newLead.id);

    return {
      success: true,
      leadId: newLead.id,
      message: 'Lead stored successfully'
    };

  } catch (error) {
    console.error('❌ Failed to store lead:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get leads with pagination and filters
export const getLeads = async (page = 1, limit = 20, filters = {}) => {
  try {
    console.log('📋 Fetching leads from mock database');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let leads = getLeadsFromStorage();

    // Apply filters
    if (filters.status) {
      leads = leads.filter(lead => lead.status === filters.status);
    }
    if (filters.country) {
      leads = leads.filter(lead => lead.country === filters.country);
    }
    if (filters.dateFrom) {
      leads = leads.filter(lead => 
        new Date(lead.created_at) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      leads = leads.filter(lead => 
        new Date(lead.created_at) <= new Date(filters.dateTo)
      );
    }

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedLeads = leads.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedLeads,
      pagination: {
        total: leads.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(leads.length / parseInt(limit))
      }
    };

  } catch (error) {
    console.error('❌ Failed to fetch leads:', error);
    throw error;
  }
};

// Update lead status
export const updateLeadStatus = async (leadId, status, notes = '') => {
  try {
    console.log('📝 Updating lead status:', leadId, status);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const leads = getLeadsFromStorage();
    const leadIndex = leads.findIndex(l => l.id === parseInt(leadId));

    if (leadIndex === -1) {
      throw new Error('Lead not found');
    }

    leads[leadIndex] = {
      ...leads[leadIndex],
      status,
      notes: notes || leads[leadIndex].notes,
      updated_at: new Date().toISOString()
    };

    saveLeadsToStorage(leads);

    console.log('✅ Lead status updated successfully');

    return {
      success: true,
      message: 'Lead status updated successfully'
    };

  } catch (error) {
    console.error('❌ Failed to update lead status:', error);
    throw error;
  }
};

// Get analytics data
export const getLeadAnalytics = async (days = 30) => {
  try {
    console.log('📊 Fetching analytics from mock database');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const leads = getLeadsFromStorage();
    const total = leads.length;

    // Recent leads (last X days)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const recent = leads.filter(lead => 
      new Date(lead.created_at) >= cutoffDate
    ).length;

    // Status distribution
    const statusData = leads.reduce((acc, lead) => {
      const status = lead.status || 'new';
      const existing = acc.find(item => item.status === status);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ status, count: 1 });
      }
      return acc;
    }, []);

    // Country distribution
    const countryData = leads.reduce((acc, lead) => {
      const country = lead.country || 'Unknown';
      const existing = acc.find(item => item.country === country);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ country, count: 1 });
      }
      return acc;
    }, []).slice(0, 10);

    // Daily data for the last 30 days
    const dailyData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = leads.filter(lead => 
        lead.created_at.split('T')[0] === dateStr
      ).length;
      
      dailyData.push({ date: dateStr, count });
    }

    const analytics = {
      total,
      recent,
      statusData,
      countryData,
      dailyData
    };

    console.log('✅ Analytics fetched successfully:', analytics);

    return analytics;

  } catch (error) {
    console.error('❌ Failed to fetch analytics:', error);
    throw error;
  }
};

export default {
  storeLead,
  getLeads,
  updateLeadStatus,
  getLeadAnalytics
};
