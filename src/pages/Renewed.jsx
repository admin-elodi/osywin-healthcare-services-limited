// src/pages/Renewed.jsx
import React from "react";
import renewedBg from '@/assets/images/renewed-sunrise.jpg';

const renewedPrograms = [
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
  },
  
  {
    title: "Peer Recovery Support Services",
    description:
      "Certified peer specialists providing guidance through lived recovery experience.",
    features: [
      "Recovery coaching",
      "Encouragement and accountability",
      "Goal-setting and planning",
      "Life-skills support",
      "Connection to community resources",
    ],
  },
  
];

export default function Renewed() {
  return (
    <section
      className="w-full py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden min-h-screen"
      style={{
        backgroundImage: `url(${renewedBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle overlay for readability on varying image brightness */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[15px] md:text-2xl font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Renewed Wellness & Recovery Services
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Holistic recovery and wellness programs empowering individuals to
            rebuild, heal, and sustain a meaningful life in recovery.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {renewedPrograms.map((program, index) => (
            <div
              key={index}
              className="group bg-slate-400/80 backdrop-blur-xl border border-slate-100/50 hover:border-emerald-200/60 rounded-2xl p-8 flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-100/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-medium text-lg">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {program.title}
              </h3>

              <p className="text-slate-700 mb-6 leading-relaxed">
                {program.description}
              </p>

              <ul className="space-y-3">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2.5 mr-3" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}