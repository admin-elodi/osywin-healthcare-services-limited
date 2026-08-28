// src/components/Programs.jsx
//
// ALTERNATIVE A — Editorial rows.
//
// Instead of three equal-weight cards side by side, each program gets its
// own full-width band with a large numeral/icon fixed on the left and the
// title/description/features on the right, consistently down the page.
// This reads more like an editorial "our services" spread than a
// pricing-table grid, gives each program more breathing room, and scans
// naturally top-to-bottom on mobile without needing a grid to collapse.
import React from "react";
import { Activity, Brain, Users } from "lucide-react";

// Background image
import backgroundImage from "@/assets/images/people.jpg";

const programs = [
  {
    title: "Outpatient Substance Abuse Treatment",
    description:
      "Structured weekly counseling for recovery while maintaining work, school, or family responsibilities.",
    features: [
      "Individual addiction counseling",
      "Recovery planning",
      "Craving and trigger management",
      "Substance-use education",
      "Relapse-prevention strategies",
    ],
    icon: Activity,
  },
  {
    title: "Behavioral & Mental Health Counseling",
    description:
      "Professional services to manage emotional and psychological challenges.",
    features: [
      "Anxiety & stress",
      "Depression",
      "Trauma & PTSD",
      "Anger issues",
      "Emotional instability",
      "Life transitions",
    ],
    icon: Brain,
  },
  {
    title: "Peer Recovery Support Services",
    description:
      "Certified peer specialists provide mentorship from lived experience.",
    features: [
      "Recovery coaching",
      "Encouragement and accountability",
      "Goal-setting and planning",
      "Life-skills support",
      "Connection to community resources",
    ],
    icon: Users,
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="w-full min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 top-0 h-[26rem] bg-gradient-to-b from-black/70 via-black/35 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto py-24 md:py-28 lg:py-32 px-6 md:px-10 lg:px-12">

        {/* Header - unchanged */}
        <div className="text-center mb-16 md:mb-20 space-y-4 ocean-float">
          <h2 className="text-lg md:text-2xl font-semibold text-white tracking-widest mt-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
            Our Comprehensive Programs
          </h2>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Integrated care through
          </p>
          <p className="text-[16px] md:text-2xl font-semibold text-blue-400 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            WINN Psychiatry & Mental Health Services
          </p>
          <p className="text-sm uppercase tracking-widest text-gray-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            and
          </p>
          <p className="uppercase text-[15px] md:text-2xl font-semibold text-red-500 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Renewed Wellness & Recovery Services
          </p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-6 md:space-y-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-2xl border border-white/25 hover:border-red-400/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_44px_rgba(239,68,68,0.3)] transition-all duration-500 overflow-hidden hover:bg-white/[0.16]"
              >
                {/* Glass sheen - a thin bright line along the top edge and a
                    soft glow in one corner, so the transparency reads as
                    polished glass rather than a plain faded panel. */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-56 h-56 bg-white/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative grid md:grid-cols-[minmax(0,220px)_1fr] gap-6 md:gap-10 items-center p-8 md:p-10 lg:p-12">
                  {/* Numeral + icon block - always on the left, on every row */}
                  <div className="relative flex items-center justify-center h-32 md:h-full">
                    <span className="text-[7rem] md:text-[8rem] font-black text-white/20 leading-none select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="absolute text-red-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
                      size={56}
                      strokeWidth={1.25}
                    />
                  </div>

                  {/* Text block - always on the right */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-red-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                      {program.title}
                    </h3>
                    <p className="text-white/85 mb-5 leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
                      {program.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-white/90">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
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

      <style>
        {`
          .ocean-float {
            animation: fadeIn 1.2s ease-out forwards,
                       floatBob 6s ease-in-out infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes floatBob {
            0%   { transform: translateY(0); }
            50%  { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
}