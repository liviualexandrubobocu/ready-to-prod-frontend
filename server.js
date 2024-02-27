// server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const app = express();

// Proxy endpoints to API
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000", // URL of your API server
    changeOrigin: true,
  }),
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
