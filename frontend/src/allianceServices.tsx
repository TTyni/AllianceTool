import axios from "axios";
const baseURL = "http://127.0.0.1:3000/";

const getAlliance = async (alliance: string) => {
  const request = axios.get(baseURL + "alliances/" + alliance);
  const result = await request;
  return result.data;
};

const getAllAlliances = async () => {
  const request = axios.get(baseURL + "alliances");
  const result = await request;
  return result.data;
};

const getPlayerVillages = async (player: string) => {
  const request = axios.get(baseURL + "players/" + player);
  const result = await request;
  return result.data;
};

const insertNewTags = async (
  fieldID: number,
  off: boolean,
  def: boolean,
  target: boolean
) => {
  const data = { off, def, target };
  const request = axios.post(baseURL + "tags/" + fieldID, data);
  const result = await request;
  return result.data;
};

const getAll = async () => {
  const request = axios.get(baseURL);
  const result = await request;
  return result.data;
};

const updateTags = async (
  fieldID: number,
  off: boolean,
  def: boolean,
  target: boolean
) => {
  const data = { off, def, target };
  const request = axios.put(baseURL + "tags/" + fieldID, data);
  const result = await request;
  return result.data;
};

const getAllTags = async () => {
  const request = axios.get(baseURL + "tags/");
  const result = await request;
  return result.data;
};

export default {
  getAlliance,
  getPlayerVillages,
  getAllAlliances,
  insertNewTags,
  updateTags,
  getAllTags,
  getAll,
};
