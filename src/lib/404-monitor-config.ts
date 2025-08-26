export interface Monitor404Config {
  enabled: boolean;
  email: {
    enabled: boolean;
    recipients: string[];
    fromEmail: string;
  };
  slack: {
    enabled: boolean;
    webhookUrl: string;
  };
  monitoring: {
    captureUserAgent: boolean;
    captureIP: boolean;
    captureReferer: boolean;
    captureSearchParams: boolean;
    excludePaths: string[];
    excludeUserAgents: string[];
  };
}

export const get404MonitorConfig = (): Monitor404Config => {
  const defaultExcludePaths = [
    "/api/",
    "/_next/",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.json",
    "/sw.js",
    "/workbox-",
    "/assets/",
    "/public/",
    "/images/",
    "/icons/",
    "/locales/",
    "/locations/",
  ];

  const defaultExcludeUserAgents = [
    "bot",
    "crawler",
    "spider",
    "scraper",
    "monitoring",
    "uptime",
    "pingdom",
    "newrelic",
    "datadog",
  ];

  return {
    enabled: process.env.ENABLE_404_MONITORING === "true",
    email: {
      enabled: process.env.ENABLE_404_EMAIL_NOTIFICATIONS === "true",
      recipients: process.env.ERROR_404_NOTIFICATION_EMAILS?.split(",").map((email: string) => email.trim()) || [],
      fromEmail: process.env.SES_FROM_EMAIL || "noreply@harrietshopping.com",
    },
    slack: {
      enabled: process.env.NEXT_PUBLIC_ENABLE_404_SLACK_NOTIFICATIONS === "true",
      webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
    },
    monitoring: {
      captureUserAgent: process.env.CAPTURE_USER_AGENT !== "false",
      captureIP: process.env.CAPTURE_IP !== "false",
      captureReferer: process.env.CAPTURE_REFERER !== "false",
      captureSearchParams: process.env.CAPTURE_SEARCH_PARAMS !== "false",
      excludePaths: process.env.ERROR_404_EXCLUDE_PATHS?.split(",").map((path: string) => path.trim()) || defaultExcludePaths,
      excludeUserAgents: process.env.ERROR_404_EXCLUDE_USER_AGENTS?.split(",").map((ua: string) => ua.trim()) || defaultExcludeUserAgents,
    },
  };
};

export const shouldExcludeFromMonitoring = (
  pathname: string,
  userAgent: string | null,
  config: Monitor404Config
): boolean => {
  // Check if monitoring is disabled
  if (!config.enabled) return true;

  // Check excluded paths
  if (config.monitoring.excludePaths.some((path) => pathname.startsWith(path))) {
    return true;
  }

  // Check excluded user agents
  if (userAgent && config.monitoring.excludeUserAgents.some((ua) => 
    userAgent.toLowerCase().includes(ua.toLowerCase())
  )) {
    return true;
  }

  return false;
}; 