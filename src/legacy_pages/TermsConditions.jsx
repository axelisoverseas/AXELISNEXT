import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { FileText, Users, CreditCard, Shield, UserX, Scale, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import RazorpayEmbed from '../components/RazorpayEmbed';

const TermsConditions = () => {
  return (
    <Layout
      title="Terms & Conditions"
      description="Terms & Conditions of Axelis Overseas Education - Read our policies on services, fees, confidentiality, and dispute resolution."
      keywords="terms conditions, axelis overseas, study abroad terms, consultancy agreement"
    >

      {/* Hero Section - Space Theme */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Terms & Conditions
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
              Your Agreement with Axelis Overseas Education
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
                By enrolling with <span className="font-semibold text-blue-600">Axelis Overseas Education Pvt Ltd ("Axelis")</span>, you agree to the following terms and conditions:
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-12">
              {/* 1. Exclusive Engagement */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">1. Exclusive Engagement</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  While under the <span className="font-semibold text-blue-700">Zero Consultation Fee Student Plan</span>, students must not simultaneously engage with another consultancy for the same applications.
                </p>
              </div>

              {/* 2. Payments */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">2. Payment Structure</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="font-bold text-gray-900 text-lg">Zero Consultation Fee Student Plan</h3>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <span className="text-gray-500 line-through text-lg mr-2">₹20,000</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">50% OFF</span>
                      </div>
                      <p className="text-blue-800 font-semibold text-2xl mb-2">₹9,999</p>
                      <p className="text-gray-700 mb-4">Refundable deposit, refunded upon visa approval</p>

                      <RazorpayEmbed url="https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view" text={"Pay Now - ₹9,999"} />
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Secure payment via Razorpay • 100% Refundable
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                      <h3 className="font-bold text-gray-900 text-lg">Zero Tuition Fee Student Plan</h3>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <span className="text-gray-500 line-through text-lg mr-2">₹40,000</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">50% OFF</span>
                      </div>
                      <p className="text-green-800 font-semibold text-2xl mb-2">₹19,999</p>
                      <p className="text-gray-700 mb-4">Upfront payment. Balance payable only after receiving preferred offer letter</p>

                      <RazorpayEmbed url="https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view" text={"Pay Now - ₹19,999"} />
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Secure payment via Razorpay • Pay After Offer
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <p className="text-gray-700 text-center">
                    <span className="font-semibold">Payment Processing:</span> All payments are securely processed via <span className="font-bold text-purple-700">Razorpay</span>
                  </p>
                </div>
              </div>

              {/* 3. Refund Eligibility */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl border border-cyan-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">3. Refund Eligibility</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Refunds are strictly governed by our{' '}
                  <Link to="/refund-cancellation" className="inline-flex items-center text-orange-700 hover:text-orange-800 font-semibold underline">
                    Refund & Cancellation Policy
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>.
                </p>
              </div>

              {/* 4. Confidentiality & Transparency */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">4. Confidentiality & Transparency</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Axelis maintains <span className="font-semibold text-purple-700">strict confidentiality</span> of student data. Dedicated email IDs or communication trackers may be created for complete transparency.
                </p>
              </div>

              {/* 5. Termination */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-xl border border-red-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                    <UserX className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">5. Termination Policy</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Students can withdraw by written notice. All dues (if applicable) must be cleared before offboarding. Axelis reserves the right to terminate in case of misrepresentation, fraud, or breach of terms.
                </p>
              </div>

              {/* 6. Legal Framework */}
              <div className="bg-gradient-to-br from-slate-100 to-gray-100 p-8 rounded-xl border border-slate-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">6. Legal Framework</h2>
                </div>
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This Agreement is governed by the <span className="font-semibold">laws of India</span>.
                    <br /><strong>Jurisdiction:</strong> Bengaluru, Karnataka.
                    <br />Breach may result in civil/criminal proceedings under IPC sections including <span className="font-mono bg-slate-100 px-2 py-1 rounded">415, 420, 463, 465, 499, 500</span>, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Information Section */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Information</h3>
            <p className="text-gray-700 mb-8 text-center">
              For details on how services are provided, please see our:
            </p>
            <div className="text-center">
              <Link
                to="/delivery-policy"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Delivery Policy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full mb-6">
            <Mail className="w-8 h-8 text-slate-900" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Need Clarification on Terms?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our legal team is available to explain any aspect of our terms and conditions. Contact us for detailed clarification.
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

export default TermsConditions;
