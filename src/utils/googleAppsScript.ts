export const SCRIPT_ID = "1rLa5qcfsTBJ8ZElOTNXM4Bz1DbsTE-CbIhgQYO4wpVyWsKwszKPLiG-j";
export const SCRIPT_URL = `https://script.google.com/macros/s/${SCRIPT_ID}/exec`;

export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ============================================================================
 * GLOWING SKIN - AUTOMATIC GOOGLE SHEETS / EXCEL ORDER ENTRY SCRIPT
 * ============================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet (or Google Form linked sheet).
 * 2. Click Extensions -> Apps Script.
 * 3. Delete any default code and paste this ENTIRE script into Code.gs.
 * 4. Update ADMIN_EMAIL with your email address.
 * 5. Click Save (disk icon).
 * 6. (Optional) Run "setupFormTrigger" once to automatically save Google Form 
 *    submissions directly to this sheet and trigger WhatsApp message alerts!
 */

const SPREADSHEET_NAME = "Glowing Skin Orders";
const ADMIN_EMAIL = "orders@glowingskin.com"; // Change to your email
const WHATSAPP_NUMBER = "2347055609012";

/**
 * Handles Webhook HTTP POST submissions directly from your custom web form
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    
    const timestamp = new Date();
    const orderId = "GS-" + Math.floor(1000 + Math.random() * 9000);
    
    // Append order row to Excel / Google Sheet automatically
    sheet.appendRow([
      timestamp,
      orderId,
      data.fullName || "",
      data.phoneNumber || "",
      data.whatsAppNumber || "",
      data.email || "N/A",
      data.product || "",
      data.quantity || "1",
      data.deliveryAddress || "",
      data.cityTown || "",
      data.state || "",
      data.usedBefore || "No",
      data.hearAboutUs || "Other",
      data.additionalNotes || "None",
      data.consent ? "Agreed" : "No",
      "Pending"
    ]);
    
    // Construct automated WhatsApp URL
    const message = buildWhatsAppMessage(data, orderId);
    const waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    
    // Send email alert to admin
    sendEmailNotification(data, orderId);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        orderId: orderId,
        whatsAppUrl: waUrl 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Creates header row if sheet is new
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Orders");
  
  if (!sheet) {
    sheet = ss.insertSheet("Orders");
    // Write Header Row
    const headers = [
      "Timestamp", "Order ID", "Full Name", "Phone Number", "WhatsApp Number",
      "Email Address", "Product", "Quantity", "Delivery Address", "City/Town",
      "State", "Used Before?", "How Heard About Us", "Additional Notes", "Consent", "Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange("1:1").setFontWeight("bold").setBackground("#FAF3E0");
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Builds custom formatted WhatsApp text
 */
function buildWhatsAppMessage(data, orderId) {
  return "*NEW GLOWING SKIN ORDER [" + orderId + "]* ✨\\n" +
    "----------------------------------------\\n" +
    "👤 *Full Name:* " + data.fullName + "\\n" +
    "📞 *Phone Number:* " + data.phoneNumber + "\\n" +
    "💬 *WhatsApp Number:* " + data.whatsAppNumber + "\\n" +
    "📧 *Email:* " + (data.email || "N/A") + "\\n" +
    "🛍️ *Product:* " + data.product + "\\n" +
    "🔢 *Quantity:* " + data.quantity + "\\n" +
    "📍 *Delivery Address:* " + data.deliveryAddress + "\\n" +
    "🏙️ *City/Town:* " + data.cityTown + "\\n" +
    "🗺️ *State:* " + data.state + "\\n" +
    "✨ *Used Before?:* " + data.usedBefore + "\\n" +
    "📣 *Source:* " + data.hearAboutUs + "\\n" +
    "📝 *Notes:* " + (data.additionalNotes || "None") + "\\n" +
    "----------------------------------------\\n" +
    "Please confirm my order details. Thank you!";
}

/**
 * Sends instant email alert to owner upon order submission
 */
function sendEmailNotification(data, orderId) {
  if (!ADMIN_EMAIL || ADMIN_EMAIL.includes("example")) return;
  
  const subject = "✨ New Order Received [" + orderId + "] - " + data.fullName;
  const body = "You have received a new order on Glowing Skin:\\n\\n" +
    "Name: " + data.fullName + "\\n" +
    "Phone: " + data.phoneNumber + "\\n" +
    "WhatsApp: " + data.whatsAppNumber + "\\n" +
    "Product: " + data.product + " (Qty: " + data.quantity + ")\\n" +
    "Delivery: " + data.deliveryAddress + ", " + data.cityTown + ", " + data.state + " State\\n\\n" +
    "The response has been automatically saved to your Excel / Google Sheet.";
    
  MailApp.sendEmail(ADMIN_EMAIL, subject, body);
}
`;
