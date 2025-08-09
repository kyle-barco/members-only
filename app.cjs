require("dotenv").config()
const express = require('express')
const createError = require('http-errors')
const passport = require("passport")
const sessionConfig = require("./src/configs/sessions.cjs")
const path = require('node:path')
const routes = require("./src/routes/index.cjs")
const errorHandler = require("./src/middlewares/errors.cjs").errorHandler


const app = express()

app.use(express.json())
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}))

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "src/02_views"));


// AUTH/SESSIONS
app.use(sessionConfig())

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) =>{
  // console.log(req)
  next()
})

require('./src/configs/passport.cjs')

// app.use((req, res, next) => {
//   console.log("\n--- Session Debug ---");
//   console.log("Session ID:", req.sessionID);
//   console.log("Session data:", req.session);
//   console.log("Is Authenticated:", req.isAuthenticated());
//   console.log("User:", req.user);
//   console.log("--- End Debug ---\n");
//   next();
// });

//
// ROUTES
app.use("/", routes)

// ERRORS
app.use((req, res, next) => {
  next(createError(404))
})

app.use(errorHandler)

// SERVER
const PORT = process.env.PORT || 300
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
