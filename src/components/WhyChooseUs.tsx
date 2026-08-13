import React from 'react';
import { COPY } from '../data/copy';
import { Check, Sparkles, Sun, Droplets, HeartHandshake, ShieldCheck, UserCheck, CalendarCheck } from 'lucide-react';

const BENEFIT_ICONS = [
  Sun,
  Sparkles,
  ShieldCheck,
  Droplets,
  HeartHandshake,
  UserCheck,
  CalendarCheck
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="benefits" className="py-16 sm:py-20 bg-rose-50/60 text-stone-900 border-b border-rose-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-amber-800 bg-amber-100/80 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-200">
            PROVEN FORMULA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-rose-950 mt-3 mb-4">
            {COPY.whyChooseUs.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COPY.whyChooseUs.points.map((point, index) => {
            const IconComponent = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white border border-rose-100/80 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 transform hover:-translate-y-1 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-900 to-rose-950 text-amber-300 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="font-serif text-lg font-bold text-rose-950">
                      {point}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Designed to deliver consistent, noticeable radiance with daily application.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
