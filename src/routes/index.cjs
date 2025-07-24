const router = require("express").Router()
const index = require("../03_controllers/index.cjs")
const user = require("../03_controllers/users.cjs")
const {signupValidation, postValidation} = require("../middlewares/validation.cjs")
//
// router.all("*", (req, res, next) => {
//   res.locals.user = req.user;  // Makes user available in all templates
//   next();
// });
//
// POST ROUTES
router.post("/login", user.login.post)
router.post("/signup", signupValidation, user.signup.post)
router.post("/new-post", postValidation, post.)



// // GET ROUTES
router.get("/", index.home)
router.get("/login", user.login.get)
router.get("/signup", user.signup.get)
router.get("/logout", user.logout)

module.exports = router
