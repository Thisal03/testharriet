"use server";

import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./ses-client";

interface EmailParams {
  Source: string;
  Destination: {
    ToAddresses: string[];
  };
  Message: {
    Subject: { Data: string };
    Body: { Html?: { Data: string }; Text?: { Data: string } };
  };
}

const sendMail = async (params: EmailParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    sesClient.send(new SendEmailCommand(params), (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export { sendMail };
