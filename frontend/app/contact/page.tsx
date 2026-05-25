"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! Our fragrance experts will get back to you shortly.");
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-black)] pt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-4 block">
            Get in Touch
          </span>
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6">
            Contact <span className="gold-text">Essence</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you have a question about our collections, need help choosing a signature scent, 
            or just want to share your fragrance journey, we're here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[var(--color-brand-gold)]/40 transition-colors">
                  <Mail className="text-[var(--color-brand-gold)]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-[var(--font-playfair)]">Email Us</h3>
                  <p className="text-white/60 mb-1">General Inquiries: abc@gmail.com</p>
                  <p className="text-white/60">Support: support@essence.com</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[var(--color-brand-gold)]/40 transition-colors">
                  <Phone className="text-[var(--color-brand-gold)]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-[var(--font-playfair)]">Call Us</h3>
                  <p className="text-white/60 mb-1">9876543210</p>
                  <p className="text-white/60">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[var(--color-brand-gold)]/40 transition-colors">
                  <MapPin className="text-[var(--color-brand-gold)]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-[var(--font-playfair)]">Visit Our Boutique</h3>
                  <p className="text-white/60 mb-1">725 Fifth Avenue</p>
                  <p className="text-white/60">New York, NY 10022, United States</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-6">Follow Our Journey</h3>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-all"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Mail size={120} className="text-[var(--color-brand-gold)]" />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50" htmlFor="name">FullName</label>
                  <input
                    id="name"
                    required
                    type="text"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--color-brand-gold)]/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    required
                    type="email"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--color-brand-gold)]/50 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50" htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--color-brand-gold)]/50 transition-colors appearance-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order & Shipment</option>
                  <option value="fragrance">Fragrance Advice</option>
                  <option value="wholesale">Wholesale</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50" htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--color-brand-gold)]/50 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full gold-gradient text-black font-bold uppercase tracking-[0.2em] py-5 rounded-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
