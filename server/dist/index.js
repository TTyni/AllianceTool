import express from "express";
import readMap from "./db.js";
import dbRouter from "./dbRouter.js";
const server = express();
server.use(dbRouter);
if (false) {
    readMap.readMap();
}
const { PORT } = process.env;
server.listen(PORT, () => {
    console.log("Products API listening to port", PORT);
});
export default server;
