// src/pages/Winn.jsx
import React from "react";
import winnBg from '@/assets/images/winn-support.jpg';

const winnPrograms = [
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
  },
  {
    title: "Family Support & Education",
    description:
      "Support services for families affected by mental health and substance-related challenges.",
    features: [
      "Family therapy",
      "Educational workshops",
      "Communication rebuilding",
      "Reconciliation and healing support",
      "Tools for supporting a loved one",
    ],
  },
  {
    title: "Adult & Adolescent Care",
    description:
      "Community-focused Adult & Adolescent Care",
    features: [
      "Mental health awareness seminars",
      "Youth and teen education programs",
      "Workplace mental wellness training",
      "Faith-based mental health education",
    ],
  },
  {
    title: "Prevention & Community Education Programs",
    description:
      "Community-focused mental health education and preventive outreach.",
    features: [
      "Mental health awareness seminars",
      "Youth and teen education programs",
      "Workplace mental wellness training",
      "Faith-based mental health education",
    ],
  },
];

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
      {/* Optional subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[15px] md:text-2xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            WINN Psychiatry & Mental Health 
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Compassionate psychiatric and behavioral health care designed to
            support emotional stability, resilience, and long-term wellbeing.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {winnPrograms.map((program, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl border border-slate-100/50 hover:border-blue-200/60 rounded-2xl p-8 flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-medium text-lg">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {program.title}
              </h3>

              <p className="text-slate-700 mb-6 leading-relaxed">
                {program.description}
              </p>

              <ul className="space-y-3">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 mr-3" />
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