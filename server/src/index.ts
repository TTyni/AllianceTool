import express, { json, urlencoded } from "express";
import readMap from "./db.js";
import dbRouter from "./Routes/dbRouter.js";
import cors from "cors";
import tagRouter from "./Routes/tagRouter.js";
import {
  errorHandler,
  logger,
  unknownEndpoint,
} from "./Middlewares/middleware.js";
import userRouter from "./Routes/userRouter.js";
import plannerRouter from "./Routes/plannerRouter.js";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(dbRouter);
server.use("/tags", tagRouter);
server.use("/login", userRouter);
server.use("/planner", plannerRouter);
server.use(logger);

//edit to true to read map.sql and insert into database
if (false) {
  readMap.readMap();
}

//edit to true to create tables to database
if (false) {
  readMap.createTables();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Products API listening to port", PORT);
});

server.use(unknownEndpoint);
server.use(errorHandler);

export default server;
