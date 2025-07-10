const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../01_models/queries.cjs")



const userController = {
  signup: {
    get: (req, res) => {
      res.render("pages/auth", {route: "login"})
    },
    post: async (req, res, next) => {
      try {
        const errors = validationResult(req)

      } 
    }
  }
}
