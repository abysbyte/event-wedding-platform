"use client";

import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const overlayColor = "#0C0C0C";
const cinematicEase = cubicBezier(0.55, 0, 1, 0.45);

export function VogueTextMaskTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Page Content */}
      {children}

      {/* mode="wait" ensures the exit animation (screen goes black) finishes 
        BEFORE the new page zoom-in animation begins.
        initial={false} prevents animation on initial page load - it only animates on route changes.
      */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`vogue-mask-${pathname}`}
          className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            // 1. Enter state (New Page): Starts solid, then scales massively to zoom through
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 0,
              scale: 150, // Massive scale to completely swallow the screen
              transition: {
                scale: { duration: 1.5, ease: cinematicEase },
                opacity: { duration: 0.3, delay: 1.1, ease: "linear" }, // Fade out at the very end
              },
            }}
            // 2. Exit state (Old Page): Mask appears and scales down slightly to cover the screen
            exit={{
              opacity: 1,
              scale: 1,
              transition: {
                scale: { duration: 0.8, ease: cinematicEase },
                opacity: { duration: 0.3, ease: "linear" },
              },
            }}
            // PRO TIP: Adjust the transform origin to ensure the camera zooms through the hole in the 'O' or 'G', rather than crashing into the solid letter 'V'.
            style={{ transformOrigin: "50% 50%" }}
          >
          {/* The massively oversized SVG. 
            By making the rect 11000px wide, we guarantee the edges never clip, 
            even when the screen is fully scaled out.
          */}
          <svg
            viewBox="0 0 1000 1000"
            className="absolute left-1/2 top-1/2 min-h-[100vh] min-w-[100vw] -translate-x-1/2 -translate-y-1/2"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="vogue-text-mask" x="-500%" y="-500%" width="1000%" height="1000%">
                {/* The solid white area = What WILL be visible (the black background) */}
                <rect x="-5000" y="-5000" width="11000" height="11000" fill="white" />
                
                {/* The black text = What will be TRANSPARENT (the hole we fly through) */}
                <text
                  x="500"
                  y="500"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="'Playfair Display', 'Times New Roman', serif"
                  fontWeight="900"
                  fontSize="220"
                  letterSpacing="-12"
                  fill="black"
                >
                  VOGUE
                </text>
              </mask>
            </defs>
            
            {/* The giant black curtain applying the mask */}
            <rect
              x="-5000"
              y="-5000"
              width="11000"
              height="11000"
              fill={overlayColor}
              mask="url(#vogue-text-mask)"
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}