import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import users from "./routes/users.js";
import movies from "./apps/movies/router.js";
import auth from "./service/auth.js";
import * as dotenv from "dotenv";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { connectToDatabase, collections } from "./service/database.service.js";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
connectToDatabase();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    const user = await collections.users.findOne({ email: jwt_payload.email });
    if (user) {
      return done(null, user);
    }

    return done(null, false);
  })
);
passport.use(
  "adminOnly",
  new Strategy(opts, async (jwt_payload, done) => {
    const user = await collections.users.findOne({ email: jwt_payload.email });
    if (user && user.role === "admin") {
      return done(null, user);
    }

    return done(null, false);
  })
);

app.use("/records", records);
app.use("/users", users);
app.use("/movies", movies);
app.use("/auth", auth);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
