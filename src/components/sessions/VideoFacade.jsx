'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import s from '@/app/sessions/sessions.module.css';

/**
 * One YouTube episode, as the centre of the page.
 *
 * Shows our own poster first and loads YouTube only on click (youtube-nocookie,
 * so nothing is set before the visitor chooses to play). Any <SeekButton> on
 * the page can jump the video to a timestamp; the player scrolls into view.
 */
export const SEEK_EVENT = 'axelis:session-seek';

export default function VideoFacade({ yt, title, poster, duration }) {
  const [start, setStart] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const onSeek = (e) => {
      setStart(Math.max(0, Math.floor(e.detail || 0)));
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    window.addEventListener(SEEK_EVENT, onSeek);
    return () => window.removeEventListener(SEEK_EVENT, onSeek);
  }, []);

  return (
    <div ref={ref} className={s.player}>
      {start === null ? (
        <button type="button" className={s.poster} onClick={() => setStart(0)} aria-label={`Play: ${title}`}>
          <img src={poster} alt="" width="1280" height="720" fetchPriority="high" />
          {/* A pill low in the frame, not a disc in the middle: the middle is where the face is. */}
          <span className={s.play} aria-hidden="true">
            <Play size={18} fill="currentColor" /> Play the session{duration ? ` · ${duration}` : ''}
          </span>
        </button>
      ) : (
        <iframe
          key={start}
          src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&start=${start}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}

/** A timestamp anywhere on the page that plays the episode from that moment. */
export function SeekButton({ at, className, children }) {
  const seconds = at.split(':').map(Number).reduce((a, n) => a * 60 + n, 0);
  return (
    <button type="button" className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SEEK_EVENT, { detail: seconds }))}>
      {children}
    </button>
  );
}
