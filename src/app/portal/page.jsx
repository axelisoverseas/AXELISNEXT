import React from 'react';
import StudentDashboardMock from '@/components/StudentDashboardMock';

export const metadata = {
    title: 'Track Your Application',
    alternates: { canonical: '/portal' },
    // A demo dashboard, not a page anyone should land on from search.
    robots: { index: false, follow: true },
    description: 'Track your university applications and visa status in real-time with the Axelis Student Portal.',
};

export default function PortalPage() {
    return (
        <main>
            <StudentDashboardMock />
        </main>
    );
}
