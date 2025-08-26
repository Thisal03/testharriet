"use client";

import { staticPaymentMethods } from "./checkout-data";
import { PaymentMethodCard } from "./payment-method";

interface PaymentMethodsProps {
  selectedMethodId: string | null;
  onSelectMethod: (methodId: string) => void;
  shouldShowMintpay: boolean;
}

export const PaymentMethods = ({
  selectedMethodId,
  onSelectMethod,
  shouldShowMintpay,
}: PaymentMethodsProps) => {
  const filteredMethods = shouldShowMintpay
    ? staticPaymentMethods
    : staticPaymentMethods.filter((method) => method.id !== "mintpay");

  return (
    <div className="space-y-5">
      {filteredMethods.map((method) => (
        <div key={method.id}>
          <PaymentMethodCard
            method={method}
            isSelected={selectedMethodId === method.id}
            onSelect={() => onSelectMethod(method.id)}
          />
        </div>
      ))}
    </div>
  );
};
