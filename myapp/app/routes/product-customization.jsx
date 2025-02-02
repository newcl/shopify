// app/routes/product-customization.jsx
import { redirect } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';

/**
 * Action: Process the customer’s customization.
 * In a real app, you’d use Shopify’s APIs to add the product to the cart with line item properties.
 */
export async function action({ request }) {
  const formData = await request.formData();
  const customText = formData.get('customText');

  // Log the custom input.
  console.log('Customer custom input:', customText);

  // In a real implementation, you would pass 'customText' to Shopify as a line item property.
  // For example, using Shopify’s Storefront API or AJAX API to add the product to the cart.

  // Redirect to a checkout or cart page.
  return redirect('/checkout'); // Replace with your actual destination.
}

/**
 * Product Customization Component
 */
export default function ProductCustomization() {
  const actionData = useActionData();
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Customize Your Product</h2>
      <Form method="post">
        <div>
          <label>
            Enter Custom Text:
            <input
              type="text"
              name="customText"
              placeholder="Your customization here"
            />
          </label>
        </div>
        <button type="submit">Add to Cart</button>
      </Form>
      {actionData?.error && (
        <p style={{ color: 'red' }}>{actionData.error}</p>
      )}
    </div>
  );
}
