const pg = require("pg");
require("dotenv").config();

const caCert = process.env.CA.replace(/\\n/g, '\n'); 

module.exports = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: true, // Now properly validating
    ca: caCert 
  }
});
