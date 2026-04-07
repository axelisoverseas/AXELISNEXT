import { CheckCircle, X, Star, Award, DollarSign, Globe } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const PlanComparison = () => {
  const comparisonData = [
    {
      feature: "Initial Payment",
      zcf: { value: "₹9,999 (Refundable)", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> },
      ztf: { value: "₹19,999 (Upfront)", highlight: true, icon: <DollarSign className="text-blue-500" size={20} /> }
    },
    {
      feature: "Payment Model",
      zcf: { value: "Full refund on visa approval or no offer", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> },
      ztf: { value: "₹1.8L Success Fee after offer", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> }
    },
    {
      feature: "Risk Protection",
      zcf: { value: "Refund guarantee", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> },
      ztf: { value: "Pay only on success", highlight: true, icon: <Award className="text-cyan-500" size={20} /> }
    },
    {
      feature: "Tuition Fee Savings",
      zcf: { value: "Standard Programs", highlight: false, icon: <Globe className="text-blue-500" size={20} /> },
      ztf: { value: "Save ₹80+ Lakhs", highlight: true, icon: <Award className="text-cyan-500" size={20} /> }
    },
    {
      feature: "Country Coverage",
      zcf: { value: "All 29+ Countries", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> },
      ztf: { value: "European Countries", highlight: true, icon: <Star className="text-cyan-500" size={20} /> }
    },
    {
      feature: "University Access",
      zcf: { value: "Global Universities", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> },
      ztf: { value: "50+ Tuition-Free Unis", highlight: true, icon: <Star className="text-cyan-500" size={20} /> }
    },
    {
      feature: "Application Support",
      zcf: { value: "Complete Assistance", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> },
      ztf: { value: "Priority Support", highlight: true, icon: <Star className="text-cyan-500" size={20} /> }
    },
    {
      feature: "Visa Assistance",
      zcf: { value: "Standard Processing", highlight: true, icon: <CheckCircle className="text-green-500" size={20} /> },
      ztf: { value: "Fast-Track Processing", highlight: true, icon: <Star className="text-cyan-500" size={20} /> }
    }
  ];

  return (
    <AnimatedSection className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            ZCF vs ZTF: Which Student Plan is Right for You?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-2">
            Compare our student plans to find the perfect fit for your study abroad journey
          </p>
          <div className="text-sm text-gray-600 font-medium">
            <span className="inline-flex items-center gap-2">
              <Award className="text-cyan-500" size={16} />
              By Axelis Overseas
            </span>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Table Header - Space Theme */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-slate-800 via-blue-600 to-slate-900 text-white relative overflow-hidden">
            {/* Cosmic background effects */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              ></div>
            </div>
            <div className="relative z-10 p-6 text-center">
              <h3 className="text-lg font-bold">Features</h3>
            </div>
            <div className="relative z-10 p-6 text-center border-l border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold">ZCF Student Plan</h3>
              </div>
              <p className="text-sm text-blue-200">Most Popular</p>
            </div>
            <div className="p-6 text-center border-l border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold">ZTF Student Plan</h3>
              </div>
              <p className="text-sm text-cyan-200">Premium Gold Service</p>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-6 font-semibold text-gray-900 bg-gray-50">
                  {row.feature}
                </div>
                <div className={`p-6 text-center border-l border-gray-200 ${row.zcf.highlight ? 'bg-blue-50' : ''
                  }`}>
                  <div className="flex items-center justify-center gap-2">
                    {row.zcf.icon}
                    <span className={`font-medium ${row.zcf.highlight ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                      {row.zcf.value}
                    </span>
                  </div>
                </div>
                <div className={`p-6 text-center border-l border-gray-200 ${row.ztf.highlight ? 'bg-gradient-to-r from-cyan-50 to-yellow-100' : ''
                  }`}>
                  <div className="flex items-center justify-center gap-2">
                    {row.ztf.icon}
                    <span className={`font-medium ${row.ztf.highlight ? 'text-cyan-700' : 'text-gray-700'
                      }`}>
                      {row.ztf.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Helper - Space Theme */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 relative overflow-hidden">
            {/* Subtle cosmic effect */}
            <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-sm animate-pulse"></div>
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-blue-600" size={24} />
              Choose ZCF if you want:
            </h3>
            <ul className="space-y-3 text-blue-700">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>100% Refundable ₹9,999 Deposit</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Access to all 29+ countries</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Complete application & visa assistance</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl border border-cyan-200 relative overflow-hidden">
            {/* Subtle cosmic effect */}
            <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-orange-400/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
            <h3 className="text-xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
              <Star className="text-cyan-600" size={24} />
              Choose ZTF if you want:
            </h3>
            <ul className="space-y-3 text-cyan-700">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Refundable ₹19,999 Onboarding Fee</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Success Fee ONLY after receiving your offer</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Save ₹80+ lakhs in tuition fees</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Premium public European university access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PlanComparison;
