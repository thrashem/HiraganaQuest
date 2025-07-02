const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { encodeToSpell, formatSpellDisplay } = require("../spell-util");

const router = express.Router();
const spellmapPath = path.join(__dirname, "..", "spellmap.json");

router.post("/", (req, res) => {
  const { url: inputUrl } = req.body;

  if (!inputUrl || typeof inputUrl !== "string" || !inputUrl.startsWith("http")) {
    return res.status(400).json({ error: "URLが　むこうです" });
  }

  const index = crypto.randomBytes(39);
  const spell = encodeToSpell(index);
  const display = formatSpellDisplay(spell);

  let map = {};
  if (fs.existsSync(spellmapPath)) {
    map = JSON.parse(fs.readFileSync(spellmapPath, "utf-8"));
  }

  map[spell] = inputUrl;
  fs.writeFileSync(spellmapPath, JSON.stringify(map, null, 2), "utf-8");

  res.json({
    spell,
    url: inputUrl,
    display,
  });
});

module.exports = router;
