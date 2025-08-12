require("dotenv").config();
const expressSession = require("express-session");
const pgConnect = require("connect-pg-simple");
const PgStore = pgConnect(expressSession);

module.exports = () =>
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PgStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: { require: true, rejectUnauthorized: false }
      },
      createTableIfMissing: true,
      tableName: "session"
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    }
  });
