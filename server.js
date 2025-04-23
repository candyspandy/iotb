const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let latestGyroData = {
  alpha: 0,
  beta: 0,
  gamma: 0,
};

// Endpoint to update gyro data from frontend (e.g., phone)
app.post("/post-gyro", (req, res) => {
  const { alpha, beta, gamma } = req.body;

  if (
    typeof alpha === "number" &&
    typeof beta === "number" &&
    typeof gamma === "number"
  ) {
    latestGyroData = { alpha, beta, gamma };
    console.log("Gyro data updated:", latestGyroData);
    res.status(200).send("Gyro data received");
  } else {
    res.status(400).send("Invalid data format");
  }
});

// Endpoint for ESP32 to fetch gyro data
app.get("/gyro-data", (req, res) => {
  res.json(latestGyroData);
});

// Basic root route
app.get("/", (req, res) => {
  res.send("Gyro Server Running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
