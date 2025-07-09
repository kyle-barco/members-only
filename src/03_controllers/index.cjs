const db = require('../01_models/queries.cjs')

const indexController = {
  home: async (req, res, next) => {
    try {
      const posts = await db.getAllPosts()
      res.locals.posts = posts
      res.render('pages/home')
    } catch (err) {
      console.error(err)
      next(err)
    }
  } 
}

module.exports = indexController;

