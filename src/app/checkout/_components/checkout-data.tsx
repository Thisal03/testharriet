import { JSX } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z
      .string()
      .min(1, "Zip code is required")
      .max(6, "Zip code must be 6 digits or less"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    note: z.string().optional(),
    shippingDifferent: z.boolean(),
    shippingfirstName: z.string().optional(),
    shippinglastName: z.string().optional(),
    shippingphone: z.string().optional(),
    shippingcompanyName: z.string().optional(),
    shippingaddress: z.string().optional(),
    shippingcity: z.string().optional(),
    shippingstate: z.string().optional(),
    shippingcountry: z.string().optional(),
    shippingzipCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.shippingDifferent) {
      if (!data.shippingfirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingfirstName"],
          message: "First name is required",
        });
      }
      if (!data.shippinglastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippinglastName"],
          message: "Last name is required",
        });
      }
      if (!data.shippingaddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingaddress"],
          message: "Address is required",
        });
      }
      if (!data.shippingcity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingcity"],
          message: "City is required",
        });
      }
      if (!data.shippingcountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingcountry"],
          message: "Country is required",
        });
      }
      if (!data.shippingstate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingstate"],
          message: "State is required",
        });
      }
      if (!data.shippingzipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingzipCode"],
          message: "Zip code is required",
        });
      }
      if (!data.shippingphone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingphone"],
          message: "Phone is required",
        });
      }
    }
  });

export type FormValues = z.infer<typeof formSchema>;

export interface PaymentMethod {
  id: string;
  title: string;
  description: string | JSX.Element;
  icon: string;
  extraIcons?: { src: string; alt: string; width: number; height: number }[];
}

export const staticPaymentMethods: PaymentMethod[] = [
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay with cash upon delivery.",
    icon: "https://images.harrietshopping.com/front-web/icons/cash-on-delivery.png",
  },
  {
    id: "bacs",
    title: "Bank Transfer",
    description: (
      <>
        Account Name: Harriet Shopping (Pvt) Ltd
        <br />
        Account Number: <b>003910008829</b>
        <br />
        Bank: Sampath Bank
        <br />
        Branch: Malabe
        <br />
        <br />
        Make Your Payment Directly Into Our Bank Account. Please Use Your Order
        ID As The Payment Reference. Your Order Will Not Be Shipped Until The
        Funds Have Cleared In Our Account.
      </>
    ),
    icon: "https://images.harrietshopping.com/front-web/icons/money-exchange.png",
  },
  {
    id: "card",
    title: "Credit/Debit Card Payment",
    description: "Pay with your credit or debit card.",
    icon: "https://images.harrietshopping.com/front-web/icons/secure-payment.png",
    extraIcons: [
      {
        src: "https://images.harrietshopping.com/front-web/icons/payments/mastercard.svg",
        alt: "Mastercard Icon",
        width: 34,
        height: 20,
      },
      {
        src: "https://images.harrietshopping.com/front-web/icons/payments/visa.svg",
        alt: "Visa Icon",
        width: 48,
        height: 20,
      },
      {
        src: "https://images.harrietshopping.com/front-web/icons/payments/american-express.svg",
        alt: "American-Express Icon",
        width: 40,
        height: 28,
      },
      {
        src: "https://images.harrietshopping.com/front-web/icons/payments/jcb.svg",
        alt: "JCB Icon",
        width: 30,
        height: 20,
      },
    ],
  },
  {
    id: "mintpay",
    title: "Mintpay | Shop Now. Pay Later",
    description: "Pay with your mintpay account.",
    icon: "https://images.harrietshopping.com/front-web/icons/secure-payment.png",
    extraIcons: [
      {
        src: "https://images.harrietshopping.com/front-web/images/logos/mintpay logo.png",

        alt: "Mintpay Icon",
        width: 80,
        height: 30,
      },
    ],
  },
];

export const TABS = [
  { name: "Information", value: "information" },
  { name: "Payment", value: "payment" },
  { name: "Confirmation", value: "confirmation" },
];
