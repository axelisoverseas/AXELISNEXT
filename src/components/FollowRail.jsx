'use client';

import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Share2, X } from 'lucide-react';
import { siteInfo } from '../data/siteData';

/**
 * Follow / subscribe rail.
 *
 * Bottom-left on purpose. The WhatsApp button already owns bottom-right, and
 * stacking two floating clusters in one corner is how a page starts to feel
 * like a toolbar. WhatsApp is also a different intent: that is "talk to us
 * now", this is "keep up with us later", so they are not merged.
 *
 * Collapsed by default to a single control. It expands on click rather than
 * hover, because a hover-expanding overlay is unusable on a touchscreen and
 * this sits over content on exactly the devices that have no hover.
 */

const LINKS = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram, href: siteInfo?.social?.instagram },
  { key: 'youtube',   label: 'YouTube',   Icon: Youtube,   href: siteInfo?.social?.youtube },
  { key: 'linkedin',  label: 'LinkedIn',  Icon: Linkedin,  href: siteInfo?.social?.linkedin },
  { key: 'facebook',  label: 'Facebook',  Icon: Facebook,  href: siteInfo?.social?.facebook },
].filter((l) => Boolean(l.href));

export default function FollowRail() {
  const [open, setOpen] = useState(false);
  if (!LINKS.length) return null;

  return (
    <div className="follow-rail" data-open={open ? 'true' : 'false'}>
      <ul className="follow-list" hidden={!open}>
        {LINKS.map(({ key, label, Icon, href }) => (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="follow-link"
              aria-label={`Axelis Overseas on ${label}`}
              tabIndex={open ? 0 : -1}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="follow-name">{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Hide follow links' : 'Follow Axelis Overseas'}
        className="follow-toggle"
      >
        {open ? <X size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
        <span className="follow-toggle-text">{open ? 'Close' : 'Follow us'}</span>
      </button>
    </div>
  );
}
