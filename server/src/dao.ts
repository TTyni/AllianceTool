import {executeQuery} from "./db.js";
import * as queries from "./queries.js";

const findAll = async () => {
  const result = await executeQuery(queries.findAll);
  console.log(`Found ${result.rows.lenght} results`);
  return result;
}

const findOne = async (id) => {
  const result = await executeQuery(queries.findOne, [id]);
  console.log(`Found ${id}`);
  return result
}

export default {findAll, findOne};