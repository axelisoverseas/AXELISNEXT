import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertTriangle, Mail, ArrowRight, CreditCard } from 'lucide-react';

const RefundCancellation = () => {
  return (
    <Layout
      title="Refund & Cancellation Policy"
      description="Refund & Cancellation Policy of Axelis Overseas Education - Understand our refund process for Zero Consultation and Zero Tuition Fee Student Plans."
      keywords="refund policy, cancellation policy, axelis overseas, study abroad refund"
    >

      {/* Hero Section - Space Theme */}
      <section className="bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
              <RefreshCw className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Refund & Cancellation Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
              Transparent Refund Process for All Student Plans
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Understanding our <span className="font-semibold text-green-600">refund process</span> for different Student Plans with complete transparency.
              </p>
            </div>

            {/* Student Plan Sections */}
            <div className="space-y-12">
              {/* Zero Consultation Fee Student Plan */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Zero Consultation Fee Student Plan</h2>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
                  <div className="grid gap-6">
                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Fully Refundable</h3>
                        <p className="text-gray-700">₹9,999 is <strong>fully refundable</strong> once the student's visa is approved.</p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-red-100">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Early Withdrawal</h3>
                        <p className="text-gray-700">If a student withdraws before visa approval, the amount is <strong>non-refundable</strong>.</p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
                        <p className="text-gray-700">Refunds processed within <strong>14 working days</strong> to original payment mode (Razorpay).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zero Tuition Fee Student Plan */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Zero Tuition Fee Student Plan</h2>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
                  <div className="grid gap-6">
                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-red-100">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Upfront Payment</h3>
                        <p className="text-gray-700">₹19,999 upfront is <strong>non-refundable</strong> once services begin.</p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-green-100">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Balance Payment</h3>
                        <p className="text-gray-700">Remaining balance is payable only if the student receives their preferred offer letter.</p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-orange-100">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Visa Rejection</h3>
                        <p className="text-gray-700">If visa is rejected after balance payment, Axelis may refund visa filing component at discretion, provided student doesn't reapply.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Conditions */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">General Conditions</h2>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl border border-cyan-200">
                  <div className="grid gap-6">
                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-red-100">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                        <p className="text-gray-700"><strong>No cash refunds.</strong> All refunds processed digitally.</p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Request Process</h3>
                        <p className="text-gray-700">
                          All refund or cancellation requests must be emailed to{' '}
                          <a
                            href="mailto:info@overseeducation.com"
                            className="text-blue-600 hover:text-blue-800 font-semibold underline"
                          >
                            info@overseeducation.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Agreement Terms</h3>
                        <p className="text-gray-700">Refunds are subject to the terms signed in the student's agreement.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Policies Section */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Policies</h3>
            <p className="text-gray-700 mb-8 text-center">
              For comprehensive information, please review our related policies:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/terms-conditions"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Terms & Conditions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/delivery-policy"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Delivery Policy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="bg-gradient-to-r from-slate-900 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full mb-6">
            <Mail className="w-8 h-8 text-slate-900" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Questions About Refunds?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is ready to assist you with any refund or cancellation queries. Contact us for immediate assistance.
          </p>
          <a
            href="mailto:info@overseeducation.com"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            info@overseeducation.com
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default RefundCancellation;
