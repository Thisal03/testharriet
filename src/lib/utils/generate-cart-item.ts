import { Attachment, Product, Variation } from "@/framework/basic-rest/types";

export interface Attribute {
  name: string;
  slug: string;
  options: string;
}
export interface Variations {
  id: number;
  parent_id: number;
  name: string;
  sale_price?: number;
  price: number;
}
export interface CartItem {
  id: string | number;
  name: string;
  slug: string;
  images: Attachment[];
  price: number;
  sale_price?: number;
  attributes?: Attribute[];
  variations?: Variations[];
  store: {
    id: number;
    name: string;
    store_name: string;
  };
  categories?: {
    id: number;
    name: string;
  }[];
  quantity: number;
  sku?: string;
  regular_price?: string;
  product: Product;
}
export function generateCartItem(
  product: Product,
  attributes: Attribute[],
  variations: Variations[],
  selectedVariation?: Variation
): CartItem {
  const {
    id,
    name,
    slug,
    images = [],
    store,
    categories,
    regular_price,
    sku,
  } = product;

  const formattedStore = {
    id: store.id,
    name: store.name || "",
    store_name: store.shop_name || "",
  };

  const formattedVariations: Variations[] = variations.map((variation) => ({
    id: Number(variation.id),
    parent_id: Number(variation.parent_id),
    name: variation.name,
    price: variation.price,
  }));

  const isOnSale = (prod: Product | Variation | null) => {
    if (!prod) return false;
    const currentDate = new Date();
    const startDate = prod.date_on_sale_from
      ? new Date(prod.date_on_sale_from)
      : null;
    const endDate = prod.date_on_sale_to
      ? new Date(prod.date_on_sale_to)
      : null;

    if (!startDate && !endDate) return false;
    if (!startDate && endDate) return currentDate <= endDate;
    if (startDate)
      return currentDate >= startDate && (!endDate || currentDate <= endDate);
    return false;
  };

  const price = selectedVariation
    ? isOnSale(selectedVariation)
      ? selectedVariation.price
      : selectedVariation.regular_price
    : isOnSale(product)
    ? product.price
    : product.regular_price;

  const numericPrice = parseFloat(price || "");

  return {
    id: id,
    name,
    slug,
    images,
    sku: sku,
    quantity: 1,
    regular_price: selectedVariation?.regular_price ?? regular_price,
    price: numericPrice,
    attributes,
    variations: formattedVariations,
    store: formattedStore,
    categories: categories ? [...categories] : [],
    product,
  };
}
