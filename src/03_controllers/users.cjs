const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../01_models/queries.cjs")
const passport = require("passport")


const userController = {
  join: async (req, res, next) => {
    try {
      console.log("JOIN controller called")
      console.log("req.user:", req.user)
      await db.giveUserMembership(req.user.id)
      res.redirect("/")
    } catch (err) {
      next(err)
    }
    
  },

  login: {
    get: (req, res) => {
      res.render("pages/auth", {route: "login"})
    },
    post: (req, res, next) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          return res.render("pages/auth", {
            route: "login",
            errors: [{ msg: info?.message || "Invalid credentials" }]
          });
        }

    // This is where the session is created properly
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
}
    // post: passport.authenticate("local", {
    //   successRedirect: "/",
    //   failureRedirect: "/login"
    // })
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
  },

  logout: (req, res, next) => {
    req.logout(err => {
      if(err) return next(err)
      res.redirect("/")
    })
  }
}

module.exports = userController

