import React from 'react';
import { Sparkles, ShoppingBag, Database, MessageCircle, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenScriptModal: () => void;
  orderCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenScriptModal, orderCount }) => {
  const scrollToOrder = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
        <span>✨ <strong>FLASH PROMOTION:</strong> Free Delivery & Priority Dispatch on all Complete Set orders today!</span>
        <span className="hidden md:inline-block bg-yellow-400/20 text-yellow-100 text-[11px] px-2 py-0.5 rounded-full border border-yellow-300/30 font-semibold">Limited Stock</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-rose-950/90 backdrop-blur-md border-b border-amber-900/40 text-amber-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 flex items-center justify-center shadow-md shadow-amber-900/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-rose-950" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                Glowing Skin
              </span>
              <span className="block text-[10px] tracking-widest text-amber-300/80 uppercase font-sans">
                Natural Radiance
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-100/90">
            <a href="#benefits" className="hover:text-amber-300 transition-colors">Why Choose Us</a>
            <a href="#packages" className="hover:text-amber-300 transition-colors">Products</a>
            <a href="#reviews" className="hover:text-amber-300 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-amber-300 transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Excel / Script Info Button */}
            <button
              onClick={onOpenScriptModal}
              title="View Google Apps Script & Excel Setup"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-900/70 border border-amber-700/50 text-amber-200 text-xs font-medium transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-green-400" />
              <span className="hidden sm:inline">Excel Script</span>
            </button>

            {/* Admin Order Database Drawer Toggle */}
            <button
              onClick={onOpenAdmin}
              title="View Submitted Orders Database"
              className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-900/70 border border-amber-700/50 text-amber-200 text-xs font-medium transition-all"
            >
              <Database className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Orders</span>
              {orderCount > 0 && (
                <span className="bg-amber-400 text-rose-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Primary Order Button */}
            <button
              onClick={scrollToOrder}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-rose-950 px-3.5 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDER NOW</span>
            </button>

          </div>

        </div>
      </header>
    </>
  );
};
