const db = require('../01_models/queries.cjs')

const indexController = {
  home: async (req, res, next) => {
    try {
      const post = await db.getAllPosts()
      res.render('pages')
    } catch (err) {
      console.error(err)
      next(err)
    }
  } 
}

module.exports = indexController;

