import { Router } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";
import userDao from "./userDao.js";

const userRouter = Router();

userRouter.post("/register/", async (req, res) => {
  const { username, pass } = req.body;
  if (username && pass) {
    const result = await userDao.registerUser(
      username,
      await argon2.hash(pass)
    );
    const token = jwt.sign(username, "test");
    res.status(200).send(token);
  } else {
    res.status(400).send("params missing");
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, pass } = req.body;
  if (username && pass) {
    const found = await userDao.findUser(username);
    if (await argon2.verify(found[0], pass)) {
      const token = jwt.sign(req.body.name, "test");
      res.status(200).send(token);
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
});

export default userRouter;
