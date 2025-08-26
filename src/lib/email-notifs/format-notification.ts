import { OrderResponse } from "../order-response";

export const formatPaymentNotification = ({
  orderData: order,
  systemInfo,
}: {
  orderData: OrderResponse;
  systemInfo: Record<string, any>;
}) => {
  const formattedDate = new Date(order.date_created).toLocaleString();
  const orderTotal = `${order.currency_symbol} ${order.total}`;

  // Format line items
  const lineItemsHtml = order.line_items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">
        <img src="${item.image?.src || ""}" alt="${
        item.name
      }" width="50" style="vertical-align:middle; margin-right:10px;">
        ${item.name} (${item.sku || "No SKU"})
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${
        item.quantity
      }</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${
        order.currency_symbol
      } ${item.price}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${
        order.currency_symbol
      } ${item.total}</td>
    </tr>
  `
    )
    .join("");

  // Format system info
  const systemInfoHtml = Object.entries(systemInfo)
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${key}:</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td>
      </tr>
    `
    )
    .join("");

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom: 1px solid #ddd; }
        .content { padding: 20px; }
        .section { margin-bottom: 25px; border: 1px solid #eee; border-radius: 5px; overflow: hidden; }
        .section-title { background-color: #f0f0f0; padding: 10px 15px; font-weight: bold; border-bottom: 1px solid #ddd; }
        .section-content { padding: 15px; }
        .order-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .order-table th { background-color: #f8f8f8; text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
        .order-table td { padding: 10px; border-bottom: 1px solid #ddd; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 8px; border-bottom: 1px solid #eee; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 0.9em; color: #777; }
        .status-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 0.8em;
          font-weight: bold;
          margin-left: 10px;
        }
        .status-pending { background-color: #fff3cd; color: #856404; }
        .status-processing { background-color: #cce5ff; color: #004085; }
        .status-completed { background-color: #d4edda; color: #155724; }
        .technical { background-color: #f9f9f9; }
        .technical .section-title { background-color: #e9e9e9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Order Notification</h2>
          <p>Order #${order.number} | ${formattedDate}</p>
          <span class="status-badge status-${order.status.toLowerCase()}">Status: ${
    order.status
  }</span>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Customer Information</div>
            <div class="section-content">
              <p><strong>Name:</strong> ${order.billing.first_name} ${
    order.billing.last_name
  }</p>
              <p><strong>Email:</strong> ${order.billing.email}</p>
              <p><strong>Phone:</strong> ${order.billing.phone}</p>
              <p><strong>Address:</strong><br>
                ${order.billing.address_1}<br>
                ${
                  order.billing.address_2
                    ? order.billing.address_2 + "<br>"
                    : ""
                }
                ${order.billing.city}, ${order.billing.state}<br>
                ${order.billing.postcode}, ${order.billing.country}
              </p>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Order Summary</div>
            <div class="section-content">
              <table class="order-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Price</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${lineItemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="text-align: right; font-weight: bold;">Subtotal:</td>
                    <td style="text-align: right;">${orderTotal}</td>
                  </tr>
                  ${
                    order.shipping_total !== "0.00"
                      ? `
                  <tr>
                    <td colspan="3" style="text-align: right; font-weight: bold;">Shipping (${
                      order.shipping_lines[0]?.method_title || "Standard"
                    }):</td>
                    <td style="text-align: right;">${order.currency_symbol} ${
                          order.shipping_total
                        }</td>
                  </tr>
                  `
                      : ""
                  }
                  ${
                    order.discount_total !== "0.00"
                      ? `
                  <tr>
                    <td colspan="3" style="text-align: right; font-weight: bold;">Discount:</td>
                    <td style="text-align: right;">-${order.currency_symbol} ${order.discount_total}</td>
                  </tr>
                  `
                      : ""
                  }
                  <tr>
                    <td colspan="3" style="text-align: right; font-weight: bold;">Total:</td>
                    <td style="text-align: right; font-weight: bold;">${orderTotal}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Payment Information</div>
            <div class="section-content">
              <p><strong>Method:</strong> ${order.payment_method_title}</p>
              <p><strong>Transaction ID:</strong> ${
                order.transaction_id || "Pending"
              }</p>
              <p><strong>Payment Status:</strong> ${
                order.date_paid
                  ? "Paid on " + new Date(order.date_paid).toLocaleString()
                  : "Pending"
              }</p>
            </div>
          </div>
          
          ${
            order.store
              ? `
          <div class="section">
            <div class="section-title">Store Information</div>
            <div class="section-content">
              <p><strong>Store:</strong> ${order.store.name}</p>
              <p><strong>Address:</strong><br>
                ${order.store.address.street_1}<br>
                ${
                  order.store.address.street_2
                    ? order.store.address.street_2 + "<br>"
                    : ""
                }
                ${order.store.address.city}, ${order.store.address.state}<br>
                ${order.store.address.zip}, ${order.store.address.country}
              </p>
            </div>
          </div>
          `
              : ""
          }
          
          <!-- Technical Information Section -->
          <div class="section technical">
            <div class="section-title">System Information</div>
            <div class="section-content">
              <table class="info-table">
                ${systemInfoHtml}
              </table>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated by the order processing system.</p>
          <p>Environment: ${systemInfo.environment} | Version: ${
    systemInfo.version
  }</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return htmlBody;
};
