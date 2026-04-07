import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, BookOpen, ExternalLink, Play, Award, TrendingUp, Users, Globe } from 'lucide-react';
import Layout from '../components/Layout';
import { blogPosts } from '../data/siteData';
import { StartJourneyCTA } from '../components/CTAButton';

// Helper function to handle video links
const openVideoLink = (videoId) => {
  if (videoId) {
    window.open(`https://youtu.be/${videoId}`, '_blank', 'noopener,noreferrer');
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  
  // Find the blog post by slug
  const post = blogPosts.find(p => p.link.includes(slug));
  
  if (!post) {
    return (
      <Layout title="Blog Post Not Found">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Sample comprehensive blog content
  const getBlogContent = (slug) => {
    switch (slug) {
      case 'uk-study-guide':
        return {
          title: "The Ultimate Guide to Studying in the UK: Your Gateway to World-Class Education",
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="text-xl text-gray-600 mb-8">Dreaming of studying at prestigious universities like Oxford, Cambridge, or Imperial College London? The UK offers world-renowned education, rich cultural heritage, and incredible career opportunities. Here's your complete roadmap to making it happen.</p>
              
              <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">🎓 Why Choose the UK for Your Studies?</h2>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8">
                <ul class="space-y-3">
                  <li class="flex items-start"><span class="text-blue-600 mr-2">✓</span> Home to 4 of the world's top 10 universities</li>
                  <li class="flex items-start"><span class="text-blue-600 mr-2">✓</span> Shorter course durations (1-year Master's programs)</li>
                  <li class="flex items-start"><span class="text-blue-600 mr-2">✓</span> Post-study work visa for 2-3 years</li>
                  <li class="flex items-start"><span class="text-blue-600 mr-2">✓</span> Rich cultural diversity and history</li>
                  <li class="flex items-start"><span class="text-blue-600 mr-2">✓</span> Gateway to Europe and global opportunities</li>
                </ul>
              </div>

              <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">📋 Step-by-Step Application Process</h2>
              <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">Phase 1: Preparation (6-12 months before)</h3>
                  <ul class="space-y-2 text-gray-600">
                    <li>• Research universities and courses</li>
                    <li>• Take IELTS/TOEFL (minimum 6.5 overall)</li>
                    <li>• Prepare academic transcripts</li>
                    <li>• Draft personal statement</li>
                  </ul>
                </div>
                <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">Phase 2: Application (3-6 months before)</h3>
                  <ul class="space-y-2 text-gray-600">
                    <li>• Submit UCAS application (undergrad) or direct application (postgrad)</li>
                    <li>• Pay application fees (£20-75)</li>
                    <li>• Attend interviews if required</li>
                    <li>• Receive offers and choose firm/insurance choices</li>
                  </ul>
                </div>
              </div>

              <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">💰 Cost Breakdown & Financial Planning</h2>
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-8">
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">£15,000-45,000</div>
                    <div class="text-sm text-gray-600">Annual Tuition Fees</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">£12,000-15,000</div>
                    <div class="text-sm text-gray-600">Annual Living Costs</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">£1,500-3,000</div>
                    <div class="text-sm text-gray-600">Visa & Other Costs</div>
                  </div>
                </div>
              </div>

              <div class="bg-cyan-50 border-l-4 border-cyan-400 p-6 mb-8">
                <h3 class="text-lg font-semibold text-cyan-800 mb-2">💡 Pro Tip from Axelis</h3>
                <p class="text-cyan-700">With our Zero Consultation Fee Student Plan, you get expert guidance on scholarships that can reduce your costs by up to £10,000 per year. We've helped students secure over ₹3 crores worth of scholarships!</p>
              </div>

              <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">🏆 Top Universities & Popular Courses</h2>
              <div class="overflow-x-auto mb-8">
                <table class="w-full border-collapse border border-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="border border-gray-300 px-4 py-2 text-left">University</th>
                      <th class="border border-gray-300 px-4 py-2 text-left">Popular Courses</th>
                      <th class="border border-gray-300 px-4 py-2 text-left">World Ranking</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 font-semibold">University of Oxford</td>
                      <td class="border border-gray-300 px-4 py-2">Medicine, Law, PPE, Engineering</td>
                      <td class="border border-gray-300 px-4 py-2">#1 (Times Higher Education)</td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="border border-gray-300 px-4 py-2 font-semibold">University of Cambridge</td>
                      <td class="border border-gray-300 px-4 py-2">Natural Sciences, Mathematics, Computer Science</td>
                      <td class="border border-gray-300 px-4 py-2">#3 (QS World Rankings)</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 font-semibold">Imperial College London</td>
                      <td class="border border-gray-300 px-4 py-2">Engineering, Medicine, Business</td>
                      <td class="border border-gray-300 px-4 py-2">#6 (QS World Rankings)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">🛂 Visa Process Made Simple</h2>
              <div class="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 class="text-xl font-semibold text-blue-900 mb-4">Student Visa (Tier 4) Requirements:</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <ul class="space-y-2 text-blue-800">
                    <li>• Confirmation of Acceptance for Studies (CAS)</li>
                    <li>• Financial proof (£1,334/month for living costs)</li>
                    <li>• English language proficiency</li>
                    <li>• Academic qualifications</li>
                  </ul>
                  <ul class="space-y-2 text-blue-800">
                    <li>• Tuberculosis test (if applicable)</li>
                    <li>• Passport and photographs</li>
                    <li>• Visa application fee (£348)</li>
                    <li>• Immigration Health Surcharge (£624/year)</li>
                  </ul>
                </div>
              </div>

              <div class="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-8 rounded-xl mb-8 text-center">
                <h3 class="text-2xl font-bold mb-4">🚀 Ready to Start Your UK Journey?</h3>
                <p class="text-lg mb-6">Join 500+ students who've successfully made it to top UK universities with Axelis guidance!</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Book Free Consultation</a>
                  <a href="/testimonials" class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">Read Success Stories</a>
                </div>
              </div>
            </div>
          `
        };

      case 'canada-scholarships':
        return {
          title: "Scholarship Opportunities in Canada: Your Complete Guide to Funding Your Education",
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="text-xl text-gray-600 mb-8">Canada offers some of the world's most generous scholarship opportunities for international students. With over CAD $350 million in scholarships available annually, your dream of studying in Canada can become an affordable reality. Here's your comprehensive guide to securing funding for your Canadian education.</p>

              <div class="bg-red-50 p-6 rounded-xl mb-8 border border-red-200">
                <h3 class="text-xl font-semibold text-red-900 mb-4">🍁 Why Canada for Scholarships?</h3>
                <ul class="text-red-800 space-y-2">
                  <li>• Over CAD $350 million in scholarships available annually</li>
                  <li>• Government-funded programs for international students</li>
                  <li>• University-specific merit and need-based awards</li>
                  <li>• Post-graduation work permits up to 3 years</li>
                  <li>• Pathway to permanent residency</li>
                </ul>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Government Scholarships</h2>

              <div class="space-y-6 mb-8">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 class="text-xl font-semibold text-blue-900 mb-3">🏛️ Vanier Canada Graduate Scholarships</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-blue-800 mb-2">Award Value</h4>
                      <p class="text-blue-700">CAD $50,000 per year for 3 years</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-blue-800 mb-2">Eligibility</h4>
                      <p class="text-blue-700">PhD students in any field</p>
                    </div>
                  </div>
                  <p class="text-blue-800 mb-3">Canada's most prestigious doctoral scholarship program, recognizing academic excellence, research potential, and leadership.</p>
                  <div class="bg-blue-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-900 mb-2">Application Requirements:</h5>
                    <ul class="text-blue-800 text-sm space-y-1">
                      <li>• Nominated by Canadian institution</li>
                      <li>• Exceptional academic record</li>
                      <li>• Research proposal</li>
                      <li>• Leadership experience</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 class="text-xl font-semibold text-green-900 mb-3">🎓 Canada Graduate Scholarships (CGS)</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-green-800 mb-2">Master's (CGS-M)</h4>
                      <p class="text-green-700">CAD $17,500 for 1 year</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-green-800 mb-2">Doctoral (CGS-D)</h4>
                      <p class="text-green-700">CAD $35,000 for 3 years</p>
                    </div>
                  </div>
                  <p class="text-green-800 mb-3">Supporting high-caliber students in research-based graduate programs.</p>
                </div>

                <div class="bg-gradient-to-br from-blue-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <h3 class="text-xl font-semibold text-purple-900 mb-3">🌟 Banting Postdoctoral Fellowships</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-purple-800 mb-2">Award Value</h4>
                      <p class="text-purple-700">CAD $70,000 per year for 2 years</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-purple-800 mb-2">Eligibility</h4>
                      <p class="text-purple-700">Recent PhD graduates</p>
                    </div>
                  </div>
                  <p class="text-purple-800">For postdoctoral researchers who will contribute to Canada's economic, social, and research-based growth.</p>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">University-Specific Scholarships</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-cyan-50 p-6 rounded-xl border border-cyan-200">
                  <h3 class="text-lg font-semibold text-cyan-900 mb-3">🏆 University of Toronto</h3>
                  <ul class="text-cyan-800 space-y-2 text-sm">
                    <li>• <strong>Lester B. Pearson Scholarships:</strong> Full tuition + living expenses</li>
                    <li>• <strong>National Scholarship Program:</strong> CAD $7,500</li>
                    <li>• <strong>International Scholar Awards:</strong> CAD $5,000-$10,000</li>
                  </ul>
                </div>

                <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 class="text-lg font-semibold text-blue-900 mb-3">🍁 University of British Columbia</h3>
                  <ul class="text-blue-800 space-y-2 text-sm">
                    <li>• <strong>International Major Entrance Scholarship:</strong> CAD $30,000</li>
                    <li>• <strong>Outstanding International Student Award:</strong> CAD $10,000</li>
                    <li>• <strong>Graduate Global Leadership Fellowship:</strong> Full funding</li>
                  </ul>
                </div>

                <div class="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 class="text-lg font-semibold text-green-900 mb-3">🎯 McGill University</h3>
                  <ul class="text-green-800 space-y-2 text-sm">
                    <li>• <strong>McGill Entrance Scholarships:</strong> CAD $3,000-$12,000</li>
                    <li>• <strong>Graduate Excellence Fellowship:</strong> CAD $25,000</li>
                    <li>• <strong>International Student Scholarships:</strong> Various amounts</li>
                  </ul>
                </div>

                <div class="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 class="text-lg font-semibold text-red-900 mb-3">⭐ University of Waterloo</h3>
                  <ul class="text-red-800 space-y-2 text-sm">
                    <li>• <strong>International Student Entrance Scholarships:</strong> CAD $2,000-$10,000</li>
                    <li>• <strong>President's Scholarship:</strong> CAD $2,000</li>
                    <li>• <strong>Co-op Program Scholarships:</strong> Various amounts</li>
                  </ul>
                </div>
              </div>

              <div class="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-xl mb-8 text-center">
                <h3 class="text-2xl font-bold mb-4">🍁 Ready to Secure Your Canadian Scholarship?</h3>
                <p class="text-lg mb-6">Join 200+ students who've secured over CAD $2 million in scholarships with Axelis guidance!</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Scholarship Guidance</a>
                  <a href="/testimonials" class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">Success Stories</a>
                </div>
              </div>
            </div>
          `
        };

      case 'part-time-work':
        return {
          title: "Part-time Work Options for International Students: Your Guide to Earning While Learning",
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="text-xl text-gray-600 mb-8">Studying abroad can be expensive, but part-time work opportunities can help you manage costs while gaining valuable experience. Here's your comprehensive guide to working as an international student, covering regulations, opportunities, and tips for success.</p>

              <div class="bg-green-50 p-6 rounded-xl mb-8 border border-green-200">
                <h3 class="text-xl font-semibold text-green-900 mb-4">💼 Benefits of Part-time Work</h3>
                <ul class="text-green-800 space-y-2">
                  <li>• Supplement your income and reduce financial burden</li>
                  <li>• Gain valuable work experience and skills</li>
                  <li>• Improve language skills and cultural understanding</li>
                  <li>• Build professional networks for future career opportunities</li>
                  <li>• Enhance your resume with international work experience</li>
                </ul>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Work Regulations by Country</h2>

              <div class="space-y-6 mb-8">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 class="text-xl font-semibold text-blue-900 mb-3">🇬🇧 United Kingdom</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-blue-800 mb-2">Work Hours</h4>
                      <p class="text-blue-700">20 hours/week during studies, full-time during holidays</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-blue-800 mb-2">Minimum Wage</h4>
                      <p class="text-blue-700">£10.42/hour (National Living Wage)</p>
                    </div>
                  </div>
                  <p class="text-blue-800 mb-3">Student visa holders can work part-time without additional permits. Popular jobs include retail, hospitality, tutoring, and campus roles.</p>
                  <div class="bg-blue-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-900 mb-2">Restrictions:</h5>
                    <ul class="text-blue-800 text-sm space-y-1">
                      <li>• Cannot be self-employed or start a business</li>
                      <li>• Cannot work as a professional sportsperson</li>
                      <li>• Cannot work as an entertainer</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                  <h3 class="text-xl font-semibold text-red-900 mb-3">🇨🇦 Canada</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-red-800 mb-2">Work Hours</h4>
                      <p class="text-red-700">20 hours/week during studies, full-time during breaks</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-red-800 mb-2">Minimum Wage</h4>
                      <p class="text-red-700">CAD $15-$17/hour (varies by province)</p>
                    </div>
                  </div>
                  <p class="text-red-800 mb-3">Study permit holders can work on and off-campus. Co-op programs allow full-time work as part of studies.</p>
                </div>

                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-cyan-200">
                  <h3 class="text-xl font-semibold text-cyan-900 mb-3">🇦🇺 Australia</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-cyan-800 mb-2">Work Hours</h4>
                      <p class="text-cyan-700">48 hours per fortnight during studies</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-cyan-800 mb-2">Minimum Wage</h4>
                      <p class="text-cyan-700">AUD $21.38/hour</p>
                    </div>
                  </div>
                  <p class="text-cyan-800 mb-3">Student visa (subclass 500) allows part-time work. Unlimited hours during scheduled course breaks.</p>
                </div>

                <div class="bg-gradient-to-br from-blue-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <h3 class="text-xl font-semibold text-purple-900 mb-3">🇺🇸 United States</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-purple-800 mb-2">On-Campus Work</h4>
                      <p class="text-purple-700">20 hours/week during studies, full-time during breaks</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-purple-800 mb-2">Off-Campus Work</h4>
                      <p class="text-purple-700">Requires special authorization (CPT/OPT)</p>
                    </div>
                  </div>
                  <p class="text-purple-800 mb-3">F-1 students can work on-campus without additional permits. Off-campus work requires USCIS authorization.</p>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Popular Part-time Jobs</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 class="text-lg font-semibold text-blue-900 mb-3">🏫 On-Campus Jobs</h3>
                  <ul class="text-blue-800 space-y-2 text-sm">
                    <li>• <strong>Teaching Assistant:</strong> $12-20/hour</li>
                    <li>• <strong>Research Assistant:</strong> $10-18/hour</li>
                    <li>• <strong>Library Assistant:</strong> $10-15/hour</li>
                    <li>• <strong>Campus Tour Guide:</strong> $12-16/hour</li>
                    <li>• <strong>Student Support Services:</strong> $11-15/hour</li>
                  </ul>
                </div>

                <div class="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 class="text-lg font-semibold text-green-900 mb-3">🏪 Retail & Service</h3>
                  <ul class="text-green-800 space-y-2 text-sm">
                    <li>• <strong>Retail Sales Associate:</strong> $10-16/hour</li>
                    <li>• <strong>Cashier:</strong> $10-14/hour</li>
                    <li>• <strong>Customer Service Rep:</strong> $12-18/hour</li>
                    <li>• <strong>Food Service Worker:</strong> $10-15/hour + tips</li>
                    <li>• <strong>Barista:</strong> $11-16/hour + tips</li>
                  </ul>
                </div>

                <div class="bg-cyan-50 p-6 rounded-xl border border-cyan-200">
                  <h3 class="text-lg font-semibold text-cyan-900 mb-3">🍽️ Hospitality</h3>
                  <ul class="text-cyan-800 space-y-2 text-sm">
                    <li>• <strong>Server/Waiter:</strong> $8-12/hour + tips</li>
                    <li>• <strong>Hotel Front Desk:</strong> $12-18/hour</li>
                    <li>• <strong>Event Staff:</strong> $12-20/hour</li>
                    <li>• <strong>Kitchen Assistant:</strong> $10-15/hour</li>
                    <li>• <strong>Delivery Driver:</strong> $12-18/hour + tips</li>
                  </ul>
                </div>

                <div class="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h3 class="text-lg font-semibold text-purple-900 mb-3">💻 Freelance & Online</h3>
                  <ul class="text-purple-800 space-y-2 text-sm">
                    <li>• <strong>Tutoring:</strong> $15-30/hour</li>
                    <li>• <strong>Content Writing:</strong> $10-25/hour</li>
                    <li>• <strong>Graphic Design:</strong> $15-35/hour</li>
                    <li>• <strong>Translation Services:</strong> $15-25/hour</li>
                    <li>• <strong>Virtual Assistant:</strong> $10-20/hour</li>
                  </ul>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Tips for Finding Work</h2>

              <div class="space-y-6 mb-8">
                <div class="flex items-start">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Start with Your University</h4>
                    <p class="text-gray-700">Check your university's career center, job boards, and student employment office. On-campus jobs are often easier to obtain and more flexible with student schedules.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Prepare a Strong Resume</h4>
                    <p class="text-gray-700">Adapt your resume to local standards. Highlight relevant skills, education, and any previous work experience. Include volunteer work and extracurricular activities.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Network Actively</h4>
                    <p class="text-gray-700">Join student organizations, attend career fairs, and connect with professors and classmates. Many jobs are found through networking rather than job postings.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">4</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Use Online Job Platforms</h4>
                    <p class="text-gray-700">Utilize job search websites, university job portals, and apps like Indeed, LinkedIn, or country-specific platforms.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">5</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Be Flexible and Persistent</h4>
                    <p class="text-gray-700">Be open to different types of work and don't get discouraged by rejections. Keep applying and improving your applications based on feedback.</p>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-xl mb-8 text-center">
                <h3 class="text-2xl font-bold mb-4">💼 Ready to Start Your Work Journey?</h3>
                <p class="text-lg mb-6">Get expert guidance on work opportunities and visa regulations for international students!</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" class="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Work Guidance</a>
                  <a href="/testimonials" class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">Success Stories</a>
                </div>
              </div>
            </div>
          `
        };

      case 'education-loans':
        return {
          title: "Education Loan Guide for Study Abroad: Complete Financing Solutions",
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="text-xl text-gray-600 mb-8">Financing your international education doesn't have to be a barrier to your dreams. With the right education loan, you can access world-class education and pay it back over time. Here's your comprehensive guide to securing education loans for studying abroad.</p>

              <div class="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-200">
                <h3 class="text-xl font-semibold text-blue-900 mb-4">💰 Why Consider Education Loans?</h3>
                <ul class="text-blue-800 space-y-2">
                  <li>• Cover tuition fees, living expenses, and other study-related costs</li>
                  <li>• Flexible repayment options starting after graduation</li>
                  <li>• Build credit history for future financial needs</li>
                  <li>• Tax benefits on interest payments in many countries</li>
                  <li>• Access to better universities without upfront payment</li>
                </ul>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Types of Education Loans</h2>

              <div class="space-y-6 mb-8">
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 class="text-xl font-semibold text-green-900 mb-3">🏦 Secured Loans</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-green-800 mb-2">Interest Rate</h4>
                      <p class="text-green-700">8.5% - 11.5% per annum</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-green-800 mb-2">Loan Amount</h4>
                      <p class="text-green-700">Up to ₹1.5 crores</p>
                    </div>
                  </div>
                  <p class="text-green-800 mb-3">Requires collateral (property, fixed deposits, etc.). Lower interest rates and higher loan amounts.</p>
                  <div class="bg-green-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-green-900 mb-2">Collateral Options:</h5>
                    <ul class="text-green-800 text-sm space-y-1">
                      <li>• Residential or commercial property</li>
                      <li>• Fixed deposits or liquid funds</li>
                      <li>• Life insurance policies</li>
                      <li>• Government securities</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-cyan-200">
                  <h3 class="text-xl font-semibold text-cyan-900 mb-3">📋 Unsecured Loans</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-cyan-800 mb-2">Interest Rate</h4>
                      <p class="text-cyan-700">10.5% - 15% per annum</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-cyan-800 mb-2">Loan Amount</h4>
                      <p class="text-cyan-700">Up to ₹40-50 lakhs</p>
                    </div>
                  </div>
                  <p class="text-cyan-800 mb-3">No collateral required but higher interest rates. Based on co-applicant's income and credit score.</p>
                </div>

                <div class="bg-gradient-to-br from-blue-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <h3 class="text-xl font-semibold text-purple-900 mb-3">🌍 International Loans</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="font-semibold text-purple-800 mb-2">Interest Rate</h4>
                      <p class="text-purple-700">3% - 8% per annum</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-purple-800 mb-2">Loan Amount</h4>
                      <p class="text-purple-700">Up to $200,000</p>
                    </div>
                  </div>
                  <p class="text-purple-800">Loans from international lenders or banks in the destination country. Often require a co-signer.</p>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Top Education Loan Providers</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 class="text-lg font-semibold text-red-900 mb-3">🏛️ Public Sector Banks</h3>
                  <ul class="text-red-800 space-y-2 text-sm">
                    <li>• <strong>State Bank of India:</strong> Up to ₹1.5 crores</li>
                    <li>• <strong>Bank of Baroda:</strong> Up to ₹1.5 crores</li>
                    <li>• <strong>Canara Bank:</strong> Up to ₹1 crore</li>
                    <li>• <strong>Punjab National Bank:</strong> Up to ₹1.5 crores</li>
                  </ul>
                </div>

                <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 class="text-lg font-semibold text-blue-900 mb-3">🏢 Private Banks</h3>
                  <ul class="text-blue-800 space-y-2 text-sm">
                    <li>• <strong>HDFC Bank:</strong> Up to ₹1 crore</li>
                    <li>• <strong>ICICI Bank:</strong> Up to ₹1 crore</li>
                    <li>• <strong>Axis Bank:</strong> Up to ₹75 lakhs</li>
                    <li>• <strong>Kotak Mahindra Bank:</strong> Up to ₹1.5 crores</li>
                  </ul>
                </div>

                <div class="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 class="text-lg font-semibold text-green-900 mb-3">💳 NBFCs</h3>
                  <ul class="text-green-800 space-y-2 text-sm">
                    <li>• <strong>Avanse Financial Services:</strong> Up to ₹1.5 crores</li>
                    <li>• <strong>Credila Financial Services:</strong> Up to ₹1 crore</li>
                    <li>• <strong>InCred:</strong> Up to ₹1 crore</li>
                    <li>• <strong>Auxilo Finserve:</strong> Up to ₹1.5 crores</li>
                  </ul>
                </div>

                <div class="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h3 class="text-lg font-semibold text-purple-900 mb-3">🌐 International Options</h3>
                  <ul class="text-purple-800 space-y-2 text-sm">
                    <li>• <strong>Prodigy Finance:</strong> No collateral required</li>
                    <li>• <strong>MPOWER Financing:</strong> For STEM students</li>
                    <li>• <strong>Stilt:</strong> US-based lending</li>
                    <li>• <strong>Earnest:</strong> Flexible terms</li>
                  </ul>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Loan Application Process</h2>

              <div class="space-y-6 mb-8">
                <div class="flex items-start">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Research and Compare</h4>
                    <p class="text-gray-700">Compare interest rates, processing fees, and terms from multiple lenders. Use online calculators to estimate EMIs.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Check Eligibility</h4>
                    <p class="text-gray-700">Ensure you meet age, academic, and income requirements. Most lenders require admission to recognized institutions.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Gather Documents</h4>
                    <p class="text-gray-700">Collect all required documents including admission letters, academic records, income proofs, and identity documents.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">4</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Submit Application</h4>
                    <p class="text-gray-700">Complete the application form and submit with all supporting documents. Many lenders offer online applications.</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">5</div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Loan Approval & Disbursement</h4>
                    <p class="text-gray-700">After approval, the loan amount is typically disbursed directly to the university or in stages based on academic progress.</p>
                  </div>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Required Documents</h2>

              <div class="bg-gray-50 p-6 rounded-xl mb-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">📋 Student Documents</h4>
                    <ul class="text-gray-700 space-y-1 text-sm">
                      <li>• Admission letter from university</li>
                      <li>• Academic transcripts and certificates</li>
                      <li>• Passport and visa documents</li>
                      <li>• IELTS/TOEFL/GRE/GMAT scores</li>
                      <li>• Statement of expenses from university</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">👨‍👩‍👧‍👦 Co-applicant Documents</h4>
                    <ul class="text-gray-700 space-y-1 text-sm">
                      <li>• Income tax returns (last 2-3 years)</li>
                      <li>• Salary certificates and bank statements</li>
                      <li>• Employment proof and ID documents</li>
                      <li>• Property documents (for secured loans)</li>
                      <li>• Credit score and financial statements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Repayment Options</h2>

              <div class="space-y-4 mb-8">
                <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 class="font-semibold text-green-900">🎓 Moratorium Period</h4>
                  <p class="text-green-800 text-sm">Course duration + 6 months to 1 year. No EMI during this period, only simple interest.</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 class="font-semibold text-blue-900">💳 EMI Options</h4>
                  <p class="text-blue-800 text-sm">Fixed or floating interest rates. Repayment tenure typically 5-15 years after moratorium.</p>
                </div>
                <div class="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <h4 class="font-semibold text-cyan-900">⚡ Prepayment</h4>
                  <p class="text-cyan-800 text-sm">Most lenders allow partial or full prepayment without penalties after a certain period.</p>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-4">Tips for Loan Approval</h2>

              <div class="bg-gray-50 p-6 rounded-xl mb-8">
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <span class="text-green-500 mr-3">✓</span>
                    <span class="text-gray-700"><strong>Strong Academic Record:</strong> Maintain good grades and choose recognized universities to improve approval chances.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-3">✓</span>
                    <span class="text-gray-700"><strong>Stable Co-applicant Income:</strong> Ensure your co-applicant has a stable income and good credit score.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-3">✓</span>
                    <span class="text-gray-700"><strong>Complete Documentation:</strong> Submit all required documents accurately and promptly.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-3">✓</span>
                    <span class="text-gray-700"><strong>Course Selection:</strong> Choose courses with good career prospects and earning potential.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-3">✓</span>
                    <span class="text-gray-700"><strong>Professional Guidance:</strong> Work with experienced consultants who understand the loan process.</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-8 rounded-xl mb-8 text-center">
                <h3 class="text-2xl font-bold mb-4">💰 Ready to Finance Your Dreams?</h3>
                <p class="text-lg mb-6">Get expert guidance on education loans and secure the best rates for your study abroad journey!</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Loan Guidance</a>
                  <a href="/testimonials" class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">Success Stories</a>
                </div>
              </div>
            </div>
          `
        };

      default:
        return {
          title: post.title,
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="text-xl text-gray-600 mb-8">${post.description}</p>
              <div class="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 class="text-xl font-semibold text-blue-900 mb-4">Coming Soon!</h3>
                <p class="text-blue-800">We're working on this comprehensive guide. In the meantime, book a free consultation with our experts to get personalized advice for your study abroad journey.</p>
              </div>
            </div>
          `
        };
    }
  };

  const blogContent = getBlogContent(slug);

  return (
    <Layout
      title={blogContent.title}
      description={post.description}
      keywords="study abroad, UK education, university guide, student visa"
    >
      <article className="min-h-screen bg-white">
        {/* Enhanced Hero Section with Infographics */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Blog
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Flag and Category */}
                <div className="flex items-center mb-6">
                  {post.flag && <span className="text-5xl mr-4">{post.flag}</span>}
                  <div>
                    {post.category && (
                      <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-2">
                        {post.category}
                      </span>
                    )}
                    <div className="flex items-center space-x-6 text-blue-300">
                      <div className="flex items-center">
                        <Calendar className="mr-2" size={16} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="mr-2" size={16} />
                        <span>8 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {blogContent.title}
                </h1>

                <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                  {post.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {post.videoId && (
                    <button
                      onClick={() => openVideoLink(post.videoId)}
                      className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Play size={20} className="mr-2" />
                      Watch Expert Video
                    </button>
                  )}
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Users size={20} className="mr-2" />
                    Free Consultation
                  </Link>
                </div>
              </div>

              {/* Statistics Infographic */}
              {post.stats && (
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <TrendingUp size={24} className="mr-3 text-cyan-400" />
                      Key Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(post.stats).map(([key, value], index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-cyan-400 mb-1">{value}</div>
                          <div className="text-sm text-blue-200 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Highlights Section */}
            {post.highlights && (
              <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Award size={20} className="mr-3 text-cyan-400" />
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {post.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-blue-200">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div dangerouslySetInnerHTML={{ __html: blogContent.content }} />
            
            {/* CTA Section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="text-center">
                <StartJourneyCTA />
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
