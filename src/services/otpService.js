// Simple OTP Service for Admin Authentication
// This is a basic implementation for testing purposes

const OTP_STORAGE_KEY = 'admin_auth_token';
const OTP_EXPIRY_KEY = 'admin_auth_expiry';

// Simple authentication functions
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem(OTP_STORAGE_KEY);
    const expiry = localStorage.getItem(OTP_EXPIRY_KEY);
    
    if (!token || !expiry) {
      return false;
    }
    
    const now = new Date().getTime();
    const expiryTime = parseInt(expiry);
    
    if (now > expiryTime) {
      // Token expired, clean up
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const login = (otp) => {
  try {
    // Simple OTP validation (in production, this should be server-side)
    const validOTPs = ['123456', '000000', 'admin123'];
    
    if (validOTPs.includes(otp)) {
      const token = 'admin_' + Date.now();
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
      
      localStorage.setItem(OTP_STORAGE_KEY, token);
      localStorage.setItem(OTP_EXPIRY_KEY, expiry.toString());
      
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid OTP' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Login failed' };
  }
};

export const logout = () => {
  try {
    localStorage.removeItem(OTP_STORAGE_KEY);
    localStorage.removeItem(OTP_EXPIRY_KEY);
    console.log('🔐 User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(OTP_STORAGE_KEY);
};

// Export default object with all functions
export default {
  isAuthenticated,
  login,
  logout,
  getAuthToken
};
