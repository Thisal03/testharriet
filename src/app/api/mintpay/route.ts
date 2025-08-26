import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      merchantId,
      orderId,
      total_price,
      discount,
      customer_email,
      customer_id,
      customer_telephone,
      ip,
      x_forwarded_for,
      delivery_street,
      delivery_region,
      delivery_postcode,
      cart_created_date,
      cart_updated_date,
      success_url,
      fail_url,
      products,
    } = await request.json();

    const headers = {
      Authorization: `Token ${process.env.NEXT_PUBLIC_MINTPAY_SECRET}`,
      "Content-Type": "application/json",
    };

    const apiUrl = process.env.NEXT_PUBLIC_MINTPAY_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { message: "API URL is not set" },
        { status: 500 }
      );
    }

    const paymentData = {
      merchant_id: merchantId,
      order_id: orderId,
      total_price,
      discount,
      customer_email,
      customer_id,
      customer_telephone,
      ip,
      x_forwarded_for,
      delivery_street,
      delivery_region,
      delivery_postcode,
      cart_created_date,
      cart_updated_date,
      success_url,
      fail_url,
      products,
    };

    const response = await axios.post(apiUrl, paymentData, { headers });
    const data = response.data;

    if (data && data.message === "Success" && data.data) {
      return NextResponse.json({ purchase_id: data.data });
    } else {
      return NextResponse.json(
        {
          message: `Unexpected response format: ${JSON.stringify(data)}`,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(
      "Error during MintPay API request:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { message: "Error initiating payment" },
      { status: 500 }
    );
  }
}
