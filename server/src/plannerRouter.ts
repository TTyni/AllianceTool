import { Router } from "express";
import dao from "./dao.js";

const plannerRouter = Router();

plannerRouter.get("/targets", async (_req, res) => {
  const result = await dao.getTargets();
  res.status(200).send(result.rows);
});

plannerRouter.get("/offs", async (_req, res) => {
  const result = await dao.getOffs();
  res.status(200).send(result.rows);
});


export default plannerRouter;
