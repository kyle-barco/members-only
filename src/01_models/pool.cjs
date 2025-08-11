const pg = require("pg")
require("dotenv").config()

module.exports = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
 ssl: {
    require: true,
    rejectUnauthorized: false
  }
})
// console.log("Using DB URL:", process.env.DB_URL);
// console.log("SSL Config:", { rejectUnauthorized: false });
