const pg = require("pg")
require("dotenv").config()

module.exports = new pg.Pool({
  connectionString: process.env.DB_STRING,
  // ssl: {rejectUnauthorized: false}
  // ssl: false
})
