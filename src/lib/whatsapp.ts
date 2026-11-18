// WhatsApp Business Integration for Order Notifications

interface OrderNotificationData {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "card" | "cod";
}

/**
 * Generate WhatsApp message text for order confirmation
 */
export function generateWhatsAppMessage(data: OrderNotificationData, locale: string = "ar"): string {
  const isAr = locale === "ar";
  
  let message = "";
  
  if (isAr) {
    message = `🎉 *طلب جديد - Life Box*\n\n`;
    message += `📋 *رقم الطلب:* ${data.orderNumber}\n\n`;
    message += `👤 *معلومات العميل:*\n`;
    message += `• الاسم: ${data.customerName}\n`;
    message += `• الهاتف: ${data.phone}\n`;
    message += `• العنوان: ${data.address}\n`;
    message += `• المدينة: ${data.city}, ${data.region}\n\n`;
    message += `🛍️ *المنتجات:*\n`;
    
    data.items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name}\n`;
      message += `   الكمية: ${item.quantity} × ${item.price} جنيه = ${item.quantity * item.price} جنيه\n`;
      if (item.color) message += `   اللون: ${item.color}\n`;
      if (item.size) message += `   الحجم: ${item.size}\n`;
    });
    
    message += `\n💰 *الملخص المالي:*\n`;
    message += `• المجموع الفرعي: ${data.subtotal} جنيه\n`;
    message += `• الشحن: ${data.shipping} جنيه\n`;
    message += `• *الإجمالي: ${data.total} جنيه*\n\n`;
    message += `💳 *طريقة الدفع:* ${data.paymentMethod === "cod" ? "الدفع عند الاستلام 💵" : "بطاقة ائتمان 💳"}\n\n`;
    message += `⏰ تاريخ الطلب: ${new Date().toLocaleString("ar-EG")}`;
  } else {
    message = `🎉 *New Order - Life Box*\n\n`;
    message += `📋 *Order Number:* ${data.orderNumber}\n\n`;
    message += `👤 *Customer Information:*\n`;
    message += `• Name: ${data.customerName}\n`;
    message += `• Phone: ${data.phone}\n`;
    message += `• Address: ${data.address}\n`;
    message += `• City: ${data.city}, ${data.region}\n\n`;
    message += `🛍️ *Products:*\n`;
    
    data.items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name}\n`;
      message += `   Qty: ${item.quantity} × ${item.price} EGP = ${item.quantity * item.price} EGP\n`;
      if (item.color) message += `   Color: ${item.color}\n`;
      if (item.size) message += `   Size: ${item.size}\n`;
    });
    
    message += `\n💰 *Summary:*\n`;
    message += `• Subtotal: ${data.subtotal} EGP\n`;
    message += `• Shipping: ${data.shipping} EGP\n`;
    message += `• *Total: ${data.total} EGP*\n\n`;
    message += `💳 *Payment Method:* ${data.paymentMethod === "cod" ? "Cash on Delivery 💵" : "Credit Card 💳"}\n\n`;
    message += `⏰ Order Date: ${new Date().toLocaleString("en-US")}`;
  }
  
  return message;
}

/**
 * Generate WhatsApp Web URL with pre-filled message
 * @param phoneNumber - WhatsApp business number (with country code, no + or spaces)
 * @param message - Pre-filled message text
 */
export function generateWhatsAppURL(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Send order notification via WhatsApp (opens WhatsApp Web/App)
 */
export function sendWhatsAppOrderNotification(
  data: OrderNotificationData,
  businessPhone: string,
  locale: string = "ar"
): void {
  const message = generateWhatsAppMessage(data, locale);
  const url = generateWhatsAppURL(businessPhone, message);
  
  if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
}

/**
 * For server-side notification (future implementation with WhatsApp Business API)
 * This would require WhatsApp Business API credentials
 */
export async function sendWhatsAppAPINotification(
  data: OrderNotificationData,
  businessPhone: string,
  apiToken: string
): Promise<boolean> {
  // TODO: Implement WhatsApp Business API integration
  // This requires WhatsApp Business API setup with Meta
  
  const message = generateWhatsAppMessage(data);
  
  try {
    // Example API call (placeholder)
    // const response = await fetch("https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${apiToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     messaging_product: "whatsapp",
    //     to: businessPhone,
    //     type: "text",
    //     text: { body: message }
    //   })
    // });
    
    // return response.ok;
    
    console.log("WhatsApp API notification:", message);
    return true;
  } catch (error) {
    console.error("WhatsApp notification failed:", error);
    return false;
  }
}
