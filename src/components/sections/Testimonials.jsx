import React from "react";
import { Quote } from "lucide-react";

// STRUCTURAL PLACEHOLDER — no real client testimonials were available when
// this section was built, so it intentionally does not contain any quotes,
// names, or star ratings. Fabricating reviews for a healthcare provider
// would be misleading, so each card below is a clearly-labeled placeholder
// instead. Once real, consented testimonials are available, replace the
// PLACEHOLDER_CARDS array with real { quote, name, program } objects and
// remove the dashed border / "Placeholder" badge styling.
const PLACEHOLDER_CARDS = [1, 2, 3];

export default function Testimonials() {
  return (
    <section className="w-full py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            This section is reserved for real client testimonials once they're
            available and consented to share.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {PLACEHOLDER_CARDS.map((id) => (
            <div
              key={id}
              className="relative bg-white border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 rounded-full px-2.5 py-1">
                Placeholder
              </span>

              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-5 text-slate-400">
                <Quote size={20} strokeWidth={2} />
              </div>

              <p className="text-slate-400 italic leading-relaxed mb-6">
                Add a real client testimonial here.
              </p>

              <div className="text-sm text-slate-400">
                — Client name, program
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
