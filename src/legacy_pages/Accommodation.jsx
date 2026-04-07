import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Home, MapPin, Shield, Clock, Phone, Mail, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';
import { housingPartners, accommodationTypes, accommodationBenefits, housingProcess, siteInfo } from '../data/siteData';

const Accommodation = () => {
  // Logo mapping for accommodation partners using public folder paths
  const logoMap = {
    1: '/logos/ul logo.png',           // University Living
    2: '/logos/amber.png',             // Amber Student
    4: '/logos/casita.svg'             // Casita Student Accommodation
  };

  return (
    <Layout
      title="Student Accommodation"
      description="Find the perfect student accommodation for your study abroad journey with Axelis Housing. Trusted partners, free assistance, and wide range of options."
      keywords="student accommodation, student housing, study abroad housing, university living, amber student, student apartments"
    >
      {/* Hero Section - Space Theme */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white py-20 lg:py-32 overflow-hidden">
        {/* Cosmic Background Effects */}
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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 animate-pulse">Student Home</span>{' '}
              Abroad
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
              Secure comfortable and affordable student accommodation with our trusted housing partners
              including <span className="text-cyan-300 font-bold">University Living</span>, <span className="text-cyan-300 font-bold">Amber Student</span>, and <span className="text-cyan-300 font-bold">Casita</span>
            </p>
            <div className="flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-500 hover:via-blue-500 hover:to-blue-600 text-black font-bold rounded-xl transition-all duration-300 hover:scale-110 shadow-2xl border-2 border-cyan-400/30 hover:border-blue-400/50 text-lg animate-pulse hover:animate-none"
                style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(234, 179, 8, 0.3)' }}
              >
                <span className="mr-3">🏠 Get Free Housing Assistance</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/30 rounded-full mb-6">
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">Axelis for Housing?</span>
            </h2>
            <p className="text-lg md:text-xl text-black dark:text-black max-w-4xl mx-auto leading-relaxed font-medium">
              We make finding and securing student accommodation simple, safe, and completely free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodationBenefits.map((benefit) => (
              <div key={benefit.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Types Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full mb-6">
              <span className="text-sm font-semibold text-green-800 dark:text-green-300">ACCOMMODATION OPTIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Types of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Student Accommodation</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore different housing options to find what suits your lifestyle and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {accommodationTypes.map((type) => (
              <div key={type.id} className="group bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-blue-50/50 dark:from-green-900/20 dark:via-transparent dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="text-6xl mr-6 p-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/40 dark:to-blue-900/40 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 transition-all duration-300">
                        {type.title}
                      </h3>
                      <div className="text-2xl text-green-600 dark:text-green-400 font-bold bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-4 py-2 rounded-lg border border-green-200 dark:border-green-700">
                        {type.priceRange}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-8 leading-relaxed text-lg font-medium">
                    {type.description}
                  </p>
                  <div className="space-y-4">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg py-3 px-4 border border-green-200 dark:border-green-700 hover:scale-105 transition-transform duration-200">
                        <CheckCircle className="text-green-600 dark:text-green-400 mr-4 flex-shrink-0" size={22} />
                        <span className="text-gray-800 dark:text-gray-200 font-medium text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Housing Partners Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-yellow-100 dark:from-blue-900/30 dark:to-yellow-900/30 rounded-full mb-6">
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">TRUSTED PARTNERS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Housing Partners</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We've partnered with leading student housing providers to offer you the best accommodation options worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {housingPartners.map((partner) => (
              <div key={partner.id} className="group bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 text-center border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 relative overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-yellow-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-yellow-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Logo highlight background */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-yellow-100/50 dark:from-blue-900/20 dark:to-yellow-900/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-24 h-24 mx-auto mb-4 bg-white dark:bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-gray-300 hover:shadow-xl hover:scale-105 transition-all duration-300 p-3 group-hover:border-blue-400 dark:group-hover:border-blue-400 hover:bg-gray-50"
                      style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)' }}
                    >
                      <img
                        src={logoMap[partner.id]}
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105 rounded-lg"
                        style={{
                          filter: 'contrast(1.2) saturate(1.3) brightness(1.1)',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          dropShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                        onError={(e) => {
                          console.log(`Failed to load logo for ${partner.name}:`, logoMap[partner.id]);
                          // Fallback to a text-based logo
                          e.target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center text-2xl font-bold text-gray-600';
                          fallback.textContent = partner.name.split(' ').map(word => word[0]).join('');
                          e.target.parentElement.appendChild(fallback);
                        }}
                      />
                    </a>
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105"
                    >
                      {partner.name}
                      <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </h3>
                  <p className="text-black dark:text-gray-300 mb-4 text-sm leading-relaxed font-medium">
                    {partner.description}
                  </p>
                </div>

                <div className="relative z-10 mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    Key Features
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  </h4>
                  <div className="space-y-3">
                    {partner.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg py-2 px-3 border border-green-200 dark:border-green-700">
                        <CheckCircle className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0" size={16} />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></div>
                    Specialties
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></div>
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {partner.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-yellow-100 dark:from-blue-900/40 dark:to-yellow-900/40 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-600 hover:scale-105 transition-transform duration-200 shadow-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-4">
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-blue-500 hover:border-blue-400"
                  >
                    <span className="mr-3">Visit Website</span>
                    <ExternalLink size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How We Help You Find Housing
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our step-by-step process ensures you find and secure the perfect accommodation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {housingProcess.map((step, index) => (
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
                {index < housingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Space Theme */}
      <section className="py-16 bg-gradient-to-r from-slate-800 via-blue-600 to-slate-900 text-white relative overflow-hidden">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Home className="mx-auto mb-4 text-cyan-400" size={48} />
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-gray-200">Trusted Partners</div>
            </div>
            <div>
              <MapPin className="mx-auto mb-4 text-cyan-400" size={48} />
              <div className="text-3xl font-bold mb-2">29+</div>
              <div className="text-gray-200">Countries Covered</div>
            </div>
            <div>
              <Shield className="mx-auto mb-4 text-cyan-400" size={48} />
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-gray-200">Verified Properties</div>
            </div>
            <div>
              <Clock className="mx-auto mb-4 text-cyan-400" size={48} />
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-gray-200">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
            Need Help Finding Accommodation?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Our housing specialists are here to help you find the perfect home away from home
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <Phone className="mx-auto mb-4 text-green-600 dark:text-green-400" size={32} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Call Our Housing Team</h3>
              <div className="space-y-2">
                {siteInfo.contact.phones.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone}`}
                    className="block text-green-600 dark:text-green-400 hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <Mail className="mx-auto mb-4 text-green-600 dark:text-green-400" size={32} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <div className="space-y-2">
                {siteInfo.contact.emails.map((email, index) => (
                  <a
                    key={index}
                    href={`mailto:${email}`}
                    className="block text-green-600 dark:text-green-400 hover:underline"
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
            Ready to Secure Your Student Accommodation?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Get started with our free housing assistance and find your perfect home abroad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg border border-cyan-400/20 hover:border-blue-400/40"
              style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
            >
              Get Free Housing Help
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <a
              href={`tel:${siteInfo.contact.phones[0]}`}
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 font-bold rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Phone className="mr-2" size={20} />
              Call: {siteInfo.contact.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Accommodation;
