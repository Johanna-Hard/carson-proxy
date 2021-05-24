const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const ProxyPort = 2000;

const Photos = "http://localhost:2004";
const HostedBy = "http://localhost:5003";
const CalendarWidget = "http://localhost:2002";

app.use(express.static("client/dist"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Logging
app.use(morgan("dev"));

app.get("*/rooms/:listingId", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Establish server
app.listen(ProxyPort, () => {
  console.log(`Proxy server successfully started at ${ProxyPort}`);
});
