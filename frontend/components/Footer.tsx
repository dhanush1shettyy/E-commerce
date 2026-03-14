"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[var(--color-brand-dark)] border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="font-[var(--font-playfair)] text-2xl font-bold tracking-[0.25em] gold-text"
            >
              ESSENCE
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Crafting timeless fragrances for the sophisticated individual.
              Each scent tells a story of luxury and elegance.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm tracking-[0.2em] uppercase text-[var(--color-brand-gold)] font-semibold">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/5 pt-10 mb-10">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h4 className="font-[var(--font-playfair)] text-lg">
              Stay in the Loop
            </h4>
            <p className="text-sm text-white/40">
              Subscribe for exclusive offers and new arrivals.
            </p>
            {subscribed ? (
              <p className="text-[var(--color-brand-gold)] text-sm">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  aria-label="Email for newsletter"
                  className="flex-1 bg-white/5 border border-white/10 border-r-0 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors"
                />
                <button
                  type="submit"
                  className="gold-gradient text-black text-xs tracking-wider uppercase font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} ESSENCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
