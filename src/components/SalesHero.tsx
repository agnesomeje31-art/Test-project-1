import React from 'react';
import { COPY } from '../data/copy';
import { Sparkles, CheckCircle2, Star, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const SalesHero: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-950 via-rose-900 to-rose-950 text-amber-50 py-12 lg:py-20 border-b border-amber-900/30">
      
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column - Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{COPY.hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              {COPY.hero.title}
            </h1>

            {/* Problem Subheadline */}
            <div className="p-4 rounded-xl bg-rose-900/60 border border-rose-800/80 backdrop-blur-sm text-amber-200 text-base sm:text-lg font-medium shadow-inner">
              <p className="flex items-center justify-center lg:justify-start gap-2 text-yellow-300 font-semibold">
                <span>Are you tired of dull, uneven, acne-prone, or damaged skin?</span>
              </p>
            </div>

            {/* Product Introduction Paragraph */}
            <p className="text-base sm:text-lg text-amber-100/90 leading-relaxed font-sans">
              Introducing <strong className="text-amber-300 font-bold">Glowing Skin</strong>—a carefully formulated skincare solution designed to help you achieve smoother, brighter, healthier-looking skin while boosting your confidence.
            </p>

            {/* Solution Scope */}
            <p className="text-sm sm:text-base text-amber-200/80 leading-relaxed border-l-2 border-amber-400 pl-4 py-1 text-left">
              {COPY.hero.subIntro}
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2 text-xs sm:text-sm text-amber-100 font-medium">
              <div className="flex items-center gap-2 bg-rose-900/40 p-2.5 rounded-lg border border-amber-900/30">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Fades Dark Spots & Acne Scars</span>
              </div>
              <div className="flex items-center gap-2 bg-rose-900/40 p-2.5 rounded-lg border border-amber-900/30">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Nourishes & Restores Skin Beauty</span>
              </div>
              <div className="flex items-center gap-2 bg-rose-900/40 p-2.5 rounded-lg border border-amber-900/30">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Suitable for All Skin Types</span>
              </div>
              <div className="flex items-center gap-2 bg-rose-900/40 p-2.5 rounded-lg border border-amber-900/30">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>100% Satisfaction Customer Guarantee</span>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-rose-950 font-extrabold text-base sm:text-lg shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>ORDER YOURS TODAY</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-amber-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Payment on Confirmation & Delivery</span>
              </div>
            </div>

            {/* Social Proof Star Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2 text-xs text-amber-200/90">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5.0 Rating</span>
              <span className="text-amber-400/60">•</span>
              <span>2,850+ Happy Customers Nationwide</span>
            </div>

          </div>

          {/* Right Hero Column - Showcase Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Gold Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 rounded-2xl blur-md opacity-40 animate-pulse" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl bg-rose-900/80">
                <img
                  src="/src/assets/images/glowing_skin_hero_1785880694562.jpg"
                  alt="Glowing Skin Product Collection"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-rose-950/85 backdrop-blur-md border border-amber-500/30 text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs text-amber-300 uppercase tracking-widest font-semibold">Premium Skincare</p>
                    <p className="text-sm font-bold font-serif text-white">Complete Glowing Solution</p>
                  </div>
                  <div className="bg-amber-400/20 text-amber-200 text-xs px-2.5 py-1 rounded-full font-bold border border-amber-300/40 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>In Stock</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
