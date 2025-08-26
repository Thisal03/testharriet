import { QueryKey } from "@tanstack/react-query";

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
};

export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  on_sale?: boolean;
};

export type CatQueryOptionsType = {
  productIds?: any[];
  text?: string;
  slug: string;
  categories?: string[];
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
  page?: number;
  perPage?: number;
  minPrice?: number;
  maxPrice?: number;
  sortOption?: string;
  stock_status?: string;
};

export type CatQueryStatusOptionsType = {
  productIds?: any[];
  text?: string;
  slug: string;
  categories?: string[];
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
  sortOption?: string;
  stock_status?: string;
  perPage?: number;
  page?: number;
};

export type VendorQueryOptionsType = {
  productIds?: any[];
  enabled?: boolean;
  id?: string | number;
  text?: string;
  slug?: string;
  store_name?: string;
  categories?: string[];
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
  page?: number;
  perPage?: number;
  minPrice?: number;
  maxPrice?: number;
};

export type QueryOptionsType = {
  productIds?: any[];
  text?: string;
  categories?: string[];
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
  page?: number;
  perPage?: number;
  sort?: string;
  sortOption?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export type Attachment = {
  url: any;
  id: string | number;
  thumbnail: string;
  original: string;
  src?: string;
  height: string | "100%";
  width: "100%";
  name: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  details?: string;
  image?: string;
  display: string;
  tags?: Tag[];
  products?: Product[];
  count?: number;
};

export type CategorySeo = {
  id: number;
  slug: string;
  name: string;
  description: string;
  rank_math: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
  image?: any;
};

export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  images?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};

export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};

export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};

export type Attributes = {
  id: string | number;
  name: string;
  slug: string;
  options: string[];
};

export type Meta = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  short_description?: string;
  rank_math: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    social_image: string;
  };
  image?: any;
};

export interface FilterCategory {
  count: number;
  description: string;
  filter: string;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  term_group: number;
  term_id: number;
  term_taxonomy_id: number;
}

export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: string;
  stock_quantity: number;
  type: string;
  sale_price?: string;
  regular_price?: string;
  date_on_sale_from: Date;
  date_on_sale_to: Date;
  stock_status: string;
  images?: Attachment[];
  sku?: string;
  date_created?: Date;
  attributes: {
    id: number;
    name: string;
    slug: string;
    options: string[];
  }[];
  categories?: Category[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  meta?: any[];
  meta_data?: any[];
  description?: string;
  related_ids?: number[];
  cross_sell_ids?: number[];
  short_description?: string;
  variations?: Variation[];
  [key: string]: unknown;
  featured: boolean;
  on_sale: boolean[];
  store: {
    name: string;
    id: number;
    slug: string;
    shop_name: string;
    enabled: boolean;
    featured: boolean;
  };
  stores: {
    id: number;
    slug: string;
    shop_name: string;
  };
};

export type ShippingTotal = {
  store: any;
  id: number | string;
  instance_id: number;
  title: string;
  enabled: boolean;
  method_id: string;
  method_title: string;
  order?: number;
  settings: {
    cost: {
      id: number | string;
      value: number;
    };
  };
}[];

export type PaymentMethod = {
  id: number | string;
  method_id: string;
  method_title: string;
  title: string;
  order: number;
  description: string;
  enabled: boolean;
  settings: {
    title: {
      id: number | string;
      value: number;
      default: string;
    };
    liveurl: {
      value: string;
      default: string;
    };
  };
}[];

export type Related = {
  id: number;
  name: string;
  price: string;
};

export type Variation = {
  id: number | string;
  name: string;
  slug: string;
  price: string;
  quantity: number;
  type: string;
  sale_price?: string;
  regular_price?: string;
  parent_id: number;
  stock_status?: string;
  stock_quantity?: number;
  image: Attachment;
  date_on_sale_from?: Date;
  date_on_sale_to?: Date;
  sku?: string;
  attributes: {
    id: number;
    name: string;
    slug: string;
    option: string;
  }[];
  categories?: Category[];
  manage_stock?: boolean;
  tags: {
    id: number;
  };
};

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export interface Shop {
  id: number;
  store_name: string;
  first_name: string;
  last_name: string;
  social: {
    fb: string;
    twitter: string;
    pinterest: string;
    linkedin: string;
    youtube: string;
    instagram: string;
    flickr: string;
    threads: string;
  };
  show_email: boolean;
  location: string;
  banner: string;
  banner_id: number;
  gravatar: string;
  gravatar_id: number;
  shop_url: string;
  toc_enabled: boolean;
  store_toc: string;
  featured: boolean;
  rating: {
    rating: string;
    count: number;
  };
  enabled: boolean;
  registered: string;
  payment: string;
  trusted: boolean;
  store_open_close: {
    enabled: boolean;
    time: any[];
    open_notice: string;
    close_notice: string;
  };
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  _links: {
    self: {
      href: string;
      targetHints: {
        allow: string[];
      };
    }[];
    collection: {
      href: string;
    }[];
  };
}

export type Coupon = {
  id: string | number;
  code: string;
  amount: string;
  status: string;
  discount_type: string;
  date_expires: string;
  meta_data: {
    key: string;
    value: string;
  };
  product_categories: number[];
}[];
