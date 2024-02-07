import executeQuery from "../db.js";
import * as queries from "../queries.js";

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
  const result = await executeQuery.executeQuery(queries.findPlayer, [
    playerName,
  ]);
  console.log(`Found ${playerName}`);
  return result;
};

const findAlliance = async (alliance: string) => {
  const result = await executeQuery.executeQuery(queries.findAlliance, [
    alliance,
  ]);
  console.log(`Found ${alliance} alliances`);
  return result;
};

const getAllAlliances = async () => {
  const result = await executeQuery.executeQuery(queries.getAllAlliances);
  console.log(`Found ${result.rows.length}`);
  return result;
};

//tags maybe move to own file later?
const setNewTags = async (fieldID, off, def, target) => {
  const result = await executeQuery.executeQuery(queries.setNewTags, [
    fieldID,
    off,
    def,
    target,
  ]);
  console.log("New tags set");
  return result;
};

const updateTag = async (fieldID, off, def, target) => {
  const result = await executeQuery.executeQuery(queries.updateTag, [
    fieldID,
    off,
    def,
    target,
  ]);
  console.log("Tags updated");
  return result;
};

const findTags = async (fieldID: string) => {
  const result = await executeQuery.executeQuery(queries.findTags, [fieldID]);
  console.log(`Found tags of ${fieldID}`);
  return result;
};

const findAllTags = async () => {
  const result = await executeQuery.executeQuery(queries.findAllTags);
  console.log(`Found all tags`);
  return result;
};

const deleteTag = async (fieldID: string) => {
  const result = await executeQuery.executeQuery(queries.deleteTag, [fieldID]);
  console.log(`Deleted tags of ${fieldID}`);
  return result;
};

const getTargets = async () => {
  const result = await executeQuery.executeQuery(queries.getTargets);
  console.log(`Found ${result.rows.length} results`);
  return result;
};

const getOffs = async () => {
  const result = await executeQuery.executeQuery(queries.getOffs);
  console.log(`Found ${result.rows.length} results`);
  return result;
};

const getDefs = async () => {
  const result = await executeQuery.executeQuery(queries.getDefs);
  console.log(`Found ${result.rows.length} results`);
  return result;
};

export default {
  findAll,
  findOne,
  findPlayer,
  findAlliance,
  getAllAlliances,
  setNewTags,
  findTags,
  updateTag,
  deleteTag,
  findAllTags,
  getTargets,
  getOffs,
  getDefs,
};
