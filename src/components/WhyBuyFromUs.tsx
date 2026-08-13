import React from 'react';
import { COPY } from '../data/copy';
import { Award, Users, Zap, Headphones, ShieldCheck, Check } from 'lucide-react';

const TRUST_ICONS = [Award, Users, Zap, Headphones, ShieldCheck];

export const WhyBuyFromUs: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-stone-900 via-rose-950 to-stone-900 text-amber-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            OUR PROMISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-3">
            {COPY.whyBuyFromUs.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {COPY.whyBuyFromUs.points.map((item, index) => {
            const Icon = TRUST_ICONS[index % TRUST_ICONS.length];
            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-rose-900/40 border border-amber-500/20 text-center space-y-3 hover:border-amber-400/60 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center mx-auto border border-amber-400/30">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-center gap-1 text-amber-200 font-bold text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-amber-100/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
