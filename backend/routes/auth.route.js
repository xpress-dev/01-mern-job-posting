import express from "express";
import jwt from "jsonwebtoken";
import admin from "../models/admin.model.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ username, isAdmin: true }, JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

export default router;
