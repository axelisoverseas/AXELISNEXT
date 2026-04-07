import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// In Next.js App Router, metadata is handled in page.tsx or layout.tsx
// This component now just serves as a visual wrapper for Navbar + Footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 w-full" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
