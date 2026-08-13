import React from 'react';
import { COPY } from '../data/copy';
import { Sparkles, ArrowRight, MessageCircle, Phone, ShieldCheck } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-rose-950 text-amber-50 pt-16 pb-12 border-t border-amber-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bottom Banner Callout */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pb-16 border-b border-amber-900/40">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>BEAUTIFUL RESULTS AWAIT YOU</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            {COPY.footerCallout.title}
          </h2>

          <p className="text-amber-100/90 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {COPY.footerCallout.subtitle}
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToForm}
              className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-rose-950 font-black text-lg shadow-2xl shadow-amber-500/30 transition-transform transform hover:scale-105 inline-flex items-center gap-3 cursor-pointer"
            >
              <span>{COPY.footerCallout.ctaText}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Brand & Direct Contact Row */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-amber-200/80">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-rose-950 font-bold flex items-center justify-center font-serif text-sm">
              ✨
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-white">Glowing Skin Cosmetics</p>
              <p className="text-[11px] text-amber-300/70">Natural Beauty & Radiance Solutions</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a
              href="https://wa.me/2347055609012"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-emerald-400 font-bold hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support: 07055609012</span>
            </a>

            <div className="flex items-center gap-1.5 text-amber-200/70">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Sales Portal</span>
            </div>
          </div>

          <p className="text-center md:text-right text-[11px] text-amber-300/60">
            © {new Date().getFullYear()} Glowing Skin. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
};
