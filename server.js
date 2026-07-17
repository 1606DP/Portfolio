const express = require('express');
require("dotenv").config();
const app = express();
const dbConfig = require("./config/dbConfig");
const cors = require("cors");
const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());

app.use("/api/portfolio", portfolioRoute);
const cors = require("cors");

app.use(cors({
  origin: "https://portfolio-1-l56w.onrender.com",
  credentials: true
}));

const port = process.env.PORT || 5000;

 app.listen(port, () => {
  console.log(`Server running on port ${port}`);
 });
