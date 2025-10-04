const express = require("express");
const fsp = require("fs/promises");
const path = require("path");

const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../../data/items.json");

async function readDataAsync() {
  const raw = await fsp.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

// GET /api/items
router.get("/", async (req, res, next) => {
  try {
    const data = await readDataAsync();
    const { limit = "10", page = "1", q = "" } = req.query;
    const parsedLimit = Math.max(1, Math.min(1000, parseInt(limit, 10) || 20));
    const parsedPage = Math.max(1, parseInt(page, 10) || 1);

    let filtered = data;
    if (q) {
      const qLower = String(q).toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(qLower)
      );
    }

    const total = filtered.length;
    const start = (parsedPage - 1) * parsedLimit;
    const end = start + parsedLimit;
    const results = filtered.slice(start, end);

    res.json({
      items: results,
      page: parsedPage,
      limit: parsedLimit,
      total,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const data = await readDataAsync();
    const item = data.find((i) => i.id === parseInt(req.params.id, 10));
    if (!item) {
      const notFound = new Error("Item not found");
      notFound.status = 404;
      throw notFound;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    const item = req.body;
    const data = await readDataAsync();
    item.id = Date.now();
    data.push(item);
    await fsp.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
    try {
      const { invalidate } = require("../utils/cache");
      invalidate("stats");
    } catch (_) {}
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
