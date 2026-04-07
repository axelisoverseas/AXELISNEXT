import React, { useState, useEffect } from 'react';
import { FileText, Download, CheckSquare, User, Users, X, ExternalLink } from 'lucide-react';

const LoanDocumentCTA = () => {
  const [showModal, setShowModal] = useState(false);

  const studentDocs = [
    'Passport-size photographs (2–6 copies)',
    'ID proof: Aadhaar Card / Passport / PAN Card',
    'LAST 3 years\' ITR',
    'Address proof: Aadhaar / Passport / Voter ID / Utility bill',
    '10th & 12th marksheets and certificates',
    'Graduation or latest degree marksheets (if applicable)',
    'Entrance exam scores (IELTS/GRE/GMAT – if applicable)',
    'Admission letter from university/institution (offer letter)',
    'Detailed fee structure / cost of attendance',
    'Gap certificate (if applicable)'
  ];

  const coApplicantDocs = [
    'ID proof: Aadhaar / PAN / Passport',
    'Address proof: Aadhaar / Voter ID / Utility Bill',
    'Relationship proof: Birth certificate / Affidavit / Ration card'
  ];

  const salariedDocs = [
    'Last 3 months\' salary slips',
    'Last 3 years\' ITR',
    'Form 16 for last 2 years',
    'Bank statement (salary account – last 6 months)'
  ];

  const selfEmployedDocs = [
    'Last 2–3 years Income Tax Returns with computation',
    'Business registration/license proof',
    'ITR last 3 years',
    'Bank statements (current account – last 6 months)'
  ];

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);

  return (
    <>
      {/* CTA Card */}
      <div className="bg-gradient-to-br from-orange-50 to-blue-100 rounded-2xl p-6 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 sticky top-8">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <FileText className="text-white" size={28} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Loan Document Checklist
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-4">
            Complete list of documents required for education loan application (Non-Collateral)
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <CheckSquare size={16} className="text-green-600" />
              <span>Student Documents</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Users size={16} className="text-blue-600" />
              <span>Co-applicant Documents</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Download size={16} className="text-blue-600" />
              <span>Ready-to-use Checklist</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={openModal}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            View Document Checklist
          </button>

          {/* Trust Badge */}
          <div className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Updated for 2024</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Education Loan Document Checklist</h2>
                <p className="text-orange-100">Non-Collateral Loan Requirements (India)</p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeModal();
                }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                type="button"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Documents */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="text-blue-600" size={24} />
                    <h3 className="text-xl font-bold text-gray-900">1. Applicant (Student) Documents</h3>
                  </div>
                  <ul className="space-y-3">
                    {studentDocs.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckSquare className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Co-applicant Documents */}
                <div className="space-y-6">
                  {/* Basic Co-applicant Docs */}
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="text-green-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-900">2. Co-applicant Documents</h3>
                    </div>
                    <ul className="space-y-3">
                      {coApplicantDocs.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckSquare className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Salaried */}
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">If Salaried:</h4>
                    <ul className="space-y-3">
                      {salariedDocs.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckSquare className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Self-employed */}
                  <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">If Self-employed / Business Owner:</h4>
                    <ul className="space-y-3">
                      {selfEmployedDocs.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckSquare className="text-cyan-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Need Help with Your Loan Application?</h3>
                <p className="mb-4 text-orange-100">Our loan experts will guide you through the entire process</p>
                <Link
                  to="/products?redirect=zcf"
                  onClick={closeModal}
                  className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors inline-flex items-center gap-2"
                >
                  <ArrowRight size={18} />
                  Apply Now - Start Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoanDocumentCTA;
