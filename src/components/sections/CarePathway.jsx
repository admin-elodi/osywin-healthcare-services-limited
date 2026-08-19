import React from "react";
import {
  Sparkles,
  Stethoscope,
  HandHeart,
  TrendingUp,
} from "lucide-react";

// Photos live in src/assets/images/cards/ — see README-CARD-IMAGES.txt for
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
  const steps = [
    {
      title: "Begin the Conversation",
      description:
        "Your journey starts with a confidential conversation — we listen carefully, without judgment or pressure.",
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
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
            >
              {/* Illustration — bleeds to the card's top and side edges */}
              <CardArt {...step.art} accent={step.accent} />

              <div className="p-6 pt-5 flex flex-col flex-1">
                {/* Content */}
                <h3 className="text-sm font-semibold text-gray-900 mb-3 whitespace-nowrap overflow-hidden">
                  {step.title}
                </h3>

                <p className="text-gray-700 leading-relaxed text-justify">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}