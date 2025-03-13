const express = require("express");
const cors = require("cors");
const app = express();

// ✅ Allow requests ONLY from your Vercel frontend
const corsOptions = {
    origin: "https://coupon-frontend-n3e7qeljk-monishas-projects-b5106fd8.vercel.app/", // Replace with your actual frontend URL
    credentials: true, // ✅ Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Define API Route
app.post("/api/claim", (req, res) => {
    res.json({ message: "Coupon claimed successfully!" });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
