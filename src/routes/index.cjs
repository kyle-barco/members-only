const router = require("express").Router()
const index = require("../03_controllers/index.cjs")
const user = require("../03_controllers/users.cjs")
const post = require("../03_controllers/post.cjs")
const {signupValidation, postValidation} = require("../middlewares/validation.cjs")
const { isAuth, isAdmin } = require("../middlewares/auth.cjs")
//

router.all("*", (req, res, next) => {
  res.locals.user = req.user;  // Makes user available in all templates
  next();
});

// router.all('/{*any}', (req, res, next) => {
//   res.locals.user = req.user;  // Makes user available in all templates
//   next();
// });

// POST ROUTES
router.post("/login", user.login.post)
router.post("/signup", signupValidation, user.signup.post)
router.post("/new-post", postValidation, post.create.post)
router.post("/join", isAuth, user.join)
router.post("/admin", isAuth, user.admin)
router.post("/delete-post/:postId", isAdmin, post.delete)



// // GET ROUTES
router.get("/", index.home)
router.get("/login", user.login.get)
router.get("/signup", user.signup.get)
router.get("/logout", isAuth, user.logout)
router.get("/new-post", isAuth, post.create.get)
router.get("/members", isAuth, index.members)


module.exports = router
