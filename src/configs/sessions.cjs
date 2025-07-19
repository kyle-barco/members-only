const sessions = require("express-session")
const pool = require('../01_models/pool.cjs')
const pgConnect = require("connect-pg-simple")
const pgStore = pgConnect(sessions)

module.exports = () => {
  sessions({
    secret: "cats",
    resave: false, 
    saveUninitialized: false,
    store: new pgStore({pool: pool, createTableIfMissing: true}),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    }
  })
}
