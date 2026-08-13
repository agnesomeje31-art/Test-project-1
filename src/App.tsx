import React, { useState, useEffect } from 'react';
import { Order } from './types';
import { Header } from './components/Header';
import { SalesHero } from './components/SalesHero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { MirrorImagine } from './components/MirrorImagine';
import { PackageCards } from './components/PackageCards';
import { Testimonials } from './components/Testimonials';
import { WhyBuyFromUs } from './components/WhyBuyFromUs';
import { LimitedStockUrgency } from './components/LimitedStockUrgency';
import { LeadOrderForm } from './components/LeadOrderForm';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminOrdersDrawer } from './components/AdminOrdersDrawer';
import { GoogleAppsScriptModal } from './components/GoogleAppsScriptModal';

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('Complete Glowing Skin Set');
  const [activeModal, setActiveModal] = useState<'success' | 'admin' | 'script' | null>(null);
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<Order | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string>('');

  // Fetch orders from Express backend API
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      }
    } catch (e) {
      console.warn('Backend API endpoint unreachable, running offline mode.', e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderSubmitted = (order: Order, url: string) => {
    setLastSubmittedOrder(order);
    setWhatsAppUrl(url);
    setOrders(prev => [order, ...prev]);
    setActiveModal('success');
  };

  const handleUpdateStatus = async (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: newStatus } : o)));
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      // offline silent catch
    }
  };

  const handleDeleteOrder = async (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    } catch (e) {
      // offline silent catch
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-amber-400 selection:text-rose-950">
      
      {/* Sticky Header & Top Bar */}
      <Header
        onOpenAdmin={() => setActiveModal('admin')}
        onOpenScriptModal={() => setActiveModal('script')}
        orderCount={orders.length}
      />

      {/* Hero Section */}
      <SalesHero />

      {/* Why Thousands Are Choosing Glowing Skin */}
      <WhyChooseUs />

      {/* Imagine Looking in the Mirror */}
      <MirrorImagine />

      {/* Product Packages Cards */}
      <PackageCards
        selectedProduct={selectedProduct}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Why Buy From Us? */}
      <WhyBuyFromUs />

      {/* Limited Stock Urgency Banner */}
      <LimitedStockUrgency />

      {/* Lead Order Form */}
      <LeadOrderForm
        selectedProduct={selectedProduct}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onOrderSubmitted={handleOrderSubmitted}
      />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Footer & Start Your Glow Journey Callout */}
      <FooterSection />

      {/* Modals & Drawers */}
      {activeModal === 'success' && lastSubmittedOrder && (
        <OrderSuccessModal
          order={lastSubmittedOrder}
          whatsAppUrl={whatsAppUrl}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'admin' && (
        <AdminOrdersDrawer
          orders={orders}
          onClose={() => setActiveModal(null)}
          onRefresh={fetchOrders}
          onUpdateStatus={handleUpdateStatus}
          onDeleteOrder={handleDeleteOrder}
          onOpenScriptModal={() => setActiveModal('script')}
        />
      )}

      {activeModal === 'script' && (
        <GoogleAppsScriptModal
          onClose={() => setActiveModal(null)}
        />
      )}

    </div>
  );
}
