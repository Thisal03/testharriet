"use client";

import { useFormContext } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ContactInformation } from "./contact-information";
import { AddressForm } from "./address-form";
import { useShallowCartStore } from "@/store/use-cart-store";
import { Separator } from "@/components/ui/separator";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

interface InformationTabProps {
  onSubmit: () => void;
  loading: boolean;
}

export const InformationTab = ({ onSubmit, loading }: InformationTabProps) => {
  const { control, watch } = useFormContext();
  const { items, isEmpty } = useShallowCartStore((state) => ({
    items: state.items,
    isEmpty: state.isEmpty,
  }));
  const shippingDifferent = watch("shippingDifferent");
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contentIds = items.map((item) => item.id);
    const value = items
      .reduce((total, item) => total + item.price * (item.quantity ?? 1), 0)
      .toFixed(2);
    const numItems = items.reduce(
      (total, item) => total + (item.quantity ?? 1),
      0
    );
    const contents = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    const clickId = searchParams.get("fbclid");
    const eventId = "_" + Math.random().toString(36).substr(2, 9);
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    sendGTMEvent({
      event: "initiate_checkout",
      content_id: contentIds,
      contents: contents,
      currency: "LKR",
      content_price: parseFloat(value),
      content_quantity: numItems,
      browser_id: fbp,
      click_id: clickId,
      event_id: eventId,
      fbp,
      fbc,
    });
    sessionStorage.setItem(
      "pixelEventData",
      JSON.stringify({
        value: parseFloat(value.replace(/[^0-9.]/g, "")),
        content_ids: contentIds,
        num_items: numItems,
        content_type: "product_group",
        currency: "LKR",
        contents: contents,
        browser_id: fbp,
        click_id: clickId,
        event_id: eventId,
        fbp,
        fbc,
      })
    );
    onSubmit();
  };

  return (
    <Card className="p-4 rounded-lg shadow-none md:p-6">
      <ContactInformation />
      <Separator />

      <AddressForm hidePhone title="Billing Address" />

      <FormField
        control={control}
        name="shippingDifferent"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="font-normal">
              Ship to a different address?
            </FormLabel>
          </FormItem>
        )}
      />

      {shippingDifferent && (
        <AddressForm prefix="shipping" title="Shipping Address" />
      )}

      <FormField
        control={control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Order Notes (optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Special instructions for your order..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          className="p-6 rounded-sm "
          disabled={isEmpty || loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Redirecting...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </div>
    </Card>
  );
};
