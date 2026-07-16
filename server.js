const express = require('express');
require("dotenv").config();
const app = express();
const dbConfig = require("./config/dbConfig");

const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());

app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
const path = require("path");


 app.listen(port, () => {
  console.log(`Server running on port ${port}`);
 });
