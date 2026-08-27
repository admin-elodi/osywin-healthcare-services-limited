// src/components/Programs.jsx
import React from "react";
import { Activity, Brain, Users } from "lucide-react";

// Background image
import backgroundImage from "@/assets/images/chart.jpg";

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
    // Large, low-opacity watermark icon per card - gives each card its own
    // graphical identity and, being flat vector line-art, contrasts with
    // the busy photographic chart texture behind the whole section.
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
      {/* Overlay - even wash for legibility over the card grid, plus a
          stronger top scrim behind the header text where the source photo
          is brightest */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 top-0 h-[26rem] bg-gradient-to-b from-black/70 via-black/35 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-24 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20 space-y-4 ocean-float">

          {/* Main Title */}
          <h2 className="text-lg md:text-2xl font-semibold text-white tracking-widest mt-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
            Our Comprehensive Programs
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Integrated care through
          </p>

          {/* Organization 1 */}
          <p className="text-[16px] md:text-2xl font-semibold text-blue-400 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            WINN Psychiatry & Mental Health Services
          </p>

          {/* The subtle "and" */}
          <p className="text-sm uppercase tracking-widest text-gray-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            and
          </p>

          {/* Organization 2 */}
          <p className="uppercase text-[15px] md:text-2xl font-semibold text-red-500 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Renewed Wellness & Recovery Services
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {programs.map((program, index) => {
            const ProgramIcon = program.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur-lg border border-rose-100/60 hover:border-red-500/70 rounded-2xl p-7 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-red-200/40 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full overflow-hidden"
              >
                {/* Graph-paper dot grid - a quiet nod to the chart/data theme
                    of the section background. Its perfectly regular geometry
                    is the contrast: flat and orderly against the busy,
                    organic texture of the photo behind the card. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(15,23,42,0.28) 1.5px, transparent 1.5px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                {/* Per-program watermark icon, bleeding off the corner */}
                {ProgramIcon && (
                  <ProgramIcon
                    className="absolute -bottom-6 -right-6 text-red-500 pointer-events-none"
                    style={{ opacity: 0.16 }}
                    size={190}
                    strokeWidth={1.25}
                  />
                )}

                {/* Number */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 flex-shrink-0 shadow-md">
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="relative flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-red-500 transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <ul className="space-y-3 mt-2">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-800">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full mt-2.5 mr-3.5 flex-shrink-0" />
                        <span className="text-sm md:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          .ocean-float {
            animation: fadeIn 1.2s ease-out forwards,
                       floatBob 6s ease-in-out infinite;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
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