import React from 'react';
import BankLogo from './BankLogo';

const BankLogoGrid = ({ showNames = false, className = "" }) => {
  // List of major Indian banks
  const banks = [
    "State Bank of India",
    "HDFC Bank", 
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Kotak Mahindra Bank",
    "Canara Bank",
    "Bank of Baroda",
    "Union Bank of India"
  ];

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
        {banks.map((bankName, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <BankLogo 
              bankName={bankName} 
              className="w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300" 
            />
            {showNames && (
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium max-w-20">
                {bankName.replace(' Bank', '').replace(' of India', '')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankLogoGrid;
