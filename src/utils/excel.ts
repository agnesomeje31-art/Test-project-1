import * as XLSX from 'xlsx';
import { Order } from '../types';

/**
 * Downloads current orders array as a real formatted Excel workbook (.xlsx).
 */
export function exportOrdersToExcel(orders: Order[], filename = 'Glowing_Skin_Orders.xlsx') {
  if (!orders || orders.length === 0) {
    alert('No order responses available to export.');
    return;
  }

  // Format data specifically for clean Excel column headers
  const excelData = orders.map((o, idx) => ({
    'S/N': idx + 1,
    'Order ID': o.id,
    'Date Submitted': new Date(o.createdAt).toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }),
    'Full Name': o.fullName,
    'Phone Number': o.phoneNumber,
    'WhatsApp Number': o.whatsAppNumber,
    'Email Address': o.email || 'N/A',
    'Product Package': o.product,
    'Quantity': o.quantity,
    'Delivery Address': o.deliveryAddress,
    'City/Town': o.cityTown,
    'State': o.state,
    'Used Before?': o.usedBefore,
    'How Heard About Us': o.hearAboutUs,
    'Additional Notes': o.additionalNotes || 'N/A',
    'Consent Agreed': o.consent ? 'Yes' : 'No',
    'Order Status': o.status
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Auto-set column widths for clean presentation
  const objectMaxLength: number[] = [];
  excelData.forEach(obj => {
    Object.entries(obj).forEach(([key, val], idx) => {
      const valueLength = String(val ?? '').length;
      const keyLength = key.length;
      const colWidth = Math.max(valueLength, keyLength, 12);
      objectMaxLength[idx] = Math.max(objectMaxLength[idx] || 0, colWidth);
    });
  });

  worksheet['!cols'] = objectMaxLength.map(w => ({ wch: w + 3 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Glowing Skin Orders');

  XLSX.writeFile(workbook, filename);
}
