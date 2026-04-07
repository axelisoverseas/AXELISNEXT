import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Mock data fetching function
async function getCountryData(countryParam) {
    const normalized = countryParam.replace(/-/g, ' ').toLowerCase();
    const countryName = normalized.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
        name: countryName,
        capital: countryName === 'Uk' ? 'London' : countryName === 'Usa' ? 'Washington D.C.' : 'Capital City',
        universitiesCount: 154,
        studentsSent: 450
    };
}

export async function generateMetadata({ params }) {
    const slug = (await params).slug || '';
    const countryParam = slug.replace('-study-guide', '');
    const data = await getCountryData(countryParam);

    return {
        title: `Study in ${data.name} for Indian Students (2024 Guide) | Fees & Visas`,
        description: `Complete guide to studying in ${data.name}. Find top universities, courses, living costs, and scholarships for international students. Get 100% Visa Support.`,
        alternates: {
            canonical: `https://overseeducation.com/${countryParam}-study-guide`
        }
    };
}

export default async function CountryGuidePage({ params }) {
    const slug = (await params).slug || '';
    const countryParam = slug.replace('-study-guide', '');
    const data = await getCountryData(countryParam);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `Study in ${data.name} - Complete Guide for International Students`,
        "description": `Comprehensive guide covering universities, fees, and visa processes for studying in ${data.name}.`,
        "author": {
            "@type": "Organization",
            "name": "Axelis Overseas"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Axelis Overseas",
            "logo": {
                "@type": "ImageObject",
                "url": "https://overseeducation.com/logo.png"
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-white pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-8 text-gray-500">
                        <Link href="/" className="hover:text-blue-600">Home</Link> &gt;
                        <span className="text-gray-900 ml-2">Study in {data.name}</span>
                    </nav>

                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 flex items-center">
                            Study in {data.name} Guide 2024
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                            Everything you need to know about pursuing your higher education in {data.name}, from top universities and living costs to visa requirements.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <h2 className="text-2xl font-bold mb-4">Why study in {data.name}?</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {data.name} is home to some of the world's highest-ranking universities and offers an unparalleled educational experience. International students benefit from cutting-edge research facilities, diverse cultural experiences, and robust post-study work opportunities.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
                                        <div className="text-3xl font-black text-cyan-500 mb-1">{data.universitiesCount}+</div>
                                        <div className="text-sm font-semibold text-gray-600">Partner Universities</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
                                        <div className="text-3xl font-black text-blue-500 mb-1">{data.studentsSent}+</div>
                                        <div className="text-sm font-semibold text-gray-600">Students Sent</div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">Top Universities in {data.name}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <Link key={i} href={`/universities/${countryParam}/university-${i}`} className="block group">
                                            <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all">
                                                <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600">University {i} of {data.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{data.capital}, {data.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-blue-900 border border-blue-800 rounded-2xl p-6 text-white sticky top-24 shadow-xl">
                                <h3 className="text-xl font-bold mb-4">Need personalized guidance?</h3>
                                <p className="text-blue-100 mb-6 text-sm">Our expert counsellors can help you find the right university and course in {data.name}.</p>
                                <Link href="/contact" className="w-full block text-center bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors">
                                    Get Free Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
