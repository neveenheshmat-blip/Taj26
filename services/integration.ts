
import { Wig } from '../types';
import { MOCK_WIGS } from '../constants';

// ------------------------------------------------------------------
// SHOPIFY INTEGRATION LAYER
// ------------------------------------------------------------------
// When you are ready to connect to real Shopify:
// 1. npm install shopify-buy
// 2. Uncomment the client setup below
// 3. Replace the mock functions with real client calls
// ------------------------------------------------------------------

/*
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-public-token'
});
*/

export const storeService = {
  /**
   * Fetches all products from the store (Shopify).
   */
  getAllProducts: async (): Promise<Wig[]> => {
    // REAL CODE:
    // const products = await client.product.fetchAll();
    // return products.map(transformShopifyProduct);

    // MOCK SIMULATION (Network Delay):
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_WIGS);
      }, 800); 
    });
  },

  /**
   * Creates a checkout session for the items.
   */
  checkout: async (items: Wig[]): Promise<string> => {
    // REAL CODE:
    // const checkout = await client.checkout.create();
    // const lineItems = items.map(item => ({ variantId: item.shopifyVariantId, quantity: 1 }));
    // await client.checkout.addLineItems(checkout.id, lineItems);
    // return checkout.webUrl;

    // MOCK SIMULATION:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://checkout.shopify.com/store/taj-wigs/123456'); 
      }, 2000);
    });
  }
};

export const adminService = {
  /**
   * Sends listing data to the Admin for approval (via EmailJS or Backend API).
   */
  submitListing: async (data: any): Promise<boolean> => {
    // REAL CODE (using fetch to your backend or EmailJS):
    /*
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: 'YOUR_SERVICE_ID',
            template_id: 'YOUR_TEMPLATE_ID',
            user_id: 'YOUR_PUBLIC_KEY',
            template_params: data
        })
    });
    */

    console.log("🚀 Submitting Listing to Admin:", data);
    
    // MOCK SIMULATION:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2500); // Simulate upload time
    });
  }
};
