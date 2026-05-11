"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// Mock Data
const galleryData = [
  {
    id: 1,
    locationName: "Lake Como, Italy",
    title: "VILLA DEL BALBIANELLO",
    description:
      "Experience the ultimate luxury wedding destination. A breathtaking historic villa overlooking the serene waters of Lake Como, offering an unparalleled setting for your vows.",
    imageUrl:
      "/images/img1.jpeg",
  },
  {
    id: 2,
    locationName: "Santorini, Greece",
    title: "AEGEAN SUNSET",
    description:
      "Say 'I do' against the iconic backdrop of whitewashed buildings and the endless blue of the Aegean Sea. A romantic, sun-drenched celebration.",
    imageUrl:
      "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 3,
    locationName: "Paris, France",
    title: "CHÂTEAU ELEGANCE",
    description:
      "A fairytale celebration in the heart of the French countryside. Classic elegance meets modern luxury in an 18th-century château.",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 4,
    locationName: "Bali, Indonesia",
    title: "TROPICAL PARADISE",
    description:
      "Immerse yourself in lush, exotic beauty. A spiritual and tranquil haven for an unforgettable, intimate ceremony surrounded by nature.",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2538&auto=format&fit=crop",
  },
  {
    id: 5,
    locationName: "Amalfi Coast, Italy",
    title: "CLIFFSIDE ROMANCE",
    description:
      "Dramatic cliffs, vibrant lemons, and the sparkling Mediterranean. A vibrant and passionate setting for a vibrant and passionate love story.",
    imageUrl:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2669&auto=format&fit=crop",
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState(galleryData);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);

  const activeItem = items[0];

  const handleNext = () => {
    setDirection(1);
    setItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      if (first) newItems.push(first);
      return newItems;
    });
    setProgress(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setItems((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      if (last) newItems.unshift(last);
      return newItems;
    });
    setProgress(0);
  };

  // Auto advance (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          handleNext();
          return 0;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-[family-name:var(--font-lora)]">
      <Navbar />

      {/* Background Image with Crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeItem.imageUrl}
            alt={activeItem.title}
            fill
            className="h-full w-full object-cover"
            sizes="100vw"
            loading={activeItem.id === 1 ? "eager" : "lazy"}
          />
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Layout */}
      <div className="relative z-20 h-full w-full flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-24">

        <div className="flex flex-col md:flex-row h-full w-full items-center md:items-end justify-between gap-12">

          {/* Left Column: Hero Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center h-full mb-20 md:mb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                }}
                className="space-y-6"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  className="flex items-center gap-2 text-primary uppercase tracking-[0.2em] text-sm font-semibold"
                >
                  <MapPin className="w-4 h-4" />
                  {activeItem.locationName}
                </motion.div>

                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-playfair)] leading-none uppercase drop-shadow-lg"
                >
                  {activeItem.title}
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  className="max-w-lg text-lg text-white/80 leading-relaxed"
                >
                  {activeItem.description}
                </motion.p>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <button className="mt-4 px-8 py-4 bg-primary text-primary-foreground rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-white hover:text-primary transition-all duration-300 shadow-lg">
                    Discover Location
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Carousel Thumbnails */}
          <div className="w-full md:w-1/2 overflow-hidden flex justify-start md:justify-end pb-8">
            <div className="flex gap-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.slice(1, 4).map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    transition={{
                      layout: { type: "spring", stiffness: 200, damping: 25 },
                      opacity: { duration: 0.4 },
                    }}
                    className="relative w-32 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-2xl cursor-pointer group"
                    onClick={() => {
                      // simple hack to click specific item, skip implementing full custom jump for now to save time, just do handleNext to advance if they click
                      handleNext();
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="120px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs uppercase tracking-wider text-primary mb-1">
                        {item.locationName}
                      </p>
                      <h4 className="text-sm font-semibold font-[family-name:var(--font-playfair)] line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="w-full flex flex-col items-center justify-center gap-6 mt-auto">
          {/* Progress Bar */}
          <div className="w-full max-w-md h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Arrows */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
