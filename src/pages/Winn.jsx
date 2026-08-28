// src/pages/Winn.jsx
import React from "react";
import winnBg from '@/assets/images/winn-coffee.webp';
import { Brain, HeartHandshake, Users, ShieldCheck } from "lucide-react";
import { WINN_SERVICES } from "@/content/siteContent";

// One watermark icon per WINN_SERVICES entry, in the same order.
const WINN_ICONS = [Brain, HeartHandshake, Users, ShieldCheck];

export default function Winn() {
  return (
    <section
      className="w-full py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden min-h-screen"
      style={{
        backgroundImage: `url(${winnBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[15px] md:text-2xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            WINN Psychiatry & Mental Health
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Compassionate psychiatric care for lasting emotional wellbeing.
          </p>
        </div>

        {/* Editorial rows - large numeral/icon fixed on the left, content on
            the right, in a see-through glass panel so the photo behind the
            section reads through every row. */}
        <div className="space-y-6 md:space-y-8">
          {WINN_SERVICES.map((program, index) => {
            const ProgramIcon = WINN_ICONS[index];
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-2xl border border-white/25 hover:border-blue-400/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_44px_rgba(37,99,235,0.3)] transition-all duration-500 overflow-hidden hover:bg-white/[0.16]"
              >
                {/* Glass sheen */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-56 h-56 bg-white/15 rounded-full blur-3xl pointer-events-none" />

                {/* Diagonal hairline crosshatch - the same diamond/square
                    texture from the original card design, tinted to WINN's
                    blue, layered on top of the glass. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(96,165,250,0.28) 0, rgba(96,165,250,0.28) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(-45deg, rgba(96,165,250,0.28) 0, rgba(96,165,250,0.28) 1px, transparent 1px, transparent 16px)",
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
                        className="absolute text-blue-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
                        size={56}
                        strokeWidth={1.25}
                      />
                    )}
                  </div>

                  {/* Text block - always on the right */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                      {program.title}
                    </h3>
                    <p className="text-white/85 mb-5 leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
                      {program.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-white/90">
                          <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 mr-3 flex-shrink-0" />
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
