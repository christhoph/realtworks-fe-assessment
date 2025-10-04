const express = require("express");
const fsp = require("fs/promises");
const path = require("path");
const cache = require("../utils/cache");

const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../data/items.json");

// GET /api/stats
router.get("/", async (req, res, next) => {
  try {
    const cached = cache.get("stats");

    if (cached) return res.json(cached);

    const raw = await fsp.readFile(DATA_PATH, "utf8");

    const items = JSON.parse(raw);
    const total = items.length;
    const sum = items.reduce((acc, cur) => acc + (Number(cur.price) || 0), 0);
    const averagePrice = total ? sum / total : 0;
    const stats = { total, averagePrice };

    cache.set("stats", stats, 60_000);

    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
