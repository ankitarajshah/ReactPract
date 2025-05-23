// proxy-server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors()); // Allow all origins

app.get("/api/restaurants", async (req, res) => {
  try {
    console.log("aa");
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0579765&lng=72.6461611&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent": "Mozilla/5.0", // Mimic browser
          Accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).send("Failed to fetch Swiggy data");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
