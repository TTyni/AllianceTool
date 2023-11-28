import { Router } from "express";
import dao from "./dao.js";

const tagRouter = Router();

tagRouter.post("/:id", async (req, res) => {
  const { off, def, target } = req.body;
  const result = await dao.setNewTags(req.params.id, off, def, target);
  res.status(200).send(result);
});

tagRouter.put("/:id", async (req, res) => {
  const { off, def, target } = req.body;
  const result = await dao.updateTag(req.params.id, off, def, target);
  res.status(200).send(result);
});

tagRouter.get("/:id", async (req, res) => {
  const result = await dao.findTags(req.params.id);
  res.status(200).send(result.rows);
});

tagRouter.get("/", async (_req, res) => {
  const result = await dao.findAllTags();
  res.status(200).send(result.rows);
});

tagRouter.delete("/:id", async (req, res) => {
  const result = await dao.deleteTag(req.params.id);
  res.status(200).send(result.rows);
});



export default tagRouter;
