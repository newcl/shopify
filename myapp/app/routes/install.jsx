// app/routes/install.jsx
import { redirect } from "@remix-run/node";
import crypto from "crypto";
// Example in app/routes/install.jsx
import stateStore from "../utils/stateStore";
// ... use stateStore.set(shop, state) ...


const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SCOPES = "read_products,write_script_tags"; // Adjust as needed
const HOST = process.env.HOST || process.env.SHOPIFY_APP_URL; // Your app's public URL

// In production, store state in a persistent store.
// For this example, we'll use a simple in-memory map.
// const stateStore = new Map();

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (!shop) {
    throw new Response("Missing shop parameter.", { status: 400 });
  }

  // Generate a random state
  const state = crypto.randomBytes(16).toString("hex");
  stateStore.set(shop, state);

  const redirectUri = `${HOST}/myauthcallback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES}&state=${state}&redirect_uri=${redirectUri}`;

  console.log("Redirecting to install URL:", installUrl);
  return redirect(installUrl);
}

export default function Install() {
  // This page won't render because we're redirecting
  return null;
}
