import React from 'react';
import { PRODUCTS } from '../data/products';
import { Check, Star, ShoppingBag, Sparkles } from 'lucide-react';

interface PackageCardsProps {
  selectedProduct: string;
  onSelectProduct: (productName: string) => void;
}

export const PackageCards: React.FC<PackageCardsProps> = ({ selectedProduct, onSelectProduct }) => {
  const handlePackageClick = (productName: string) => {
    onSelectProduct(productName);
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-16 sm:py-24 bg-stone-900 text-white relative">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/40 via-stone-900 to-stone-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-amber-300 bg-amber-400/10 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-400/30">
            CHOOSE YOUR GLOW PACKAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Select Your Preferred Product
          </h2>
          <p className="text-sm sm:text-base text-stone-300">
            Select an individual formulation or save up to 28% with our Complete Glowing Skin Set bundle.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((pkg) => {
            const isSelected = selectedProduct === pkg.name;
            const isPopular = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-rose-900/90 via-rose-950 to-stone-950 border-2 border-amber-400 shadow-2xl shadow-amber-500/20 lg:-translate-y-2'
                    : 'bg-stone-800/80 border border-stone-700/80 hover:border-amber-500/50 hover:bg-stone-800'
                } ${isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-stone-900' : ''}`}
              >
                {/* Popular / Discount Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-rose-950 font-black text-xs px-4 py-1 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1.5 z-20">
                    <Sparkles className="w-3.5 h-3.5 fill-rose-950" />
                    <span>RECOMMENDED BUNDLE</span>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  
                  {/* Card Image Thumbnail */}
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-stone-950 border border-stone-700/50">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {pkg.discountBadge && (
                      <span className="absolute top-2 right-2 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow">
                        {pkg.discountBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-100">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-medium mt-0.5">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 pt-1 border-t border-stone-700/60">
                    <span className="text-2xl font-extrabold text-amber-300 font-serif">
                      {pkg.priceFormatted}
                    </span>
                    {pkg.originalPriceFormatted && (
                      <span className="text-xs text-stone-400 line-through">
                        {pkg.originalPriceFormatted}
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-stone-300 leading-relaxed min-h-[36px]">
                    {pkg.description}
                  </p>

                  {/* Key Features List */}
                  <ul className="space-y-2 text-xs text-stone-200 pt-2 border-t border-stone-700/60">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handlePackageClick(pkg.name)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-rose-950 shadow-lg shadow-amber-500/20'
                        : isSelected
                        ? 'bg-amber-400 text-rose-950 font-black'
                        : 'bg-stone-700 hover:bg-stone-600 text-amber-100 hover:text-white border border-stone-600'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isSelected ? 'SELECTED - ORDER NOW' : 'SELECT PACKAGE'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
