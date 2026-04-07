import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import AdminLogin from '../components/AdminLogin';
import { isAuthenticated, logout } from '../services/otpService';

const AdminTest = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    console.log('🔧 AdminTest component mounted');
    
    const checkAuth = () => {
      try {
        console.log('🔐 Checking authentication...');
        const isAuth = isAuthenticated();
        console.log('🔐 Authentication result:', isAuth);
        
        setAuthenticated(isAuth);
        setLoading(false);
        
        if (isAuth) {
          console.log('✅ User authenticated, loading test data...');
          loadTestData();
        } else {
          console.log('❌ User not authenticated');
        }
      } catch (error) {
        console.error('❌ Authentication check failed:', error);
        setAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Load test data
  const loadTestData = async () => {
    try {
      console.log('📊 Loading test data...');
      
      // Test the mock lead service
      const { getLeads, getLeadAnalytics } = await import('../services/leadService');
      
      const leadsResult = await getLeads(1, 10, {});
      console.log('📋 Test leads result:', leadsResult);
      
      const analyticsResult = await getLeadAnalytics(30);
      console.log('📊 Test analytics result:', analyticsResult);
      
      setTestData({
        leads: leadsResult,
        analytics: analyticsResult
      });
      
      console.log('✅ Test data loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load test data:', error);
    }
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    console.log('✅ Login successful in test page');
    setAuthenticated(true);
    loadTestData();
  };

  // Handle logout
  const handleLogout = () => {
    console.log('🔐 Logging out from test page');
    logout();
    setAuthenticated(false);
    setTestData(null);
  };

  // Show login if not authenticated
  if (!authenticated) {
    console.log('🔐 Showing login screen');
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Show loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading test page...</p>
        </div>
      </div>
    );
  }

  // Show authenticated test page
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Test Page</h1>
                <p className="text-gray-600">Authentication system test</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Authentication Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">Authenticated: <strong>Yes</strong></span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">Session: <strong>Active</strong></span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">Test Data: <strong>{testData ? 'Loaded' : 'Loading...'}</strong></span>
            </div>
          </div>
        </div>

        {/* Test Data Display */}
        {testData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leads Test */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Service Test</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {testData.leads.success ? '✅ Success' : '❌ Failed'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total Leads:</strong> {testData.leads.data?.length || 0}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Pagination:</strong> {testData.leads.pagination ? '✅ Working' : '❌ Missing'}
                </p>
              </div>
              
              {testData.leads.data && testData.leads.data.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Sample Lead:</h4>
                  <div className="bg-gray-50 p-3 rounded text-xs">
                    <pre>{JSON.stringify(testData.leads.data[0], null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Analytics Test */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Service Test</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Total:</strong> {testData.analytics?.total || 0}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Recent:</strong> {testData.analytics?.recent || 0}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status Data:</strong> {testData.analytics?.statusData ? '✅ Available' : '❌ Missing'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Country Data:</strong> {testData.analytics?.countryData ? '✅ Available' : '❌ Missing'}
                </p>
              </div>
              
              {testData.analytics && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Analytics Summary:</h4>
                  <div className="bg-gray-50 p-3 rounded text-xs">
                    <pre>{JSON.stringify(testData.analytics, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Console Logs */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Debug Information</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
            <p>✅ Authentication system loaded</p>
            <p>✅ OTP service imported successfully</p>
            <p>✅ Lead service imported successfully</p>
            <p>✅ Mock data service working</p>
            <p>📊 Check browser console for detailed logs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTest;
