const expressSession = require("express-session")
const pool = require('../01_models/pool.cjs')
const pgConnect = require("connect-pg-simple")
const PgStore = pgConnect(expressSession)

module.exports = () => 
  expressSession({
    secret: "cats",
    resave: false, 
    saveUninitialized: true,
    store: new PgStore({
      pool: pool, 
      createTableIfMissing: true,
      tableName: 'session'
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    }
  })
