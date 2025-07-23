const router = require("express").Router()
const index = require("../03_controllers/index.cjs")
const user = require("../03_controllers/users.cjs")
const {signupValidation, postValidation} = require("../middlewares/validation.cjs")
//
// router.all("*", (req, res, next) => {
//   if(req.user) res.locals.user = req.user
//   next()
// })

// POST ROUTES
router.post("/signup", signupValidation, user.signup.post)
router.post("/login", user.login.post)


// // GET ROUTES
router.get("/", index.home)
router.get("/login", user.login.get)
router.get("/signup", user.signup.get)

module.exports = router
