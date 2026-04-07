"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, GraduationCap, DollarSign, Calendar, ChevronRight, Award } from 'lucide-react';

const mockScholarships = [
    {
        id: 1,
        name: "Global Excellence Scholarship",
        country: "UK",
        degree: "Master's",
        amount: "£10,000",
        deadline: "May 31, 2024",
        university: "University of Excellence",
        tags: ["Merit Based", "Tuition Fee"]
    },
    {
        id: 2,
        name: "Vice-Chancellor's International Scholarship",
        country: "Australia",
        degree: "Bachelor's",
        amount: "$20,000 AUD",
        deadline: "Jun 15, 2024",
        university: "Sydney Tech University",
        tags: ["High Achiever", "Full Time"]
    },
    {
        id: 3,
        name: "Stem Leaders Fellowship",
        country: "USA",
        degree: "Master's",
        amount: "$15,000 USD",
        deadline: "Jul 01, 2024",
        university: "American Institute of Tech",
        tags: ["STEM", "Research"]
    },
    {
        id: 4,
        name: "European Cultural Award",
        country: "Germany",
        degree: "Master's",
        amount: "€5,000",
        deadline: "Apr 30, 2024",
        university: "Berlin State University",
        tags: ["Arts & Humanities"]
    },
    {
        id: 5,
        name: "Maple Leaf Excellence Grant",
        country: "Canada",
        degree: "Diploma",
        amount: "$8,000 CAD",
        deadline: "Aug 15, 2024",
        university: "Toronto Business College",
        tags: ["Business", "International"]
    },
    {
        id: 6,
        name: "UK Innovation Scholarship",
        country: "UK",
        degree: "Bachelor's",
        amount: "£5,000",
        deadline: "Jun 30, 2024",
        university: "London Tech",
        tags: ["Technology", "Undergraduate"]
    }
];

const ScholarshipMatcher = () => {
    const [filters, setFilters] = useState({
        country: 'All',
        degree: 'All'
    });
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const countries = ['All', 'UK', 'USA', 'Canada', 'Australia', 'Germany', 'Ireland'];
    const degrees = ['All', 'Bachelor\'s', 'Master\'s', 'Diploma', 'PhD'];

    const handleSearch = () => {
        setIsSearching(true);
        setHasSearched(true);

        // Simulate API call
        setTimeout(() => {
            const filtered = mockScholarships.filter(s => {
                const matchCountry = filters.country === 'All' || s.country === filters.country;
                const matchDegree = filters.degree === 'All' || s.degree === filters.degree;
                return matchCountry && matchDegree;
            });
            setResults(filtered);
            setIsSearching(false);
        }, 800);
    };

    return (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-black mb-3 flex items-center justify-center">
                        <Award className="mr-3 text-cyan-400 w-8 h-8" />
                        Scholarship Matcher
                    </h3>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">Find millions in funding available for international students based on your profile.</p>
                </div>
            </div>

            <div className="p-8">
                {/* Search Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Study Destination</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                                value={filters.country}
                                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                            >
                                {countries.map(c => <option key={c} value={c}>{c === 'All' ? 'Any Country' : c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Degree level</label>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                                value={filters.degree}
                                onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
                            >
                                {degrees.map(d => <option key={d} value={d}>{d === 'All' ? 'Any Degree' : d}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="w-full h-[50px] bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isSearching ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Searching...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    Find Scholarships
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Area */}
                <div className="relative min-h-[300px] border-t border-gray-100 pt-8">
                    {!hasSearched ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <Award className="w-16 h-16 text-gray-200 mb-4" />
                            <p className="text-lg font-medium">Select criteria and search to find matching scholarships.</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {isSearching ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-pulse h-40"></div>
                                    ))}
                                </motion.div>
                            ) : results.length > 0 ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {results.map((scholarship, index) => (
                                        <motion.div
                                            key={scholarship.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white border border-gray-200 hover:border-blue-400 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors pr-4">{scholarship.name}</h4>
                                                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap border border-blue-100">
                                                    {scholarship.country}
                                                </span>
                                            </div>

                                            <p className="text-gray-500 text-sm mb-4 font-medium">{scholarship.university}</p>

                                            <div className="grid grid-cols-2 gap-4 mb-5">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <DollarSign className="w-4 h-4 mr-1.5 text-green-500" />
                                                    <span className="font-semibold text-slate-700">{scholarship.amount}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-1.5 text-orange-400" />
                                                    <span>{scholarship.deadline}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {scholarship.tags.map(tag => (
                                                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <button className="w-full text-blue-600 font-semibold text-sm flex items-center justify-center p-2 rounded-lg hover:bg-blue-50 transition-colors">
                                                Check Eligibility <ChevronRight className="w-4 h-4 mt-0.5 ml-1" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-gray-500"
                                >
                                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                                    <p className="text-lg font-medium text-slate-700">No matching scholarships found.</p>
                                    <p className="text-sm">Try adjusting your filters to see more results.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScholarshipMatcher;
