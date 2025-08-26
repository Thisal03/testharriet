import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UpsellSection = ({ isBankTransfer }: { isBankTransfer: boolean }) => {
  const whatsappLink = "https://whatsapp.com/channel/0029VabgXoqDjiOZsDvwKF2K";
  const reviewLink =
    "https://www.google.com/search?q=harrietshopping&oq=harrietshopping+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgNGIAEMgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMzQyNWoxajSoAgCwAgE&sourceid=chrome&ie=UTF-8#lrd=0x3ae2f95dc2398c7d:0xa3119d46a4cc4d69,3,,,,";

  return (
    <div>
      {/* Combined Engagement Section */}
      <div
        className={cn(
          "mt-8 md:mt-16 grid grid-cols-1 gap-6",
          !isBankTransfer ? "md:grid-cols-2" : ""
        )}
      >
        {/* WhatsApp Channel Card */}
        <div className="w-full p-6 mx-auto text-center border border-green-100 bg-green-50 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="p-3 mb-4 bg-green-500 rounded-full">
              <Image
                src="https://images.harrietshopping.com/front-web/icons/whatsapp-icon.png"
                width={24}
                height={24}
                alt="WhatsApp Icon"
                className="text-white"
              />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-800">
              Stay Updated with WhatsApp
            </h3>
            <p className="mb-4 text-gray-600">
              Join our channel for exclusive offers and order updates
            </p>
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center px-6 py-2 font-medium text-white transition-colors bg-green-500 rounded-full hover:bg-green-600">
                Join WhatsApp Channel
              </Button>
            </Link>
          </div>
        </div>

        {/* Review Offer Card (for non-BACS) */}
        {!isBankTransfer && (
          <div className="w-full p-6 mx-auto text-center border border-yellow-100 bg-yellow-50 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="p-3 mb-4 bg-yellow-400 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-yellow-800">
                Get 10% Off Your Next Order!
              </h3>
              <p className="mb-4 text-yellow-700">
                Review us on Google and share the screenshot on WhatsApp to
                unlock your discount
              </p>
              <div className="flex gap-3">
                <Link
                  href={reviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="px-4 py-2 font-medium text-white transition-colors bg-yellow-500 rounded-full hover:bg-yellow-600">
                    Leave Review
                  </Button>
                </Link>
                <Link
                  href="https://wa.me/94776066026"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="px-4 py-2 font-medium text-yellow-600 border-yellow-500 rounded-full  hover:bg-yellow-50"
                  >
                    Share on WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpsellSection;
