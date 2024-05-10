import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 6969;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/db", (req, res) => {
  const relativePath = path.join(__dirname, "db.json");
  res.sendFile(relativePath); // Corrected to use res.sendFile
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
