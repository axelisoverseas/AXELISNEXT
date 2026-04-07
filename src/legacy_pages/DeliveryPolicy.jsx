import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Truck, Clock, Shield, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const DeliveryPolicy = () => {
  return (
    <Layout
      title="Delivery Policy"
      description="Delivery Policy of Axelis Overseas Education - Learn how our study abroad services are delivered digitally with full transparency."
      keywords="delivery policy, axelis overseas, study abroad services, digital delivery"
    >

      {/* Hero Section - Space Theme */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Delivery Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
              Digital Service Delivery with Complete Transparency
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
                At <span className="font-semibold text-blue-600">Axelis Overseas Education Pvt Ltd</span>, all services are consultancy-based and delivered digitally with complete transparency and accountability.
              </p>
            </div>

            {/* Mode of Delivery Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Mode of Delivery</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Digital Communication</h3>
                      <p className="text-gray-700">Services such as university shortlisting, SOP/LOR drafting, visa filing, and alumni connects are delivered via email, WhatsApp, calls, and virtual sessions.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Electronic Updates</h3>
                      <p className="text-gray-700">Status tracker sheets and application updates are provided electronically for complete transparency.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timelines Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Service Timelines</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Initial Status Tracker</h3>
                      <p className="text-gray-600">Complete onboarding documentation and tracking setup</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        10 Working Days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Application Submissions</h3>
                      <p className="text-gray-600">University applications and document submissions</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Per University Deadlines
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visa & Accommodation Support</h3>
                      <p className="text-gray-600">Third-party coordination and monitoring</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        Institution Dependent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-Party Services Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Third-Party Services</h2>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl border border-cyan-200">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Axelis facilitates <span className="font-semibold text-orange-700">loans, scholarships, and accommodation</span> through verified partners but does not guarantee final approvals, which remain subject to third-party terms and conditions.
                </p>
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
                to="/refund-cancellation"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Refund & Cancellation Policy
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
          <h3 className="text-2xl font-bold mb-4">Have Questions About Our Delivery Process?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our team is here to help clarify any aspects of our service delivery policy. Reach out for personalized assistance.
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

export default DeliveryPolicy;
