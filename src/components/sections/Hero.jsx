// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserCheck, Lock, BadgeCheck } from "lucide-react";
import healingVideo from "@/assets/videos/cool.webm";

export default function Hero() {
  const [showMentalHealthModal, setShowMentalHealthModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  const trustPoints = [
    { icon: UserCheck, label: "Licensed & Experienced" },
    { icon: Lock, label: "Confidential & Secure" },
    { icon: BadgeCheck, label: "Evidence-Based Care" },
  ];

  return (
    <>
      <section
        id="home"
        className="w-full flex items-center pt-28 pb-10 md:pt-24 md:pb-14 relative overflow-hidden bg-slate-950"
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={healingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Stronger scrim — text authority no longer depends on video brightness */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/80 to-blue-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl px-6 md:px-12">
          <Link
            to="/about-us"
            className="inline-flex items-center gap-2 mb-3 sm:mb-6 px-4 py-2 sm:py-2.5 text-sm font-medium text-slate-100 border border-slate-400/50 rounded-full hover:border-blue-400 hover:bg-white/5 transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            About OSYWIN
          </Link>

          <h1 className="text-white text-3xl sm:text-4xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-3 sm:mb-4 max-w-3xl">
            WINN Psychiatry &amp; Mental Health Services
          </h1>

          <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-500/0 mb-3 sm:mb-4" />

          <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            Compassionate, modern and professionally delivered psychiatric care, medication management, child &amp; adolescent support, crisis stabilization and telepsychiatry.
          </p>

          <div className="mt-3 sm:mt-4 inline-flex flex-col gap-1 max-w-2xl border-l-2 border-red-400/60 pl-4">
            <p className="text-slate-300 text-sm sm:text-base font-light">
              Also home to{" "}
              <span className="font-semibold text-red-400">
                Renewed Wellness &amp; Recovery Services
              </span>
            </p>
            <p className="text-slate-400 italic text-sm hidden sm:block">
              "Where healing begins and lives are renewed."
            </p>
          </div>

          {/* Trust strip — hidden on the smallest screens to keep CTAs above the fold */}
          <div className="hidden sm:flex mt-4 sm:mt-6 flex-wrap items-center gap-x-8 gap-y-2">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-200">
                <Icon size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => setShowMentalHealthModal(true)}
              className="cursor-pointer group px-8 py-3 sm:py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-950/50 hover:shadow-xl hover:shadow-blue-900/40 hover:scale-[1.03]"
            >
              Book Appointment
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>

            <button
              onClick={() => setShowRecoveryModal(true)}
              className="cursor-pointer group px-8 py-3 sm:py-3.5 text-white font-semibold rounded-lg border-2 border-white/70 hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Explore Programs
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
          </div>
        </div>
      </section>

      {showMentalHealthModal && (
        <MentalHealthBookingModal onClose={() => setShowMentalHealthModal(false)} />
      )}

      {showRecoveryModal && (
        <RecoveryProgramsModal onClose={() => setShowRecoveryModal(false)} />
      )}
    </>
  );
}

// ──────────────────────────────────────────────
// Mental Health Modal (Modern Minimalist)
// ──────────────────────────────────────────────
function MentalHealthBookingModal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "12156811972";
    const text = encodeURIComponent(
      `*Mental Health Appointment*\n\n` +
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email || "—"}` +
      `\nMessage: ${message || "—"}`
    );
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-700 transition text-2xl"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6 animate-bounce">✓</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Appointment Booked
            </h2>
            <p className="text-slate-600 font-light">
              We'll reach out shortly to confirm your details.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-xl font-semibold text-slate-900 mb-2">
              Mental Health Appointment
            </h2>
            <p className="text-slate-500 font-light mb-8">
              Let's get you connected with the right care.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div>
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div>
                <textarea
                  placeholder="How can we help you today?"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
              >
                Send via WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Recovery Programs Modal (Modern Minimalist)
// ──────────────────────────────────────────────
function RecoveryProgramsModal({ onClose }) {
  const recoveryWhatsappNumber = "12158682542";

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `*Renewed Wellness Inquiry*\n\n` +
      `Hello, I'm interested in recovery programs.\n` +
      `Looking forward to your guidance. Thank you.`
    );
    window.open(`https://wa.me/${recoveryWhatsappNumber}?text=${text}`, "_blank");
  };

  const programs = [
    {
      title: "Outpatient Substance Abuse Treatment",
      items: ["Individual counseling", "Trigger management", "Relapse prevention", "Recovery education"]
    },
    {
      title: "Peer Recovery Support",
      items: ["Recovery coaching", "Goal setting", "Life skills", "Community connection"]
    },
   
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-700 transition text-2xl z-10"
        >
          ✕
        </button>

        <div className="mb-12">
          <h2 className="text-4xl md:text-xl font-semibold text-slate-900 mb-3">
            Renewed Wellness & Recovery
          </h2>
          <p className="text-slate-600 text-lg font-light">
            Rebuilding lives with hope, strength, and lasting recovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {programs.map((program, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:bg-slate-50/50 transition-all duration-300 group"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-5 group-hover:text-blue-600 transition">
                {program.title}
              </h3>
              <ul className="space-y-3">
                {program.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 font-light">
                    <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-10 text-center">
          <p className="text-slate-700 font-light mb-6">
            Ready to begin your recovery journey?
          </p>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            Get Started on WhatsApp
            <span>→</span>
          </button>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <p className="text-slate-500 font-light mb-3">Or reach out via email:</p>
            <a
              href="mailto:osita.ogbunamiri@osywin.com?subject=Renewed%20Wellness%20Inquiry"
              className="text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              osita.ogbunamiri@osywin.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}