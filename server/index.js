const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const ProxyPort = 2000;

const Photos = "http://localhost:2004";
const Description = "http://localhost:5001";
const CalendarWidget = "http://localhost:2002";

app.use(express.static("client/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/photos",
  createProxyMiddleware({ target: Photos, changeOrigin: true })
);

app.use(
  "/description",
  createProxyMiddleware({ target: Description, changeOrigin: true })
);

app.use(
  "/calendarwidget",
  createProxyMiddleware({ target: CalendarWidget, changeOrigin: true })
);

app.listen(ProxyPort, () => {
  console.log(`Proxy server successfully started at ${ProxyPort}`);
});
