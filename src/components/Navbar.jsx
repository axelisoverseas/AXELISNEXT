'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const WhatsAppWidget = dynamic(() => import('./WhatsAppWidget'), { ssr: false });
import {
  Menu, X, Phone, Mail, Home, Package, MessageCircle,
  Users, ExternalLink, Globe2, Award, HelpCircle
} from 'lucide-react';
import { siteInfo } from '../data/siteData';
import { BorderBeam } from './ui/BorderBeam';

// Placeholder for SocialMediaInline to simplify porting
const SocialMediaInline = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">FB</a>
      <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-500 transition-colors">IG</a>
      <a href={siteInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors">LI</a>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  // Handle Escape key to close menu
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="w-full">
      {/* Top Contact Bar - Clean & Professional */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-300">
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} className="text-blue-400" />
              <span>{siteInfo.contact.phones[0]}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} className="text-blue-400" />
              <span>{siteInfo.contact.emails[0]}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href={siteInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* Note: Using standard img tag for ease of filtering, Next Image can be tricky with invert filters */}
              <img
                src="/1yellow svg logoaxelis.svg"
                alt="Axelis Overseas"
                className="h-16 w-auto object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(14%) sepia(35%) saturate(3065%) hue-rotate(204deg) brightness(88%) contrast(97%)'
                }}
              />
            </Link>

            {/* Center Navigation Links - Clean Tabs */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${isActive('/') ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'
                  }`}
              >
                <span>Home</span>
              </Link>

              <Link
                href="/products"
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${isActive('/products') ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'
                  }`}
              >
                <span>Student Plans</span>
              </Link>

              <Link
                href="/scholarships"
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${isActive('/scholarships') ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'
                  }`}
              >
                <span>Scholarships</span>
              </Link>

              <Link
                href="/faq"
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${isActive('/faq') ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'
                  }`}
              >
                <span>FAQ</span>
              </Link>

              <Link
                href="/bookings"
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${isActive('/bookings') ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'
                  }`}
              >
                <span>Bookings</span>
              </Link>

              <Link
                href="/contact"
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${isActive('/contact') ? 'text-blue-700' : 'text-slate-600 hover:text-blue-600'
                  }`}
              >
                <span>Contact Us</span>
              </Link>
            </nav>

            {/* Desktop Navigation - Menu & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/bookings"
                className="relative overflow-hidden px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span className="relative z-10">Apply Now</span>
                <BorderBeam size={80} duration={7} colorFrom="#ffffff" colorTo="#22d3ee" />
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-700 font-semibold transition-colors border border-slate-200"
              >
                <Menu size={20} />
                <span className="text-sm">More</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Side Menu - Minimalist */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-slate-900">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="overflow-y-auto p-6 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
            >
              <Home size={18} className="mr-3" />
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
            >
              <Package size={18} className="mr-3" />
              Student Plans
            </Link>
            <Link
              href="/scholarships"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
            >
              <Award size={18} className="mr-3" />
              Scholarships
            </Link>
            <Link
              href="/accommodation"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
            >
              <Home size={18} className="mr-3" />
              Accommodation
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
            >
              <HelpCircle size={18} className="mr-3" />
              FAQ
            </Link>
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
            >
              <Phone size={18} className="mr-3" />
              Bookings
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
            >
              <MessageCircle size={18} className="mr-3" />
              Contact Us
            </Link>
          </div>

          <div className="mt-auto p-6 border-t border-gray-100 bg-slate-50 flex flex-col gap-4">
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="relative overflow-hidden block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md"
            >
              <span className="relative z-10">Apply Now</span>
              <BorderBeam size={120} duration={8} colorFrom="#ffffff" colorTo="#22d3ee" />
            </Link>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Connect With Us</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href={`tel:${siteInfo.contact.phones[0]}`} className="text-slate-600 hover:text-blue-600 flex items-center gap-2"><Phone size={14} /> {siteInfo.contact.phones[0]}</a>
                <a href={`mailto:${siteInfo.contact.emails[0]}`} className="text-slate-600 hover:text-blue-600 flex items-center gap-2"><Mail size={14} /> {siteInfo.contact.emails[0]}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppWidget />
    </header>
  );
};

export default Navbar;
