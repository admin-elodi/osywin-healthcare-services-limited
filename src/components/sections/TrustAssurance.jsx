import React from "react";
import {
  UserCheck,
  Lock,
  BadgeCheck,
  HeartHandshake,
  Award,
  ShieldCheck,
  FileCheck,
  Heart,
} from "lucide-react";

// Photos live in src/assets/images/cards/ — see README-CARD-IMAGES.txt for
// download links, licensing, and the exact filenames expected below.
import licensedProfessionalsImg from "@/assets/images/cards/licensed-professionals.jpg";
import confidentialSecureImg from "@/assets/images/cards/confidential-secure.jpg";
import evidenceBasedImg from "@/assets/images/cards/evidence-based.jpg";
import compassionateCareImg from "@/assets/images/cards/compassionate-care.jpg";

function CardArt({ image, alt, AccentIcon }) {
  return (
    <div className="relative h-40 md:h-44 overflow-hidden bg-white/5">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Dark scrim to match the section's black/gray gradient and keep the badge legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
      <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm shadow-sm flex items-center justify-center text-red-300">
        <AccentIcon size={13} strokeWidth={2} />
      </div>
    </div>
  );
}

export default function TrustAssurance() {
  const assurances = [
    {
      icon: <UserCheck size={28} />,
      title: "Licensed & Experienced Professionals",
      description:
        "Our services are delivered by qualified mental health and recovery professionals committed to ethical, evidence-based care.",
      art: {
        image: licensedProfessionalsImg,
        alt: "Confident, licensed medical professional",
        AccentIcon: Award,
      },
    },
    {
      icon: <Lock size={28} />,
      title: "Confidential & Secure Care",
      description:
        "Your personal information and conversations are handled with strict confidentiality and respect for your privacy.",
      art: {
        image: confidentialSecureImg,
        alt: "Padlock symbolizing confidentiality and data security",
        AccentIcon: ShieldCheck,
      },
    },
    {
      icon: <BadgeCheck size={28} />,
      title: "Evidence-Based Treatment",
      description:
        "Our approach is grounded in clinically proven methods designed to support long-term mental wellness and recovery.",
      art: {
        image: evidenceBasedImg,
        alt: "Researcher examining clinical data in a lab setting",
        AccentIcon: FileCheck,
      },
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Compassionate, Person-Centered Approach",
      description:
        "We treat every individual with dignity, empathy, and understanding — recognizing the whole person, not just symptoms.",
      art: {
        image: compassionateCareImg,
        alt: "Hands held together in a gesture of compassion and support",
        AccentIcon: Heart,
      },
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
              className="bg-gray-800/70 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-gray-800 transition-colors duration-300 h-full flex flex-col"
            >
              {/* Illustration — bleeds to the card's top and side edges */}
              <CardArt {...item.art} />

              <div className="p-8 pt-6 flex flex-col flex-1">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}