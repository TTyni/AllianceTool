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
  fieldID: string,
  off: string,
  def: string,
  target: string
) => {
  const request = axios.post(
    baseURL + "tags/" + fieldID + "/" + off + "/" + def + "/" + target
  );
  const result = await request;
  return result.data;
};


export default { getAlliance, getPlayerVillages, getAllAlliances, insertNewTags };
