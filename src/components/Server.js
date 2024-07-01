const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Define your API proxy here
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.coingecko.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api/v3", // Rewrite /api to /api/v3 in target
    },
  })
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
