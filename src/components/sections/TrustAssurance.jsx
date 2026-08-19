import React, { useState } from "react";
import {
  Award,
  ShieldCheck,
  FileCheck,
  Heart,
  ChevronDown,
} from "lucide-react";

// Section background - a cool, calm, light sky photo. See
// README-CARD-IMAGES.txt for the download link and licensing.
import trustBackground from "@/assets/images/trust-background.jpg";

// Photos live in src/assets/images/cards/ - see README-CARD-IMAGES.txt for
// download links, licensing, and the exact filenames expected below.
import licensedProfessionalsImg from "@/assets/images/cards/licensed-professionals.jpg";
import confidentialSecureImg from "@/assets/images/cards/confidential-secure.jpg";
import evidenceBasedImg from "@/assets/images/cards/evidence-based.jpg";
import compassionateCareImg from "@/assets/images/cards/compassionate-care.jpg";

function CardArt({ image, alt, AccentIcon }) {
  return (
    <div className="relative h-40 md:h-44 overflow-hidden bg-slate-100">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Gentle bottom scrim so the accent badge stays readable over any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
      <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-red-600">
        <AccentIcon size={13} strokeWidth={2} />
      </div>
    </div>
  );
}

const FAQS = [
  {
    question: "How confidential is my information?",
    answer:
      "Your conversations and personal information are always handled with strict confidentiality and full respect for your privacy - shared only with your consent.",
  },
  {
    question: "What are your qualifications?",
    answer:
      "Every member of our team is a licensed, experienced mental health or recovery professional committed to ethical, evidence-based care.",
  },
  {
    question: "Is my care plan personalized to me?",
    answer:
      "Yes - we don't believe in one-size-fits-all. Your plan is built around your specific needs, history, and goals from the very first conversation.",
  },
  {
    question: "What if unsure I need support yet?",
    answer:
      "That's exactly what the first conversation is for. There's no pressure and no diagnosis required - we'll help you find the right next step together.",
  },
];

export default function TrustAssurance() {
  const [openFaq, setOpenFaq] = useState(null);
  const assurances = [
    {
      title: "Licensed Professionals",
      description:
        "Delivered by qualified, experienced mental health and recovery professionals who are committed to ethical, evidence-based care.",
      art: {
        image: licensedProfessionalsImg,
        alt: "Confident, licensed medical professional",
        AccentIcon: Award,
      },
    },
    {
      title: "Confidential Care",
      description:
        "Your personal information and conversations are always handled with strict confidentiality and full respect for your privacy.",
      art: {
        image: confidentialSecureImg,
        alt: "A cozy, private reading nook symbolizing a quiet, confidential space",
        AccentIcon: ShieldCheck,
      },
    },
    {
      title: "Proven Treatment",
      description:
        "Our approach is grounded in clinically proven methods that support long-term mental wellness and lasting recovery.",
      art: {
        image: evidenceBasedImg,
        alt: "A stack of books symbolizing research-backed, clinically proven methods",
        AccentIcon: FileCheck,
      },
    },
    {
      title: "Compassionate Care",
      description:
        "We treat every individual with genuine dignity, empathy, and understanding - recognizing the whole person, not just symptoms.",
      art: {
        image: compassionateCareImg,
        alt: "Hands held together in a gesture of compassion and support",
        AccentIcon: Heart,
      },
    },
  ];

  return (
    <section
      className="w-full py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(${trustBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Cool, dark-toned scrim - dark enough to let the sky and clouds read clearly, still cool/calm rather than moody */}
      <div className="absolute inset-0 bg-slate-900/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-blue-950/35 to-slate-900/55" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Care You Can Trust
          </h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed text-justify">
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
              className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
            >
              {/* Illustration - bleeds to the card's top and side edges */}
              <CardArt {...item.art} />

              <div className="p-6 pt-5 flex flex-col flex-1">
                {/* Content */}
                <h3 className="text-sm font-semibold text-slate-900 mb-3 whitespace-nowrap overflow-hidden">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-sm text-justify">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-center text-sm font-semibold text-white/90 uppercase tracking-wider mb-6">
            Common Questions
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-4 px-5 text-white font-medium text-sm hover:bg-white/5 transition-colors duration-200"
                  >
                    {faq.question}
                    <ChevronDown
                      size={18}
                      strokeWidth={2.5}
                      className={`flex-shrink-0 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-sm leading-relaxed text-justify px-5 pb-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}