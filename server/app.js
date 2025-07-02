const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/register", require("./routes/register"));
app.use("/api/lookup", require("./routes/lookup"));
app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () => {
  console.log(`🚀 サーバー起動: http://localhost:${PORT}`);
});
