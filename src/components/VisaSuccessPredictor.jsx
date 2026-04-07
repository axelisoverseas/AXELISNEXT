"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, GraduationCap, FileText, Smartphone, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { sendWhatsAppNotification } from '@/services/whatsappService';

const steps = [
    {
        id: 1,
        title: 'Target Country',
        icon: <Globe className="w-6 h-6" />,
        question: 'Where do you want to study?',
        options: ['UK', 'USA', 'Canada', 'Australia', 'Ireland', 'Germany', 'Other']
    },
    {
        id: 2,
        title: 'Academic Background',
        icon: <GraduationCap className="w-6 h-6" />,
        question: 'What is your highest qualification?',
        options: ['12th Standard', 'Bachelor\'s Degree', 'Master\'s Degree', 'Diploma']
    },
    {
        id: 3,
        title: 'English Proficiency',
        icon: <FileText className="w-6 h-6" />,
        question: 'Have you taken an English proficiency test?',
        options: ['IELTS', 'TOEFL', 'PTE', 'Duolingo', 'Not Yet']
    },
    {
        id: 4,
        title: 'Get Your Results',
        icon: <Smartphone className="w-6 h-6" />,
        question: 'Where should we send your Visa Success Prediction?',
        type: 'lead-gate'
    }
];

const VisaSuccessPredictor = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        country: '',
        qualification: '',
        englishTest: '',
        name: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleOptionSelect = (value) => {
        let field = '';
        if (currentStep === 1) field = 'country';
        if (currentStep === 2) field = 'qualification';
        if (currentStep === 3) field = 'englishTest';

        setFormData({ ...formData, [field]: value });

        // Automatically proceed to next step
        setTimeout(() => {
            if (currentStep < 4) setCurrentStep(currentStep + 1);
        }, 400);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || formData.phone.length < 10) return;

        setIsSubmitting(true);

        try {
            const message = `*New Visa Success Predictor Lead*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Target:* ${formData.country}\n*Education:* ${formData.qualification}\n*Test:* ${formData.englishTest}`;

            await sendWhatsAppNotification(message);

            // Artificial delay for analyzing effect
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
            }, 1500);

        } catch (error) {
            console.error('Submission failed:', error);
            setIsSubmitting(false);
            // Still show success to user to not disrupt flow, even if alert failed
            setIsSuccess(true);
        }
    };

    const resetForm = () => {
        setCurrentStep(1);
        setFormData({ country: '', qualification: '', englishTest: '', name: '', phone: '' });
        setIsSuccess(false);
    };

    return (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden max-w-2xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 flex items-center">
                        <CheckCircle className="mr-2 text-cyan-400" />
                        Visa Success Predictor
                    </h3>
                    <p className="text-blue-100 text-sm">Find out your chances of approval in 60 seconds</p>
                </div>
            </div>

            {/* Progress Bar */}
            {!isSuccess && (
                <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center px-8 relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-0 -translate-y-1/2"></div>
                    <div
                        className="absolute left-0 top-1/2 h-0.5 bg-blue-600 -z-0 -translate-y-1/2 transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                    ></div>

                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`relative z-10 flex flex-col items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 bg-white
                ${currentStep > step.id ? 'border-blue-600 bg-blue-600/10 text-blue-600' :
                                    currentStep === step.id ? 'border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)] text-blue-600' :
                                        'border-gray-200 text-gray-400'}`}
                        >
                            <span className="text-sm font-bold">{step.id}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Content Area */}
            <div className="p-8 min-h-[400px] flex flex-col relative">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1"
                        >
                            <div className="flex items-center text-blue-600 mb-4">
                                {steps[currentStep - 1].icon}
                                <span className="ml-2 font-semibold text-sm uppercase tracking-wider">{steps[currentStep - 1].title}</span>
                            </div>

                            <h4 className="text-2xl font-bold text-slate-800 mb-6">{steps[currentStep - 1].question}</h4>

                            {currentStep < 4 ? (
                                /* Options Grid for Steps 1-3 */
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {steps[currentStep - 1].options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionSelect(option)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md
                        ${(currentStep === 1 && formData.country === option) ||
                                                    (currentStep === 2 && formData.qualification === option) ||
                                                    (currentStep === 3 && formData.englishTest === option)
                                                    ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold'
                                                    : 'border-gray-100 hover:border-blue-300 bg-white text-gray-700'}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                /* Lead Gate Form for Step 4 */
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100 text-sm text-blue-800">
                                        <p className="flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2" /> We have analyzed your profile. Enter details to view results instantly.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-medium">
                                                +91
                                            </span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                                                placeholder="98765 43210"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !formData.name || formData.phone.length < 10}
                                        className="w-full py-4 mt-6 bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Analyzing Profile...
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                Reveal My Prediction <ArrowRight className="ml-2 w-5 h-5" />
                                            </span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    ) : (
                        /* Success State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col items-center justify-center text-center py-8"
                        >
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 mb-4">You have a High Chance!</h3>
                            <p className="text-gray-600 mb-8 max-w-sm">
                                Based on your profile, you have an excellent chance of securing a visa for <strong className="text-slate-900">{formData.country}</strong>. Our counselors have been notified and will contact you via WhatsApp shortly with your personalized roadmap.
                            </p>
                            <button
                                onClick={resetForm}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Check another profile
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Controls */}
                {!isSuccess && currentStep > 1 && currentStep < 4 && (
                    <div className="absolute bottom-8 left-8">
                        <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="flex items-center text-gray-400 hover:text-blue-600 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisaSuccessPredictor;
