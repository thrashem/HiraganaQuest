const HIRAGANA_TABLE = [
  "あ","い","う","え","お","か","き","く","け","こ",
  "さ","し","す","せ","そ","た","ち","つ","て","と",
  "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
  "ま","み","む","め","も","や","ゆ","よ",
  "ら","り","る","れ","ろ","わ",
  "が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ",
  "ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ"
];

function encodeToSpell(buffer) {
  const bits = Array.from(buffer).map(b => b.toString(2).padStart(8, "0")).join("");
  const chars = [];
  for (let i = 0; i + 6 <= 312; i += 6) {
    chars.push(HIRAGANA_TABLE[parseInt(bits.slice(i, i + 6), 2)]);
  }
  return chars.join("");
}

function decodeFromSpell(spell) {
  if (!spell || spell.length !== 52) throw new Error("52文字のひらがなが必要です");
  const bits = Array.from(spell).map(char => {
    const idx = HIRAGANA_TABLE.indexOf(char);
    if (idx === -1) throw new Error(`未知の文字: ${char}`);
    return idx.toString(2).padStart(6, "0");
  }).join("");
  const bytes = [];
  for (let i = 0; i + 8 <= 312; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

function formatSpellDisplay(spell) {
  const rows = [];
  for (let i = 0; i < 50; i += 10) {
    rows.push([spell.slice(i, i + 3), spell.slice(i + 3, i + 6), spell.slice(i + 6, i + 10)].join("　"));
  }
  rows.push(spell.slice(50));
  return rows.join("\n");
}

module.exports = {
  encodeToSpell,
  decodeFromSpell,
  formatSpellDisplay
};
