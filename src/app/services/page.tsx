"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/Navbar";
import { testimonials } from "@/lib/weddingData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  const testimonialSectionRef = useRef<HTMLDivElement>(null);
  const testimonialCardsRef = useRef<HTMLDivElement>(null);

  // Always open from the top
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !heroTextRef.current || !heroImageRef.current || !maskRef.current || !servicesContentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Initial states
    gsap.set(maskRef.current, { clipPath: "circle(0% at 50% 50%)" });
    gsap.set(heroTextRef.current, { scale: 1, yPercent: 0, opacity: 1 });
    gsap.set(heroImageRef.current, { scale: 1, xPercent: 0, yPercent: 0 });
    gsap.set(servicesContentRef.current.children, { scale: 0, rotationY: -90 });

    // Animation sequence
    tl.to(maskRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 2,
      ease: "power2.inOut",
    })
    .to(heroImageRef.current, {
      scale: 1.2,
      duration: 1,
      ease: "power2.inOut",
    }, 0)
    .to(heroTextRef.current, {
      scale: 0.3,
      yPercent: -50,
      opacity: 0,
      duration: 2,
      ease: "power2.inOut",
    }, 0)
    .to(heroImageRef.current, {
      scale: 0.5,
      xPercent: -40,
      yPercent: -20,
      duration: 2,
      ease: "power2.inOut",
    }, 0)
    .to(servicesContentRef.current.children, {
      scale: 1,
      rotationY: 0,
      duration: 1,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
    }, 0.5);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
    <div className="relative">
      <Navbar />
      {/* Main Pinned Container */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden relative">
        {/* Layer 1: Dark Hero Base */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          {/* Background Image */}
          <img
            ref={heroImageRef}
            src="/serviceImages/img4.jpg" // Placeholder path
            alt="Hero Center Image"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Foreground Text */}
          <div
            ref={heroTextRef}
            className="absolute text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider opacity-20 select-none pointer-events-none z-10"
            style={{ fontSize: 'clamp(3rem, 15vw, 12rem)' }}
          >
            OUR SERVICES
          </div>
        </div>

        {/* Layer 2: Light Reveal Mask */}
        <div
          ref={maskRef}
          className="absolute inset-0 bg-white flex flex-col items-center justify-center"
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-12 text-center">
              WHAT WE DO
            </h2>

            {/* Services Grid */}
            <div ref={servicesContentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform-gpu">
                <div className="text-2xl font-bold text-gray-800 mb-2">Full Wedding Planning</div>
                <p className="text-gray-600">Comprehensive wedding planning from conceptualization to execution, ensuring your dream day becomes reality.</p>
              </div>

              {/* Service Card 2 */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform-gpu">
                <div className="text-2xl font-bold text-gray-800 mb-2">Event Design & Styling</div>
                <p className="text-gray-600">Creative design solutions for floral arrangements, lighting, and decor that reflect your unique style.</p>
              </div>

              {/* Service Card 3 */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform-gpu">
                <div className="text-2xl font-bold text-gray-800 mb-2">Day-of Coordination</div>
                <p className="text-gray-600">Expert coordination to manage vendors, timelines, and logistics so you can enjoy your special day.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-bounce">
            LOVE
          </div>
          <div className="absolute top-3/4 right-1/4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
            EVENTS
          </div>
          <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs animate-ping">
            WEDDING
          </div>
        </div>
      </div>

      

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
              <Image
                src={testimonial.image}
                alt={testimonial.clientName}
                fill
                className="absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 80vw, 320px"
                loading="lazy"
              />

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

      {/* Additional content below the pinned section */}
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-black mb-4">Ready to Plan Your Perfect Day?</h3>
          <p className="text-gray-600">Let&apos;s create unforgettable memories together.</p>
        </div>
      </div>
    </div>
  );
}
