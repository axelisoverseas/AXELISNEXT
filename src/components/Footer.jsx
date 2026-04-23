import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MoveRight } from 'lucide-react';
import { siteInfo, navigationLinks } from '../data/siteData';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges - Minimalist row */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-slate-800 mb-12 gap-6">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Recognized & Certified By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="/logos/dppit logo.png" alt="Startup India DPIIT" className="h-8 object-contain" />
            <img src="/trust-badges/british-council-logo.webp" alt="British Council Agent" className="h-6 object-contain" />
            <img src="/logos/Airc-logo-full-color-centered-LG.jpg" alt="AIRC Certified" className="h-8 rounded-sm object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/1yellow svg logoaxelis.svg"
                alt="Axelis Overseas"
                className="h-12 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-8 text-slate-400">
              {siteInfo.description}
            </p>

            {/* Contact Details */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-1 shrink-0" />
                <span className="text-slate-400">{siteInfo.contact.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-500 mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  {siteInfo.contact.phones.map((phone, i) => (
                    <a key={i} href={`tel:${phone}`} className="hover:text-blue-400 transition-colors">{phone}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-blue-500 mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  {siteInfo.contact.emails.map((email, i) => (
                    <a key={i} href={`mailto:${email}`} className="hover:text-blue-400 transition-colors">{email}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-6">Explore</h3>
            <ul className="space-y-3 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/refund-cancellation" className="text-slate-400 hover:text-blue-400 transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link href="/delivery-policy" className="text-slate-400 hover:text-blue-400 transition-colors">Delivery Policy</Link>
              </li>
            </ul>
          </div>

          {/* Socials & CTA */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-6">Connect With Us</h3>
            <div className="flex gap-4 mb-8">
              <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href={siteInfo.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href={siteInfo.social.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>

            <Link
              href="/contact"
              className="group flex w-full items-center justify-between px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
            >
              Start Your Journey
              <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
