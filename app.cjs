const express = require('express')
const path = require('path')
const routes = require("./src/routes/index.cjs")
const passport = require("passport")
const sessionConfig = require("./src/configs/sessions.cjs")


const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}))

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "src/02_views"));

// AUTH/SESSIONS
app.use(sessionConfig())
app.use(passport.session())

app.use((req, res, next) =>{
  console.log(req.user)
  next()
})

require('./src/configs/passport.cjs')

// ROUTES
console.log('type of: ' + typeof routes)
app.use(routes)

// SERVER
app.listen(3000, () => console.log("Server running at port 3000"))
