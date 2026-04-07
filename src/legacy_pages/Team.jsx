import React from 'react';
import Layout from '../components/Layout';
import TeamGlobeCarousel from '../components/TeamGlobeCarousel';
import AnimatedSection from '../components/AnimatedSection';
import { teamMembers } from '../data/siteData';

const Team = () => {
  return (
    <Layout
      title="Our Team - Axelis Overseas"
      description="Meet the expert team at Axelis Overseas. Our dedicated professionals guide you through every step of your international education journey."
      keywords="Axelis team, education consultants, study abroad experts, international education team"
    >
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header Section */}
        <AnimatedSection className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <AnimatedSection animationType="fadeInUp">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 text-sm font-bold rounded-full mb-6 border border-blue-200">
                Our Team
              </span>
            </AnimatedSection>
            <AnimatedSection animationType="fadeInUp" delay={100}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Maestros</span> Behind Axelis
              </h1>
            </AnimatedSection>
            <AnimatedSection animationType="fadeInUp" delay={200}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our dedicated professionals are here to guide you through every step of your international education journey.
              </p>
            </AnimatedSection>
          </div>

          {/* Team Globe Carousel */}
          <TeamGlobeCarousel teamMembers={teamMembers} />

          {/* Additional Team Info */}
          <AnimatedSection animationType="fadeInUp" delay={300} className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Our Team?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">10+</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Years Experience</h3>
                  <p className="text-gray-600 text-sm">Combined decades of expertise in international education</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-cyan-600 font-bold text-xl">2000+</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Students Helped</h3>
                  <p className="text-gray-600 text-sm">Successfully placed students in top universities worldwide</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-xl">24/7</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Support Available</h3>
                  <p className="text-gray-600 text-sm">Round-the-clock assistance for all your needs</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Team;
