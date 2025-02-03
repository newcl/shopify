import { createApp } from 'vue';
import App from './App.vue';

// Check if the mount point exists; if not, create one and append to the document body.
const mountId = 'shopify-vue-widget-root';
let mountEl = document.getElementById(mountId);
if (!mountEl) {
  mountEl = document.createElement('div');
  mountEl.id = mountId;
  document.body.appendChild(mountEl);
}

createApp(App).mount(mountEl);
