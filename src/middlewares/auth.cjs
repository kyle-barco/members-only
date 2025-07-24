const UnauthorizedError = require("./errors.cjs").UnauthorizedError

module.exports.isAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    next()
  } else {
    next(new UnauthorizedError())
  }
}

module.exports.isAdmin = (req, res, next) => {
  if(req.isAuthenticated() && req.user.is_member) {
    next()
  } else {
    next(new UnauthorizedError())
  }
}
