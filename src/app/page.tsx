"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, Shirt, Play, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/Navbar";
import { heroSlides, journeyMoments, storyVideos, testimonials } from "@/lib/weddingData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const infoItems = [
  {
    icon: MapPin,
    title: "The Venue",
    detail: "Willow Estate",
    link: "Details",
  },
  {
    icon: Calendar,
    title: "The Date",
    detail: "October 18, 2026",
    link: "View",
  },
  {
    icon: Shirt,
    title: "Dress Code",
    detail: "Glam Black Tie",
    link: "Guidelines",
  },
];

const heroContentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredMoment, setHoveredMoment] = useState<number | null>(null);
  const testimonialSectionRef = useRef<HTMLDivElement>(null);
  const testimonialCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  // Testimonial cards horizontal scroll animation
  useGSAP(() => {
    if (!testimonialCardsRef.current) return;

    const container = testimonialCardsRef.current;
    const cards = container.querySelectorAll(".testimonial-card");

    // Set initial state
    gsap.set(cards, { opacity: 0, x: 100, rotationY: -30 });

    // Horizontal scroll animation
    const totalScroll = container.scrollWidth - container.clientWidth;

    gsap.to(container, {
      scrollLeft: totalScroll,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: testimonialSectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.2,
        markers: false,
      },
    });

    // Cards entrance animation
    gsap.to(cards, {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: testimonialSectionRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 0.5,
      },
      ease: "power2.out",
    });

    // Hover animations
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -15,
          boxShadow: "0 30px 60px rgba(168, 85, 247, 0.4)",
          duration: 0.3,
          overwrite: "auto",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          duration: 0.3,
          overwrite: "auto",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative h-screen overflow-hidden text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[activeSlide].id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,180,131,0.24),_transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.9))]" />
            <div className="absolute inset-0">
              <Image
                src={heroSlides[activeSlide].image}
                alt={heroSlides[activeSlide].title}
                fill
                unoptimized
                className="object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <Navbar />
        <div className="absolute inset-0 z-10" />
        <div className="relative z-30 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-10 lg:px-10">
          <div className="flex-1" />

          <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] xl:gap-24">
            <motion.div
              key={`hero-copy-${activeSlide}`}
              variants={heroContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <p className="text-sm uppercase tracking-[0.5em] text-white/50">Wedding Celebration</p>
              <h1 className="mt-6 max-w-xl text-6xl font-semibold uppercase leading-[0.92] text-white sm:text-7xl lg:text-[5.5rem]">
                {heroSlides[activeSlide].title}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/75 sm:text-xl">
                {heroSlides[activeSlide].subtitle}
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                {heroSlides[activeSlide].description}
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex min-w-[180px] items-start gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl transition hover:border-[#D4B483]/40"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4B483]/15 text-[#D4B483]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">{item.title}</p>
                        <p className="mt-2 font-semibold text-white">{item.detail}</p>
                        <div className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-[#D4B483]">
                          <span>{item.link}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <div className="relative hidden items-end justify-end lg:flex">
              <div className="flex flex-col gap-6 text-right text-sm uppercase tracking-[0.45em] text-white/50">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className="group inline-flex cursor-pointer items-center gap-4 text-left transition"
                  >
                    <span
                      className={`inline-flex min-w-[48px] justify-end text-base font-semibold ${index === activeSlide ? "text-[#D4B483]" : "text-white/50"
                        }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`h-[1px] w-20 transition-all duration-300 ${index === activeSlide ? "bg-[#D4B483] opacity-100" : "bg-white/10 opacity-40"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#090909] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-white/50">Featured Moments</p>
          <h2 className="mt-4 text-4xl font-semibold uppercase tracking-wide text-white sm:text-5xl">
            Our Journey
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Four cinematic moments captured in deep contrast, each one a chapter of a story that feels timeless.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-4">
            {journeyMoments.map((moment, index) => (
              <motion.div
                key={moment.id}
                onMouseEnter={() => setHoveredMoment(index)}
                onMouseLeave={() => setHoveredMoment(null)}
                whileHover={{ scale: 1.03 }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 transition duration-300 ${hoveredMoment !== null && hoveredMoment !== index ? "opacity-70" : "opacity-100"
                  }`}
              >
                <div className="relative h-[84vh] min-h-[420px] overflow-hidden bg-[#111111]">
                  <div className="relative h-full w-full">
                    <Image
                      src={moment.image}
                      alt={moment.title}
                      fill
                      unoptimized
                      className={`object-cover transition duration-700 ${hoveredMoment === index
                          ? "brightness-110 grayscale-0"
                          : "brightness-60 grayscale"
                        }`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={hoveredMoment === index ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.9 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <p className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">{moment.title}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div ref={testimonialSectionRef} className="relative w-full bg-gradient-to-b from-black via-gray-900 to-black py-24 px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
            LOVE STORIES
          </h2>
          <p className="text-center text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Hear from couples and families who trusted us with their most special moments
          </p>
        </div>

        {/* Testimonial Cards Horizontal Scroll */}
        <div className="relative w-full overflow-hidden mb-8">
          <div
            ref={testimonialCardsRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-6"
            style={{
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card group relative flex-shrink-0 w-80 h-96 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  scrollSnapAlign: "start",
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.clientName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 80vw, 320px"
                    loading="lazy"
                  />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/60 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  {/* Event Type Badge */}
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold shadow-lg">
                      {testimonial.eventType}
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-gray-300">{testimonial.date}</p>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-4">
                    {/* Stars Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(testimonial.rating)
                              ? "text-yellow-400"
                              : i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-500"
                          }`}
                          fill={i < Math.floor(testimonial.rating) ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-yellow-400 font-semibold">{testimonial.rating}</span>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-sm md:text-base leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300 text-gray-100">
                      "{testimonial.feedback}"
                    </p>

                    {/* Client Name */}
                    <div className="pt-2 border-t border-gray-400">
                      <p className="font-bold text-lg">{testimonial.clientName}</p>
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H6" />
            </svg>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-5 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-5 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <section
        id="story"
        className="relative overflow-hidden bg-[#020202] py-24 text-white"
      >
        <div className="absolute inset-0 bg-[url-('/events/img4.jpg')] bg-cover bg-center opacity-60 blur-none w-full h-full" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[360px_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-sm uppercase tracking-[0.55em] text-[#D4B483]/80">
              Discover Our Story
            </p>
            <h3 className="mt-6 text-5xl font-semibold uppercase tracking-[0.1em] text-white sm:text-6xl">
              Discover Our Story
            </h3>
            <div className="mt-10 inline-flex items-center gap-4 rounded-full border border-[#D4B483]/30 bg-white/5 px-5 py-4 text-sm text-white/90 shadow-xl shadow-black/20 backdrop-blur-md transition hover:bg-[#D4B483]/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4B483]/15 text-[#D4B483]">
                <Play className="h-5 w-5" />
              </span>
              <span className="font-semibold uppercase tracking-[0.35em]">Watch The Video</span>
            </div>
            <p className="mt-8 max-w-md text-base leading-8 text-white/70">
              A cinematic invitation to the moments that led us here: the first glance, the secret note, the quiet promise.
            </p>
          </motion.div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {storyVideos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-[2rem] bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur-xl transition group-hover:scale-105">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-sm uppercase tracking-[0.35em] text-white/80">
                  {video.title}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer id="rsvp" className="border-t border-white/10 bg-[#040404] px-6 py-16 text-center text-white/70">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Save the date and RSVP soon.</p>
      </footer>
    </main>
  );
}
