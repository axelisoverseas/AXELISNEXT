import { Download } from 'lucide-react';

export const metadata = {
  title: 'Free Study-Abroad Guides & Resources',
  description:
    'Download free study-abroad guides: scholarships, cost of living, intake calendar, English requirements, visa checklist and more, for students and parents.',
  alternates: { canonical: '/resources' },
};

const DODGER = '#3590f3';

const GUIDES = [
  { title: 'Scholarship Guide', description: 'Merit, government and university scholarships across destinations.', file: '/guides/scholarship-guide.pdf' },
  { title: 'Cost of Living Guide', description: 'Monthly living costs by country and city.', file: '/guides/cost-of-living-guide.pdf' },
  { title: 'Intake Calendar', description: 'Application windows and intake months, destination by destination.', file: '/guides/intake-calendar.pdf' },
  { title: 'English Language Requirements', description: 'IELTS, TOEFL and PTE score bands by country and level.', file: '/guides/english-language-requirements.pdf' },
  { title: 'Student Visa Checklist', description: 'Documents and steps for each student visa route.', file: '/guides/student-visa-checklist.pdf' },
  { title: 'University Accreditation List', description: 'Accredited institutions you can apply to with confidence.', file: '/guides/university-accreditation-list.pdf' },
  { title: 'Student Journey Infographic', description: 'The path from first call to landing abroad, on one page.', file: '/guides/student-journey-infographic.pdf' },
  { title: 'Student FAQ', description: 'The questions students ask most, answered.', file: '/guides/student-faq.pdf' },
  { title: 'Parent FAQ', description: 'Reassurance and answers for parents.', file: '/guides/parent-faq.pdf' },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-black px-6 pt-32 pb-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: 'rgba(53,144,243,0.18)' }} />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <span className="inline-block rounded-full px-4 py-1 text-sm font-semibold" style={{ background: 'rgba(53,144,243,0.12)', color: '#8fbcf7' }}>
            Free downloads
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Study-abroad guides & resources.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Free guides for students and parents, from scholarships and cost of living to visa
            checklists and intake calendars.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <a
              key={g.file}
              href={g.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(53,144,243,0.1)', color: DODGER }}>
                <Download className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{g.title}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-slate-600">{g.description}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
