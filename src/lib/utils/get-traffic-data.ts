import { ReadonlyURLSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

interface TrafficData {
  trafficType: string;
  medium: string;
  source: string | null;
}

export function useTrafficCapture() {
  const captureTrafficData = (searchParams: ReadonlyURLSearchParams) => {
    try {
      const query = Object.fromEntries(searchParams);

      const referrer = document?.referrer || "";
      const host = window?.location?.hostname || "";
      const sessionEntry = window?.location?.href || "";

      const trafficData = analyzeTrafficSource(
        query,
        sessionEntry,
        referrer,
        host
      );

      // Cookie options
      const cookieOptions = {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: true,
        sameSite: "lax" as const,
      };

      setCookie("utm_source", query.utm_source, cookieOptions);
      setCookie("utm_medium", query.utm_medium, cookieOptions);
      setCookie("utm_campaign", query.utm_campaign, cookieOptions);
      setCookie("utm_term", query.utm_term, cookieOptions);
      setCookie("utm_content", query.utm_content, cookieOptions);
      setCookie("utm_referrer", referrer, cookieOptions);
      setCookie("traffic_type", trafficData.trafficType, cookieOptions);
      setCookie("utm_session_entry", sessionEntry, cookieOptions);

      if (trafficData.source) {
        setCookie("utm_source", trafficData.source, cookieOptions);
      }

      if (trafficData.trafficType !== "typein" && trafficData.medium) {
        setCookie("utm_medium", trafficData.medium, cookieOptions);
      }

      return trafficData;
    } catch (error) {
      console.error("Error capturing traffic data:", error);
      return null;
    }
  };

  return { captureTrafficData };
}

function analyzeTrafficSource(
  query: any,
  sessionEntry: string,
  referrer: string,
  host: string
): TrafficData {
  if (hasCampaignParameters(query)) {
    return {
      trafficType: "utm",
      medium: query.utm_medium || "paid",
      source: query.utm_source,
    };
  }

  const socialData = detectSocialSource(sessionEntry, referrer);
  if (socialData) {
    return {
      trafficType: "social",
      medium: "social",
      source: socialData,
    };
  }

  if (isSearchEngineTraffic(referrer)) {
    return {
      trafficType: "organic",
      medium: "organic",
      source: extractSearchEngine(referrer),
    };
  }

  if (referrer && !referrer.includes(host)) {
    try {
      return {
        trafficType: "referral",
        medium: "referral",
        source: new URL(referrer).hostname,
      };
    } catch {
      return {
        trafficType: "typein",
        medium: "",
        source: null,
      };
    }
  }

  return {
    trafficType: "typein",
    medium: "",
    source: null,
  };
}

function hasCampaignParameters(query: any): boolean {
  return !!(query.utm_source || query.utm_medium || query.utm_campaign);
}

function detectSocialSource(url: string, referrer: string): string | null {
  try {
    if (url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      for (const [key] of urlParams.entries()) {
        if (key.toLowerCase().includes("clid")) {
          return key
            .toLowerCase()
            .replace(/[^a-z]/g, "")
            .replace("clid", "");
        }
      }
    }

    if (referrer) {
      const refDomain = new URL(referrer).hostname.toLowerCase();
      const socialMatch = refDomain.match(
        /(?:facebook|instagram|linkedin|twitter|tiktok|pinterest|youtube|reddit|tumblr|snapchat|whatsapp|telegram|medium|quora|vimeo|weibo|line|kakao|vk)/
      );
      return socialMatch ? socialMatch[0] : null;
    }
  } catch {
    return null;
  }
  return null;
}

function isSearchEngineTraffic(referrer: string): boolean {
  if (!referrer) return false;
  const searchEngines = [
    "google",
    "bing",
    "yahoo",
    "yandex",
    "baidu",
    "duckduckgo",
    "ecosia",
    "qwant",
    "startpage",
    "searx",
  ];
  return searchEngines.some((engine) =>
    referrer.toLowerCase().includes(engine)
  );
}

function extractSearchEngine(referrer: string): string {
  try {
    const domain = new URL(referrer).hostname.toLowerCase();
    return (
      domain
        .split(".")
        .find((part) =>
          [
            "google",
            "bing",
            "yahoo",
            "yandex",
            "baidu",
            "duckduckgo",
            "ecosia",
            "qwant",
            "startpage",
            "searx",
          ].includes(part)
        ) || domain
    );
  } catch {
    return "unknown";
  }
}

interface CookieSetters {
  setUtmSource: (value: string, options?: any) => void;
  setUtmMedium: (value: string, options?: any) => void;
  setUtmCampaign: (value: string, options?: any) => void;
  setUtmTerm: (value: string, options?: any) => void;
  setUtmContent: (value: string, options?: any) => void;
  setUtmReferrer: (value: string, options?: any) => void;
  setTrafficType: (value: string, options?: any) => void;
  setUtmSessionEntry: (value: string, options?: any) => void;
}

function setCookies(
  trafficData: TrafficData,
  query: any,
  referrer: string,
  sessionEntry: string,
  setters: CookieSetters
) {
  const cookieOptions = {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    secure: true,
    sameSite: "lax" as const,
  };

  if (query.utm_source) setters.setUtmSource(query.utm_source, cookieOptions);
  if (query.utm_medium) setters.setUtmMedium(query.utm_medium, cookieOptions);
  if (query.utm_campaign)
    setters.setUtmCampaign(query.utm_campaign, cookieOptions);
  if (query.utm_term) setters.setUtmTerm(query.utm_term, cookieOptions);
  if (query.utm_content)
    setters.setUtmContent(query.utm_content, cookieOptions);

  setters.setUtmReferrer(referrer, cookieOptions);
  setters.setTrafficType(trafficData.trafficType, cookieOptions);
  setters.setUtmSessionEntry(sessionEntry, cookieOptions);

  if (trafficData.source) {
    setters.setUtmSource(trafficData.source, cookieOptions);
  }

  if (trafficData.trafficType !== "typein" && trafficData.medium) {
    setters.setUtmMedium(trafficData.medium, cookieOptions);
  }
}
