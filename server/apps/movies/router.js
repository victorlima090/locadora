import express from "express";
import { collections } from "../../service/database.service.js";
import passport from "passport";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await collections.movies.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const results = await collections.movies.findOne(query);

  if (!results) res.send("Not found").status(404);
  else res.send(results).status(200);
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.send("Unauthorized").status(401);
      }
      const newDocument = {
        title: req.body.title,
        img: req.body.img,
        cast: req.body.cast,
      };

      const result = await collections.movies.insertOne(newDocument);
      res.send(result).status(204);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding movie");
    }
  }
);
router.patch("/users", async (req, res) => {
  try {
    console.log("/movies/users", req.body.userId);
    const userId = req.body.userId;
    const moviesTitle = req.body.moviesTitle;
    const moviesIds = [];
    for (const title of moviesTitle) {
      console.log("movie title", title);
      const movie = await collections.movies.findOne({
        title: title,
        user_id: null,
      });
      console.log("movie", movie);
      if (movie) {
        moviesIds.push(movie._id);
      }
    }
    console.log("/movies/users", moviesIds);
    const query = { _id: { $in: moviesIds } };
    const result = await collections.movies.updateMany(query, {
      $set: { user_id: new ObjectId(userId) },
    });
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error update movie's user");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        img: req.body.img,
        cast: req.body.cast,
        user_id: req.body.user_id,
      },
    };

    const result = await collections.movies.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating movie");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const result = await collections.movies.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting movie");
  }
});

export default router;
