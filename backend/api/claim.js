import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        const client = await pool.connect();
        try {
            const { rows } = await client.query(`SELECT * FROM coupons WHERE status = 'available' LIMIT 1`);
            if (rows.length === 0) {
                return res.status(400).json({ message: "No coupons available." });
            }

            await client.query(`UPDATE coupons SET status = 'claimed' WHERE id = $1`, [rows[0].id]);
            return res.json({ message: "Coupon claimed!", coupon: rows[0].code });
        } catch (error) {
            return res.status(500).json({ message: "Database error", error });
        } finally {
            client.release();
        }
    }

    res.status(405).json({ message: "Method not allowed" });
}
