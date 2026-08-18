// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import logo from "@/assets/images/wellness-logo.webp";

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
      className="bg-black/30 backdrop-blur-xl text-slate-700 pt-20 pb-16 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="OSYWIN Logo" className="h-12 w-auto" />
            <h2 className="text-xl font-medium text-slate-900">
              OSYWIN Healthcare Services Limited
            </h2>
          </div>

          <p className="text-black/60 leading-relaxed text-sm max-w-sm">
            Family-centered psychiatric care, mental wellness, and recovery
            services designed to support lasting stability and renewal.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-bold hover:text-slate-900 transition-colors duration-300 p-2 hover:bg-slate-100/50 rounded-lg"
              aria-label="Follow on X"
            >
              <XIcon size={18} />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-slate-900 transition-colors duration-300 p-2 hover:bg-slate-100/50 rounded-lg"
              aria-label="Follow on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* WINN */}
        <div>
          <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-8">
            Winn Psychiatry
          </h3>
          <ul className="space-y-3 text-sm text-black">
            <li className="hover:text-slate-900 transition-colors duration-200 cursor-default">Behavioral & Mental Health</li>
            <li className="hover:text-slate-900 transition-colors duration-200 cursor-default">Family Support & Education</li>
            <li className="hover:text-slate-900 transition-colors duration-200 cursor-default">Adult & Adolescent Care</li>
            <li className="hover:text-slate-900 transition-colors duration-200 cursor-default">Prevention & Community Education Programs</li>
          </ul>
        </div>

        {/* Renewed */}
        <div>
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-8">
            Renewed Wellness
          </h3>
          <ul className="space-y-3 text-sm text-black">
            <li className="hover:text-slate-900 transition-colors duration-200 cursor-default">Outpatient Substance Abuse Treatment</li>
            
            
            <li className="hover:text-slate-900 transition-colors duration-200 cursor-default">Peer Recovery Support Services</li>
           
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-8">
            Contact
          </h3>

          <div className="space-y-6 text-sm text-slate-600">
            <div className="flex items-start gap-3 hover:text-slate-900 transition-colors duration-200 group">
              <Phone size={16} className="mt-1 text-red-400 group-hover:text-slate-700 shrink-0" />
              <span className="font-medium">302-696-6238</span>
            </div>

            <div className="flex items-start gap-3 hover:text-slate-900 transition-colors duration-200 group">
              <Mail size={16} className="mt-1 text-red-400 group-hover:text-slate-700 shrink-0" />
              <p><strong>Email:</strong> <a href="mailto:osywinhc@gmail.com" className="text-blue-600 hover:underline">osywinhc@gmail.com</a></p>
            </div>

            <div className="flex items-start gap-3 hover:text-slate-900 transition-colors duration-200 group">
              <MapPin size={16} className="mt-1 text-red-400 group-hover:text-slate-700 shrink-0" />
              <span className="leading-relaxed">
                113 Gloucester Blvd, Lower Level Suite<br />
                <span className="font-medium">Middletown, DE 19709, USA</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-12 border-t border-slate-200">
        <div className="flex flex-wrap justify-center gap-8 text-xs font-medium text-black/60 uppercase tracking-wider">
          <Link to="/about-us" onClick={scrollToTop} className="hover:text-red-600 transition-colors duration-200 py-2 px-4 hover:bg-blue-200 rounded-lg">
            About
          </Link>

          <Link to="/programs" onClick={scrollToTop} className="hover:text-red-600 transition-colors duration-200 py-2 px-4 hover:bg-blue-200 rounded-lg">
            Programs
          </Link>

          <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-red-600 transition-colors duration-200 py-2 px-4 hover:bg-blue-200 rounded-lg pr-4">
            Privacy Policy
          </Link>

          <Link to="/sms-terms" onClick={scrollToTop} className="hover:text-red-600 transition-colors duration-200 py-2 px-4 hover:bg-blue-200 rounded-lg">
            SMS Terms & Conditions
          </Link>
        </div>

        <div className="text-center mt-12 text-xs text-black/60 tracking-wide">
          <p className="font-medium">
            © {new Date().getFullYear()} OSYWIN Healthcare Services Limited
          </p>
          <p className="text-[10px] mt-3 font-medium hover:text-slate-600 transition-colors duration-200">
            Site Design by JungleX: +2348136573235
          </p>
        </div>
      </div>
    </footer>
  );
}
