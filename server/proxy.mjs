import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/search", async (req, res) => {
  const config = await fs.readFile(
    path.join(__dirname, "../config.json"),
    "utf-8"
  );
  const { yelpKey } = JSON.parse(config);

  const { latitude, longitude, categories } = req.query;
  const apiUrl = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&categories=${categories}`;

  const yelpRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${yelpKey}`,
    },
  });

  const data = await yelpRes.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
