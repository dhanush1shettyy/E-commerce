"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUserName, setAuthUserName] = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement | null>(null);

  const syncAuthState = () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user_name");
    setIsAuthenticated(Boolean(token));
    setAuthUserName(name);
  };

  useEffect(() => {
    syncAuthState();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedDesktopMenu = userMenuRef.current?.contains(target);
      const clickedMobileMenu = mobileUserMenuRef.current?.contains(target);

      if (!clickedDesktopMenu && !clickedMobileMenu) {
        setUserMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleMobileToggle = () => {
    setUserMenuOpen(false);
    setMobileOpen((prev) => !prev);
  };

  const handleAuthLinkClick = () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
    }
    setIsAuthenticated(false);
    setAuthUserName(null);
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-[var(--color-brand-black)]/90 backdrop-blur-md border-b border-white/5"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold tracking-[0.25em] gold-text"
          aria-label="ESSENCE home"
        >
          ESSENCE
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm tracking-wider uppercase text-white/70 hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-brand-gold)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5">
          <button
            aria-label="Search"
            className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors duration-300"
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Shopping cart"
            className="relative text-white/70 hover:text-[var(--color-brand-gold)] transition-colors duration-300"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--color-brand-gold)] rounded-full text-[10px] font-semibold text-black flex items-center justify-center">
              0
            </span>
          </button>
          <div className="relative" ref={userMenuRef}>
            <button
              aria-label="User account"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              onClick={() => {
                syncAuthState();
                setUserMenuOpen((open) => !open);
              }}
              className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors duration-300"
            >
              <User size={20} />
            </button>
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  role="menu"
                  className="absolute right-0 mt-3 w-44 rounded-xl border border-white/10 bg-[var(--color-brand-dark)] py-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                >
                  <span className="absolute -top-1 right-5 h-3 w-3 rotate-45 border-l border-t border-white/10 bg-[var(--color-brand-dark)]" />
                  <div className="px-4 pb-3 pt-2">
                    <span className="block text-[10px] uppercase tracking-[0.35em] text-white/40">Account</span>
                    <div className="mt-2 h-px w-full bg-[var(--color-brand-gold)] opacity-40" />
                    {isAuthenticated && (
                      <p className="mt-3 text-sm text-white/80">
                        Hi {authUserName || "there"}
                      </p>
                    )}
                  </div>
                  {isAuthenticated ? (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-[var(--color-brand-gold)]"
                    >
                      Log out
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        role="menuitem"
                        onClick={handleAuthLinkClick}
                        className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-[var(--color-brand-gold)]"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/signup"
                        role="menuitem"
                        onClick={handleAuthLinkClick}
                        className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-[var(--color-brand-gold)]"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={handleMobileToggle}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--color-brand-dark)] border-t border-white/5"
          >
            <div className="flex flex-col py-6 px-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm tracking-wider uppercase text-white/70 hover:text-[var(--color-brand-gold)] transition-colors py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-5 pt-4 border-t border-white/10">
                <button aria-label="Search" className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors">
                  <Search size={20} />
                </button>
                <button aria-label="Shopping cart" className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors">
                  <ShoppingBag size={20} />
                </button>
                <div className="relative" ref={mobileUserMenuRef}>
                  <button
                    aria-label="User account"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => {
                      syncAuthState();
                      setUserMenuOpen((open) => !open);
                    }}
                    className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors"
                  >
                    <User size={20} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        role="menu"
                        className="absolute right-0 mt-3 w-40 rounded-xl border border-white/10 bg-[var(--color-brand-dark)] py-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                      >
                        <span className="absolute -top-1 right-4 h-3 w-3 rotate-45 border-l border-t border-white/10 bg-[var(--color-brand-dark)]" />
                        <div className="px-4 pb-3 pt-2">
                          <span className="block text-[10px] uppercase tracking-[0.35em] text-white/40">Account</span>
                          <div className="mt-2 h-px w-full bg-[var(--color-brand-gold)] opacity-40" />
                          {isAuthenticated && (
                            <p className="mt-3 text-sm text-white/80">
                              Hi {authUserName || "there"}
                            </p>
                          )}
                        </div>
                        {isAuthenticated ? (
                          <button
                            type="button"
                            role="menuitem"
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-[var(--color-brand-gold)]"
                          >
                            Log out
                          </button>
                        ) : (
                          <>
                            <Link
                              href="/signin"
                              role="menuitem"
                              onClick={handleAuthLinkClick}
                              className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-[var(--color-brand-gold)]"
                            >
                              Sign in
                            </Link>
                            <Link
                              href="/signup"
                              role="menuitem"
                              onClick={handleAuthLinkClick}
                              className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-[var(--color-brand-gold)]"
                            >
                              Sign up
                            </Link>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
