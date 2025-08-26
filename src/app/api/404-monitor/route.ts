import { NextRequest, NextResponse } from "next/server";
import { capture404Error } from "@/lib/404-monitor";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      url, 
      config, 
      referer, 
      userAgent, 
      pathname, 
      slug, 
      errorType, 
      httpStatus 
    } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    await capture404Error(url, config, { 
      referer, 
      userAgent, 
      pathname, 
      slug, 
      errorType, 
      httpStatus 
    });

    return NextResponse.json(
      { success: true, message: "404 error captured and notification sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in 404 monitor API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint
  return NextResponse.json(
    { 
      status: "healthy", 
      message: "404 monitor API is running",
      features: {
        email: process.env.ENABLE_404_EMAIL_NOTIFICATIONS === "true",
        slack: process.env.NEXT_PUBLIC_ENABLE_404_SLACK_NOTIFICATIONS === "true"
      }
    },
    { status: 200 }
  );
} 