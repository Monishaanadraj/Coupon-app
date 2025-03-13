const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "coupon_system"
});

db.connect((err) => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to MySQL database");
});

module.exports = db;
