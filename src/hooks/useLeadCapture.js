import { useState, useEffect } from 'react';

export const useLeadCapture = () => {
  const [showTimedModal, setShowTimedModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showCTAModal, setShowCTAModal] = useState(false);
  const [hasShownTimed, setHasShownTimed] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);

  // Check if user has already seen modals in this session
  useEffect(() => {
    const timedShown = sessionStorage.getItem('axelis_timed_modal_shown');
    const exitShown = sessionStorage.getItem('axelis_exit_modal_shown');
    
    if (timedShown) setHasShownTimed(true);
    if (exitShown) setHasShownExit(true);
  }, []);

  // Timed modal disabled - only show on CTA click
  // useEffect(() => {
  //   if (hasShownTimed) return;

  //   const timer = setTimeout(() => {
  //     setShowTimedModal(true);
  //     setHasShownTimed(true);
  //     sessionStorage.setItem('axelis_timed_modal_shown', 'true');
  //   }, 10000); // 10 seconds - optimized for better conversion

  //   return () => clearTimeout(timer);
  // }, [hasShownTimed]);

  // Exit intent modal
  useEffect(() => {
    if (hasShownExit) return;

    const handleMouseLeave = (e) => {
      // Only trigger if mouse is leaving from the top of the page and moving fast
      if (e.clientY <= 0 && e.relatedTarget === null) {
        setShowExitModal(true);
        setHasShownExit(true);
        sessionStorage.setItem('axelis_exit_modal_shown', 'true');
      }
    };

    const handleBeforeUnload = (e) => {
      // Alternative exit intent detection
      if (!hasShownExit) {
        setShowExitModal(true);
        setHasShownExit(true);
        sessionStorage.setItem('axelis_exit_modal_shown', 'true');
      }
    };

    // Add both event listeners for better coverage
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasShownExit]);

  const closeTimedModal = () => {
    setShowTimedModal(false);
  };

  const closeExitModal = () => {
    setShowExitModal(false);
  };

  const closeCTAModal = () => {
    setShowCTAModal(false);
  };

  const openCTAModal = (trigger = 'cta') => {
    // Close any other open modals first
    setShowTimedModal(false);
    setShowExitModal(false);
    setShowCTAModal(true);
  };

  const resetModals = () => {
    sessionStorage.removeItem('axelis_timed_modal_shown');
    sessionStorage.removeItem('axelis_exit_modal_shown');
    setHasShownTimed(false);
    setHasShownExit(false);
    setShowTimedModal(false);
    setShowExitModal(false);
    setShowCTAModal(false);
  };

  // Debug function to force show modals (useful for testing)
  const forceShowTimedModal = () => {
    setShowTimedModal(true);
  };

  const forceShowExitModal = () => {
    setShowExitModal(true);
  };

  return {
    showTimedModal,
    showExitModal,
    showCTAModal,
    closeTimedModal,
    closeExitModal,
    closeCTAModal,
    openCTAModal,
    resetModals,
    forceShowTimedModal,
    forceShowExitModal
  };
};
