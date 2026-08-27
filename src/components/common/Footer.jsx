// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, ArrowUp } from "lucide-react";
import logo from "@/assets/images/wellness-logo.webp";
import { ORG, WINN_SERVICES, RENEWED_SERVICES } from "@/content/siteContent";

const XIcon = ({ size = 18, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M23.77 2.23a.75.75 0 0 0-1.06 0L13 11.94 1.29.23a.75.75 0 0 0-1.06 1.06l11.72 11.71L.23 24a.75.75 0 0 0 1.06 1.06l11.72-11.72 11.72 11.72a.75.75 0 0 0 1.06-1.06L13.06 13 23.77 2.23z"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative bg-slate-900 text-slate-300 pt-20 pb-16 border-t border-slate-800"
    >
      {/* Subtle accent line along the very top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">

        {/* Brand */}
        <div className="space-y-8 min-w-0">
          {/* Fixed-height heading zone so this lines up with the other columns' h3 headings, and the logo/name stay paired as a unit */}
          <div className="h-9 sm:h-9 lg:h-8 xl:h-10 flex items-center gap-1.5 sm:gap-2 lg:gap-2.5">
            <img
              src={logo}
              alt="OSYWIN Logo"
              className="h-9 sm:h-9 lg:h-8 xl:h-10 w-auto flex-shrink-0"
            />
            <h2 className="text-[clamp(11px,3.1vw,14px)] sm:text-[10px] lg:text-[10px] xl:text-[13px] font-semibold text-white whitespace-nowrap leading-tight">
              {ORG.name}
            </h2>
          </div>

          <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
            {ORG.tagline}
          </p>

          <div className="flex items-center gap-4">
            <a
              href={ORG.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-2 hover:bg-white/5 rounded-lg"
              aria-label="Follow on X"
            >
              <XIcon size={18} />
            </a>

            <a
              href={ORG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-2 hover:bg-white/5 rounded-lg"
              aria-label="Follow on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* WINN */}
        <div>
          <div className="h-9 sm:h-9 lg:h-8 xl:h-10 flex items-center mb-8">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Winn Psychiatry
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            {WINN_SERVICES.map((service) => (
              <li
                key={service.title}
                className="flex items-start gap-2 hover:text-white transition-colors duration-200 cursor-default"
              >
                <span className="w-1 h-1 mt-2 rounded-full bg-blue-400/70 shrink-0" />
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Renewed */}
        <div>
          <div className="h-9 sm:h-9 lg:h-8 xl:h-10 flex items-center mb-8">
            <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider">
              Renewed Wellness
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            {RENEWED_SERVICES.map((service) => (
              <li
                key={service.title}
                className="flex items-start gap-2 hover:text-white transition-colors duration-200 cursor-default"
              >
                <span className="w-1 h-1 mt-2 rounded-full bg-red-500/70 shrink-0" />
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="h-9 sm:h-9 lg:h-8 xl:h-10 flex items-center mb-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h3>
          </div>

          <div className="space-y-6 text-sm text-slate-300">
            <div className="flex items-start gap-3 hover:text-white transition-colors duration-200 group">
              <Phone size={16} className="mt-1 text-red-500 shrink-0" />
              <a href={`tel:${ORG.phoneHref}`} className="font-medium hover:text-blue-300 hover:underline">
                {ORG.phone}
              </a>
            </div>

            <div className="flex items-start gap-3 hover:text-white transition-colors duration-200 group">
              <Mail size={16} className="mt-1 text-red-500 shrink-0" />
              <p><strong className="text-slate-200">Email:</strong> <a href={`mailto:${ORG.email}`} className="text-blue-400 hover:text-blue-300 hover:underline">{ORG.email}</a></p>
            </div>

            <div className="flex items-start gap-3 hover:text-white transition-colors duration-200 group">
              <MapPin size={16} className="mt-1 text-red-500 shrink-0" />
              <a
                href={ORG.address.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed hover:text-blue-300 hover:underline"
              >
                {ORG.address.street}<br />
                <span className="font-medium text-slate-200 group-hover:text-blue-300">{ORG.address.cityStateZip}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-12 border-t border-slate-800">
        <div className="flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
          <Link to="/about-us" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200 py-2 px-4 hover:bg-white/5 rounded-lg">
            About
          </Link>

          <Link to="/programs" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200 py-2 px-4 hover:bg-white/5 rounded-lg">
            Programs
          </Link>

          <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200 py-2 px-4 hover:bg-white/5 rounded-lg">
            Privacy Policy
          </Link>

          <Link to="/sms-terms" onClick={scrollToTop} className="hover:text-blue-400 transition-colors duration-200 py-2 px-4 hover:bg-white/5 rounded-lg">
            SMS Terms & Conditions
          </Link>
        </div>

        <div className="text-center mt-12 text-slate-500 tracking-wide">
          <p className="font-medium whitespace-nowrap text-[clamp(11px,3.5vw,16px)]">
            © {new Date().getFullYear()} {ORG.name}
          </p>
          <p className="text-[10px] mt-3 font-medium text-slate-600 hover:text-slate-400 transition-colors duration-200">
            Site Design by JungleX: +2348136573235
          </p>

          <button
            onClick={scrollToTop}
            className="mt-8 inline-flex items-center gap-2 mx-auto text-xs font-medium text-slate-400 hover:text-blue-400 border border-slate-800 hover:border-blue-400/40 rounded-full py-2 px-4 transition-all duration-300 hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
