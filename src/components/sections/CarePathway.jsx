import React from "react";
import {
  MessageCircle,
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

const ACCENT_STYLES = {
  blue: "bg-blue-100 text-blue-600",
  indigo: "bg-indigo-100 text-indigo-600",
  red: "bg-red-100 text-red-600",
  emerald: "bg-emerald-100 text-emerald-600",
};

export default function CarePathway() {
  const steps = [
    {
      icon: <MessageCircle size={30} />,
      title: "Begin the Conversation",
      description:
        "Your journey starts with a confidential conversation. We listen carefully, without judgment or pressure.",
      accent: "blue",
    },
    {
      icon: <ClipboardCheck size={30} />,
      title: "Clinical Assessment",
      description:
        "A licensed professional conducts a thoughtful assessment to understand your needs and determine the most appropriate care path.",
      accent: "indigo",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Personalized Care & Support",
      description:
        "We develop an individualized treatment or recovery plan focused on stability, healing, and long-term wellbeing.",
      accent: "red",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Ongoing Guidance",
      description:
        "Care continues with consistent follow-up, support, and adjustment as you progress toward sustained wellness.",
      accent: "emerald",
    },
  ];

  return (
    <section className="w-full bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            What to Expect When You Reach Out
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you are seeking psychiatric care, recovery support, or
            guidance for a loved one, our process is designed to be clear,
            respectful, and centered on your wellbeing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${ACCENT_STYLES[step.accent]}`}
              >
                {step.icon}
              </div>

              {/* Step number */}
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Step {index + 1}
              </span>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
