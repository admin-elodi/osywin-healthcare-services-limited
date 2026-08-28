// src/pages/Renewed.jsx
import React from "react";
import renewedBg from '@/assets/images/renewed-woman-sunlight.webp';
import { Activity, Users } from "lucide-react";
import { RENEWED_SERVICES } from "@/content/siteContent";

// One watermark icon per RENEWED_SERVICES entry, in the same order.
const RENEWED_ICONS = [Activity, Users];

export default function Renewed() {
  return (
    <section
      className="w-full py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden min-h-screen"
      style={{
        backgroundImage: `url(${renewedBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for readability - darkest behind the header text where the
          sky is brightest, easing off lower down where the water is already dark */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-black/55 via-black/25 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-lg md:text-3xl font-bold text-red-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] mb-6">
            Renewed Wellness & Recovery Services
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Empowering individuals to rebuild, heal, and thrive in recovery.
          </p>
        </div>

        {/* Editorial rows - large numeral/icon fixed on the left, content on
            the right, in a see-through glass panel so the photo behind the
            section reads through every row. */}
        <div className="space-y-6 md:space-y-8">
          {RENEWED_SERVICES.map((program, index) => {
            const ProgramIcon = RENEWED_ICONS[index];
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-2xl border border-white/25 hover:border-emerald-400/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_44px_rgba(16,185,129,0.3)] transition-all duration-500 overflow-hidden hover:bg-white/[0.16]"
              >
                {/* Glass sheen */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-56 h-56 bg-white/15 rounded-full blur-3xl pointer-events-none" />

                {/* Concentric ripple rings - the same "renewal" motif from
                    the original card design, anchored to the corner the
                    icon bleeds from, layered on top of the glass. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-radial-gradient(circle at 100% 100%, rgba(52,211,153,0.22) 0, rgba(52,211,153,0.22) 2px, transparent 2px, transparent 18px)",
                  }}
                />

                <div className="relative grid md:grid-cols-[minmax(0,220px)_1fr] gap-6 md:gap-10 items-center p-8 md:p-10 lg:p-12">
                  {/* Numeral + icon block - always on the left */}
                  <div className="relative flex items-center justify-center h-32 md:h-full">
                    <span className="text-[7rem] md:text-[8rem] font-black text-white/20 leading-none select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {ProgramIcon && (
                      <ProgramIcon
                        className="absolute text-emerald-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
                        size={56}
                        strokeWidth={1.25}
                      />
                    )}
                  </div>

                  {/* Text block - always on the right */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                      {program.title}
                    </h3>
                    <p className="text-white/85 mb-5 leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
                      {program.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-white/90">
                          <div className="w-2 h-2 bg-emerald-300 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm md:text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}