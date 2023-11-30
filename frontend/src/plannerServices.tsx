import axios from "axios";
const baseURL = "http://127.0.0.1:3000/planner";


const getTargets = async () => {
  const request = axios.get(baseURL + "/targets");
  const result = await request;
  return result.data;
}

const getOffs = async () => {
  const request = axios.get(baseURL + "/offs");
  const result = await request;
  return result.data;
}

const getDefs = async () => {
  const request = axios.get(baseURL + "/defs");
  const result = await request;
  return result.data;
}

const getAllTags = async () => {
  const request = axios.get(baseURL + "/allTags");
  const result = await request;
  return result.data;
}
export default {getTargets, getOffs, getDefs, getAllTags};