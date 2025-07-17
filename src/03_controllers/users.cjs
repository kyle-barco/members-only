const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../01_models/queries.cjs")
const passport = require("passport")



const userController = {
  login: {
    get: (req, res) => {
      res.render("pages/auth", {route: "login"})
    },

    post: passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  },

  signup: {
    get: (req, res) => {
      res.render("pages/auth", {route: "signup"})
    },
    post: async (req, res, next) => {
      try {
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
          res.render("pages/auth", {
            route: "signup",
            errors: errors.array()
          })
        } else {
          const {fullname, username, password} = req.body
          const hashPw = await bcrypt.hash(password, 10)

          await db.createUser(fullname, username, hashPw)

          res.render("pages/auth", {
            route: "signup",
            success: true
          })
        }
      } catch (err) {
        next(err)
      } 
    }
  }
}

module.exports = userController

