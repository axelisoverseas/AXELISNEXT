'use client';

import { useEffect } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { TextEffect } from '../../components/ui/TextEffect';

const CALENDLY_URL = 'https://calendly.com/axelisoverseas/counsellingsession';

export default function BookingsPage() {
  useEffect(() => {
    const id = 'calendly-widget-script';
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-storm-to-dawn">
      <section className="bg-gradient-to-br from-[var(--storm-deep)] via-[var(--storm-abyss)] to-[var(--dawn-horizon)] text-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <TextEffect as="span" per="word" preset="blur">Book a</TextEffect>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Free Counselling Call</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Pick a time that works for you. Our counsellors will walk you through eligibility, scholarships, and next steps — end-to-end.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><Clock size={16} className="text-cyan-400" /> 30-minute session</span>
            <span className="inline-flex items-center gap-2"><Calendar size={16} className="text-cyan-400" /> Flexible slots</span>
            <span className="inline-flex items-center gap-2"><CheckCircle size={16} className="text-cyan-400" /> Zero obligation</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: '320px', height: '760px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
