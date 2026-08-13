import { OrderFormData } from '../types';

export const WHATSAPP_PHONE_RAW = '07055609012';
export const WHATSAPP_PHONE_INTL = '2347055609012';

/**
 * Builds a nicely formatted WhatsApp deep link with the prospective client's form submission details.
 */
export function buildWhatsAppOrderUrl(data: OrderFormData): string {
  const message = `✨ *NEW GLOWING SKIN ORDER* ✨
----------------------------------------
👤 *Full Name:* ${data.fullName.trim()}
📞 *Phone Number:* ${data.phoneNumber.trim()}
💬 *WhatsApp Number:* ${data.whatsAppNumber.trim()}
📧 *Email:* ${data.email.trim() || 'N/A'}

🛍️ *Product Ordered:* ${data.product}
🔢 *Quantity:* ${data.quantity}

📍 *Delivery Address:*
${data.deliveryAddress.trim()}
🏙️ *City/Town:* ${data.cityTown.trim()}
🗺️ *State:* ${data.state}

✨ *Used Before?:* ${data.usedBefore}
📣 *How Heard About Us:* ${data.hearAboutUs}
📝 *Additional Notes:* ${data.additionalNotes.trim() || 'None'}

----------------------------------------
Hello! I have completed my order form on the website. Please confirm my order and share payment and delivery details. Thank you!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_INTL}?text=${encoded}`;
}
