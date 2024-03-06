// server.js
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

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
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
