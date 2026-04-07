import React from 'react';
import Link from 'next/link';

async function getCourseData(courseParam, countryParam) {
    const normalizedCourse = courseParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const normalizedCountry = countryParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return {
        course: normalizedCourse,
        country: normalizedCountry,
        averageSalary: '$85,000',
        topUniversities: ['Global Tech University', 'National Science Institute', 'Central Business School']
    };
}

export async function generateMetadata({ params }) {
    const { course, country } = await params;
    const data = await getCourseData(course, country);

    return {
        title: `Study ${data.course} in ${data.country} | Top Universities, Fees & Scope`,
        description: `Discover everything about studying an ${data.course} in ${data.country}. Find top ranking universities, tuition fees, scholarships, and career opportunities.`,
        alternates: {
            canonical: `https://overseeducation.com/courses/${course}-in-${country}`
        }
    };
}

export default async function CourseGuidePage({ params }) {
    const { course, country } = await params;
    const data = await getCourseData(course, country);

    // Constructing Course Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `${data.course} Programs in ${data.country}`,
        "description": `Comprehensive guide for international students looking to study ${data.course} in ${data.country}.`,
        "provider": {
            "@type": "Organization",
            "name": "Axelis Overseas"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-slate-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="text-sm mb-8 text-gray-500">
                        <Link href="/" className="hover:text-blue-600">Home</Link> &gt;
                        <Link href={`/${country}-study-guide`} className="hover:text-blue-600 ml-2">Study in {data.country}</Link> &gt;
                        <span className="text-gray-900 ml-2">{data.course}</span>
                    </nav>

                    <header className="bg-gradient-to-r from-blue-900 to-slate-900 p-10 rounded-3xl text-white mb-10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                        <span className="inline-block bg-white/20 px-4 py-1.5 rounded-full text-blue-100 font-semibold text-sm mb-4 backdrop-blur-md">Course Guide</span>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center leading-tight">
                            Study {data.course} in {data.country}
                        </h1>
                        <p className="text-lg text-blue-100 max-w-2xl">
                            Explore the best universities, entry requirements, and outstanding career prospects for {data.course} graduates in {data.country}.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h2 className="text-2xl font-bold mb-6 text-slate-800">Why Study {data.course}?</h2>
                                <div className="prose max-w-none text-gray-600 leading-relaxed">
                                    <p className="mb-4">
                                        Pursuing <strong>{data.course}</strong> in <strong>{data.country}</strong> opens doors to world-class education, cutting-edge facilities, and immense career growth. This dynamic field is constantly evolving, presenting graduates with highly sought-after skills on a global scale.
                                    </p>
                                    <p>
                                        With an average starting salary of <span className="text-green-600 font-bold">{data.averageSalary}</span>, graduates find themselves in high demand across multiple sectors.
                                    </p>
                                </div>
                            </section>

                            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h2 className="text-2xl font-bold mb-6 text-slate-800">Top Universities Offering {data.course}</h2>
                                <ul className="space-y-4">
                                    {data.topUniversities.map((uni, i) => (
                                        <li key={i} className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-blue-50 transition-colors">
                                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <Link href={`/universities/${country}/${uni.replace(/\s+/g, '-').toLowerCase()}`} className="font-bold text-lg text-slate-800 hover:text-blue-600">
                                                    {uni}
                                                </Link>
                                                <p className="text-sm text-gray-500">{data.country}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white border border-cyan-400 rounded-2xl p-6 shadow-lg shadow-cyan-500/10 sticky top-24">
                                <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-4 text-xl">🚀</div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">Fast-Track Your Admission</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">Don't miss the upcoming intake. Our counselors specialize in {data.course} placements in {data.country}.</p>
                                <Link href="/contact" className="w-full block text-center bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md">
                                    Book Free Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
