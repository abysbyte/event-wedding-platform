"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold font-[family-name:var(--font-playfair)] tracking-wider ${isScrolled ? "text-primary" : "text-white"
              }`}
          >
            Vogue Events & Entertainment
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className={`text-sm uppercase tracking-widest hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"
                  }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: navLinks.length * 0.1 }}
            className={`px-6 py-2 rounded-full border transition-all ${isScrolled
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-white text-white hover:bg-white hover:text-primary"
              }`}
          >
            Book Consult
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-foreground" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100vh" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8"
        >
          <button
            className="absolute top-6 right-6"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-8 h-8 text-foreground" />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-[family-name:var(--font-playfair)] text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
