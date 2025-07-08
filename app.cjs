const express = require('express')
const routes = require("./src/routes/index.cjs")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"));


// ROUTES
app.use(routes)

// SERVER
app.listen(3000, () => console.log("Server running at port 3000"))
