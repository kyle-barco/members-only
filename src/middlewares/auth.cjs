const UnauthorizedError = require("./errors.cjs").UnauthorizedError

module.exports.isAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    // console.log(req.isAuthenticated())
    next()
  } else {
    next(new UnauthorizedError())
  }
}

module.exports.isAdmin = (req, res, next) => {
  if(req.isAuthenticated() && req.user.member_status) {
    next()
  } else {
    next(new UnauthorizedError())
  }
}
