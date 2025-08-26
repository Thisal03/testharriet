"use client";
import { Product } from "@/framework/basic-rest/types";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo, useCallback } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookMessenger,
  FaInstagram,
  FaLink,
} from "react-icons/fa";

export const SocialSharing = ({
  data,
  isLoading,
}: {
  data?: Product;
  isLoading?: boolean;
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const currentUrl = useMemo(
    () => `https://web.harrietshopping.com/product/${data?.slug}`,
    [data]
  );
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  }, [currentUrl]);
  return (
    <div className="py-6 border-b border-gray-300">
      <h3 className="pb-2 text-sm">Share this product:</h3>
      <div className="flex space-x-2">
        {[
          {
            icon: FaFacebookF,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`,
            color: "bg-blue-600",
          },
          {
            icon: FaLinkedinIn,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              currentUrl
            )}`,
            color: "bg-blue-700",
          },
          {
            icon: FaWhatsapp,
            url: `https://wa.me/?text=${encodeURIComponent(
              `Check out this product: ${currentUrl}`
            )}`,
            color: "bg-green-500",
          },
          {
            icon: FaFacebookMessenger,
            url: `https://www.messenger.com/t/?link=${encodeURIComponent(
              currentUrl
            )}`,
            color: "bg-blue-800",
          },
          {
            icon: FaInstagram,
            url: `https://www.instagram.com/`,
            color: "bg-gradient-to-r from-pink-500 to-purple-500",
          },
        ].map((social, index) => (
          <motion.a
            key={index}
            href={!isLoading ? social.url : undefined}
            target={!isLoading ? "_blank" : undefined}
            rel={!isLoading ? "noopener noreferrer" : undefined}
            whileHover={{ scale: 1.1 }}
            className={`flex items-center justify-center p-2 text-white rounded-full ${social.color}`}
          >
            <social.icon className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" />
          </motion.a>
        ))}

        <motion.button
          onClick={copyToClipboard}
          disabled={isLoading}
          onContextMenu={(e) => {
            e.preventDefault();
            copyToClipboard();
          }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center p-2 text-white bg-gray-400 rounded-full cursor-pointer"
        >
          <FaLink className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" />
        </motion.button>
      </div>

      <AnimatePresence>
        {copySuccess && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-2 text-xs text-gray-600"
          >
            Link copied!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
