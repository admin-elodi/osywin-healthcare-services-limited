import React from "react";
import {
  UserCheck,
  Lock,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";

export default function TrustAssurance() {
  const assurances = [
    {
      icon: <UserCheck size={28} />,
      title: "Licensed & Experienced Professionals",
      description:
        "Our services are delivered by qualified mental health and recovery professionals committed to ethical, evidence-based care.",
    },
    {
      icon: <Lock size={28} />,
      title: "Confidential & Secure Care",
      description:
        "Your personal information and conversations are handled with strict confidentiality and respect for your privacy.",
    },
    {
      icon: <BadgeCheck size={28} />,
      title: "Evidence-Based Treatment",
      description:
        "Our approach is grounded in clinically proven methods designed to support long-term mental wellness and recovery.",
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Compassionate, Person-Centered Approach",
      description:
        "We treat every individual with dignity, empathy, and understanding — recognizing the whole person, not just symptoms.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-black py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Care You Can Trust
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Choosing mental health or recovery support is a deeply personal
            decision. At OSYWIN, trust, safety, and professional integrity guide
            every aspect of care.
          </p>
        </div>

        {/* Assurance Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 hover:bg-gray-800 transition-colors duration-300 h-full"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-600/20 text-red-400 mb-6">
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
