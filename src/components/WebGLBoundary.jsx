'use client';

import React from 'react';

/**
 * Keeps a WebGL canvas from taking the page down with it.
 *
 * The testimonials globe threw "Error creating WebGL context" with no
 * capability check and no boundary above it, and Next replaced the entire
 * route with the blank "Application error" screen. Not the globe — the whole
 * page, including the testimonials it exists to decorate. Anyone with
 * hardware acceleration off or a blocklisted GPU saw nothing at all.
 *
 * Two guards, because they catch different failures:
 *
 *   The probe catches "this browser cannot do WebGL", which is knowable
 *   before we mount anything.
 *   The boundary catches "it could, and then it threw anyway" — context
 *   loss, a driver crash, an out-of-memory on a big texture.
 *
 * A decorative canvas is never worth a blank page, so the fallback renders
 * whatever is passed as `fallback`, or nothing at all.
 */

function hasWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

class Boundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Worth a line in the console: silent decoration failure is fine, but a
    // silent cause makes it unfixable.
    console.warn('[webgl] canvas failed, falling back:', error?.message);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default function WebGLBoundary({ children, fallback = null }) {
  const [supported, setSupported] = React.useState(null);

  // Probed after mount so the server and the first client render agree.
  React.useEffect(() => { setSupported(hasWebGL()); }, []);

  if (supported === null || supported === false) return fallback;
  return <Boundary fallback={fallback}>{children}</Boundary>;
}
