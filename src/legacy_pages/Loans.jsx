import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Clock, Shield, Zap, Phone, Mail } from 'lucide-react';
import Layout from '../components/Layout';
import CibilScoreWidget from '../components/CibilScoreWidget';
import LoanDocumentCTA from '../components/LoanDocumentCTA';
import BankLogo from '../components/BankLogo';
import { loanTypes, loanPartners, loanBenefits, applicationProcess, siteInfo } from '../data/siteData';

const Loans = () => {
  return (
    <Layout
      title="Education Loans"
      description="Get the best education loans for your study abroad journey with Axelis Loans. 25+ loan partners, competitive rates, and 100% free service."
      keywords="education loans, study abroad loans, student loans, loan partners, NBFC, bank loans, axelis loans"
    >

      {/* Hero Section - Space Theme */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white py-20 lg:py-32 overflow-hidden">
        {/* Cosmic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Cosmic Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-blue-300 text-sm font-bold rounded-full border border-blue-400/30">
                Education Financing Solutions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Axelis Loans - Your Gateway to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Education Financing</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              With 25+ loan partners including public banks, private banks, and NBFCs,
              we ensure you get the best education loan for your study abroad dreams
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-cyan-400">25+</div>
                <div className="text-sm text-gray-300">Loan Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-cyan-400">₹2Cr+</div>
                <div className="text-sm text-gray-300">Max Loan Amount</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products?redirect=zcf"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-500 hover:to-blue-600 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-cyan-400/20 hover:border-blue-400/40"
                style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
              >
                Apply Now - Start Journey
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <a
                href={`tel:${siteInfo.contact.phones[0]}`}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-800 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Axelis Loans?
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto animate-fadeInUp">
              We are one of a kind in the education loan segment with our extensive network and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanBenefits.map((benefit) => (
              <div key={benefit.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIBIL Score Check Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 text-sm font-bold rounded-full border border-blue-200">
                Credit Score Check
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Check Your Credit Score Before Applying
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A good CIBIL score improves your loan approval chances and helps secure better interest rates. Check your score for free before applying.
            </p>
          </div>

          <CibilScoreWidget />
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 text-sm font-bold rounded-full border border-blue-200">
                Loan Options
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Education Loans</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from various loan options tailored to your specific educational needs and financial situation
            </p>
          </div>

          {/* Main Content with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - Loan Types */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loanTypes.map((loan, index) => (
              <div key={loan.id} className={`group bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden ${
                index % 2 === 0 ? 'hover:bg-gradient-to-br hover:from-blue-50 hover:to-white' : 'hover:bg-gradient-to-br hover:from-yellow-50 hover:to-white'
              }`}>
                {/* Subtle cosmic effect */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center mb-6">
                  <div className={`text-4xl mr-4 p-3 rounded-xl ${
                    index % 2 === 0 ? 'bg-blue-100 group-hover:bg-blue-200' : 'bg-cyan-100 group-hover:bg-cyan-200'
                  } transition-colors duration-300`}>
                    {loan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {loan.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {loan.description}
                </p>
                <div className="space-y-4">
                  {loan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center group/feature">
                      <div className={`p-1 rounded-full mr-3 flex-shrink-0 ${
                        index % 2 === 0 ? 'bg-blue-100' : 'bg-cyan-100'
                      } group-hover/feature:scale-110 transition-transform duration-300`}>
                        <CheckCircle className={`${
                          index % 2 === 0 ? 'text-blue-500' : 'text-cyan-600'
                        }`} size={16} />
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 border-2 ${
                  index % 2 === 0 ? 'border-electric-400' : 'border-gold-400'
                } rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            ))}
              </div>

              {/* CTA Section - Space Theme */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-slate-800 via-blue-600 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                  {/* Cosmic background effects */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                      }}
                    ></div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Need Help Choosing the Right Loan?
                    </h3>
                    <p className="text-xl mb-6 opacity-90">
                      Our loan experts will help you find the perfect financing solution for your education goals
                    </p>
                    <Link
                      to="/products?redirect=zcf"
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 border border-blue-500/20 hover:border-cyan-400/40"
                      style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
                    >
                      Enroll in Student Plan
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <LoanDocumentCTA />
            </div>
          </div>
        </div>
      </section>

      {/* Loan Partners Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Loan Partners
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto animate-fadeInUp">
              We work with 25+ leading financial institutions to get you the best loan deals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanPartners.map((partner) => (
              <div key={partner.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-4">
                  <BankLogo bankName={partner.name} className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {partner.name}
                </h3>
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-4 font-medium">
                  {partner.type}
                </div>
                <div className="space-y-2">
                  {partner.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-800 dark:text-gray-200">
                      • {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 animate-fadeInUp">
              Our trusted financial partners for your education loan needs
            </p>
            <Link
              to="/products?redirect=zcf"
              className="inline-flex items-center px-8 py-3 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-semibold rounded-lg transition-colors shadow-mono dark:shadow-mono-dark"
            >
              Get Started Today
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Simple Application Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes getting an education loan quick and hassle-free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicationProcess.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div className="text-3xl">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.step}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow for desktop */}
                {index < applicationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Space Theme */}
      <section className="py-20 bg-gradient-to-r from-slate-800 via-blue-600 to-slate-900 text-white relative overflow-hidden">
        {/* Cosmic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Cosmic Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Axelis Loans</span>?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Industry-leading loan solutions with unmatched success rates
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center">
              <div className="bg-blue-500/10 backdrop-blur-sm p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:bg-blue-500/20 border border-blue-500/20 group-hover:border-cyan-400/40 transition-all duration-300 transform group-hover:scale-110" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}>
                <Users className="text-blue-300 group-hover:text-cyan-300 transition-colors duration-300" size={40} />
              </div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">25+</div>
              <div className="text-blue-200 font-medium">Loan Partners</div>
              <div className="text-sm text-blue-300/80 mt-1">Banks & NBFCs</div>
            </div>

            <div className="group text-center">
              <div className="bg-blue-500/10 backdrop-blur-sm p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:bg-blue-500/20 border border-blue-500/20 group-hover:border-cyan-400/40 transition-all duration-300 transform group-hover:scale-110" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}>
                <Shield className="text-blue-300 group-hover:text-cyan-300 transition-colors duration-300" size={40} />
              </div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">100%</div>
              <div className="text-blue-200 font-medium">Success Rate</div>
              <div className="text-sm text-blue-300/80 mt-1">Guaranteed Approval</div>
            </div>

            <div className="group text-center">
              <div className="bg-blue-500/10 backdrop-blur-sm p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:bg-blue-500/20 border border-blue-500/20 group-hover:border-cyan-400/40 transition-all duration-300 transform group-hover:scale-110" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}>
                <Clock className="text-blue-300 group-hover:text-cyan-300 transition-colors duration-300" size={40} />
              </div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">7-15</div>
              <div className="text-blue-200 font-medium">Days Processing</div>
              <div className="text-sm text-blue-300/80 mt-1">Quick Approval</div>
            </div>

            <div className="group text-center">
              <div className="bg-blue-500/10 backdrop-blur-sm p-4 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:bg-blue-500/20 border border-blue-500/20 group-hover:border-cyan-400/40 transition-all duration-300 transform group-hover:scale-110" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}>
                <Zap className="text-blue-300 group-hover:text-cyan-300 transition-colors duration-300" size={40} />
              </div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">₹2Cr+</div>
              <div className="text-blue-200 font-medium">Max Loan Amount</div>
              <div className="text-sm text-blue-300/80 mt-1">Complete Financing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Need Help with Your Education Loan?
          </h2>
          <p className="text-xl text-gray-800 dark:text-gray-200 mb-8 animate-fadeInUp">
            Our loan experts are here to guide you through every step of the process
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Phone className="mx-auto mb-4 text-blue-600 dark:text-blue-400" size={32} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
              <div className="space-y-2">
                {siteInfo.contact.phones.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone}`}
                    className="block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Mail className="mx-auto mb-4 text-blue-600 dark:text-blue-400" size={32} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <div className="space-y-2">
                {siteInfo.contact.emails.map((email, index) => (
                  <a
                    key={index}
                    href={`mailto:${email}`}
                    className="block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Space Theme */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white relative overflow-hidden">
        {/* Cosmic background effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Education Loan?
          </h2>
          <p className="text-xl mb-8 text-gray-200 dark:text-gray-700 animate-fadeInUp">
            Get started with your free loan consultation today and take the first step toward your study abroad dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products?redirect=zcf"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors border border-blue-500/20 hover:border-cyan-400/40"
              style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
            >
              Apply Now - Start Journey
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <a
              href={`tel:${siteInfo.contact.phones[0]}`}
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-800 font-semibold rounded-lg transition-colors"
            >
              <Phone className="mr-2" size={20} />
              Call Now: {siteInfo.contact.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Loans;
