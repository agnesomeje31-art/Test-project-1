import React from 'react';
import { COPY } from '../data/copy';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-rose-50 text-stone-900 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex justify-center text-amber-500 gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-rose-950">
            {COPY.testimonials.title}
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Real experiences from real people across Nigeria who restored their natural radiance.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COPY.testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-rose-100 shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-rose-100/80 -z-0" />

              <div className="space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex text-amber-400 gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-stone-700 italic text-sm sm:text-base leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-rose-100 mt-6 flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-rose-950 text-base">
                    — {item.author}
                  </p>
                  <p className="text-xs text-stone-500">Verified Client</p>
                </div>

                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.badge}</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
