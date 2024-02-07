import { Router } from "express";
import dao from "../Dao/dao.js";

const plannerRouter = Router();

plannerRouter.get("/targets", async (_req, res) => {
  const result = await dao.getTargets();
  res.status(200).send(result.rows);
});

plannerRouter.get("/offs", async (_req, res) => {
  const result = await dao.getOffs();
  res.status(200).send(result.rows);
});

plannerRouter.get("/defs", async (_req, res) => {
  const result = await dao.getDefs();
  res.status(200).send(result.rows);
});

plannerRouter.get("/allTags", async (_req, res) => {
  const result = await dao.findAllTags();
  res.status(200).send(result.rows);
});

export default plannerRouter;
