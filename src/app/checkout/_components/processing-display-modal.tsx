"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import animationData from "../../../../public/assets/GIF/Payment-Loading.json";

const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });

const ProcessingDisplayModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="font-semibold text-center capitalize md:pt-4 md:text-lg">
            {open
              ? "Please hold on while we process.."
              : "Order placed successfully"}
          </DialogTitle>
        </DialogHeader>
        <div>
          <DynamicLottie animationData={animationData} loop autoplay />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingDisplayModal;
