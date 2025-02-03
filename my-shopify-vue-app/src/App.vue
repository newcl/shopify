<template>
  <div id="shopify-vue-widget">
    <div class="widget-container">
      <h3>Store Helper Widget</h3>
      <p>This is a demonstration Vue app injected via a Shopify ScriptTag.</p>
      <button @click="hideWidget">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    hideWidget() {
      // Remove the widget from the page when the button is clicked
      const widget = document.getElementById('shopify-vue-widget');
      if (widget) {
        widget.style.display = 'none';
      }
    },
  },
};
</script>

<style scoped>
#shopify-vue-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-family: Arial, sans-serif;
}

.widget-container {
  background-color: #fff;
  border: 2px solid #007acc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

.widget-container h3 {
  margin: 0 0 8px;
  color: #007acc;
}

.widget-container p {
  margin: 0 0 12px;
  font-size: 14px;
}

.widget-container button {
  background-color: #007acc;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.widget-container button:hover {
  background-color: #005fa3;
}
</style>
