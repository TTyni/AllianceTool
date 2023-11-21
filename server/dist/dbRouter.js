import { Router } from "express";
import dao from "./dao.js";
const dbRouter = Router();
dbRouter.get("/", async (_req, res) => {
    const result = await dao.findAll();
    res.status(200).send(result.rows);
});
dbRouter.get("/:id", async (req, res) => {
    const result = await dao.findOne(req.params.id);
    res.status(200).send(result.rows[0]);
});
export default dbRouter;
