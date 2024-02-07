import { Router } from "express";
import dao from "../Dao/dao.js";
import { authenticate } from "../Middlewares/middleware.js";

const dbRouter = Router();

dbRouter.get("/", async (_req, res) => {
  const result = await dao.findAll();
  res.status(200).send(result.rows);
});

dbRouter.get("/field/:id", async (req, res) => {
  if (req.params.id) {
    const result = await dao.findOne(req.params.id);
    res.status(200).send(result.rows[0]);
  } else {
    res.status(400).send("missing params");
  }
});

dbRouter.get("/players/:playerName", async (req, res) => {
  if (req.params.playerName) {
    const result = await dao.findPlayer(req.params.playerName);
    res.status(200).send(result.rows);
  } else {
    res.status(400).send("missing params");
  }
});

dbRouter.get("/alliances", async (_req, res) => {
  const result = await dao.getAllAlliances();
  res.status(200).send(result.rows);
});

dbRouter.get("/alliances/:alliance", async (req, res) => {
  if (req.params.alliance) {
    const result = await dao.findAlliance(req.params.alliance);
    res.status(200).send(result.rows);
  } else {
    res.status(400).send("missing params");
  }
});

export default dbRouter;
