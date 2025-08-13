const pg = require("pg")
const fs = require("fs")
require("dotenv").config()

module.exports = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
