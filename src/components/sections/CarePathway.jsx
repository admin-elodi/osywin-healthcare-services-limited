import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Stethoscope,
  HandHeart,
  TrendingUp,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// Photos live in src/assets/images/cards/ - see README-CARD-IMAGES.txt for
// download links, licensing, and the exact filenames expected below.
import beginConversationImg from "@/assets/images/cards/begin-conversation.jpg";
import clinicalAssessmentImg from "@/assets/images/cards/clinical-assessment.jpg";
import personalizedCareImg from "@/assets/images/cards/personalized-care.jpg";
import ongoingGuidanceImg from "@/assets/images/cards/ongoing-guidance.jpg";

const ACCENT_ICON_TINT = {
  blue: "text-blue-600",
  indigo: "text-indigo-600",
  red: "text-red-600",
  emerald: "text-emerald-600",
};

function CardArt({ image, alt, accent, AccentIcon }) {
  return (
    <div className="relative h-40 md:h-44 overflow-hidden bg-slate-100">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Gentle bottom scrim so the accent badge stays readable over any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
      <div
        className={`absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center ${ACCENT_ICON_TINT[accent]}`}
      >
        <AccentIcon size={13} strokeWidth={2} />
      </div>
    </div>
  );
}

export default function CarePathway() {
  const [expanded, setExpanded] = useState(() => Array(4).fill(false));

  const toggleStep = (index) => {
    setExpanded((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const steps = [
    {
      title: "Begin the Conversation",
      description:
        "Your journey starts with a confidential conversation - we listen carefully, without judgment or pressure.",
      detail:
        "Reach out by phone or through our contact form whenever you're ready. There's no script to follow and no wrong way to start - we simply listen.",
      accent: "blue",
      art: {
        image: beginConversationImg,
        alt: "Two people having a warm, supportive conversation",
        AccentIcon: Sparkles,
      },
    },
    {
      title: "Clinical Assessment",
      description:
        "A licensed professional conducts a thoughtful assessment of your needs to determine the most appropriate care path.",
      detail:
        "This typically takes place over one or two sessions and helps us understand your history, goals, and current needs before recommending next steps.",
      accent: "indigo",
      art: {
        image: clinicalAssessmentImg,
        alt: "Clinician reviewing notes during a patient assessment",
        AccentIcon: Stethoscope,
      },
    },
    {
      title: "Personalized Care & Support",
      description:
        "Together, we develop an individualized treatment plan focused on stability, healing, and long-term wellbeing.",
      detail:
        "Your plan may include individual therapy, group support, or medication management - whichever combination fits your goals and pace.",
      accent: "red",
      art: {
        image: personalizedCareImg,
        alt: "Hands held together in comfort and support",
        AccentIcon: HandHeart,
      },
    },
    {
      title: "Ongoing Guidance",
      description:
        "Care continues with consistent follow-up, ongoing support, and encouragement as you progress toward sustained wellness.",
      detail:
        "We check in regularly, adjust your plan as your needs evolve, and celebrate progress with you every step of the way.",
      accent: "emerald",
      art: {
        image: ongoingGuidanceImg,
        alt: "A sunlit path through a forest symbolizing forward progress",
        AccentIcon: TrendingUp,
      },
    },
  ];

  return (
    <section className="w-full bg-slate-200 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            What to Expect When You Reach Out
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-justify">
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
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
            >
              {/* Illustration - bleeds to the card's top and side edges */}
              <CardArt {...step.art} accent={step.accent} />

              <div className="p-6 pt-5 flex flex-col flex-1">
                {/* Content */}
                <h3 className="text-sm font-semibold text-gray-900 mb-3 whitespace-nowrap overflow-hidden">
                  {step.title}
                </h3>

                <p className="text-gray-700 leading-relaxed text-justify">
                  {step.description}
                </p>

                {/* Expandable detail */}
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => toggleStep(index)}
                    aria-expanded={expanded[index]}
                    className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${ACCENT_ICON_TINT[step.accent]} hover:opacity-75 transition-opacity duration-200`}
                  >
                    {expanded[index] ? "Show less" : "Learn more"}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={`transition-transform duration-300 ${expanded[index] ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      expanded[index] ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <p className="overflow-hidden text-sm text-gray-500 leading-relaxed text-justify">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Begin Your Conversation
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}