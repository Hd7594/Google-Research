const express = require("express");
const router = express.Router();

const Research = require("../models/ResearchEngine");

router.post("/research/new", async (req, res) => {
  try {
    const { name, searchEngine, accuracy } = req.body;

    const newResearch = new Research({
      name: name,
      searchEngine: searchEngine,
      accuracy: accuracy,
    });
    await newResearch.save();
    res.status(201).json(newResearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/research/list", async (req, res) => {
  try {
    const listResearch = await Research.find();
    res.json(listResearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/research/update", async (req, res) => {
  try {
    const updateResearch = await Research.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
    });
    if (!req.body.name || !req.body.id) {
      res.status(400).json({ message: "missing parameters" });
    } else {
      res.json({ message: "research updated" });
    }
    await updateResearch.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/research/delete", async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.body.id);
    if (!req.body.id) {
      return res.json({ message: "research not found" });
    }
    if (req.body.id) {
      return res.json({ message: "research deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
