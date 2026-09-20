'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const WhatsAppWidget = dynamic(() => import('./WhatsAppWidget'), { ssr: false });
import {
  Menu, X, Phone, Mail, Home, Package, MessageCircle,
  Users, ExternalLink, Globe2, Award, HelpCircle, GraduationCap, BookOpen,
  BadgeCheck, Briefcase,
} from 'lucide-react';
import { siteInfo } from '../data/siteData';
import { BorderBeam } from './ui/BorderBeam';

// Placeholder for SocialMediaInline to simplify porting
const SocialMediaInline = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-stone-900 transition-colors">FB</a>
      <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-stone-700 transition-colors">IG</a>
      <a href={siteInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-stone-950 transition-colors">LI</a>
    </div>
  );
};


// Three groups, ordered by what a visitor is trying to do rather than by how
// the site is built: choose a route, enrol in something, or check us out.
// Each entry carries a one-line description, because a bare link list in a
// wide panel gives the eye nothing to land on.
const MENU = [
  {
    label: 'Study abroad',
    columns: [
      {
        heading: 'Plan your route',
        items: [
          { href: '/products', title: 'Student plans', blurb: 'Two charters, priced in full before you pay' },
          { href: '/university-finder', title: 'Universities', blurb: '35,000+ programmes across 29 countries' },
          { href: '/university-finder?tab=courses', title: 'Course finder', blurb: 'Search accredited programmes by subject and university' },
        ],
      },
      {
        heading: 'Pay for it',
        items: [
          { href: '/scholarships', title: 'Scholarships', blurb: 'Agent awards and university bursaries' },
          { href: '/financing', title: 'Financing', blurb: 'Card EMI, merchant EMI and study loans' },
          { href: '/services', title: 'Student services', blurb: 'Apostille, translation and visa filing' },
        ],
      },
      {
        heading: 'Once you land',
        items: [
          { href: '/accommodation', title: 'Housing', blurb: 'Bills-inclusive rooms in 250+ cities' },
          { href: '/test-prep', title: 'Test prep', blurb: 'IELTS, TOEFL, PTE, SAT and German' },
          { href: '/bookings', title: 'Book a call', blurb: 'Free first call, no upsell' },
        ],
      },
    ],
  },
  {
    label: 'Programmes',
    columns: [
      {
        heading: 'Certifications',
        items: [
          { href: '/certifications', title: 'All programmes', blurb: 'Concierge tiers with a written outcome guarantee' },
          { href: '/verify', title: 'Verify a certificate', blurb: 'Check an Axelis certificate ID' },
        ],
      },
      {
        heading: 'Germany',
        items: [
          { href: '/vocational', title: 'Ausbildung', blurb: 'Paid training contract, no tuition' },
          { href: '/vocational', title: 'Chancenkarte', blurb: 'Points-based entry to find skilled work' },
        ],
      },
      {
        heading: 'Guidance',
        items: [
          { href: '/resources', title: 'Resources', blurb: 'Guides, checklists and country briefings' },
          { href: '/faq', title: 'FAQ', blurb: 'Visas, fees, refunds and timelines' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    columns: [
      {
        heading: 'About us',
        items: [
          { href: '/about', title: 'Who we are', blurb: 'A counsellor from shortlist to arrival' },
          { href: '/accreditations', title: 'Accreditations', blurb: 'DPIIT, British Council and AIRC' },
        ],
      },
      {
        heading: 'Why Axelis',
        items: [
          { href: '/lp/tuition-free-europe', title: 'Tuition-free Europe', blurb: 'Public universities that charge nothing, and what decides the application' },
          { href: '/lp/pay-after-offer', title: 'Pay after an offer', blurb: 'Why the order you pay in changes the advice you get' },
          { href: '/lp/published-fees', title: 'Published fees', blurb: 'Every fee on the page, and how we are actually paid' },
        ],
      },
      {
        heading: 'Proof',
        items: [
          { href: '/testimonials', title: 'Student stories', blurb: 'Named students and verifiable visas' },
        ],
      },
      {
        heading: 'Talk to us',
        items: [
          { href: '/contact', title: 'Contact', blurb: 'Offices, phone and email' },
        ],
      },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  // A menu opened by hover closes again as soon as the pointer leaves the bar.
  // A menu the visitor clicked is pinned, so the click that follows a hover
  // keeps the panel up instead of dismissing the thing they just aimed at.
  const [pinnedMenu, setPinnedMenu] = useState(null);
  const triggerRefs = useRef({});

  const closeMenu = (restoreFocus = false) => {
    if (restoreFocus && openMenu && triggerRefs.current[openMenu]) {
      triggerRefs.current[openMenu].focus();
    }
    setOpenMenu(null);
    setPinnedMenu(null);
  };

  useEffect(() => {
    if (!openMenu) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      // Hand focus back to the trigger, otherwise Escape drops the keyboard
      // user on <body> and they have to tab from the top of the page again.
      if (triggerRefs.current[openMenu]) triggerRefs.current[openMenu].focus();
      setOpenMenu(null);
      setPinnedMenu(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openMenu]);
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

  // Handle body scroll lock when the drawer is open. globals.css sets
  // `overflow-x: clip` on <html>, which switches off the propagation of the
  // body's overflow to the viewport, so locking the body alone leaves the page
  // behind the drawer scrolling. The root element has to be locked as well.
  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      root.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      root.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      root.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="w-full">
      {/* Top Contact Bar - storm chrome */}
      <div className="bg-[var(--storm-deep)] text-white py-2 px-4 text-xs font-medium border-b border-[var(--storm-electric)]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-300">
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone aria-hidden="true" size={14} className="text-[var(--storm-electric)]" />
              <span>{siteInfo.contact.phones[0]}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail aria-hidden="true" size={14} className="text-[var(--storm-electric)]" />
              <span>{siteInfo.contact.emails[0]}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4 text-[var(--color-dim-dark)]">
              <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--storm-electric)] transition-colors">Facebook</a>
              <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--storm-electric)] transition-colors">Instagram</a>
              <a href={siteInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--storm-electric)] transition-colors">LinkedIn</a>
              <a href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--storm-electric)] transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - storm glass */}
      <div className="relative bg-white border-b border-[var(--color-rule)] sticky top-0 z-50 transition-all shadow-e-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/brand/axelis-mark-navy.svg"
                alt="Axelis Overseas"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain"
              />
            </Link>

            {/* Center navigation: three grouped panels plus two direct links.
                The nav is stretched to the full height of the bar so its bottom
                edge meets the top of the panel: a pointer travelling from a
                trigger down into the panel never leaves the element that closes
                the menu. Each panel is a DOM child of its trigger's wrapper for
                the same reason, and so that its links follow the trigger in the
                tab order. */}
            <nav
              className="hidden lg:flex items-center self-stretch gap-1 min-w-0"
              onMouseLeave={() => closeMenu()}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) closeMenu();
              }}
            >
              {MENU.map((group) => {
                const open = openMenu === group.label;
                return (
                  <div
                    key={group.label}
                    className="flex items-center self-stretch"
                    onMouseEnter={() => setOpenMenu(group.label)}
                  >
                    <button
                      type="button"
                      ref={(el) => { triggerRefs.current[group.label] = el; }}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onFocus={() => {
                        // Tabbing out of one panel and on to the next trigger
                        // should not leave the first panel hanging open.
                        if (openMenu && openMenu !== group.label) {
                          setOpenMenu(null);
                          setPinnedMenu(null);
                        }
                      }}
                      onClick={() => {
                        if (open && pinnedMenu === group.label) {
                          closeMenu();
                        } else {
                          setOpenMenu(group.label);
                          setPinnedMenu(group.label);
                        }
                      }}
                      className={`nav-trigger ${open ? 'is-open' : ''}`}
                    >
                      {group.label}
                      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className="nav-caret">
                        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>

                    {/* Three-column panel. Closing is handled by the nav's
                        onMouseLeave, by focus leaving the nav, and by Escape. */}
                    {open ? (
                      <div className="mega">
                        <div className="mega-inner">
                          {group.columns.map((col) => (
                            <div key={col.heading} className="mega-col">
                              <p className="mega-heading">{col.heading}</p>
                              <ul className="mega-list">
                                {col.items.map((item) => (
                                  <li key={item.title}>
                                    <Link href={item.href} className="mega-link" onClick={() => closeMenu()}>
                                      <span className="mega-title">{item.title}</span>
                                      <span className="mega-blurb">{item.blurb}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <Link href="/services" className="nav-trigger">Services</Link>
              <Link href="/contact" className="nav-trigger">Contact</Link>
            </nav>

            {/* Desktop Navigation - Menu & CTA */}
            <div className="hidden lg:flex items-center space-x-3 shrink-0">
              <Link
                href="/bookings"
                className="relative overflow-hidden px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] text-white font-bold hover:brightness-110 transition-[transform,filter,box-shadow] shadow-e-2 hover:shadow-e-2 transform hover:-translate-y-0.5"
              >
                <span className="relative z-10">Book a Discovery Call</span>
                <BorderBeam size={80} duration={7} colorFrom="#FFFFFF" colorTo="#9EC0FF" />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open extended navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                className="btn btn-secondary flex space-x-2 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Menu size={20} aria-hidden="true" />
                <span className="text-sm">More</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-[var(--color-navy)] hover:bg-[var(--color-tint)] hover:text-[var(--color-axelis)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
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
          className="fixed inset-0 bg-[var(--color-navy)]/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed right-0 top-0 h-full w-80 bg-[var(--storm-abyss)] shadow-e-3 border-l border-[var(--storm-electric)]/10 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Menu Header */}
          <div id="mobile-nav-drawer" className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-lg font-bold text-white">Navigation</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-[var(--storm-electric)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="overflow-y-auto p-6 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Home size={18} className="mr-3" />
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Package size={18} className="mr-3" />
              Student Plans
            </Link>
            <Link
              href="/university-finder"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <GraduationCap aria-hidden="true" size={18} className="mr-3" />
              University Finder
            </Link>
            <Link
              href="/resources"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <BookOpen size={18} className="mr-3" />
              Free Guides
            </Link>
            <Link
              href="/test-prep"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <HelpCircle size={18} className="mr-3" />
              Test Prep
            </Link>
            <Link
              href="/vocational"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Briefcase aria-hidden="true" size={18} className="mr-3" />
              Vocational (Germany)
            </Link>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Package aria-hidden="true" size={18} className="mr-3" />
              Student Services
            </Link>
            <Link
              href="/testimonials"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Users aria-hidden="true" size={18} className="mr-3" />
              Testimonials
            </Link>
            <Link
              href="/certifications"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Award aria-hidden="true" size={18} className="mr-3" />
              Certifications
            </Link>
            <Link
              href="/accreditations"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <BadgeCheck aria-hidden="true" size={18} className="mr-3" />
              Accreditations
            </Link>
            <Link
              href="/scholarships"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Globe2 size={18} className="mr-3" />
              Scholarships
            </Link>
            <Link
              href="/accommodation"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Home size={18} className="mr-3" />
              Accommodation
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <HelpCircle size={18} className="mr-3" />
              FAQ
            </Link>
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <Phone aria-hidden="true" size={18} className="mr-3" />
              Bookings
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 rounded-lg text-slate-200 hover:bg-white/5 hover:text-[var(--storm-electric)] font-medium transition-colors"
            >
              <MessageCircle size={18} className="mr-3" />
              Contact
            </Link>
          </div>

          <div className="mt-auto p-6 border-t border-white/5 bg-[var(--storm-deep)]/60 flex flex-col gap-4">
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="relative overflow-hidden block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] text-white font-bold hover:brightness-110 transition-[filter] shadow-e-2"
            >
              <span className="relative z-10">Book a Discovery Call</span>
              <BorderBeam size={120} duration={8} colorFrom="#FFFFFF" colorTo="#9EC0FF" />
            </Link>
            <div>
              <p className="text-xs font-semibold text-[var(--accent-on-dark)] mb-3">Connect With Us</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href={`tel:${siteInfo.contact.phones[0]}`} className="text-slate-300 hover:text-[var(--storm-electric)] flex items-center gap-2"><Phone aria-hidden="true" size={14} /> {siteInfo.contact.phones[0]}</a>
                <a href={`mailto:${siteInfo.contact.emails[0]}`} className="text-slate-300 hover:text-[var(--storm-electric)] flex items-center gap-2"><Mail aria-hidden="true" size={14} /> {siteInfo.contact.emails[0]}</a>
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
