"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero section animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
    });

    gsap.set(Array.from(heroRef.current?.querySelectorAll(".hero-text") || []), {
      opacity: 0,
      y: 50,
    });

    heroTl.to(Array.from(heroRef.current?.querySelectorAll(".hero-text") || []), {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Story section animations
    gsap.set(Array.from(storyRef.current?.querySelectorAll(".story-text") || []), {
      opacity: 0,
      x: -100,
    });

    gsap.to(Array.from(storyRef.current?.querySelectorAll(".story-text") || []), {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 0.5,
      },
      ease: "power2.out",
    });

    // Values section animations
    gsap.set(Array.from(valuesRef.current?.querySelectorAll(".value-card") || []), {
      opacity: 0,
      scale: 0.8,
      rotationY: -30,
    });

    gsap.to(Array.from(valuesRef.current?.querySelectorAll(".value-card") || []), {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: valuesRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.5,
      },
      ease: "elastic.out(1, 0.5)",
    });

    // Team section animations
    gsap.set(Array.from(teamRef.current?.querySelectorAll(".team-member") || []), {
      opacity: 0,
      y: 100,
    });

    gsap.to(Array.from(teamRef.current?.querySelectorAll(".team-member") || []), {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: teamRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 0.5,
      },
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,180,131,0.24),_transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.9))]" />
        <div className="absolute inset-0">
          <Image
            src="/weddingImages/img1 (1).jpg"
            alt="About Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-text text-6xl md:text-8xl font-bold uppercase tracking-wider mb-6">
            OUR STORY
          </h1>
          <p className="hero-text text-xl md:text-2xl text-white/80 leading-relaxed">
            Crafting unforgettable moments, one celebration at a time
          </p>
          <div className="hero-text w-24 h-1 bg-[#D4B483] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="story-text text-4xl md:text-5xl font-bold uppercase tracking-wide mb-8">
                PASSIONATE ABOUT LOVE
              </h2>
              <p className="story-text text-lg text-white/70 leading-relaxed mb-6">
                Every love story is unique, and we believe every celebration should reflect that uniqueness.
                From intimate gatherings to grand affairs, we bring your vision to life with meticulous attention
                to detail and unwavering commitment to excellence.
              </p>
              <p className="story-text text-lg text-white/70 leading-relaxed mb-6">
                Our journey began with a simple belief: that every couple deserves a celebration as extraordinary
                as their love. What started as a passion project has evolved into a legacy of creating magical
                moments that last a lifetime.
              </p>
              <p className="story-text text-lg text-white/70 leading-relaxed">
                We don't just plan events – we craft experiences. Every detail, every moment, every emotion
                is carefully orchestrated to create memories that will be cherished forever.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="/events/img1.jpg"
                alt="Our Story"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4B483]/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 px-6 md:px-12 bg-[#090909]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              OUR VALUES
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The principles that guide every celebration we create
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="value-card bg-gradient-to-br from-[#D4B483]/10 to-transparent p-8 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#D4B483]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">AUTHENTICITY</h3>
              <p className="text-white/70 leading-relaxed">
                We believe in genuine connections and authentic celebrations that reflect your true story.
              </p>
            </div>

            <div className="value-card bg-gradient-to-br from-[#D4B483]/10 to-transparent p-8 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#D4B483]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">EXCELLENCE</h3>
              <p className="text-white/70 leading-relaxed">
                Every detail matters. We strive for perfection in everything we do, from planning to execution.
              </p>
            </div>

            <div className="value-card bg-gradient-to-br from-[#D4B483]/10 to-transparent p-8 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#D4B483]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">PARTNERSHIP</h3>
              <p className="text-white/70 leading-relaxed">
                We work alongside you as partners, not just vendors, to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              MEET OUR TEAM
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The passionate professionals behind your perfect celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="team-member text-center">
              <div className="relative mb-6">
                <Image
                  src="/weddingImages/rhamely-8eDuPKLpFQE.jpg"
                  alt="Sarah Johnson"
                  width={192}
                  height={192}
                  className="w-48 h-48 object-cover rounded-full mx-auto shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4B483]/20 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">SARAH JOHNSON</h3>
              <p className="text-[#D4B483] font-semibold mb-4">Lead Event Designer</p>
              <p className="text-white/70 leading-relaxed">
                With over 10 years of experience, Sarah brings creativity and elegance to every celebration.
              </p>
            </div>

            <div className="team-member text-center">
              <div className="relative mb-6">
                <Image
                  src="/weddingImages/engin-akyurt-3IN8pjVpDw0-unsplash.jpg"
                  alt="Michael Chen"
                  width={192}
                  height={192}
                  className="w-48 h-48 object-cover rounded-full mx-auto shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4B483]/20 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">MICHAEL CHEN</h3>
              <p className="text-[#D4B483] font-semibold mb-4">Wedding Coordinator</p>
              <p className="text-white/70 leading-relaxed">
                Michael ensures every detail is perfect, from ceremony to reception, with meticulous planning.
              </p>
            </div>

            <div className="team-member text-center">
              <div className="relative mb-6">
                <Image
                  src="/events/img3.jpg"
                  alt="Emma Rodriguez"
                  width={192}
                  height={192}
                  className="w-48 h-48 object-cover rounded-full mx-auto shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4B483]/20 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">EMMA RODRIGUEZ</h3>
              <p className="text-[#D4B483] font-semibold mb-4">Floral & Decor Specialist</p>
              <p className="text-white/70 leading-relaxed">
                Emma creates stunning floral arrangements and decor that transform venues into magical spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-[#D4B483]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
            READY TO CREATE YOUR STORY?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and bring your dream celebration to life.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-[#D4B483] text-black font-bold uppercase tracking-wide rounded-full hover:bg-[#D4B483]/90 transition-colors duration-300"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}