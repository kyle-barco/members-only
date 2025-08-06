const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const db = require("../01_models/queries.cjs")
const bcrypt = require("bcryptjs")

const verifyCallback = async (username, password, done) => {
  try {
    // console.log(`Auth attempt: ${username}`); // Debug log
    const user = await db.getUserFromUname(username);
    if (!user) return done(null, false, { message: "User not found" });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: "Incorrect password" });
    
    return done(null, user);
  } catch (err) {
    // console.error('Auth error:', err); // Critical error logging
    return done(err);
  }
};

passport.use(new LocalStrategy(verifyCallback))

passport.serializeUser((user, done) => {
  // console.log("Serializing user ID:", user.id)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  // console.log("Deserializing user ID:", id)
  try {
    const user = await db.getUserFromId(id)
    done(null, user)
  } catch (err){
    done(err) 
  }
})
