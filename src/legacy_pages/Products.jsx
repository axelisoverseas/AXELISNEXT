
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Phone, Mail, Clock, Users, Award, TrendingUp, Globe2 } from 'lucide-react';
import Layout from '../components/Layout';
import AnimatedSection from '../components/AnimatedSection';
import InstagramSuccessStories from '../components/InstagramSuccessStories';
import AnimatedCounter from '../components/AnimatedCounter';
import RazorpayEmbed from '../components/RazorpayEmbed';
import PlanComparison from '../components/PlanComparison';

const Products = () => {
  return (
    <Layout
      title="Student Plans"
      description="Explore our Zero Consultation Fee Student Plan and Zero Tuition Fee Student Plan. Transparent pricing, guaranteed results, and comprehensive study abroad support."
      keywords="study abroad packages, zero consultation fee, zero tuition fee, education charter, study abroad services, university admission"
    >
      {/* Hero Section - Space Theme */}
      <section className="relative bg-gradient-to-br from-slate-800 via-blue-600 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-blue-900/40 to-slate-900/60"></div>

        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Floating cosmic elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>



        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeInUp">
              Choose Your Study Abroad{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 drop-shadow-lg">
                Student Plan
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto animate-fadeInUp delay-200">
              No hidden charges, transparent pricing, guaranteed results, and comprehensive support for your international education journey
            </p>

            {/* Enhanced Statistics with Animated Counters */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <CheckCircle size={20} className="text-cyan-400" />
                <span className="text-lg font-semibold">
                  <AnimatedCounter end={2000} suffix="+" goldAccent /> Students Placed
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <Globe2 size={20} className="text-cyan-400" />
                <span className="text-lg font-semibold">
                  <AnimatedCounter end={29} suffix="+" goldAccent /> Countries
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <Award size={20} className="text-cyan-400" />
                <span className="text-lg font-semibold">
                  <AnimatedCounter end={2000} suffix="+" goldAccent /> Scholarships
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <TrendingUp size={20} className="text-cyan-400" />
                <span className="text-lg font-semibold">
                  <AnimatedCounter end={100} suffix="%" goldAccent /> Success Rate
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookDirectCTA
                text="Get Free Consultation"
                size="xl"
                className="shadow-lg hover:shadow-xl"
              />
              <button
                onClick={() => document.getElementById('charter-comparison')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Compare Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorative Elements - Space Theme */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Student Plans
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fadeInUp">
              Choose the perfect package for your study abroad journey. Both plans come with our success guarantee, comprehensive support, and no hidden charges.
            </p>

            {/* Key Value Proposition */}
            <div className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 px-6 py-3 rounded-full border border-cyan-300">
              <Award className="text-cyan-600" size={20} />
              <span className="text-black font-semibold">No Hidden Charges - 100% Transparent Pricing</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 border-2 animate-fadeInUp ${
                  product.popular ? 'border-blue-500 shadow-blue-500/20' : product.premium ? 'border-cyan-500 shadow-cyan-500/20' : 'border-gray-200'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Popular/Premium Badge */}
                {(product.popular || product.premium) && (
                  <div className={`absolute top-0 right-0 ${
                    product.popular ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-cyan-500 to-cyan-600'
                  } text-white px-4 py-2 rounded-bl-lg font-semibold text-sm shadow-lg`}>
                    {product.popular ? 'Most Popular' : 'Premium'}
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="text-4xl mb-4">{product.icon}</div>
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-700 mb-4 animate-fadeInUp">
                      {product.subtitle}
                    </p>

                    {/* Pricing Display */}
                    <div className="mb-6">
                      <div className="text-center mb-4">
                        {/* Original Price with Strikethrough */}
                        <div className="mb-2">
                          <span className="text-gray-500 line-through text-lg">
                            {product.originalPrice}
                          </span>
                          <span className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                            50% OFF
                          </span>
                        </div>

                        {/* Current Price */}
                        <div className={`inline-block ${
                          product.popular
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                            : 'bg-gradient-to-r from-cyan-500 to-cyan-600'
                        } text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                          {product.currentPrice} {product.paymentModel === 'Pay After Offer' ? 'Upfront' : product.paymentModel}
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border shadow-inner ${
                        product.paymentModel === 'Pay After Offer'
                          ? 'bg-gradient-to-r from-cyan-50 to-yellow-100 border-cyan-300'
                          : product.popular ? 'bg-blue-50 border-blue-200' : 'bg-cyan-50 border-cyan-200'
                      }`}>
                        <p className={`font-semibold text-center mb-2 ${
                          product.paymentModel === 'Pay After Offer'
                            ? 'text-cyan-800'
                            : product.popular ? 'text-blue-800' : 'text-cyan-800'
                        }`}>
                          {product.paymentDescription}
                        </p>

                        <p className={`text-sm text-center leading-relaxed ${
                          product.paymentModel === 'Pay After Offer'
                            ? 'text-cyan-600'
                            : product.popular ? 'text-blue-600' : 'text-cyan-600'
                        }`}>
                          {product.paymentDetails}
                        </p>
                      </div>

                      {product.popular && (
                        <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mt-3 shadow-lg">
                          Most Popular
                        </div>
                      )}
                      {product.premium && (
                        <div className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold mt-3 shadow-lg">
                          Premium Service
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-black mb-4">Key Features:</h4>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className={`${
                            product.popular ? 'text-blue-500' : 'text-black'
                          } mt-0.5 flex-shrink-0`} size={16} />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Country Coverage */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-black mb-4 flex items-center">
                      <Globe2 className={`${
                        product.popular ? 'text-blue-500' : 'text-black'
                      } mr-2`} size={16} />
                      Country Coverage ({product.countries?.length || 0}+ Countries)
                    </h4>
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {(product.countries || []).slice(0, 12).map((country, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          title={country.name}
                        >
                          <span className="text-lg mb-1">{country.flag}</span>
                          <span className="text-xs text-gray-600 text-center leading-tight">
                            {country.name.length > 8 ? country.name.substring(0, 8) + '...' : country.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    {(product.countries?.length || 0) > 12 && (
                      <div className="text-center">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          +{(product.countries?.length || 0) - 12} more countries
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {/* Razorpay Payment Button - For Zero Consultation Fee Student Plan */}
                    {product.popular && (
                      <div className="w-full flex flex-col">
                        <RazorpayEmbed url="https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view" text={"Pay Now - ₹9,999"} />
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Secure payment via Razorpay • 100% Refundable
                        </p>
                      </div>
                    )}

                    {/* Razorpay Payment Button - For Zero Tuition Fee Student Plan */}
                    {product.premium && (
                      <div className="w-full flex flex-col">
                        <RazorpayEmbed url="https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view" text={"Pay Now - ₹19,999"} />
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Secure payment via Razorpay • Pay After Offer
                        </p>
                      </div>
                    )}

                    {/* Contact Button */}
                    <Link
                      to="/contact"
                      className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        product.popular
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-yellow-700'
                      }`}
                    >
                      Get Started Today
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Zero Consultation Fee Student Plan Enrollment Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-blue-200">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
                START YOUR JOURNEY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Zero Consultation Fee Student Plan Enrollment
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                Begin your study abroad journey with our zero consultation fee. Get comprehensive guidance, university shortlisting, application support, and visa assistance—all with a 100% refundable deposit.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">100% Refundable</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Expert Guidance</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">29+ Countries</span>
                </div>
              </div>
            </div>

            {/* Enrollment Button */}
            <div className="flex justify-center mb-6">
              <div className="w-full md:w-96">
                <RazorpayEmbed 
                  url="https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view" 
                  text="Enroll Now - ₹9,999" 
                  size="large"
                />
                <p className="text-xs text-gray-500 text-center mt-3">
                  Secure payment via Razorpay • Instant enrollment • 100% Refundable upon visa approval
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Expert Counseling</h3>
                <p className="text-sm text-gray-600">Dedicated counselor for personalized guidance throughout your journey</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Global Network</h3>
                <p className="text-sm text-gray-600">Access to 29+ countries and 5000+ partner universities worldwide</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Complete Support</h3>
                <p className="text-sm text-gray-600">From application to visa approval, we handle every step</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Country Coverage Section */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Global Study Destinations
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our comprehensive network of 29+ countries offering world-class education opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Zero Consultation Fee Student Plan Enrollment Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Zero Consultation Fee Student Plan
                </h3>
                <p className="text-gray-600 mb-4">
                  All Countries Including English-Speaking Destinations
                </p>
                <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {allCountries.length} Countries
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                {allCountries.map((country, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors hover:scale-105 transform duration-200"
                    title={country.name}
                  >
                    <span className="text-2xl mb-2">{country.flag}</span>
                    <span className="text-xs text-gray-700 text-center font-medium">
                      {country.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero Tuition Fee Student Plan Enrollment Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-cyan-200">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Zero Tuition Fee Student Plan
                </h3>
                <p className="text-gray-600 mb-4">
                  European Countries with Tuition-Free Universities
                </p>
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {europeanCountries.length} Countries
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {europeanCountries.map((country, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors hover:scale-105 transform duration-200"
                    title={country.name}
                  >
                    <span className="text-2xl mb-2">{country.flag}</span>
                    <span className="text-xs text-gray-700 text-center font-medium">
                      {country.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose Our Student Plans?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fadeInUp">
              Our student plans are designed with your success in mind, offering transparency, support, and guaranteed results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productBenefits.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-300 group hover:transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Student Plan Comparison Section */}
      <div id="student-plan-comparison">
        <PlanComparison />
      </div>

      {/* Visual Testimonial Carousel */}
      <VisualTestimonialCarousel />

      {/* Success Stories Section */}
      <InstagramSuccessStories />

      {/* Enhanced CTA Section - Space Theme */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-blue-900/30"></div>

        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
              Success Story
            </span>
            ?
          </h2>
          <p className="text-xl mb-8 text-gray-100 animate-fadeInUp max-w-3xl mx-auto">
            Join <AnimatedCounter end={2000} suffix="+" className="text-cyan-400 font-bold" /> students who have successfully started their study abroad journey with our student plans.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              to="/contact"
              className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-yellow-700 text-black px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center shadow-2xl hover:shadow-cyan-500/25 hover:scale-110 transform"
            >
              <Phone className="mr-3 group-hover:animate-pulse" size={24} />
              Get FREE Consultation Now
            </Link>
            <a
              href={`mailto:${siteInfo.contact.emails[0]}`}
              className="group border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center shadow-2xl hover:shadow-white/25 hover:scale-110 transform"
            >
              <Mail className="mr-3 group-hover:animate-pulse" size={24} />
              Email Our Experts
            </a>
          </div>

          {/* Enhanced Feature Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Clock size={20} className="text-cyan-400" />
              <div className="text-left">
                <div className="font-semibold">Quick Response</div>
                <div className="text-sm text-gray-300">Within 24 hours</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Users size={20} className="text-cyan-400" />
              <div className="text-left">
                <div className="font-semibold">Expert Counselors</div>
                <div className="text-sm text-gray-300">5+ years experience</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Shield size={20} className="text-cyan-400" />
              <div className="text-left">
                <div className="font-semibold">Success Guarantee</div>
                <div className="text-sm text-gray-300">100% commitment</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                <AnimatedCounter end={29} suffix="+" />
              </div>
              <div className="text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                <AnimatedCounter end={2000} suffix="+" />
              </div>
              <div className="text-sm">Scholarships</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
