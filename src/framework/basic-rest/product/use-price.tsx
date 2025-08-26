import { useMemo } from "react";

function parsePriceValue(value: string): number {
  // Parse the string as a float
  return parseFloat(value);
}

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: string;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatCurrency.format(parsePriceValue(amount));
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: string;
  amount: string;
  currencyCode: string;
  locale: string;
}) {
  const numericBaseAmount = parsePriceValue(baseAmount);
  const hasDiscount = numericBaseAmount > parsePriceValue(amount);
  const formatDiscount = new Intl.NumberFormat(locale, { style: "percent" });
  const discount = hasDiscount
    ? formatDiscount.format(
        (numericBaseAmount - parsePriceValue(amount)) / numericBaseAmount
      )
    : null;

  const price = formatPrice({ amount, currencyCode, locale });
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null;

  const regular_amount = formatPrice({
    amount: baseAmount,
    currencyCode,
    locale,
  });

  return { price, basePrice, discount, regular_amount };
}

export default function usePrice(
  data?: {
    price: string;
    amount: string;
    baseAmount?: string;
    currencyCode: string;
  } | null
) {
  const { amount, baseAmount, currencyCode } = data ?? {};
  const locale = "en"; // or whatever your default locale is
  const value = useMemo(() => {
    if (typeof amount !== "string" || !currencyCode) return "";

    const numericBaseAmount = baseAmount
      ? parsePriceValue(baseAmount)
      : undefined;

    return numericBaseAmount !== undefined
      ? formatVariantPrice({
          amount,
          baseAmount: numericBaseAmount.toString(),
          currencyCode,
          locale,
        })
      : formatPrice({ amount, currencyCode, locale });
  }, [amount, baseAmount, currencyCode]);

  return typeof value === "string"
    ? { price: value, basePrice: null, discount: null, regular_amount: null }
    : value;
}
