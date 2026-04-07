'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Globe, Award, Facebook, Instagram, Linkedin, Youtube, CheckCircle } from 'lucide-react';
import { siteInfo } from '../../data/siteData';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API Call for static build
        setTimeout(() => {
            setSubmitStatus('success');
            setFormData({ fullName: '', email: '', mobile: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 bg-slate-900 border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Contact <span className="text-blue-400">Our Experts</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Take the first step toward unparalleled study abroad consulting.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-700 shadow-sm text-slate-300">
                            <Phone size={18} className="text-blue-400" />
                            <span className="text-sm font-semibold">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-700 shadow-sm text-slate-300">
                            <Globe size={18} className="text-blue-400" />
                            <span className="text-sm font-semibold">29+ Countries</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-700 shadow-sm text-slate-300">
                            <Award size={18} className="text-blue-400" />
                            <span className="text-sm font-semibold">Expert Counselors</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Video Section */}
            <section className="bg-white pt-16 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-100 group">
                        <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full aspect-video object-cover"
                        >
                            <source src="/videos/brand-outro.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-slate-500 font-medium italic">Empowering your global education dreams with expert guidance.</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Form Section */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                                        placeholder="Enter your mobile number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                                        placeholder="Enter the subject"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 resize-none"
                                        placeholder="Enter your message"
                                    />
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                                        <p className="text-sm font-medium text-emerald-800">
                                            Thank you! Your message has been sent successfully. We'll get back to you soon.
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold rounded-xl transition-all shadow-md mt-4"
                                >
                                    {isSubmitting ? 'Sending...' : (
                                        <><Send className="mr-2" size={18} /> Send Message</>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Information Section */}
                        <div className="space-y-8">
                            <div className="bg-slate-900 rounded-3xl shadow-sm border border-slate-800 p-8 md:p-12 text-white">
                                <h2 className="text-3xl font-bold mb-8 tracking-tight">Get in Touch</h2>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-blue-900/50 rounded-xl shrink-0"><MapPin className="text-blue-400" size={24} /></div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Office Address</h3>
                                            <p className="text-slate-400 leading-relaxed">{siteInfo.contact.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-blue-900/50 rounded-xl shrink-0"><Phone className="text-blue-400" size={24} /></div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Phone Numbers</h3>
                                            <div className="space-y-1">
                                                {siteInfo.contact.phones.map((phone, index) => (
                                                    <a key={index} href={`tel:${phone}`} className="block text-slate-400 hover:text-white transition-colors">
                                                        {phone}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-blue-900/50 rounded-xl shrink-0"><Mail className="text-blue-400" size={24} /></div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Email Addresses</h3>
                                            <div className="space-y-1">
                                                {siteInfo.contact.emails.map((email, index) => (
                                                    <a key={index} href={`mailto:${email}`} className="block text-slate-400 hover:text-white transition-colors break-all">
                                                        {email}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-blue-900/50 rounded-xl shrink-0"><Clock className="text-blue-400" size={24} /></div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                                            <p className="text-slate-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                            <p className="text-slate-400">Saturday: 10:00 AM - 4:00 PM</p>
                                            <p className="text-slate-400">Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 text-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Connect With Us</h3>
                                <div className="flex justify-center gap-4">
                                    <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100">
                                        <Facebook size={24} />
                                    </a>
                                    <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-colors border border-slate-100">
                                        <Instagram size={24} />
                                    </a>
                                    <a href={siteInfo.social.linkedin} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors border border-slate-100">
                                        <Linkedin size={24} />
                                    </a>
                                    <a href={siteInfo.social.youtube} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors border border-slate-100">
                                        <Youtube size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
