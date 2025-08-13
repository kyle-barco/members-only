const pg = require("pg")
const fs = require("fs")
require("dotenv").config()

module.exports = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: fs.readFileSync('../../ca.pem').toString()
    // rejectUnauthorized: false
  }
})
// console.log("Using DB URL:", process.env.DB_URL);
// console.log("SSL Config:", { rejectUnauthorized: false });
