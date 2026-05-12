"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MINIMUM_DISPLAY_MS = 2400; // minimum time the loader is visible

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Simulate progress while loading
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        // Ease toward 90% while still loading
        if (prev < 90) return prev + (90 - prev) * 0.08;
        return prev;
      });
    }, 60);

    const handleComplete = () => {
      // Jump to 100%
      if (progressInterval.current) clearInterval(progressInterval.current);
      setProgress(100);

      // Ensure loader stays for minimum display time
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, MINIMUM_DISPLAY_MS - elapsed);

      setTimeout(() => {
        setIsLoading(false);
      }, remaining + 400); // small buffer after hitting 100%
    };

    // Check if already loaded
    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
    }

    return () => {
      window.removeEventListener("load", handleComplete);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  // Lock scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          className="page-loader-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.55, 0, 0.1, 1] }}
        >
          {/* Background layers */}
          <div className="loader-bg-gradient" />

          {/* Floating orbs */}
          <div className="loader-orb loader-orb-1" />
          <div className="loader-orb loader-orb-2" />
          <div className="loader-orb loader-orb-3" />

          {/* Content */}
          <motion.div
            className="loader-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top label */}
            <motion.p
              className="loader-top-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              EVENTS &amp; MANAGEMENT
            </motion.p>

            {/* Main logo text */}
            <motion.div
              className="loader-logo-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="loader-logo-text">VOGUE</h1>
              <div className="loader-logo-shimmer" />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="loader-progress-container"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "240px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="loader-progress-track">
                <motion.div
                  className="loader-progress-fill"
                  style={{ width: `${progress}%` }}
                />
                <div className="loader-progress-glow" style={{ width: `${progress}%` }} />
              </div>
              <motion.p
                className="loader-progress-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>

            {/* Bottom tagline */}
            <motion.p
              className="loader-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Creating Unforgettable Moments
            </motion.p>
          </motion.div>

          {/* Decorative corner lines */}
          <motion.div
            className="loader-corner loader-corner-tl"
            initial={{ scaleX: 0, scaleY: 0 }}
            animate={{ scaleX: 1, scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.div
            className="loader-corner loader-corner-br"
            initial={{ scaleX: 0, scaleY: 0 }}
            animate={{ scaleX: 1, scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
