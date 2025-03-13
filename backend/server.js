require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, "../public")));

// Use API routes
app.use("/", routes);

app.listen(3000, () => console.log("Server running on port 3000"));
