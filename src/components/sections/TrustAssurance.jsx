import React from "react";
import {
  Award,
  ShieldCheck,
  FileCheck,
  Heart,
} from "lucide-react";

// Section background — a cool, calm, light sky photo. See
// README-CARD-IMAGES.txt for the download link and licensing.
import trustBackground from "@/assets/images/trust-background.jpg";

// Photos live in src/assets/images/cards/ — see README-CARD-IMAGES.txt for
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

export default function TrustAssurance() {
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
        "We treat every individual with genuine dignity, empathy, and understanding — recognizing the whole person, not just symptoms.",
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
      {/* Cool, dark-toned scrim — dark enough to let the sky and clouds read clearly, still cool/calm rather than moody */}
      <div className="absolute inset-0 bg-slate-900/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-blue-950/35 to-slate-900/55" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Care You Can Trust
          </h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
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
              {/* Illustration — bleeds to the card's top and side edges */}
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
      </div>
    </section>
  );
}