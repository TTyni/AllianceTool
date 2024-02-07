import { Router } from "express";
import dao from "../Dao/dao.js";

const tagRouter = Router();

tagRouter.post("/:id", async (req, res) => {
  const { off, def, target } = req.body;
  if (off && def && target && req.params.id) {
    const result = await dao.setNewTags(req.params.id, off, def, target);
    res.status(201).send(result);
  } else {
    res.status(400).send();
  }
});

tagRouter.put("/:id", async (req, res) => {
  const { off, def, target } = req.body;
  if (req.params.id) {
    const result = await dao.updateTag(req.params.id, off, def, target);
    res.status(200).send(result);
  } else {
    res.status(400).send();
  }
});

tagRouter.get("/:id", async (req, res) => {
  if (req.params.id) {
    const result = await dao.findTags(req.params.id);
    res.status(200).send(result.rows);
  } else {
    res.status(400).send();
  }
});

tagRouter.get("/", async (_req, res) => {
  const result = await dao.findAllTags();
  res.status(200).send(result.rows);
});

tagRouter.delete("/:id", async (req, res) => {
  if (req.params.id) {
    const result = await dao.deleteTag(req.params.id);
    res.status(200).send(result.rows);
  } else {
    res.status(400).send("missing params");
  }
});

export default tagRouter;
