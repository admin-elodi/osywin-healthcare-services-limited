// src/components/common/FloatingActions.jsx
// Persistent, site-wide floating WhatsApp quick-contact FAB - mirrors the
// two service lines already used in Hero's modals. (Back-to-top stays
// owned by Footer's own button - no duplicate floating one here.)
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

function WhatsAppIcon({ size = 24, className = "" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.31.646 4.47 1.767 6.31L3 29l7.86-2.06A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.6a9.55 9.55 0 0 1-4.874-1.34l-.35-.207-4.664 1.223 1.245-4.545-.228-.365A9.56 9.56 0 0 1 5.6 15c0-5.744 4.66-10.4 10.404-10.4 5.743 0 10.4 4.656 10.4 10.4 0 5.743-4.657 10.6-10.4 10.6zm5.723-7.79c-.313-.157-1.85-.913-2.137-1.017-.287-.104-.496-.157-.705.157-.209.313-.809 1.017-.992 1.226-.183.209-.365.235-.678.078-.313-.157-1.322-.487-2.518-1.552-.931-.83-1.56-1.856-1.743-2.169-.183-.313-.02-.482.137-.639.14-.14.313-.365.47-.548.157-.183.209-.313.313-.522.104-.209.052-.391-.026-.548-.078-.157-.705-1.7-.966-2.328-.254-.61-.512-.527-.705-.537-.183-.008-.391-.01-.6-.01a1.15 1.15 0 0 0-.835.391c-.287.313-1.096 1.07-1.096 2.61s1.122 3.027 1.279 3.236c.157.209 2.21 3.376 5.353 4.735.748.323 1.331.516 1.786.66.75.239 1.433.205 1.973.124.602-.09 1.85-.756 2.111-1.487.261-.73.261-1.356.183-1.487-.078-.13-.287-.209-.6-.365z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [waOpen, setWaOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!waOpen) return;
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setWaOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [waOpen]);

  const openWhatsApp = (number, text) => {
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank");
    setWaOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
    >
      {/* Expand menu */}
      <div
        className={`w-64 max-w-[80vw] rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 ease-out origin-bottom-right ${
          waOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Chat on WhatsApp
          </span>
          <button
            type="button"
            onClick={() => setWaOpen(false)}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            openWhatsApp("12156811972", "Hello, I'd like to know more about WINN Psychiatry services.")
          }
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50/60 transition-colors duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          <span>
            <span className="block text-sm font-semibold text-slate-800">WINN Psychiatry</span>
            <span className="block text-xs text-slate-400">Mental health & appointments</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            openWhatsApp("12158682542", "Hello, I'm interested in Renewed Wellness recovery programs.")
          }
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50/60 transition-colors duration-200 border-t border-slate-100"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          <span>
            <span className="block text-sm font-semibold text-slate-800">Renewed Wellness</span>
            <span className="block text-xs text-slate-400">Recovery & peer support</span>
          </span>
        </button>
      </div>

      {/* WhatsApp FAB */}
      <button
        type="button"
        onClick={() => setWaOpen((prev) => !prev)}
        aria-label={waOpen ? "Close WhatsApp menu" : "Chat on WhatsApp"}
        aria-expanded={waOpen}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-900/20 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {waOpen ? <X size={22} /> : <WhatsAppIcon size={26} />}
      </button>
    </div>
  );
}
