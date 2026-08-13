import React, { useState } from 'react';
import { Order } from '../types';
import { exportOrdersToExcel } from '../utils/excel';
import { FileSpreadsheet, Search, RefreshCw, X, Trash2, CheckCircle, Clock, Truck, Package, Download } from 'lucide-react';

interface AdminOrdersDrawerProps {
  orders: Order[];
  onClose: () => void;
  onRefresh: () => void;
  onUpdateStatus: (id: string, newStatus: Order['status']) => void;
  onDeleteOrder: (id: string) => void;
  onOpenScriptModal: () => void;
}

export const AdminOrdersDrawer: React.FC<AdminOrdersDrawerProps> = ({
  orders,
  onClose,
  onRefresh,
  onUpdateStatus,
  onDeleteOrder,
  onOpenScriptModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phoneNumber.includes(searchTerm) ||
      o.whatsAppNumber.includes(searchTerm) ||
      o.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportExcel = () => {
    exportOrdersToExcel(filteredOrders, `Glowing_Skin_Orders_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-rose-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl bg-stone-900 text-white h-full flex flex-col shadow-2xl border-l border-amber-900/40">
        
        {/* Drawer Header */}
        <div className="p-6 bg-rose-950 border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-rose-950 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-6 h-6 text-rose-950" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-amber-100">
                Order Records & Excel Database
              </h2>
              <p className="text-xs text-amber-300/80">
                {orders.length} Total Submissions Recorded
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Download Excel Button */}
            <button
              onClick={handleExportExcel}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT TO EXCEL (.XLSX)</span>
            </button>

            {/* Script Setup Button */}
            <button
              onClick={onOpenScriptModal}
              className="px-3 py-2 rounded-xl bg-amber-900/40 hover:bg-amber-900/70 border border-amber-700/50 text-amber-200 text-xs font-semibold"
            >
              Google Script
            </button>

            {/* Refresh */}
            <button
              onClick={onRefresh}
              title="Refresh Orders"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Close Drawer */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, phone, state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
            {['ALL', 'Pending', 'Confirmed', 'Shipped', 'Delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-amber-400 text-rose-950'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-stone-400">
              <Package className="w-12 h-12 mx-auto text-stone-600" />
              <p className="text-base font-semibold">No order submissions found.</p>
              <p className="text-xs text-stone-500">
                New form submissions will appear here live and can be exported to Excel anytime.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl bg-stone-800/90 border border-stone-700/80 hover:border-amber-500/50 transition-all space-y-4"
                >
                  
                  {/* Top Info Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-700/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-amber-300 bg-amber-900/40 border border-amber-700/50 px-2.5 py-1 rounded-md">
                        {order.id}
                      </span>
                      <h4 className="font-serif font-bold text-base text-white">
                        {order.fullName}
                      </h4>
                      <span className="text-xs text-stone-400">
                        {new Date(order.createdAt).toLocaleString('en-NG', { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                          order.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : order.status === 'Shipped'
                            ? 'bg-blue-950 text-blue-300 border-blue-700'
                            : order.status === 'Delivered'
                            ? 'bg-purple-950 text-purple-300 border-purple-700'
                            : 'bg-amber-950 text-amber-300 border-amber-700'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      <button
                        onClick={() => onDeleteOrder(order.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-800 transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-300">
                    
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-amber-300/80">Product & Qty</p>
                      <p className="font-bold text-white text-sm">{order.product}</p>
                      <p className="text-stone-400">Quantity: <strong className="text-white">{order.quantity}</strong></p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-amber-300/80">Contact</p>
                      <p>Phone: <a href={`tel:${order.phoneNumber}`} className="text-amber-300 hover:underline">{order.phoneNumber}</a></p>
                      <p>WhatsApp: <a href={`https://wa.me/234${order.whatsAppNumber.replace(/^0/, '')}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{order.whatsAppNumber}</a></p>
                      {order.email && <p className="text-stone-400 truncate">{order.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-amber-300/80">Delivery Location</p>
                      <p className="font-medium text-stone-200">{order.deliveryAddress}</p>
                      <p className="text-amber-200">{order.cityTown}, {order.state} State</p>
                    </div>

                  </div>

                  {/* Survey Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-stone-400 border-t border-stone-700/40">
                    <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-700">
                      Used Before: <strong className="text-stone-200">{order.usedBefore}</strong>
                    </span>
                    <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-700">
                      Source: <strong className="text-stone-200">{order.hearAboutUs}</strong>
                    </span>
                    {order.additionalNotes && (
                      <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-700 truncate max-w-xs">
                        Notes: <span className="italic text-stone-300">{order.additionalNotes}</span>
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-rose-950 border-t border-amber-900/40 flex items-center justify-between text-xs text-amber-200">
          <span>Showing {filteredOrders.length} of {orders.length} orders</span>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 text-emerald-400 font-bold hover:underline"
          >
            <Download className="w-4 h-4" />
            <span>Download Formatted Excel Workbook (.xlsx)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
