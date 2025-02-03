// app/routes/auth.callback.jsx
import { redirect } from "@remix-run/node";
import crypto from "crypto";
import fetch from "node-fetch";
// Example in app/routes/auth/callback.jsx
import stateStore from "../utils/stateStore";
// ... use stateStore.get(shop) ...


const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

// For simplicity, reusing the in-memory store from the install route.
// const stateStore = new Map();

async function createScriptTag(shop, accessToken) {
  const scriptTagUrl = `https://${shop}/admin/api/2023-01/script_tags.json`;
  const scriptTagData = {
    script_tag: {
      event: "onload",
      src: "https://newcl.github.io/shopify/main.js", // Your externally hosted app URL
    },
  };

  const response = await fetch(scriptTagUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify(scriptTagData),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Error creating ScriptTag: ${errorDetails}`);
  }

  const data = await response.json();

  console.log("ScriptTag created:", data);

  return data;
}

export async function loader({ request }) {
  console.log("Callback loader");
  
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const hmac = url.searchParams.get("hmac");
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  // Validate state
  const storedState = stateStore.get(shop);
  if (!state || state !== storedState) {
    throw new Response("State validation failed", { status: 403 });
  }
  stateStore.delete(shop);

  // Validate HMAC
  const message = Object.keys(Object.fromEntries(url.searchParams.entries()))
    .filter((key) => key !== "hmac" && key !== "signature")
    .map((key) => `${key}=${url.searchParams.get(key)}`)
    .sort()
    .join("&");

  const generatedHmac = crypto
    .createHmac("sha256", SHOPIFY_API_SECRET)
    .update(message)
    .digest("hex");

  if (generatedHmac !== hmac) {
    throw new Response("HMAC validation failed", { status: 400 });
  }

  // Exchange code for an access token
  const tokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
  const tokenPayload = {
    client_id: SHOPIFY_API_KEY,
    client_secret: SHOPIFY_API_SECRET,
    code,
  };

  const tokenResponse = await fetch(tokenRequestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tokenPayload),
  });
  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    throw new Response("Failed to obtain access token", { status: 400 });
  }

  // Create ScriptTag using the access token
  await createScriptTag(shop, tokenData.access_token);
  

  // You might want to save the shop and token info to your DB here

  // Redirect to your admin UI after successful installation
  return redirect("/admin");
}

export default function MyAuthCallback() {
  // This component won't be rendered because we redirect immediately
  return null;
}
