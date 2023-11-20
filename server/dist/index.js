import express from "express";
import readMap from "./db.js";
const server = express();
if (true) {
    readMap.readMap();
}
const { PORT } = process.env;
server.listen(PORT, () => {
    console.log("Products API listening to port", PORT);
});
