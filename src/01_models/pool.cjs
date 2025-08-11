const pg = require("pg")
require("dotenv").config()

module.exports = new pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: {rejectUnauthorized: false}
  // ssl: false
})
console.log("DB_URL:", process.env.DB_URL);
