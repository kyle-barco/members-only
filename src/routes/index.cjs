const router = require("express").Router()
const index = require("../03_controllers/index.cjs")

router.all("*", (req, res, next) => {
  if(req.user) res.locals.user = req.user
  next()
})

// GET ROUTES
router.get("/", index.home)

module.exports = router
