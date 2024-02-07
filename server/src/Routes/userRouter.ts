import { Router } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";
import userDao from "../Dao/userDao.js";

const userRouter = Router();

userRouter.post("/register/", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const result = await userDao.registerUser(
      username,
      await argon2.hash(password)
    );
    const token = jwt.sign(username, process.env.SECRET!);
    res.status(200).send(token);
  } else {
    res.status(400).send("params missing");
  }
});

userRouter.post("/login/", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const found = await userDao.findUser(username);
    if (await argon2.verify(found.rows[0].passwordhash, password)) {
      const token = jwt.sign(username, process.env.SECRET!);
      res.status(200).send(token);
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  } else {
    res.status(401).send({ error: "Missing params" });
  }
});

export default userRouter;
