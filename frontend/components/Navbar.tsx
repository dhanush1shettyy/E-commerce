"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import {
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  getCartCount,
} from "@/lib/cartStorage";

const perfumeBrands = [
  "Dior",
  "Creed",
  "Giorgio Armani",
  "Tom Ford",
  "Gucci",
  "Parfums de Marly",
  "Ralph Lauren",
  "Rasasi",
  "Viktor&Rolf",
  "Yves Saint Laurent",
  "Prada",
  "Bond No. 9"
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUserName, setAuthUserName] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement | null>(null);

  const toTitleCase = (value: string) =>
    value
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const getFirstName = (value: string | null) => {
    if (!value) return "There";
    const firstPart = value.trim().split(" ")[0] || "There";
    return toTitleCase(firstPart);
  };

  const syncAuthState = () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user_name");
    setIsAuthenticated(Boolean(token));
    setAuthUserName(name);
  };

  const syncCartCount = () => {
    if (typeof window === "undefined") return;
    setCartCount(getCartCount());
  };

  useEffect(() => {
    syncAuthState();
    syncCartCount();

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
        setSearchOpen(false);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        syncCartCount();
      }
    };

    const handleCartUpdate = () => syncCartCount();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener("storage", handleStorage);
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

  const submitSearch = (query: string) => {
    const normalizedQuery = query.trim();
    setSearchOpen(false);
    setMobileOpen(false);

    if (!normalizedQuery) {
      router.push("/shop");
      return;
    }

    const params = new URLSearchParams({ search: normalizedQuery });
    router.push(`/shop?${params.toString()}`);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch(searchQuery);
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
          {navLinks.map((link) => {
            if (link.label === "Shop") {
              return (
                <div key={link.label} className="relative group/shop py-2">
                  <Link
                    href={link.href}
                    className="relative text-sm tracking-wider uppercase text-white/70 hover:text-white transition-colors duration-300 group flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronDown size={14} className="opacity-70 transition-transform group-hover/shop:-rotate-180" />
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-brand-gold)] transition-all duration-300 group-hover:w-full" />
                  </Link>

                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover/shop:opacity-100 group-hover/shop:visible transition-all duration-300 z-50">
                    <div className="w-64 rounded-xl border border-white/10 bg-[var(--color-brand-dark)] py-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                      <span className="absolute -top-1 left-6 h-3 w-3 rotate-45 border-l border-t border-white/10 bg-[var(--color-brand-dark)] z-[-1]" />
                      
                      <div className="flex flex-col max-h-[50vh] overflow-y-auto">
                        {perfumeBrands.map((brand) => (
                          <Link
                            key={brand}
                            href={`/shop?search=${encodeURIComponent(brand)}`}
                            className="block px-5 py-2.5 text-sm font-[var(--font-playfair)] text-white/80 hover:text-[var(--color-brand-gold)] transition-colors hover:bg-white/5"
                          >
                            {brand}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm tracking-wider uppercase text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-brand-gold)] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5">
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 240 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSearchSubmit}
                className="overflow-hidden"
              >
                <label htmlFor="desktop-search" className="sr-only">
                  Search perfumes
                </label>
                <input
                  id="desktop-search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by brand or model"
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--color-brand-gold)]"
                />
              </motion.form>
            )}
          </AnimatePresence>
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((open) => !open)}
            className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors duration-300"
          >
            <Search size={20} />
          </button>
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative text-white/70 hover:text-[var(--color-brand-gold)] transition-colors duration-300"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 bg-[var(--color-brand-gold)] rounded-full text-[10px] font-semibold text-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="relative" ref={userMenuRef}>
            <button
              aria-label="User account"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              onClick={() => {
                syncAuthState();
                setUserMenuOpen((open) => !open);
              }}
              className="h-9 w-9 rounded-full border border-white/20 bg-black/30 flex items-center justify-center text-white/70 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)]/40 transition-colors duration-300"
            >
              <User size={21} />
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
                    <span className="block font-[var(--font-playfair)] text-xs tracking-[0.25em] text-[var(--color-brand-gold)]/75">Account</span>
                    <div className="mt-2 h-px w-full bg-[var(--color-brand-gold)] opacity-40" />
                    {isAuthenticated && (
                      <p className="mt-3 text-base text-[var(--color-brand-gold)] font-[var(--font-playfair)]">
                        Hi {getFirstName(authUserName)}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/cart"
                    role="menuitem"
                    onClick={handleAuthLinkClick}
                    className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Show Cart
                  </Link>
                  <Link
                    href="/orders"
                    role="menuitem"
                    onClick={handleAuthLinkClick}
                    className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    My Order
                  </Link>
                  {isAuthenticated ? (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2.5 text-left text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      Log Out
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        role="menuitem"
                        onClick={handleAuthLinkClick}
                        className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        role="menuitem"
                        onClick={handleAuthLinkClick}
                        className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        Sign Up
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
              {navLinks.map((link) => {
                if (link.label === "Shop") {
                  return (
                    <div key={link.label} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          className="text-sm tracking-wider uppercase text-white/70 hover:text-[var(--color-brand-gold)] transition-colors py-2"
                          onClick={() => {
                            setSearchOpen(false);
                            setMobileOpen(false);
                          }}
                        >
                          {link.label}
                        </Link>
                        <button 
                          onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                          className="text-white/50 hover:text-[var(--color-brand-gold)] p-2 active:scale-95 transition-transform"
                        >
                          <ChevronDown size={18} className={`transition-transform duration-300 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {shopDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-4 border-l border-white/10 ml-2 mt-1 flex flex-col gap-2"
                          >
                            {perfumeBrands.map((brand) => (
                              <Link
                                key={brand}
                                href={`/shop?search=${encodeURIComponent(brand)}`}
                                className="text-sm text-white/60 hover:text-[var(--color-brand-gold)] transition-colors py-1.5"
                                onClick={() => {
                                  setSearchOpen(false);
                                  setMobileOpen(false);
                                }}
                              >
                                {brand}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm tracking-wider uppercase text-white/70 hover:text-[var(--color-brand-gold)] transition-colors py-2"
                    onClick={() => {
                      setSearchOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex gap-5 pt-4 border-t border-white/10">
                <button
                  aria-label="Search"
                  onClick={() => setSearchOpen((open) => !open)}
                  className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors"
                >
                  <Search size={20} />
                </button>
                <Link
                  href="/cart"
                  aria-label="Shopping cart"
                  className="text-white/70 hover:text-[var(--color-brand-gold)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag size={20} />
                </Link>
                <div className="relative" ref={mobileUserMenuRef}>
                  <button
                    aria-label="User account"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => {
                      syncAuthState();
                      setUserMenuOpen((open) => !open);
                    }}
                    className="h-9 w-9 rounded-full border border-white/20 bg-black/30 flex items-center justify-center text-white/70 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)]/40 transition-colors"
                  >
                    <User size={21} />
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
                          <span className="block font-[var(--font-playfair)] text-xs tracking-[0.25em] text-[var(--color-brand-gold)]/75">Account</span>
                          <div className="mt-2 h-px w-full bg-[var(--color-brand-gold)] opacity-40" />
                          {isAuthenticated && (
                            <p className="mt-3 text-base text-[var(--color-brand-gold)] font-[var(--font-playfair)]">
                              Hi {getFirstName(authUserName)}
                            </p>
                          )}
                        </div>
                        <Link
                          href="/cart"
                          role="menuitem"
                          onClick={handleAuthLinkClick}
                          className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          Show Cart
                        </Link>
                        <Link
                          href="/orders"
                          role="menuitem"
                          onClick={handleAuthLinkClick}
                          className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          My Order
                        </Link>
                        {isAuthenticated ? (
                          <button
                            type="button"
                            role="menuitem"
                            onClick={handleLogout}
                            className="block w-full px-4 py-2.5 text-left text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            Log Out
                          </button>
                        ) : (
                          <>
                            <Link
                              href="/signin"
                              role="menuitem"
                              onClick={handleAuthLinkClick}
                              className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              Sign In
                            </Link>
                            <Link
                              href="/signup"
                              role="menuitem"
                              onClick={handleAuthLinkClick}
                              className="block px-4 py-2.5 text-base font-[var(--font-playfair)] text-[var(--color-brand-gold)]/90 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              Sign Up
                            </Link>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearchSubmit}
                    className="mt-4"
                  >
                    <label htmlFor="mobile-search" className="sr-only">
                      Search perfumes
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="mobile-search"
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search by brand or model"
                        className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--color-brand-gold)]"
                      />
                      <button
                        type="submit"
                        className="rounded-md border border-[var(--color-brand-gold)] px-3 py-2 text-xs uppercase tracking-wider text-[var(--color-brand-gold)] transition-colors hover:bg-[var(--color-brand-gold)] hover:text-black"
                      >
                        Go
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
