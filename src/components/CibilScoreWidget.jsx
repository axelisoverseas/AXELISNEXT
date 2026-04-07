import React, { useState } from 'react';
import { CreditCard, Shield, TrendingUp, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-react';

const CibilScoreWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scoreRanges = [
    { range: '750-900', label: 'Excellent', color: 'bg-green-500', description: 'Best loan rates & instant approvals' },
    { range: '700-749', label: 'Good', color: 'bg-blue-500', description: 'Good loan rates & quick approvals' },
    { range: '650-699', label: 'Fair', color: 'bg-cyan-500', description: 'Moderate rates with some conditions' },
    { range: '600-649', label: 'Poor', color: 'bg-orange-500', description: 'Higher rates & stricter conditions' },
    { range: '300-599', label: 'Very Poor', color: 'bg-gray-500', description: 'Loan approval may be difficult' }
  ];

  const benefits = [
    'Check your CIBIL score for free',
    'Get detailed credit report',
    'Monitor credit health regularly',
    'Improve loan approval chances',
    'Secure better interest rates'
  ];

  const handleCheckScore = () => {
    // Open CIBIL official website in new tab
    window.open('https://www.cibil.com/freecibilscore', '_blank', 'noopener,noreferrer');
  };

  const handleBankBazaarCheck = () => {
    // Open BankBazaar credit score check in new tab - Correct URL
    window.open('https://www.bankbazaar.com/credit-score.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl">
            <CreditCard className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Check Your CIBIL Score</h3>
            <p className="text-sm text-gray-600">Free credit score check before applying for loans</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Shield size={20} />
          <span className="text-sm font-semibold">100% Free</span>
        </div>
      </div>

      {/* Score Ranges */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <TrendingUp size={18} />
          Credit Score Ranges
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {scoreRanges.map((score, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${score.color}`}></div>
                <span className="font-bold text-sm text-gray-900">{score.range}</span>
              </div>
              <div className="text-xs font-semibold text-gray-700 mb-1">{score.label}</div>
              <div className="text-xs text-gray-600">{score.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      {isExpanded && (
        <div className="mb-6 bg-white rounded-xl p-4 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle className="text-green-600" size={18} />
            Why Check Your CIBIL Score?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleCheckScore}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <CreditCard size={18} />
            Check on CIBIL Official
            <ExternalLink size={16} />
          </button>
          
          <button
            onClick={handleBankBazaarCheck}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Shield size={18} />
            Check on BankBazaar
            <ExternalLink size={16} />
          </button>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Info size={16} />
          {isExpanded ? 'Show Less' : 'Learn More About CIBIL Score'}
        </button>
      </div>

      {/* Important Note */}
      <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <AlertCircle className="text-cyan-600 flex-shrink-0 mt-0.5" size={16} />
          <div className="text-xs text-cyan-800">
            <strong>Important:</strong> A good CIBIL score (750+) significantly improves your education loan approval chances and helps secure better interest rates. Check your score before applying for any loan.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CibilScoreWidget;
