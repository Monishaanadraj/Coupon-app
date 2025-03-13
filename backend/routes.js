const express = require("express");
const db = require("./config");

const router = express.Router();

// Get next available coupon
const getNextAvailableCoupon = (callback) => {
    db.query(`SELECT * FROM coupons WHERE status = 'available' ORDER BY id LIMIT 1`, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.length > 0 ? results[0] : null);
    });
};

// Middleware for abuse prevention (IP & Cookie Tracking)
const checkAbuse = (req, res, next) => {
    const ip = req.ip;
    const cookieId = req.cookies.coupon_id || Math.random().toString(36).substring(2);
    req.cookieId = cookieId;

    if (!req.cookies.coupon_id) {
        res.cookie("coupon_id", cookieId, { maxAge: 3600000, httpOnly: true });
    }

    db.query(`SELECT * FROM claims WHERE ip_address = ? OR cookie_id = ? ORDER BY claimed_at DESC LIMIT 1`, 
        [ip, cookieId], (err, results) => {
        if (results.length > 0) {
            const lastClaimTime = new Date(results[0].claimed_at);
            const now = new Date();
            const timeDiff = (now - lastClaimTime) / 1000 / 60; // Minutes

            if (timeDiff < 60) {
                return res.status(429).json({ message: `Try again in ${60 - Math.floor(timeDiff)} minutes.` });
            }
        }
        next();
    });
};

// Claim Coupon Route
router.post("/claim", checkAbuse, (req, res) => {
    getNextAvailableCoupon((err, coupon) => {
        if (err || !coupon) return res.status(400).json({ message: "No coupons available." });

        const ip = req.ip;
        const cookieId = req.cookieId;

        db.query(`UPDATE coupons SET status = 'claimed' WHERE id = ?`, [coupon.id], (updateErr) => {
            if (updateErr) return res.status(500).json({ message: "Database error." });

            db.query(`INSERT INTO claims (ip_address, cookie_id) VALUES (?, ?)`, [ip, cookieId], (insertErr) => {
                if (insertErr) return res.status(500).json({ message: "Database error." });

                res.json({ message: "Coupon claimed successfully!", coupon: coupon.code });
            });
        });
    });
});

// Reset Coupons (For Testing)
router.get("/reset", (req, res) => {
    db.query(`UPDATE coupons SET status = 'available'`, () => {
        res.json({ message: "Coupons reset to available." });
    });
});

module.exports = router;
