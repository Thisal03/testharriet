import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";
import { Attribute } from "./generate-cart-item";

export function generateCartItemName(
  name: string,
  attributes: Attribute[] | undefined
) {
  if (!isEmpty(attributes)) {
    const sortedAttributes = orderBy(attributes);
    // return `${name} - ${sortedAttributes.join(", ")}`;
    return name;
  }
  return name;
}
