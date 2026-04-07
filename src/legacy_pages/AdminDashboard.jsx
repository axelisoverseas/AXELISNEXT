import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  Globe,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  LogOut,
  Shuffle,
  Video,
  Lock,
  X,
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getShuffleDebugInfo, resetShuffleCoordinator } from '../utils/videoShuffler';
import { testEmailNotification, getEmailJSConfig, generateFiveTestEmails, updateTemplateId } from '../services/emailNotificationService';

// Simple password authentication
const ADMIN_PASSWORD = 'STARfish3398$$';

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    country: '',
    dateFrom: '',
    dateTo: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [shuffleDebugInfo, setShuffleDebugInfo] = useState(null);
  const [showShuffleDebug, setShowShuffleDebug] = useState(false);
  const [emailConfig, setEmailConfig] = useState(null);
  const [testingEmail, setTestingEmail] = useState(false);
  const [sendingTestBatch, setSendingTestBatch] = useState(false);
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'careers'

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if user is already authenticated (stored in sessionStorage)
        const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
        console.log('🔐 Authentication check result:', isAuth);
        setAuthenticated(isAuth);

        // If authenticated, load data
        if (isAuth) {
          console.log('✅ User is authenticated, loading dashboard data...');
          fetchLeads();
          fetchAnalytics();
          loadEmailConfig();
        } else {
          console.log('❌ User not authenticated, showing login screen');
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Authentication check failed:', error);
        setAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Simple password login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthenticated(true);
      setLoginError('');
      setPassword('');
      console.log('✅ Admin login successful');
      fetchLeads();
      fetchAnalytics();
      loadEmailConfig();
    } else {
      setLoginError('Invalid password');
      console.log('❌ Admin login failed');
    }
  };

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setAuthenticated(false);
    setPassword('');
    setLoginError('');
    console.log('🔓 Admin logged out');
  };

  // Fetch leads using lead service
  const fetchLeads = async () => {
    try {
      console.log('📋 Fetching leads...');
      setLoading(true);
      setError(null); // Clear any previous errors

      // Import lead service dynamically to avoid circular imports
      const { getLeads } = await import('../services/leadService');
      console.log('📋 Lead service imported successfully');

      // Debug: Check both localStorage keys
      const mainStorageData = localStorage.getItem('axelis_leads_db');
      const backupStorageData = localStorage.getItem('axelis_leads');

      console.log('🗄️ Main storage (axelis_leads_db):', mainStorageData ? JSON.parse(mainStorageData).length + ' items' : 'No data');
      console.log('🗄️ Backup storage (axelis_leads):', backupStorageData ? JSON.parse(backupStorageData).length + ' items' : 'No data');

      // Force initialization of mock data
      console.log('🔄 Forcing mock service initialization...');

      const result = await getLeads(currentPage, 20, filters);
      console.log('📋 Leads fetch result:', result);

      if (result && result.success) {
        setLeads(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
        console.log('✅ Leads loaded successfully:', (result.data || []).length, 'leads');
        console.log('📊 Pagination info:', result.pagination);

        if ((result.data || []).length === 0) {
          console.log('⚠️ No leads found - checking if mock data was initialized');
          // Check again after potential initialization
          const recheckStorage = localStorage.getItem('axelis_leads_db');
          console.log('🔍 Recheck storage:', recheckStorage ? JSON.parse(recheckStorage).length + ' items' : 'Still no data');
        }
      } else {
        console.error('❌ Failed to fetch leads:', result?.error || 'Unknown error');
        setError('Failed to load leads: ' + (result?.error || 'Unknown error'));
        setLeads([]);
      }
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
      setError('Error loading leads: ' + error.message);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics using lead service
  const fetchAnalytics = async () => {
    try {
      console.log('📊 Fetching analytics...');
      // Import lead service dynamically
      const { getLeadAnalytics } = await import('../services/leadService');
      console.log('📊 Analytics service imported successfully');

      const analytics = await getLeadAnalytics(30);
      console.log('📊 Analytics result:', analytics);

      setAnalytics(analytics);
      console.log('✅ Analytics loaded successfully');
    } catch (error) {
      console.error('❌ Failed to fetch analytics:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchAnalytics();
  }, [currentPage, filters]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeads();
      fetchAnalytics();
    }, 30000);

    return () => clearInterval(interval);
  }, [currentPage, filters]);



  // Manual refresh function
  const handleRefresh = () => {
    setLoading(true);
    fetchLeads();
    fetchAnalytics();
  };

  // Update lead status using lead service
  const updateLeadStatus = async (leadId, status) => {
    try {
      // Import lead service dynamically
      const { updateLeadStatus: updateStatus } = await import('../services/leadService');
      await updateStatus(leadId, status);

      // Refresh data
      fetchLeads();
      fetchAnalytics();
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  // Export leads to CSV
  const exportToCSV = async () => {
    try {
      setExporting(true);
      console.log('📊 Exporting leads to CSV...');

      // Get all leads (not just current page)
      const { getLeads } = await import('../services/leadService');
      const allLeadsResult = await getLeads(1, 1000, filters); // Get up to 1000 leads

      if (!allLeadsResult.success || !allLeadsResult.data.length) {
        alert('No leads to export');
        return;
      }

      const leadsToExport = allLeadsResult.data;

      // Define CSV headers
      const headers = [
        'ID',
        'Name',
        'Email',
        'Phone',
        'Country',
        'Service',
        'Preferred Time',
        'Status',
        'Source',
        'Trigger Type',
        'Created Date',
        'Updated Date',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign'
      ];

      // Convert leads to CSV format
      const csvContent = [
        headers.join(','), // Header row
        ...leadsToExport.map(lead => [
          lead.id || '',
          `"${(lead.full_name || '').replace(/"/g, '""')}"`,
          `"${(lead.email || '').replace(/"/g, '""')}"`,
          `"${(lead.phone || '').replace(/"/g, '""')}"`,
          `"${(lead.country || '').replace(/"/g, '""')}"`,
          `"${(lead.service || '').replace(/"/g, '""')}"`,
          `"${(lead.preferred_time || '').replace(/"/g, '""')}"`,
          `"${(lead.status || 'new').replace(/"/g, '""')}"`,
          `"${(lead.source || '').replace(/"/g, '""')}"`,
          `"${(lead.trigger_type || '').replace(/"/g, '""')}"`,
          `"${lead.created_at ? new Date(lead.created_at).toLocaleString() : ''}"`,
          `"${lead.updated_at ? new Date(lead.updated_at).toLocaleString() : ''}"`,
          `"${(lead.utm_source || '').replace(/"/g, '""')}"`,
          `"${(lead.utm_medium || '').replace(/"/g, '""')}"`,
          `"${(lead.utm_campaign || '').replace(/"/g, '""')}"`
        ].join(','))
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);

        // Generate filename with current date
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
        const filename = `axelis-leads-${dateStr}-${timeStr}.csv`;

        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('✅ CSV export completed:', filename);

        // Show success message with details
        const message = `✅ Successfully exported ${leadsToExport.length} leads to ${filename}

📊 Export Details:
• Total leads: ${leadsToExport.length}
• Date range: ${filters.dateFrom || 'All time'} to ${filters.dateTo || 'Present'}
• Status filter: ${filters.status || 'All statuses'}
• Country filter: ${filters.country || 'All countries'}
• File format: CSV (Excel compatible)`;

        alert(message);
      } else {
        // Fallback for older browsers
        alert('CSV export not supported in this browser');
      }

    } catch (error) {
      console.error('❌ CSV export failed:', error);
      alert('Failed to export CSV: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  // Shuffle Debug Functions
  const handleGetShuffleDebugInfo = () => {
    try {
      const debugInfo = getShuffleDebugInfo();
      setShuffleDebugInfo(debugInfo);
      setShowShuffleDebug(true);
      console.log('🔀 Shuffle Debug Info:', debugInfo);
    } catch (error) {
      console.error('❌ Failed to get shuffle debug info:', error);
      alert('Failed to get shuffle debug info: ' + error.message);
    }
  };

  const handleResetShuffleCoordinator = () => {
    try {
      resetShuffleCoordinator();
      alert('✅ Shuffle coordinator reset successfully! Video orders will be regenerated on next page load.');
      console.log('🔄 Shuffle coordinator reset');

      // Refresh debug info if it's currently shown
      if (showShuffleDebug) {
        handleGetShuffleDebugInfo();
      }
    } catch (error) {
      console.error('❌ Failed to reset shuffle coordinator:', error);
      alert('Failed to reset shuffle coordinator: ' + error.message);
    }
  };

  // Test function to create a sample lead
  const handleCreateTestLead = async () => {
    try {
      const { storeLead } = await import('../services/leadService');

      const testLead = {
        fullName: 'Test User ' + Date.now(),
        email: 'test' + Date.now() + '@example.com',
        phone: '9876543210',
        country: 'Test Country',
        service: 'Test Service',
        preferredTime: 'Anytime',
        message: 'This is a test lead created from admin dashboard',
        source: 'admin_test',
        trigger: 'admin_test'
      };

      console.log('🧪 Creating test lead:', testLead);
      const result = await storeLead(testLead);
      console.log('🧪 Test lead result:', result);

      if (result.success) {
        alert('✅ Test lead created successfully! ID: ' + result.leadId);
        fetchLeads(); // Refresh the leads list
      } else {
        alert('❌ Failed to create test lead: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Error creating test lead:', error);
      alert('❌ Error creating test lead: ' + error.message);
    }
  };

  // Function to check localStorage directly
  const handleCheckStorage = () => {
    try {
      const leadsData = localStorage.getItem('axelis_leads_db');
      const backupData = localStorage.getItem('axelis_leads');

      console.log('🗄️ Main storage (axelis_leads_db):', leadsData);
      console.log('🗄️ Backup storage (axelis_leads):', backupData);

      let message = '';

      if (leadsData) {
        const parsed = JSON.parse(leadsData);
        message += `Main storage: ${parsed.length} leads\n`;
        console.log('📋 Main storage leads:', parsed);
      } else {
        message += 'Main storage: No data\n';
      }

      if (backupData) {
        const parsed = JSON.parse(backupData);
        message += `Backup storage: ${parsed.length} leads\n`;
        console.log('📋 Backup storage leads:', parsed);
      } else {
        message += 'Backup storage: No data\n';
      }

      alert(message);
    } catch (error) {
      console.error('❌ Error checking storage:', error);
      alert('Error checking storage: ' + error.message);
    }
  };

  // Function to sync backup leads to main storage
  const handleSyncLeads = async () => {
    try {
      const backupData = localStorage.getItem('axelis_leads');
      const mainData = localStorage.getItem('axelis_leads_db');

      if (!backupData) {
        alert('No backup leads to sync');
        return;
      }

      const backupLeads = JSON.parse(backupData);
      const mainLeads = mainData ? JSON.parse(mainData) : [];

      console.log('🔄 Syncing leads from backup to main storage...');
      console.log('📦 Backup leads:', backupLeads.length);
      console.log('📦 Main leads:', mainLeads.length);

      // Import the storeLead function
      const { storeLead } = await import('../services/leadService');

      let syncedCount = 0;

      for (const backupLead of backupLeads) {
        // Check if lead already exists in main storage
        const existsInMain = mainLeads.find(lead =>
          lead.email === backupLead.email &&
          lead.phone === backupLead.phone
        );

        if (!existsInMain) {
          console.log('📤 Syncing lead:', backupLead.fullName || backupLead.full_name);

          const leadData = {
            fullName: backupLead.fullName || backupLead.full_name,
            email: backupLead.email,
            phone: backupLead.phone,
            country: backupLead.country,
            service: backupLead.service,
            preferredTime: backupLead.preferredTime || backupLead.preferred_time,
            message: backupLead.message,
            source: backupLead.source || 'backup_sync',
            trigger: backupLead.trigger || 'backup_sync'
          };

          await storeLead(leadData);
          syncedCount++;
        }
      }

      alert(`✅ Synced ${syncedCount} leads from backup to main storage`);
      fetchLeads(); // Refresh the display

    } catch (error) {
      console.error('❌ Error syncing leads:', error);
      alert('Error syncing leads: ' + error.message);
    }
  };

  // Function to reset all storage (for testing)
  const handleResetStorage = () => {
    if (confirm('⚠️ This will delete ALL leads from storage. Are you sure?')) {
      localStorage.removeItem('axelis_leads_db');
      localStorage.removeItem('axelis_leads');
      console.log('🗑️ All lead storage cleared');
      alert('✅ All lead storage cleared. Mock data will be recreated on next fetch.');
      fetchLeads(); // This will recreate mock data
    }
  };

  // Function to force initialize mock data
  const handleInitializeMockData = async () => {
    try {
      console.log('🔧 Force initializing mock data...');

      // Import and call the mock service directly
      const { getLeads } = await import('../services/leadService');

      // Clear existing data first
      localStorage.removeItem('axelis_leads_db');

      // This will trigger initialization
      const result = await getLeads(1, 20, {});
      console.log('🔧 Force initialization result:', result);

      if (result.success) {
        alert(`✅ Mock data initialized! Found ${result.data.length} leads.`);
        fetchLeads(); // Refresh display
      } else {
        alert('❌ Failed to initialize mock data: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Error initializing mock data:', error);
      alert('❌ Error initializing mock data: ' + error.message);
    }
  };

  // Load email configuration
  const loadEmailConfig = () => {
    try {
      const config = getEmailJSConfig();
      setEmailConfig(config);
      console.log('📧 Email configuration loaded:', config);
    } catch (error) {
      console.error('❌ Failed to load email configuration:', error);
    }
  };

  // Test email notification
  const handleTestEmail = async () => {
    try {
      setTestingEmail(true);
      console.log('📧 Testing email notification...');

      const result = await testEmailNotification();
      console.log('📧 Test email result:', result);

      if (result.success) {
        if (result.method === 'emailjs') {
          alert('✅ Test email sent successfully! Check your inbox at axelisoverseas@overseeducation.com and info@overseeducation.com');
        } else {
          alert('✅ Test email logged successfully! EmailJS is not configured, so the email details were logged to console. Check browser console for details.');
        }
      } else {
        alert('❌ Test email failed: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Test email error:', error);
      alert('❌ Test email error: ' + error.message);
    } finally {
      setTestingEmail(false);
    }
  };

  // Send 5 test emails
  const handleSendFiveTestEmails = async () => {
    try {
      setSendingTestBatch(true);
      console.log('📧 Sending 5 test emails...');

      const result = await generateFiveTestEmails();
      console.log('📧 Test email batch result:', result);

      if (result.success) {
        const message = `✅ Test email batch completed!

📊 Results:
• Successfully sent: ${result.totalSent}/${result.totalAttempted} emails
• Failed: ${result.totalAttempted - result.totalSent} emails

📧 Check your email inboxes:
• axelisoverseas@overseeducation.com
• info@overseeducation.com

The test emails simulate different lead sources:
1. John Smith - CTA Button (Netherlands)
2. Sarah Johnson - Contact Form (Germany)
3. Michael Chen - WhatsApp Widget (Canada)
4. Emma Wilson - Exit Intent Modal (Australia)
5. David Rodriguez - Timed Modal (UK)`;

        alert(message);
      } else {
        alert('❌ Test email batch failed. Check console for details.');
      }
    } catch (error) {
      console.error('❌ Test email batch error:', error);
      alert('❌ Test email batch error: ' + error.message);
    } finally {
      setSendingTestBatch(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-cyan-100 text-cyan-800',
      qualified: 'bg-green-100 text-green-800',
      converted: 'bg-purple-100 text-purple-800',
      lost: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.new}`}>
        {status || 'new'}
      </span>
    );
  };

  // Analytics cards
  const AnalyticsCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  // Show login form if not authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Control Center
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter password to access lead management, video shuffle controls & analytics
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter admin password"
              />
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center">
                {loginError}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Access Admin Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (loading && !leads.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Control Center</h1>
              <p className="text-gray-600">Axelis Overseas - Lead Management, Video Shuffle & Analytics</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                disabled={exporting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className={`h-4 w-4 mr-2 ${exporting ? 'animate-bounce' : ''}`} />
                {exporting ? 'Exporting...' : 'Export CSV'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                title="Logout from admin panel"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setError(null)}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnalyticsCard
              title="Total Leads"
              value={analytics.total}
              icon={Users}
              color="blue"
            />
            <AnalyticsCard
              title="Recent Leads (30d)"
              value={analytics.recent}
              icon={TrendingUp}
              color="green"
            />
            <AnalyticsCard
              title="Conversion Rate"
              value={`${((analytics.statusData.find(s => s.status === 'converted')?.count || 0) / analytics.total * 100).toFixed(1)}%`}
              icon={BarChart3}
              color="purple"
            />
            <AnalyticsCard
              title="Active Leads"
              value={analytics.statusData.filter(s => ['new', 'contacted', 'qualified'].includes(s.status)).reduce((sum, s) => sum + s.count, 0)}
              icon={Activity}
              color="yellow"
            />
          </div>
        )}

        {/* Video Shuffle Debug Section */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Video className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Video Shuffle Debug</h2>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleGetShuffleDebugInfo}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center text-sm"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Get Debug Info
              </button>
              <button
                onClick={handleResetShuffleCoordinator}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center text-sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Shuffle
              </button>
            </div>
          </div>

          {showShuffleDebug && shuffleDebugInfo && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Session Info</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Session ID:</span> <code className="bg-gray-200 px-2 py-1 rounded text-xs">{shuffleDebugInfo.sessionId}</code></div>
                    <div><span className="font-medium">Used Patterns:</span> {shuffleDebugInfo.usedFirstThreeOrders.length}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Current Video Orders</h3>
                  <div className="space-y-2 text-sm">
                    {shuffleDebugInfo.usedFirstThreeOrders.map((pattern, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-16 text-gray-600">#{index + 1}:</span>
                        <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{pattern}</code>
                      </div>
                    ))}
                    {shuffleDebugInfo.usedFirstThreeOrders.length === 0 && (
                      <div className="text-gray-500 italic">No shuffle patterns recorded yet</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This shows the first 3 video IDs for each section to ensure uniqueness across YouTube Shorts and Instagram Reels.
                  Reset the shuffle coordinator to generate new random orders on the next page load.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Email Notification System */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Email Notification System</h2>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleTestEmail}
                disabled={testingEmail || sendingTestBatch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm disabled:opacity-50"
              >
                <Mail className="h-4 w-4 mr-2" />
                {testingEmail ? 'Testing...' : 'Test Email'}
              </button>
              <button
                onClick={handleSendFiveTestEmails}
                disabled={testingEmail || sendingTestBatch}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center text-sm disabled:opacity-50"
              >
                <Mail className="h-4 w-4 mr-2" />
                {sendingTestBatch ? 'Sending 5...' : 'Send 5 Test Emails'}
              </button>
              <button
                onClick={loadEmailConfig}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center text-sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Config
              </button>
            </div>
          </div>

          {emailConfig && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Configuration Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium w-24">Public Key:</span>
                      <span className={`px-2 py-1 rounded text-xs ${emailConfig.publicKey === 'Configured' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {emailConfig.publicKey}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24">Axelis Service:</span>
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        {emailConfig.axelisServiceId}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24">Info Service:</span>
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        {emailConfig.infoServiceId}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24">Template ID:</span>
                      <span className={`px-2 py-1 rounded text-xs ${emailConfig.templateId === 'Configured' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {emailConfig.templateId}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Email Recipient</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium w-16">Primary:</span>
                      <span className="text-blue-600">{emailConfig.recipient}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Note: CC emails are configured in EmailJS dashboard
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {
                    emailConfig.publicKey === 'Configured' && emailConfig.servicesConfigured && emailConfig.templateId === 'Configured'
                      ? '✅ EmailJS is fully configured with dual services - ready to send notifications to both email addresses'
                      : emailConfig.servicesConfigured
                        ? '⚠️ Services configured but missing Public Key or Template ID. Emails will be logged to console only.'
                        : '⚠️ EmailJS is not fully configured. Email notifications will be logged to console only.'
                  }
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  See <code>src/config/emailjs-lead-setup.md</code> for setup instructions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Lead Management</h3>
            <div className="flex space-x-2 flex-wrap">
              <button
                onClick={() => {
                  console.log('🔄 Force refreshing leads...');
                  fetchLeads();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center text-sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={handleSyncLeads}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center text-sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Backup
              </button>
              <button
                onClick={handleCheckStorage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                Check Storage
              </button>
              <button
                onClick={handleCreateTestLead}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Test Lead
              </button>
              <button
                onClick={handleInitializeMockData}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 flex items-center text-sm"
              >
                <Database className="h-4 w-4 mr-2" />
                Init Mock Data
              </button>
              <button
                onClick={handleResetStorage}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center text-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Reset Storage
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Countries</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Germany">Germany</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilters({ status: '', country: '', dateFrom: '', dateTo: '' })}
                className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => { setActiveTab('leads'); setCurrentPage(1); }}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === 'leads'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                All Leads
                <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'leads' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {leads.filter(l => l.source !== 'career_application').length}
                </span>
              </button>
              <button
                onClick={() => { setActiveTab('careers'); setCurrentPage(1); }}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === 'careers'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Career Applications
                <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'careers' ? 'bg-cyan-100 text-cyan-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {leads.filter(l => l.source === 'career_application').length}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {activeTab === 'careers' ? 'Career Applications' : 'Leads'} ({(activeTab === 'careers' ? leads.filter(l => l.source === 'career_application') : leads.filter(l => l.source !== 'career_application')).length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  {activeTab === 'careers' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied For
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'careers' ? 'Location' : 'Country/Service'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(() => {
                  const filteredLeads = activeTab === 'careers'
                    ? leads.filter(l => l.source === 'career_application')
                    : leads.filter(l => l.source !== 'career_application');
                  return filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={activeTab === 'careers' ? 6 : 5} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {activeTab === 'careers' ? 'No career applications yet' : 'No leads found'}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            {activeTab === 'careers'
                              ? 'Career applications from the /careers page will appear here.'
                              : error ? 'There was an error loading leads.' : 'No leads have been submitted yet.'}
                          </p>
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={fetchLeads}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Refresh
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.full_name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {lead.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {lead.phone}
                            </div>
                          </div>
                        </td>
                        {activeTab === 'careers' && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                              {lead.job_title || lead.service || 'N/A'}
                            </span>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Globe className="h-3 w-3 mr-1" />
                            {lead.country}
                          </div>
                          <div className="text-sm text-gray-500">{lead.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="converted">Converted</option>
                              <option value="lost">Lost</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                })()}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Lead Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedLead.full_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <p className="text-sm text-gray-900">{selectedLead.country}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <p className="text-sm text-gray-900">{selectedLead.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <StatusBadge status={selectedLead.status} />
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedLead.message}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div>
                  <label className="block font-medium">Created</label>
                  <p>{new Date(selectedLead.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block font-medium">Source</label>
                  <p>{selectedLead.source}</p>
                </div>
                {selectedLead.job_title && (
                  <div>
                    <label className="block font-medium">Applied For</label>
                    <p className="text-cyan-700 font-semibold">{selectedLead.job_title}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
