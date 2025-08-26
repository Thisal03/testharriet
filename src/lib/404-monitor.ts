"use server";

import { headers } from "next/headers";
import { sendMail } from "./send-mail";

export interface Error404Data {
  url: string;
  referer: string | null;
  userAgent: string | null;
  ip: string | null;
  timestamp: string;
  source: string;
  previousUrl?: string;
  searchParams?: string;
  pathname?: string;
  slug?: string;
  errorType?: "product" | "category" | "shop" | "tag" | "general";
  httpStatus?: number;
  userLanguage?: string;
  userCountry?: string;
}

export interface NotificationConfig {
  email?: {
    enabled: boolean;
    recipients: string[];
  };
  slack?: {
    enabled: boolean;
    webhookUrl: string;
  };
}

const DEFAULT_CONFIG: NotificationConfig = {
  email: {
    enabled: process.env.ENABLE_404_EMAIL_NOTIFICATIONS === "true",
    recipients: process.env.ERROR_404_NOTIFICATION_EMAILS?.split(",") || [],
  },
  slack: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_404_SLACK_NOTIFICATIONS === "true",
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
  },
};

export async function capture404Error(
  url: string,
  config: NotificationConfig = DEFAULT_CONFIG,
  overrides?: { 
    referer?: string | null; 
    userAgent?: string | null;
    pathname?: string;
    slug?: string;
    errorType?: "product" | "category" | "shop" | "tag" | "general";
    httpStatus?: number;
  }
): Promise<void> {
  try {
    const headersList = await headers();
    const referer = overrides?.referer ?? headersList.get("referer");
    const userAgent = overrides?.userAgent ?? headersList.get("user-agent");
    const acceptLanguage = headersList.get("accept-language");
    const cfCountry = headersList.get("cf-ipcountry");
    
    const errorData: Error404Data = {
      url,
      referer,
      userAgent,
      ip: headersList.get("x-forwarded-for") || 
          headersList.get("x-real-ip") || 
          headersList.get("cf-connecting-ip") ||
          "unknown",
      timestamp: new Date().toISOString(),
      source: determineSource(referer),
      previousUrl: referer || undefined,
      searchParams: headersList.get("x-search-params") || undefined,
      pathname: overrides?.pathname || new URL(url).pathname,
      slug: overrides?.slug,
      errorType: overrides?.errorType || "general",
      httpStatus: overrides?.httpStatus || 404,
      userLanguage: acceptLanguage?.split(",")[0] || undefined,
      userCountry: cfCountry || undefined,
    };

    console.error("404 Error Detected:", errorData);

    // Send notifications
    await Promise.allSettled([
      config.email?.enabled && sendEmailNotification(errorData, config.email.recipients),
      config.slack?.enabled && sendSlackNotification(errorData, config.slack.webhookUrl),
    ].filter(Boolean));

  } catch (error) {
    console.error("Error capturing 404:", error);
  }
}

export async function handle404Error(
  url: string,
  errorType: "product" | "category" | "shop" | "tag" | "general",
  slug?: string,
  pathname?: string
): Promise<void> {
  try {
    await capture404Error(url, DEFAULT_CONFIG, {
      pathname,
      slug,
      errorType,
      httpStatus: 404,
    });
  } catch (error) {
    console.error("Error handling 404:", error);
  }
}

function determineSource(referer: string | null): string {
  if (!referer) return "direct";
  
  try {
    const refererUrl = new URL(referer);
    
    // Check for common search engines
    if (refererUrl.hostname.includes("google")) return "google";
    if (refererUrl.hostname.includes("bing")) return "bing";
    if (refererUrl.hostname.includes("yahoo")) return "yahoo";
    if (refererUrl.hostname.includes("facebook")) return "facebook";
    if (refererUrl.hostname.includes("twitter")) return "twitter";
    if (refererUrl.hostname.includes("instagram")) return "instagram";
    if (refererUrl.hostname.includes("linkedin")) return "linkedin";
    
    // Check for social media
    if (refererUrl.hostname.includes("tiktok")) return "tiktok";
    if (refererUrl.hostname.includes("youtube")) return "youtube";
    
    // Check if it's from our own domain
    if (refererUrl.hostname.includes("harrietshopping.com")) return "internal";
    
    return "external";
  } catch {
    return "unknown";
  }
}

async function sendEmailNotification(
  errorData: Error404Data,
  recipients: string[]
): Promise<void> {
  if (!recipients.length) return;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e74c3c;">🚨 404 Error Detected</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Error Details:</h3>
        <p><strong>URL:</strong> <a href="${errorData.url}">${errorData.url}</a></p>
        <p><strong>Pathname:</strong> ${errorData.pathname || 'N/A'}</p>
        <p><strong>Slug:</strong> ${errorData.slug || 'N/A'}</p>
        <p><strong>Error Type:</strong> ${errorData.errorType || 'general'}</p>
        <p><strong>HTTP Status:</strong> ${errorData.httpStatus || 404}</p>
        <p><strong>Timestamp:</strong> ${new Date(errorData.timestamp).toLocaleString()}</p>
        <p><strong>Source:</strong> ${errorData.source}</p>
        <p><strong>IP Address:</strong> ${errorData.ip}</p>
        
        ${errorData.previousUrl ? `<p><strong>Previous URL:</strong> <a href="${errorData.previousUrl}">${errorData.previousUrl}</a></p>` : ''}
        ${errorData.searchParams ? `<p><strong>Search Params:</strong> ${errorData.searchParams}</p>` : ''}
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>User Information:</h3>
        <p><strong>User Agent:</strong> ${errorData.userAgent || 'Not available'}</p>
        <p><strong>Referer:</strong> ${errorData.referer || 'Direct access'}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">
          This notification was automatically generated by the 404 monitoring system.
        </p>
      </div>
    </div>
  `;

  const textContent = `
404 Error Detected

Error Details:
- URL: ${errorData.url}
- Pathname: ${errorData.pathname || 'N/A'}
- Slug: ${errorData.slug || 'N/A'}
- Error Type: ${errorData.errorType || 'general'}
- HTTP Status: ${errorData.httpStatus || 404}
- Timestamp: ${new Date(errorData.timestamp).toLocaleString()}
- Source: ${errorData.source}
- IP Address: ${errorData.ip}
${errorData.previousUrl ? `- Previous URL: ${errorData.previousUrl}` : ''}
${errorData.searchParams ? `- Search Params: ${errorData.searchParams}` : ''}

User Information:
- User Agent: ${errorData.userAgent || 'Not available'}
- Referer: ${errorData.referer || 'Direct access'}
  `;

  await sendMail({
    Source: process.env.SES_FROM_EMAIL || "noreply@harrietshopping.com",
    Destination: {
      ToAddresses: recipients,
    },
    Message: {
      Subject: {
        Data: `🚨 404 Error: ${errorData.errorType || 'general'} - ${errorData.url}`,
      },
      Body: {
        Html: { Data: htmlContent },
        Text: { Data: textContent },
      },
    },
  });
}

async function sendSlackNotification(
  errorData: Error404Data,
  webhookUrl: string
): Promise<void> {
  if (!webhookUrl) return;

  const slackMessage = {
    text: "🚨 404 Error Detected",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🚨 404 Error Detected",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*URL:*\n<${errorData.url}|${errorData.url}>`,
          },
          {
            type: "mrkdwn",
            text: `*Error Type:*\n${errorData.errorType || 'general'}`,
          },
          {
            type: "mrkdwn",
            text: `*Pathname:*\n${errorData.pathname || 'N/A'}`,
          },
          {
            type: "mrkdwn",
            text: `*Slug:*\n${errorData.slug || 'N/A'}`,
          },
          {
            type: "mrkdwn",
            text: `*Source:*\n${errorData.source}`,
          },
          {
            type: "mrkdwn",
            text: `*IP Address:*\n${errorData.ip}`,
          },
          {
            type: "mrkdwn",
            text: `*Timestamp:*\n${new Date(errorData.timestamp).toLocaleString()}`,
          },
        ],
      },
      ...(errorData.previousUrl ? [{
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Previous URL:*\n<${errorData.previousUrl}|${errorData.previousUrl}>`,
          },
        ],
      }] : []),
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*User Agent:*\n${errorData.userAgent || "Not available"}`,
        },
      },
    ],
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });
  } catch (error) {
    console.error("Error sending Slack notification:", error);
  }
} 