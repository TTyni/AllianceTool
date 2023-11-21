import express, { json, urlencoded } from "express";
import readMap from "./db.js";
import dbRouter from "./dbRouter.js";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(dbRouter);

if (false) {
  readMap.readMap();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Products API listening to port", PORT);
});

export default server;
