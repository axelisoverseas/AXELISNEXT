import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MoveRight } from 'lucide-react';
import { siteInfo } from '../data/siteData';

const Footer = () => {
  return (
    <footer className="relative bg-[var(--storm-deep)] text-[var(--color-dim-dark)] pt-16 pb-8 overflow-hidden">
      {/* top-edge lightning hairline */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--storm-electric)] to-transparent opacity-70" style={{ animation: 'hairline-flash 6s ease-in-out infinite' }} />
      {/* dawn-glow radial at the bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-64" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(127, 180, 224, 0.16) 0%, transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-[var(--storm-electric)]/10 mb-12 gap-6">
          <p className="text-sm font-semibold text-[var(--color-dim-dark)]">Certified by independent bodies</p>
          <Link href="/accreditations" className="flex flex-wrap justify-center items-center gap-8 opacity-80 hover:opacity-100 transition-opacity duration-300 group">
            <img src="/logos/dppit logo.png" width={47} height={32} alt="DPIIT Startup India" className="h-8 object-contain" />
            <img src="/trust-badges/british-council-logo.webp" width={84} height={24} alt="British Council" className="h-6 object-contain" />
            <img src="/logos/Airc-logo-full-color-centered-LG.jpg" width={56} height={32} alt="AIRC" className="h-8 rounded-sm object-contain" />
            <span className="text-xs text-[var(--storm-electric)] group-hover:underline">View certificates &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/brand/axelis-lockup-white.svg"
                alt="Axelis Overseas"
                width={160}
                height={56}
                className="w-40 h-auto opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-8 text-[var(--color-dim-dark)]">
              {siteInfo.description}
            </p>

            {/* Contact Details */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" size={18} className="text-[var(--storm-electric)] mt-1 shrink-0" />
                <span className="text-[var(--color-dim-dark)]">{siteInfo.contact.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone aria-hidden="true" size={18} className="text-[var(--storm-electric)] mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  {siteInfo.contact.phones.map((phone, i) => (
                    <a key={i} href={`tel:${phone}`} className="hover:text-[var(--storm-electric)] transition-colors">{phone}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail aria-hidden="true" size={18} className="text-[var(--storm-electric)] mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  {siteInfo.contact.emails.map((email, i) => (
                    <a key={i} href={`mailto:${email}`} className="hover:text-[var(--storm-electric)] transition-colors">{email}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-6">Explore</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Student Plans', path: '/products' },
                { name: 'University Finder', path: '/university-finder' },
                { name: 'Free Guides', path: '/resources' },
                { name: 'Test Prep', path: '/test-prep' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Certifications', path: '/certifications' },
                { name: 'Vocational (Germany)', path: '/vocational' },
                { name: 'Student Services', path: '/services' },
                { name: 'Financing', path: '/financing' },
                { name: 'Scholarships', path: '/scholarships' },
                { name: 'Bookings', path: '/bookings' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-[var(--color-dim-dark)] hover:text-[var(--storm-electric)] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--storm-mid)] group-hover:bg-[var(--storm-electric)] transition-colors" />
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
                <Link href="/privacy-policy" className="text-[var(--color-dim-dark)] hover:text-[var(--storm-electric)] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-[var(--color-dim-dark)] hover:text-[var(--storm-electric)] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/policies/cancellation-refund" className="text-[var(--color-dim-dark)] hover:text-[var(--storm-electric)] transition-colors">Cancellation &amp; Refund Policy</Link>
              </li>
              <li>
                <Link href="/delivery-policy" className="text-[var(--color-dim-dark)] hover:text-[var(--storm-electric)] transition-colors">Delivery Policy</Link>
              </li>
              <li>
                <Link href="/verify" className="text-[var(--color-dim-dark)] hover:text-[var(--storm-electric)] transition-colors">Verify a Certificate</Link>
              </li>
            </ul>
          </div>

          {/* Socials & CTA */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-6">Connect With Us</h3>
            <div className="flex gap-4 mb-8">
              <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-axelis)] text-white flex items-center justify-center transition-colors hover:bg-white hover:text-[var(--color-navy)]">
                <Facebook size={18} />
              </a>
              <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-axelis)] text-white flex items-center justify-center transition-colors hover:bg-white hover:text-[var(--color-navy)]">
                <Instagram size={18} />
              </a>
              <a href={siteInfo.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-axelis)] text-white flex items-center justify-center transition-colors hover:bg-white hover:text-[var(--color-navy)]">
                <Linkedin size={18} />
              </a>
              <a href={siteInfo.social.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-axelis)] text-white flex items-center justify-center transition-colors hover:bg-white hover:text-[var(--color-navy)]">
                <Youtube size={18} />
              </a>
            </div>

            <Link
              href="/contact"
              className="group flex w-full items-center justify-between px-5 py-3 bg-stone-900 hover:bg-stone-950 text-white rounded-lg transition-colors font-medium text-sm shadow-e-2"
            >
              Start Your Journey
              <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Company statement */}
        <div className="border-t border-[var(--storm-electric)]/10 mt-12 pt-8">
          <p className="text-sm text-[var(--color-dim-dark)] leading-relaxed max-w-4xl">
            <span className="text-[var(--color-dim-dark)] font-semibold">Axelis Overseas Education Pvt Ltd</span>
            {' '}. Bengaluru &amp; Bilaspur. India&rsquo;s study-abroad consultancy across 29 destination markets.
            Certification programmes with a written outcome guarantee. Zero-Tuition-Fee (ZTF) Charter agency.
          </p>
        </div>

        {/* Legal / corporate strip */}
        <div className="mt-6 pt-6 border-t border-[var(--storm-electric)]/10">
          <p className="text-[11px] text-[var(--color-dim-dark)] leading-relaxed">
            CIN U85500CT2023PTC014913 &middot; MCC 8299 (Educational Services) &middot;
            Registered under the Companies Act 2013 in the Republic of India.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--storm-electric)]/10 mt-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-dim-dark)]">
          <p>&copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p>Bengaluru &middot; Bilaspur</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
