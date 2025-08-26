export interface OrderResponse {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: Date;
  date_modified: Date;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: Ing;
  shipping: Ing;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: null;
  date_paid: null;
  cart_hash: string;
  number: string;
  meta_data: WelcomeMetaDatum[];
  line_items: LineItem[];
  tax_lines: any[];
  shipping_lines: ShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: Date;
  date_modified_gmt: Date;
  date_completed_gmt: null;
  date_paid_gmt: null;
  email: string;
  final_amount: string;
  currency_symbol: string;
  stores: Store[];
  store: Store;
  _links: Links;
}

interface Links {
  self: Self[];
  collection: Collection[];
  email_templates: EmailTemplate[];
}

interface Collection {
  href: string;
}

interface EmailTemplate {
  embeddable: boolean;
  href: string;
}

interface Self {
  href: string;
  targetHints: TargetHints;
}

interface TargetHints {
  allow: string[];
}

interface Ing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone: string;
}

interface LineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: LineItemMetaDatum[];
  sku: string;
  price: number;
  image: Image;
  parent_name: null;
}

interface Image {
  id: string;
  src: string;
}

interface LineItemMetaDatum {
  id: number;
  key: string;
  value: string;
  display_key: string;
  display_value: string;
}

interface WelcomeMetaDatum {
  id: number;
  key: string;
  value: string;
}

interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  tax_status: string;
  meta_data: LineItemMetaDatum[];
}

interface Store {
  id: number;
  name: string;
  shop_name: string;
  url: string;
  address: Address;
}

interface Address {
  street_1: string;
  street_2: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}
