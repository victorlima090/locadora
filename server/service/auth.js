import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { collections } from "./database.service.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, password, role = "user", dateOfBirth, email } = req.body;
    //todo add more input validations
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      password: hashedPassword,
      role,
      dateOfBirth,
      email,
    };
    await collections.users.insertOne(newUser);
    res.status(201).send("User added");
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await collections.users.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET
    );

    res.json({ message: "Logged in successfully", token });
  } catch (e) {
    console.log(e.message);
    res.send(500);
  }
});

export default router;
