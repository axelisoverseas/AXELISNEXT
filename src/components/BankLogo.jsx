import React from 'react';
import { bankLogoCDN } from '../assets/bank-logos/cdn-logos';

const BankLogo = ({ bankName, className = "w-16 h-16" }) => {
  // Map bank names to CDN keys
  const bankKeyMap = {
    "State Bank of India": "sbi",
    "HDFC Bank": "hdfc",
    "ICICI Bank": "icici",
    "Axis Bank": "axis",
    "Punjab National Bank": "pnb",
    "Kotak Mahindra Bank": "kotak",
    "Canara Bank": "canara",
    "Bank of Baroda": "bob",
    "Union Bank of India": "union",
    "Yes Bank": "yes",
    "IndusInd Bank": "indusind",
    "Federal Bank": "federal",
    "IDFC First Bank": "idfc",
    // NBFCs with local logos
    "Avanse Financial Services": "avanse",
    "Credila Financial Services": "credila"
  };

  const bankKey = bankKeyMap[bankName];
  const logoUrl = bankKey ? bankLogoCDN[bankKey] : null;

  // Fallback for banks without logos
  if (!logoUrl) {
    // Special styling for NBFCs and financial services
    const isNBFC = bankName.toLowerCase().includes('financial') ||
                   bankName.toLowerCase().includes('avanse') ||
                   bankName.toLowerCase().includes('credila');

    const bgColor = isNBFC
      ? "bg-gradient-to-br from-green-600 to-green-700"
      : "bg-gradient-to-br from-blue-600 to-blue-700";

    const borderColor = isNBFC ? "border-green-500" : "border-blue-500";

    return (
      <div className={`${className} ${bgColor} rounded-lg flex items-center justify-center shadow-lg border ${borderColor}`}>
        <div className="text-white font-bold text-xs text-center px-1">
          {bankName.split(' ').map(word => word[0]).join('').slice(0, 4)}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white rounded-lg flex items-center justify-center shadow-lg border border-gray-200 p-2 overflow-hidden`}>
      <img
        src={logoUrl}
        alt={`${bankName} logo`}
        className="w-full h-full object-contain"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
        onError={(e) => {
          // Fallback if image fails to load
          e.target.style.display = 'none';
          const fallbackDiv = document.createElement('div');
          fallbackDiv.className = 'text-gray-700 font-bold text-xs text-center px-1 flex items-center justify-center w-full h-full';
          fallbackDiv.textContent = bankName.split(' ').map(word => word[0]).join('').slice(0, 4);
          e.target.parentElement.appendChild(fallbackDiv);
        }}
      />
    </div>
  );
};

export default BankLogo;
