"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormValues,
  PaymentMethod,
  staticPaymentMethods,
} from "./checkout-data";
import { AddressSummary } from "./address-summary";
import { PaymentMethods } from "./payment-methods";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentTabProps {
  onPlaceOrder: (paymentMethod: PaymentMethod) => void;
  loading: boolean;
  shouldUseMintpayVendor: () => boolean;
  errorMessage: string | null;
}

export const PaymentTab = ({
  onPlaceOrder,
  loading,
  errorMessage,
  shouldUseMintpayVendor,
}: PaymentTabProps) => {
  const { watch } = useFormContext<FormValues>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const data = watch();

  const handlePaymentMethodSelect = (methodId: string) => {
    const selectedMethod = staticPaymentMethods.find(
      (method) => method.id === methodId
    );
    if (selectedMethod) {
      setSelectedMethod(selectedMethod);
    }
  };

  return (
    <div>
      <AddressSummary
        title="Deliver to:"
        data={{
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          zipCode: data.zipCode,
        }}
        showEmail
      />

      <AddressSummary
        title="Shipping Address"
        data={{
          firstName: data.shippingDifferent
            ? data.shippingfirstName
            : data.firstName,
          lastName: data.shippingDifferent
            ? data.shippinglastName
            : data.lastName,
          phone: data.shippingDifferent ? data.shippingphone : data.phone,
          address: data.shippingDifferent ? data.shippingaddress : data.address,
          city: data.shippingDifferent ? data.shippingcity : data.city,
          state: data.shippingDifferent ? data.shippingstate : data.state,
          country: data.shippingDifferent ? data.shippingcountry : data.country,
          zipCode: data.shippingDifferent ? data.shippingzipCode : data.zipCode,
          note: data.note,
        }}
      />

      <Card className="mb-10">
        <CardContent>
          <div className="flex flex-col space-y-4 md:mb-2">
            <h2 className="pb-2 mb-5 text-xl font-semibold text-center border-b border-gray-300 md:text-left md:text-2xl text-heading">
              Payment Methods
            </h2>
            <PaymentMethods
              selectedMethodId={selectedMethod?.id || ""}
              onSelectMethod={handlePaymentMethodSelect}
              shouldShowMintpay={shouldUseMintpayVendor()}
            />
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">
                {errorMessage}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="p-6 rounded-sm"
          disabled={!selectedMethod || loading}
          onClick={() => selectedMethod && onPlaceOrder(selectedMethod)}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please Wait...
            </>
          ) : selectedMethod?.id === "cod" || selectedMethod?.id === "bacs" ? (
            "Place Order"
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </div>
    </div>
  );
};
