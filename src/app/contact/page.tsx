"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/Navbar";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

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

    // Contact info animations
    gsap.set(Array.from(contactInfoRef.current?.querySelectorAll(".contact-item") || []), {
      opacity: 0,
      x: -100,
      rotationY: -45,
    });

    gsap.to(Array.from(contactInfoRef.current?.querySelectorAll(".contact-item") || []), {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: contactInfoRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 0.5,
      },
      ease: "power2.out",
    });

    // Form animations
    gsap.set(Array.from(formRef.current?.querySelectorAll(".form-element") || []), {
      opacity: 0,
      y: 30,
      scale: 0.95,
    });

    gsap.to(Array.from(formRef.current?.querySelectorAll(".form-element") || []), {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 75%",
        end: "center center",
        scrub: 0.5,
      },
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,180,131,0.24),_transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.9))]" />
        <div className="absolute inset-0">
          <Image
            src="/serviceImages/img4.jpg"
            alt="Contact Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-text text-6xl md:text-8xl font-bold uppercase tracking-wider mb-6">
            LET'S CONNECT
          </h1>
          <p className="hero-text text-xl md:text-2xl text-white/80 leading-relaxed">
            Ready to create your perfect celebration? We're here to make it happen.
          </p>
          <div className="hero-text w-24 h-1 bg-[#D4B483] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section ref={contactInfoRef} className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              GET IN TOUCH
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Reach out to us through any of these channels. We're always happy to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="contact-item bg-gradient-to-br from-[#D4B483]/10 to-transparent p-8 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#D4B483]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-[#D4B483]" />
              </div>
              <h3 className="text-xl font-bold mb-4">PHONE</h3>
              <p className="text-white/70 mb-2">(555) 123-4567</p>
              <p className="text-white/70">Mon-Fri 9AM-6PM</p>
            </div>

            <div className="contact-item bg-gradient-to-br from-[#D4B483]/10 to-transparent p-8 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#D4B483]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#D4B483]" />
              </div>
              <h3 className="text-xl font-bold mb-4">EMAIL</h3>
              <p className="text-white/70 mb-2">hello@weddingevents.com</p>
              <p className="text-white/70">We'll respond within 24hrs</p>
            </div>

            <div className="contact-item bg-gradient-to-br from-[#D4B483]/10 to-transparent p-8 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#D4B483]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-[#D4B483]" />
              </div>
              <h3 className="text-xl font-bold mb-4">LOCATION</h3>
              <p className="text-white/70 mb-2">123 Celebration Ave</p>
              <p className="text-white/70">Elegant City, EC 12345</p>
            </div>

            <div className="contact-item bg-gradient-to-br from-[#D4B483]/10 to-transparent p-8 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#D4B483]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-[#D4B483]" />
              </div>
              <h3 className="text-xl font-bold mb-4">HOURS</h3>
              <p className="text-white/70 mb-2">Mon-Fri: 9AM-6PM</p>
              <p className="text-white/70">Sat-Sun: By Appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="py-24 px-6 md:px-12 bg-[#090909]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              START YOUR JOURNEY
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Tell us about your vision and let's create something magical together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="form-element grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#D4B483] transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#D4B483] transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-element grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#D4B483] transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#D4B483] transition-colors"
                >
                  <option value="" className="bg-[#050505]">Select Event Type</option>
                  <option value="wedding" className="bg-[#050505]">Wedding</option>
                  <option value="engagement" className="bg-[#050505]">Engagement Party</option>
                  <option value="birthday" className="bg-[#050505]">Birthday Celebration</option>
                  <option value="corporate" className="bg-[#050505]">Corporate Event</option>
                  <option value="other" className="bg-[#050505]">Other</option>
                </select>
              </div>
            </div>

            <div className="form-element">
              <label htmlFor="eventDate" className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                Preferred Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#D4B483] transition-colors"
              />
            </div>

            <div className="form-element">
              <label htmlFor="message" className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
                Tell Us About Your Vision *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#D4B483] transition-colors resize-none"
                placeholder="Describe your dream celebration, preferred style, guest count, budget range, and any special requirements..."
              />
            </div>

            <div className="form-element text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4B483] text-black font-bold uppercase tracking-wide rounded-full hover:bg-[#D4B483]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4B483]/25"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              VISIT OUR STUDIO
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Come experience our creative space and see how we bring visions to life.
            </p>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4B483]/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#D4B483] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Our Location</h3>
                <p className="text-white/70">123 Celebration Avenue<br />Elegant City, EC 12345</p>
              </div>
            </div>
            {/* Placeholder for actual map */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
          </div>
        </div>
      </section>
    </div>
  );
}