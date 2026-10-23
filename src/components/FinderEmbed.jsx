"use client";

import { useEffect, useRef, useState } from "react";

// The finder is a static build in /public, shared byte-for-byte with the B2B
// site so both answer the same question identically. It is framed rather than
// ported so one rebuild updates both sites, and it reports its own height to
// avoid an inner scrollbar.
export default function FinderEmbed() {
  const ref = useRef(null);
  const [h, setH] = useState(760);

  useEffect(() => {
    function onMsg(e) {
      if (ref.current && e.source !== ref.current.contentWindow) return;
      const next = e.data && e.data.axelisFinderHeight;
      if (typeof next === "number" && next > 320) setH(next);
    }
    addEventListener("message", onMsg);
    return () => removeEventListener("message", onMsg);
  }, []);

  return (
    <iframe
      ref={ref}
      src="/university-finder-widget/index.html?embed=1"
      title="Axelis University Finder"
      scrolling="no"
      style={{ width: "100%", border: 0, display: "block", height: h }}
    />
  );
}
