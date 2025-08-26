import { SESClient } from "@aws-sdk/client-ses";

const REGION = process.env.NEXT_PUBLIC_REGION as string;
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY as string,
  },
});

export { sesClient };
