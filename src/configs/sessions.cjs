const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();

module.exports = () =>
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      createTableIfMissing: true,
      tableName: "session"
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  });
