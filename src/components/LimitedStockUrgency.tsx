import React, { useState, useEffect } from 'react';
import { COPY } from '../data/copy';
import { AlertCircle, Flame, Clock, ArrowRight } from 'lucide-react';

export const LimitedStockUrgency: React.FC = () => {
  const [stockRemaining, setStockRemaining] = useState(14);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white border-y border-amber-500/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-600/40 text-amber-300 border border-rose-500/50 text-xs sm:text-sm font-bold uppercase tracking-wider animate-pulse">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>HIGH DEMAND - STOCK RUNNING LOW</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
          {COPY.urgency.title}
        </h2>

        {/* Paragraph & Subheading */}
        <div className="max-w-2xl mx-auto space-y-2 text-stone-200 text-base sm:text-lg">
          <p>{COPY.urgency.paragraph}</p>
          <p className="font-bold text-amber-300 font-serif text-xl sm:text-2xl pt-1">
            {COPY.urgency.callout}
          </p>
        </div>

        {/* Real-time Stock Bar & Countdown */}
        <div className="max-w-md mx-auto p-4 rounded-xl bg-rose-900/60 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-amber-200">
            <span className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Remaining Packages:</span>
            </span>
            <span className="text-amber-300 font-serif text-sm">{stockRemaining} / 50 left</span>
          </div>

          <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden p-0.5 border border-amber-500/30">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${(stockRemaining / 50) * 100}%` }}
            />
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-amber-200 pt-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Offer Expires In:</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-300">
              <span className="bg-stone-950 px-2 py-1 rounded border border-amber-500/30">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-stone-950 px-2 py-1 rounded border border-amber-500/30">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-stone-950 px-2 py-1 rounded border border-amber-500/30">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={scrollToForm}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-rose-950 font-black text-base sm:text-lg shadow-xl shadow-amber-500/30 transition-transform transform hover:scale-105 inline-flex items-center gap-3 cursor-pointer"
          >
            <span>👉 Click to Place Your Order Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
