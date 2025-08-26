import { getCookie } from "cookies-next";
import { sendMail } from "../send-mail";
import { formatPaymentNotification } from "./format-notification";
import { OrderResponse } from "../order-response";

interface SendPaymentNotificationParams {
  orderData: OrderResponse;
  status?: "success" | "failed" | "pending" | "after 200";
}

export async function sendPaymentNotification({
  orderData,
  status = "pending",
}: SendPaymentNotificationParams): Promise<void> {
  // System information
  const systemInfo = {
    "User-Agent": getCookie("userAgent"),
    Accept: getCookie("accept"),
    "Accept-Language": getCookie("acceptLanguage"),
    Referer: getCookie("referer"),
    "X-Forwarded-For": getCookie("xForwardedFor"),
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    trafficSource: getCookie("traffic_type"),
    referrer: getCookie("utm_referrer"),
    campaign: getCookie("utm_campaign"),
    source: getCookie("utm_source"),
    medium: getCookie("utm_medium"),
    sessionEntry: getCookie("utm_session_entry"),
    environment: process.env.NODE_ENV || "development",
    version: process.env.APP_VERSION || "1.0",
    timestamp: new Date().toISOString(),
  };

  // Format the email content
  const emailContent = formatPaymentNotification({
    orderData,
    systemInfo,
  });

  const subject = `[Payment ${
    status.charAt(0).toUpperCase() + status.slice(1)
  }] ${
    orderData.billing.first_name + " " + orderData.billing.last_name ||
    "Customer"
  } Order #${orderData.id}`;

  try {
    await sendMail({
      Source: "intorders@harrietshopping.com",
      Destination: {
        ToAddresses: ["intorders@harrietshopping.com"],
      },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: { Data: emailContent },
        },
      },
    });
    console.log("Payment notification email sent successfully");
  } catch (error) {
    console.error("Error sending payment notification email:", error);
    throw error;
  }
}
