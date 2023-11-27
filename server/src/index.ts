import express, { json, urlencoded } from "express";
import readMap from "./db.js";
import dbRouter from "./dbRouter.js";
import cors from "cors";
import tagRouter from "./tagRouter.js";
import { logger, unknownEndpoint } from "./middleware.js";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(dbRouter);
server.use("/tags", tagRouter)
server.use(logger);

if (false) {
  readMap.readMap();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Products API listening to port", PORT);
});

server.use(unknownEndpoint);

export default server;
