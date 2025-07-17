const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const db = require("../01_models/queries.cjs")
const bcrypt = require("bcryptjs")

const verifyCallback = async(username, password, done) => {
  try {
    const user = await db.getUserFromUname(username) 
    if(!user) {
      return done(null, false, {message: "Username not found!"})
    }
  } catch (err) {

  }
}
