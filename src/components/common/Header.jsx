// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/images/wellness-logo.webp";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/programs", label: "Programs" },
    { path: "/winn", label: "WINN Psychiatry" },
    { path: "/renewed", label: "Renewed Wellness" },
    { path: "/about-us", label: "About OSYWIN" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        scrolled
          ? "bg-slate-950/95 border-white/10 shadow-lg shadow-black/20"
          : "bg-white/10 border-white/20 shadow-sm/50"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-5 md:px-6">
        {/* Logo + Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-6 sm:pr-8"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Osywin Logo"
            className="h-9 sm:h-10 w-auto flex-shrink-0"
          />
          {/* Responsive single-line scaling text */}
          <span className="text-[clamp(12px,3.5vw,20px)] sm:text-[clamp(14px,3.8vw,22px)] md:text-[16px] text-white whitespace-nowrap font-semibold w-64 sm:w-72 max-w-full block tracking-wide leading-tight">
            OSYWIN Healthcare Services Limited
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-white/90 font-medium tracking-wide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`transition ${
                  isActive ? "text-rose-400 font-semibold" : "hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex-shrink-0 p-2.5 sm:p-3 rounded-lg hover:bg-white/20 transition ml-2 sm:ml-4"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={26} className="sm:size-28 strokeWidth={2.5} text-white" />
          ) : (
            <Menu size={26} className="sm:size-28 strokeWidth={3} text-white" />
          )}
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 backdrop-blur-2xl bg-gradient-to-b from-slate-900/95 via-blue-900/90 to-slate-900/95 border-b border-white/10 shadow-2xl z-50 overflow-hidden transition-all duration-500 ease-out md:hidden ${
          isOpen ? "max-h-screen opacity-100 py-12" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-12 px-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-2xl font-bold transition ${
                  isActive
                    ? "text-rose-400 scale-105"
                    : "text-white/95 hover:text-rose-300"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            to="/contact"
            className="text-2xl font-bold text-white/95 hover:text-rose-300 transition"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
