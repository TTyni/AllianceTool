import executeQuery from "./db.js"
import * as queries from "./queries.js";

const findAll = async () => {
  const result = await executeQuery.executeQuery(queries.findAll);
  console.log(`Found ${result.rows.length} results`);
  return result;
};

const findOne = async (id: string) => {
  const result = await executeQuery.executeQuery(queries.findOne, [id]);
  console.log(`Found ${id}`);
  return result;
};

const findPlayer = async (playerName: string) => {
  const result = await executeQuery.executeQuery(queries.findPlayer, [playerName]);
  console.log(`Found ${playerName}`);
  return result;
};

const findAlliance = async (alliance: string) => {
  const result = await executeQuery.executeQuery(queries.findAlliance, [alliance]);
  console.log(`Found ${alliance}`);
  return result;
}

const getAllAlliances = async () => {
  const result = await executeQuery.executeQuery(queries.getAllAlliances);
  console.log(`Found ${result.rows.length}`);
  return result;
}


export default { findAll, findOne, findPlayer, findAlliance, getAllAlliances };
