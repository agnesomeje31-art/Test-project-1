import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Order } from '../types';
import { WHATSAPP_PHONE_RAW } from '../utils/whatsapp';
import { CheckCircle2, MessageCircle, ExternalLink, X, FileSpreadsheet, Sparkles } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order;
  whatsAppUrl: string;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, whatsAppUrl, onClose }) => {
  useEffect(() => {
    // Fire festive confetti animation upon order creation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    // Auto attempt redirect after 1.5 seconds or let user click
    const timer = setTimeout(() => {
      window.open(whatsAppUrl, '_blank');
    }, 1200);

    return () => clearTimeout(timer);
  }, [whatsAppUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-amber-300 overflow-hidden text-stone-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 text-center space-y-2 relative">
          <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 mb-2">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <span className="bg-emerald-800/60 text-emerald-100 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            ORDER ID: {order.id}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold">
            Order Submitted Successfully!
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-xs mx-auto">
            Your response has been entered into the Excel order database.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* WhatsApp Callout Card */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-stone-800 text-xs sm:text-sm space-y-2 text-center">
            <div className="flex items-center justify-center gap-1.5 font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Redirecting to WhatsApp ({WHATSAPP_PHONE_RAW})</span>
            </div>
            <p className="text-stone-600">
              Please click the button below to confirm your order details and receive payment instructions instantly.
            </p>
          </div>

          {/* Big Green WhatsApp Action Button */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 transition-transform transform hover:scale-[1.02] active:scale-100"
          >
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
            <span>CONFIRM ON WHATSAPP NOW</span>
            <ExternalLink className="w-4 h-4 text-emerald-200" />
          </a>

          {/* Submitted Summary Receipt */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
            <div className="flex justify-between border-b border-stone-200 pb-2 font-bold text-stone-900">
              <span>Customer:</span>
              <span>{order.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span>Product Ordered:</span>
              <span className="font-bold text-rose-950">{order.product} (Qty: {order.quantity})</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span>Delivery Address:</span>
              <span className="text-right truncate max-w-[200px]">{order.deliveryAddress}, {order.state}</span>
            </div>
            <div className="flex justify-between">
              <span>Excel Record Status:</span>
              <span className="inline-flex items-center gap-1 text-green-700 font-bold">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Automatically Appended
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500">
          Need help? Contact WhatsApp Support directly at <strong className="text-stone-800">{WHATSAPP_PHONE_RAW}</strong>
        </div>

      </div>
    </div>
  );
};
