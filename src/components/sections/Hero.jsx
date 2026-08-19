// src/components/Hero.jsx
import { useState } from "react";
import {
  UserCheck,
  Lock,
  BadgeCheck,
  Users,
  X,
  User,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Clock,
  Calendar,
  Sparkles,
  HeartHandshake,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import healingVideo from "@/assets/videos/cool.webm";

export default function Hero() {
  const [showMentalHealthModal, setShowMentalHealthModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  const trustPoints = [
    { icon: UserCheck, label: "Licensed & Experienced", shortLabel: "Licensed & Trained" },
    { icon: Lock, label: "Confidential & Secure" },
    { icon: BadgeCheck, label: "Evidence-Based Care" },
    { icon: Users, label: "Family-Centered Care" },
  ];

  return (
    <>
      <section
        id="home"
        className="w-full flex items-center justify-center pt-28 pb-16 md:pt-24 md:pb-14 relative overflow-hidden bg-slate-950"
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

        {/* Stronger scrim - text authority no longer depends on video brightness */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/70 to-blue-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl px-6 md:px-12 flex flex-col items-center text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-4xl font-bold leading-[1.2] sm:leading-[1.1] tracking-tight mb-4 sm:mb-4 max-w-3xl">
            WINN Psychiatry &amp; Mental Health Services
          </h1>

          <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-2xl font-light text-justify mb-5 sm:mb-4">
            Compassionate, modern and professionally delivered psychiatric care, medication management, child &amp; adolescent support, crisis stabilization and telepsychiatry.
          </p>

          <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-500/0" />

          <div className="mt-5 sm:mt-4 flex flex-col items-center gap-1.5 max-w-2xl">
            <p className="text-slate-300 font-light whitespace-nowrap text-[clamp(9.5px,3.4vw,16px)]">
              Also home to{" "}
              <span className="font-semibold text-red-400">
                Renewed Wellness &amp; Recovery Services
              </span>
            </p>
            <p className="text-slate-400 italic text-sm">
              "Where healing begins and lives are renewed."
            </p>
          </div>

          {/* Trust strip — balanced 2x2 grid on mobile (a shorter variant keeps the longest label on one line), full row from sm+ */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-2 mt-6 sm:mt-6">
            {trustPoints.map(({ icon: Icon, label, shortLabel }) => (
              <div key={label} className="flex items-center justify-center gap-2 text-slate-200">
                <Icon size={17} className="text-blue-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium leading-snug whitespace-nowrap">
                  {shortLabel ? (
                    <>
                      <span className="sm:hidden">{shortLabel}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </>
                  ) : (
                    label
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 sm:mt-8 flex flex-col items-center sm:flex-row sm:justify-center gap-3.5 sm:gap-4">
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
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email || "-"}` +
      `\nMessage: ${message || "-"}`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-20 px-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              You're all set!
            </h2>
            <p className="text-slate-500 font-light max-w-xs mx-auto">
              We're opening WhatsApp so you can send your details — we'll reach out shortly to confirm.
            </p>
          </div>
        ) : (
          <>
            {/* Header banner */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 px-7 sm:px-9 pt-8 pb-9 rounded-t-3xl overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X size={18} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-4">
                <Calendar size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1.5">
                Book Your Appointment
              </h2>
              <p className="text-blue-100 font-light text-sm leading-relaxed max-w-sm">
                Take the first step toward feeling better — we're here to listen, without judgment.
              </p>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500">
                <ShieldCheck size={14} className="text-blue-500" /> Confidential
              </span>
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500">
                <Clock size={14} className="text-blue-500" /> Fast Response
              </span>
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500">
                <UserCheck size={14} className="text-blue-500" /> Licensed Providers
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-7 sm:p-9 pt-6 space-y-4">
              <div className="relative">
                <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div className="relative">
                <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div className="relative">
                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div className="relative">
                <MessageSquare size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                <textarea
                  placeholder="How can we help you today?"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition"
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
              >
                Send via WhatsApp
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-xs text-slate-400 font-light">
                We typically respond within a few hours, during business days.
              </p>
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
      icon: Stethoscope,
      items: ["Individual counseling", "Trigger management", "Relapse prevention", "Recovery education"]
    },
    {
      title: "Peer Recovery Support",
      icon: HeartHandshake,
      items: ["Recovery coaching", "Goal setting", "Life skills", "Community connection"]
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header banner */}
        <div className="relative bg-gradient-to-br from-red-500 to-amber-500 px-7 sm:px-12 pt-8 pb-10 sm:pb-12 rounded-t-3xl overflow-hidden">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition z-10"
          >
            <X size={18} />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-4">
            <Sparkles size={24} className="text-white" />
          </div>
          <h2 className="font-bold text-white mb-2 whitespace-nowrap text-[clamp(13px,4vw,30px)]">
            Renewed Wellness &amp; Recovery
          </h2>
          <p className="text-red-50 text-base sm:text-lg font-light max-w-lg">
            Rebuilding lives with hope, strength, and lasting recovery.
          </p>
        </div>

        <div className="p-7 sm:p-12 pt-8 sm:pt-10">
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-8">
            {programs.map((program, i) => {
              const Icon = program.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 p-6 hover:border-red-200 hover:bg-red-50/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 group-hover:text-red-600 transition">
                    {program.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {program.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-600 font-light text-sm">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-red-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 mb-8 rounded-xl bg-slate-50 border border-slate-100">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <ShieldCheck size={14} className="text-red-500" /> Confidential
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <UserCheck size={14} className="text-red-500" /> Licensed Providers
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <HeartHandshake size={14} className="text-red-500" /> Personalized Plans
            </span>
          </div>

          <div className="border-t border-slate-200 pt-8 text-center">
            <p className="text-slate-700 font-light mb-6">
              Ready to begin your recovery journey?
            </p>
            <button
              onClick={openWhatsApp}
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 active:scale-[0.98]"
            >
              <span className="whitespace-nowrap text-[clamp(12px,3.75vw,16px)]">Get Started on WhatsApp</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-2 text-slate-500">
              <Mail size={15} className="shrink-0" />
              <span className="font-light">Or reach out via email:</span>
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
    </div>
  );
}