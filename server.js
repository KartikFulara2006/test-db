import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";
import morgon from "morgan";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 6969;

app.use(cors());
app.use(morgon("dev"));

// Function to read JSON data from file
const readJsonFromFile = (filePath) => {
  try {
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

// Route to get filtered data from JSON file
app.get("/db", (req, res) => {
  const { type } = req.query; // Assuming params are passed as query parameters
  const relativePath = path.join(__dirname, "db.json");
  const jsonData = readJsonFromFile(relativePath);

  if (!jsonData) {
    res.status(500).send("Error reading JSON data from file.");
    return;
  }
  if (type) {
    const data = jsonData[type];
    res.json(data);
    return;
  }
  console.log(jsonData);
  res.json(jsonData);
});

app.all("*", (req, res) => {
  res.send(JSON.stringify({ message: "Something went wrong" }));
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
