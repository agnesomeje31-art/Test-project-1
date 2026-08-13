import React, { useState, useEffect } from 'react';
import { OrderFormData, Order } from '../types';
import { NIGERIAN_STATES, PRODUCTS } from '../data/products';
import { buildWhatsAppOrderUrl, WHATSAPP_PHONE_RAW } from '../utils/whatsapp';
import { ShoppingBag, Send, CheckCircle, ShieldCheck, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

interface LeadOrderFormProps {
  selectedProduct: string;
  onSelectProduct: (prod: string) => void;
  onOrderSubmitted: (order: Order, whatsAppUrl: string) => void;
}

export const LeadOrderForm: React.FC<LeadOrderFormProps> = ({
  selectedProduct,
  onSelectProduct,
  onOrderSubmitted
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    deliveryAddress: '',
    state: 'Lagos',
    cityTown: '',
    product: selectedProduct || 'Complete Glowing Skin Set',
    quantity: '1',
    usedBefore: 'No',
    hearAboutUs: 'Instagram',
    additionalNotes: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state if selectedProduct changes from outside
  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, product: selectedProduct }));
    }
  }, [selectedProduct]);

  // Same phone number toggle helper
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const handleSamePhoneToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsPhone(checked);
    if (checked && formData.phoneNumber) {
      setFormData(prev => ({ ...prev, whatsAppNumber: prev.phoneNumber }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'phoneNumber' && sameAsPhone) {
        setFormData(prev => ({ ...prev, whatsAppNumber: value }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form Validations
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your Full Name.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMsg('Please enter your Phone Number.');
      return;
    }
    if (!formData.whatsAppNumber.trim()) {
      setErrorMsg('Please enter your WhatsApp Number.');
      return;
    }
    if (!formData.deliveryAddress.trim()) {
      setErrorMsg('Please enter your Delivery Address.');
      return;
    }
    if (!formData.cityTown.trim()) {
      setErrorMsg('Please enter your City/Town.');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('Please check the consent box to confirm your details.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Post order to backend express server
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      let createdOrder: Order;
      if (response.ok && result.success) {
        createdOrder = result.order;
      } else {
        // Fallback local order structure if offline
        createdOrder = {
          id: `GS-${Math.floor(1000 + Math.random() * 9000)}`,
          ...formData,
          createdAt: new Date().toISOString(),
          status: 'Pending'
        };
      }

      // 2. Build WhatsApp redirect URL with message parameters
      const whatsAppUrl = buildWhatsAppOrderUrl(formData);

      // 3. Callback to show order success modal and trigger WhatsApp
      onOrderSubmitted(createdOrder, whatsAppUrl);

    } catch (err: any) {
      // Local fallback on network error
      const fallbackOrder: Order = {
        id: `GS-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'Pending'
      };
      const whatsAppUrl = buildWhatsAppOrderUrl(formData);
      onOrderSubmitted(fallbackOrder, whatsAppUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-16 sm:py-24 bg-rose-50 text-stone-900 border-b border-rose-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container Card */}
        <div className="bg-white rounded-3xl border border-rose-200/80 shadow-2xl overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-amber-50 p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30 mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>OFFICIAL ORDER FORM</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
              Place Your Glowing Skin Order
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
              Thank you for choosing Glowing Skin. Please complete this form accurately. Our team will contact you shortly to confirm your order and provide payment and delivery information.
            </p>
          </div>

          {/* Main Form Fields */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
            
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-sm flex items-center gap-2 font-medium">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Personal Details */}
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-2">
                <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-900 text-amber-300 text-xs flex items-center justify-center font-sans font-bold">1</span>
                  <span>Contact Information</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Adewale Chioma"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                    Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. adewale@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 08012345678"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider">
                      WhatsApp Number <span className="text-rose-600">*</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] text-amber-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsPhone}
                        onChange={handleSamePhoneToggle}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Same as Phone</span>
                    </label>
                  </div>
                  <input
                    type="tel"
                    name="whatsAppNumber"
                    value={formData.whatsAppNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 08012345678"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>

              </div>
            </div>

            {/* Section 2: Delivery Details */}
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-2">
                <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-900 text-amber-300 text-xs flex items-center justify-center font-sans font-bold">2</span>
                  <span>Delivery Address</span>
                </h3>
              </div>

              {/* Delivery Address (Paragraph) */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                  Street Address <span className="text-rose-600">*</span>
                </label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g. House 12, Close 4, Admiralty Estate, Lekki Phase 1"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* State (Dropdown) */}
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                    State <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 bg-white outline-none transition-all"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City/Town */}
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                    City / Town <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="cityTown"
                    value={formData.cityTown}
                    onChange={handleInputChange}
                    placeholder="e.g. Ikeja / Wuse 2"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 outline-none transition-all"
                  />
                </div>

              </div>
            </div>

            {/* Section 3: Product Package Selection */}
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-2">
                <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-900 text-amber-300 text-xs flex items-center justify-center font-sans font-bold">3</span>
                  <span>Product Package & Quantity</span>
                </h3>
              </div>

              {/* Product Multiple Choice */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-3">
                  Which product would you like to order? <span className="text-rose-600">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.map((prod) => {
                    const isChecked = formData.product === prod.name;
                    return (
                      <label
                        key={prod.id}
                        className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-amber-500 bg-amber-50/80 ring-1 ring-amber-500'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="product"
                          value={prod.name}
                          checked={isChecked}
                          onChange={handleInputChange}
                          className="mt-1 text-amber-600 focus:ring-amber-500"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-sm text-rose-950">
                            <span>{prod.name}</span>
                            {prod.isPopular && (
                              <span className="bg-amber-500 text-rose-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                                Best Value
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-amber-800 font-semibold mt-0.5">
                            {prod.priceFormatted}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                  Quantity <span className="text-rose-600">*</span>
                </label>
                <select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full sm:w-48 px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 bg-white outline-none transition-all"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>

            </div>

            {/* Section 4: Customer Survey */}
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-2">
                <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-900 text-amber-300 text-xs flex items-center justify-center font-sans font-bold">4</span>
                  <span>Additional Details</span>
                </h3>
              </div>

              {/* Have you used Glowing Skin before? */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                  Have you used Glowing Skin before? <span className="text-rose-600">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-stone-800 font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="usedBefore"
                      value="Yes"
                      checked={formData.usedBefore === 'Yes'}
                      onChange={handleInputChange}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-stone-800 font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="usedBefore"
                      value="No"
                      checked={formData.usedBefore === 'No'}
                      onChange={handleInputChange}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* How did you hear about us? */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                  How did you hear about us? <span className="text-rose-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Friend/Family', 'WhatsApp', 'Other'].map((src) => (
                    <label
                      key={src}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                        formData.hearAboutUs === src
                          ? 'border-amber-500 bg-amber-50 text-amber-900'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hearAboutUs"
                        value={src}
                        checked={formData.hearAboutUs === src}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>{src}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                  Additional Notes <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g. Special delivery instructions, preferred delivery time"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-stone-900 outline-none transition-all"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span className="text-xs text-stone-700 leading-relaxed">
                    I confirm that the information provided is correct, and I agree to be contacted regarding my order.
                  </span>
                </label>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 px-8 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-rose-950 font-black text-base sm:text-lg shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>SUBMITTING ORDER...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>SUBMIT ORDER & CONFIRM ON WHATSAPP ({WHATSAPP_PHONE_RAW})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Your details are safely stored in Excel sheet & WhatsApp automatically generated.</span>
              </div>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
