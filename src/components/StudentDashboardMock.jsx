"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, FileText, Globe, PlaneTakeoff, GraduationCap, XCircle } from 'lucide-react';

const applicationSteps = [
    { id: 1, title: 'Profile Evaluation', date: 'Oct 15, 2023', status: 'completed', icon: <GraduationCap size={20} /> },
    { id: 2, title: 'University Shortlisting', date: 'Oct 22, 2023', status: 'completed', icon: <Globe size={20} /> },
    { id: 3, title: 'Application Submitted', date: 'Nov 05, 2023', status: 'completed', icon: <FileText size={20} /> },
    { id: 4, title: 'Offer Received', date: 'Dec 12, 2023', status: 'completed', icon: <CheckCircle2 size={20} /> },
    { id: 5, title: 'Visa Processing', date: 'Pending', status: 'current', icon: <PlaneTakeoff size={20} /> },
    { id: 6, title: 'Pre-Departure Briefing', date: 'Upcoming', status: 'upcoming', icon: <Clock size={20} /> },
];

const StudentDashboardMock = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-6 py-2 bg-blue-100 text-blue-800 font-bold rounded-full mb-4.5 border border-blue-200">
                        Preview
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                        Transclucent Tracking <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Student Portal Tracker</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Experience complete transparency with our live application tracker. Know exactly where your application stands at any moment.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
                    {/* Decorative header */}
                    <div className="bg-gradient-to-r from-slate-900 to-blue-900 h-32 absolute top-0 left-0 right-0 z-0"></div>

                    <div className="relative z-10 px-8 pt-12 pb-8">
                        {/* Student Profile Overview */}
                        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl p-6 shadow-md border border-gray-50 mb-10 transform -translate-y-4">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-blue-100 border-4 border-white shadow flex items-center justify-center text-blue-600 font-black text-2xl shrink-0">
                                    AR
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">Application Dashboard</h3>
                                    <p className="text-gray-500 font-medium">App ID: #AX-2024-9842 • University of Manchester, UK</p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 text-center md:text-right">
                                <div className="inline-flex items-center px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full font-bold text-sm">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse mr-2"></div>
                                    Action Required: Visa Documents
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Timeline */}
                            <div className="lg:col-span-2">
                                <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-blue-600" /> Application Journey
                                </h4>

                                <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:via-blue-300 before:to-gray-200">
                                    {applicationSteps.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative flex items-center justify-between group"
                                        >
                                            {/* Line marker */}
                                            <div className={`absolute left-0 -ml-[2.2rem] flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shadow-sm transition-colors ${step.status === 'completed' ? 'bg-green-500 text-white' :
                                                    step.status === 'current' ? 'bg-blue-500 text-white animate-pulse' :
                                                        'bg-gray-200 text-gray-400'
                                                }`}>
                                                {step.status === 'completed' ? <CheckCircle2 size={14} /> :
                                                    step.status === 'current' ? <Clock size={14} /> :
                                                        <XCircle size={14} />}
                                            </div>

                                            <div className={`p-4 rounded-xl border transition-all duration-300 w-full ml-4 ${step.status === 'current'
                                                    ? 'bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-500/20'
                                                    : 'bg-white border-gray-100 hover:border-gray-300'
                                                }`}>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${step.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                                step.status === 'current' ? 'bg-blue-100 text-blue-600' :
                                                                    'bg-gray-100 text-gray-500'
                                                            }`}>
                                                            {step.icon}
                                                        </div>
                                                        <div>
                                                            <h5 className={`font-bold ${step.status === 'upcoming' ? 'text-gray-500' : 'text-slate-800'}`}>{step.title}</h5>
                                                            <p className="text-xs font-semibold text-gray-400">{step.date}</p>
                                                        </div>
                                                    </div>

                                                    {step.status === 'current' && (
                                                        <button className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow">
                                                            View Details
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Docs */}
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-blue-600" /> Documents
                                </h4>
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <div className="text-sm font-semibold text-slate-700 truncate">Passport_Front.pdf</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <div className="text-sm font-semibold text-slate-700 truncate">IELTS_Scorecard.pdf</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl shadow-sm ring-1 ring-blue-500/20">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-8 h-8 rounded bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                                                !
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-blue-800">Financial Docs</div>
                                                <div className="text-xs text-blue-600 font-medium">Action Required</div>
                                            </div>
                                            <button className="text-xs font-bold bg-white text-blue-600 px-2 py-1 rounded shadow-sm border border-blue-100">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl p-6 text-slate-900 shadow-lg relative overflow-hidden">
                                    <div className="absolute -right-4 -bottom-4 opacity-20">
                                        <Globe size={100} />
                                    </div>
                                    <h5 className="font-black text-lg mb-2 relative z-10">Counselor Assigned</h5>
                                    <p className="text-sm font-medium mb-4 relative z-10">Ananya Sharma is reviewing your visa file.</p>
                                    <button className="relative z-10 w-full py-2 bg-slate-950 text-white rounded-xl font-bold text-sm shadow hover:bg-slate-800 transition-colors">
                                        Message Counselor
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardMock;
