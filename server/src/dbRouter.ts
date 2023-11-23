import { Router } from "express";
import dao from "./dao.js";

const dbRouter = Router();

dbRouter.get("/", async (_req, res) => {
  const result = await dao.findAll();
  res.status(200).send(result.rows);
});

dbRouter.get("/field/:id", async (req, res) => {
  const result = await dao.findOne(req.params.id);
  res.status(200).send(result.rows[0]);
});

dbRouter.get("/players/:playerName", async (req, res) => {
  const result = await dao.findPlayer(req.params.playerName);
  res.status(200).send(result.rows);
});

dbRouter.get("/alliances", async (_req, res) => {
  const result = await dao.getAllAlliances();
  res.status(200).send(result.rows);
});

dbRouter.get("/alliances/:alliance", async (req, res) => {
  const result = await dao.findAlliance(req.params.alliance);
  res.status(200).send(result.rows);
});

dbRouter.post("/tags/:id/:off/:def/:target", async (req, res) => {
  const result = await dao.setNewTags(
    req.params.id,
    req.params.off,
    req.params.def,
    req.params.target
  );
  res.status(200).send(result);
});

dbRouter.put("/tags/:id/:off/:def/:target", async (req, res) => {
  const result = await dao.updateTag(
    req.params.id,
    req.params.off,
    req.params.def,
    req.params.target
  );
  res.status(200).send(result);
});

dbRouter.get("/tags/:id", async (req, res) => {
  const result = await dao.findTags(req.params.id);
  res.status(200).send(result.rows);
});

dbRouter.delete("/tags/:id", async (req, res) => {
  const result = await dao.deleteTag(req.params.id);
  res.status(200).send(result.rows);
});

export default dbRouter;
