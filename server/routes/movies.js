import express from "express";

import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("movies");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("movies");
  let query = { _id: new ObjectId(req.params.id) };
  let results = await collection.findOne(query);

  if (!results) res.send("Not found").status(404);
  else res.send(results).status(200);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      Email: req.body.email,
    };

    let collection = await db.collection("movies");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding movie");
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        Email: req.body.email,
      },
    };

    let collection = await db.collection("movies");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating movie");
  }
});

// This section will help you delete a movie
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("movies");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting movie");
  }
});

export default router;
