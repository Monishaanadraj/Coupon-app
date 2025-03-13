app.post("/api/claim", async (req, res) => {
    try {
        const result = { message: "Coupon claimed successfully!" };
        res.json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
