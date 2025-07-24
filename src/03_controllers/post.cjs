const { validationResult } = require("express-validator")
const db = require("../01_models/queries.cjs")

const postsController = {
  delete: async (req, res, next) => {
  },

  create: {
    get: (req, res, next) => {
      res.render("pages/new-post")
      
    },

    post: async (req, res, next) => {
      try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()){
          console.log(errors.array())
          res.render("pages/new-post", {
            errors: errors.array()
          })

        } else {
          const {title, content} = req.body;
          await db.createPost(title, content, req.user.id)
        }
      } catch (err) {
        next(err)
      }
    }
  }
}

module.exports = postsController
