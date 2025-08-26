// // utils/trackEvents.ts
// import ReactPixel from 'react-facebook-pixel';

// export const trackAddToCart = (product: { id: string; name: string; category: string; price: number }) => {
//   if (typeof window !== 'undefined') {
//     ReactPixel.track('AddToCart', {
//       content_ids: [product.id],
//       content_name: product.name,
//       content_category: product.category,
//       content_type: 'product',
//       value: product.price,
//       currency: 'LKR',
//     });
//   }
// };

// export const trackProductClick = (product: { id: string; name: string; category: string; price: number }) => {
//   if (typeof window !== 'undefined') {
//     ReactPixel.track('ViewContent', {
//       content_ids: [product.id],
//       content_name: product.name,
//       content_category: product.category,
//       content_type: 'product',
//       value: product.price,
//       currency: 'LKR',
//     });
//   }
// };

// export const trackProceedToCheckout = () => {
//   if (typeof window !== 'undefined') {
//     ReactPixel.track('InitiateCheckout');
//   }
// };

// export const trackPaymentPage = () => {
//   if (typeof window !== 'undefined') {
//     ReactPixel.track('AddPaymentInfo');
//   }
// };
