import React from 'react';
import { COPY } from '../data/copy';
import { Sparkles, Sun, Smile, Heart, CheckCircle } from 'lucide-react';

export const MirrorImagine: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-rose-950 via-rose-900 to-rose-950 text-amber-50 relative overflow-hidden">
      
      {/* Soft Glow Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Portrait Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 rounded-2xl blur-md opacity-40" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl">
                <img
                  src="/src/assets/images/radiant_glow_portrait_1785880785800.jpg"
                  alt="Radiant Glowing Complexion in Mirror"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-rose-950 via-rose-950/80 to-transparent p-6 text-center">
                  <p className="font-serif italic text-amber-200 text-sm sm:text-base font-semibold">
                    "{COPY.imagine.closingQuote}"
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Imagine Copy */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-1 lg:order-2">
            
            <div className="space-y-3">
              <span className="text-amber-300 text-xs font-bold tracking-widest uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                TRANSFORM YOUR DAILY LOOK
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {COPY.imagine.title}
              </h2>
            </div>

            {/* Checklist of 4 Imagine Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-5 rounded-2xl bg-rose-900/50 border border-amber-500/30 backdrop-blur-sm flex items-start gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-amber-100 flex items-center gap-1.5">
                    ✨ Clearer skin
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1">
                    Free from persistent dark spots and uneven hyperpigmentation.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-900/50 border border-amber-500/30 backdrop-blur-sm flex items-start gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/40">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-amber-100 flex items-center gap-1.5">
                    ✨ A brighter complexion
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1">
                    Fresh, luminous energy that turns heads wherever you step.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-900/50 border border-amber-500/30 backdrop-blur-sm flex items-start gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/40">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-amber-100 flex items-center gap-1.5">
                    ✨ More confidence
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1">
                    Go out comfortably without needing layers of heavy makeup.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-900/50 border border-amber-500/30 backdrop-blur-sm flex items-start gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/40">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-amber-100 flex items-center gap-1.5">
                    ✨ Healthy-looking skin
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1">
                    Soft, hydrated, and naturally glowing skin every morning.
                  </p>
                </div>
              </div>

            </div>

            {/* Closing Quote Banner & Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-400/40 text-center lg:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-extrabold text-amber-200">
                  "{COPY.imagine.closingQuote}"
                </p>
                <p className="text-xs text-amber-300/80 mt-1">
                  Start your glow transformation today.
                </p>
              </div>

              <button
                onClick={scrollToForm}
                className="shrink-0 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-rose-950 font-bold text-sm shadow-lg transition-all"
              >
                Claim Your Glow
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
