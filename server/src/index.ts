import express from "express";
import readMap from "./db.js";

const server = express();

if (false) {
  readMap.readMap();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Products API listening to port", PORT);
});

export default server;
