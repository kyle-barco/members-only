const pg = require("pg")
require("dotenv").config()

module.exports = new pg.Pool({
  connectionString: process.env.DB_URL,
  // ssl: {rejectUnauthorized: false}
  // ssl: false
})
console.log("Using DB URL:", process.env.DB_URL);
console.log("SSL Config:", { rejectUnauthorized: false });
