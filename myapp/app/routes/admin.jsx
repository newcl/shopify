// app/routes/admin.jsx
import { json, redirect } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';

/**
 * Loader: Fetch existing configuration.
 * Replace this stub with your actual database/API call.
 */
export async function loader() {
  // Example: Fetch a configuration from your database.
  const config = {
    setting: 'Default configuration value',
  };
  return json(config);
}

/**
 * Action: Save the updated configuration.
 * Replace the console.log with your actual update logic.
 */
export async function action({ request }) {
  const formData = await request.formData();
  const setting = formData.get('setting');

  // Save the configuration (e.g., to your database)
  console.log('Saving configuration:', setting);

  // Redirect back to the admin page after saving.
  return redirect('/admin');
}

/**
 * Admin Component
 */
export default function Admin() {
  const config = useLoaderData();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>App Configuration</h1>
      <Form method="post">
        <div>
          <label>
            Setting:
            <input
              type="text"
              name="setting"
              defaultValue={config.setting}
              placeholder="Enter your configuration here"
            />
          </label>
        </div>
        <button type="submit">Save Configuration</button>
      </Form>
    </div>
  );
}
