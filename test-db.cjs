
// test-db.cjs
require("dotenv").config();
const { Client } = require("pg");

(async () => {
  console.log("Connecting to:", process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true, rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("✅ DB connection successful");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  } finally {
    await client.end();
  }
})();
