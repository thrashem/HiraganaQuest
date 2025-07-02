const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const spellmapPath = path.join(__dirname, "..", "spellmap.json");

router.get("/:spell", (req, res) => {
  const spell = req.params.spell;

  if (!spell || spell.length !== 52) {
    return res.status(400).json({ error: "52文字のひらがなが必要です" });
  }

  const map = fs.existsSync(spellmapPath)
    ? JSON.parse(fs.readFileSync(spellmapPath, "utf-8"))
    : {};

  const url = map[spell];
  if (!url) {
    return res.status(404).json({ error: "その呪文に対応するURLは存在しません" });
  }

  res.json({ spell, url });
});

module.exports = router;
