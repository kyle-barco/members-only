const db = require('../01_models/queries.cjs')
const moment = require("moment")

const indexController = {
  home: async (req, res, next) => {
    try {
      const posts = await db.getAllPosts()
      res.locals.posts = posts
      
      if(posts.length > 0) {
        const formattedPosts = posts.map(e => {
          return {
            ...e,
            date: moment(e.date).fromNow()
          }
        })
        res.locals.posts = formattedPosts
      } else {
        res.locals.posts = posts
      }

      res.render('pages/home')
    } catch (err) {
      // console.error(err)
      next(err)
    }
  } 
}

module.exports = indexController;

