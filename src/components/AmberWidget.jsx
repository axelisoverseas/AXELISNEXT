'use client';

import { useEffect, useRef } from 'react';

// amber's live listings widget (Amber Flex → Integrations → Widget). Listings
// and "View" links carry our partner id, so bookings are attributed to Axelis.
// The loader is amber's own snippet; it has its own search box, so one city is
// enough to start from.
const SRC = 'https://d341zbz41jo7w1.cloudfront.net/widget/list/3.1.0.js';
export const AMBER_PARTNER_ID = 'axelis-overseas-1721030776';

export default function AmberWidget({ location = 'london', numListings = 6 }) {
  const ref = useRef(null);

  useEffect(() => {
    const w = window;
    if (!w._aw) {
      w._aw = function () { (w._aw.q = w._aw.q || []).push(arguments); };
      const js = document.createElement('script');
      js.id = '_aw'; js.src = SRC; js.async = true;
      document.body.appendChild(js);
    }
    w._aw('init', {
      element: ref.current,
      location,
      partnerId: AMBER_PARTNER_ID,
      fontFamily: 'Lato, sans-serif',
      sort: 'Recommended',
      numListings,
    });
  }, [location, numListings]);

  return <div ref={ref} id="amber-widget" className="min-h-[640px]" />;
}
