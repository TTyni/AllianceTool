import axios from "axios";
const baseURL = "http://127.0.0.1:3000/";

const getUser = async (username: string, passwordhash: string) => {
  const data = { username, passwordhash };
  const request = axios.post(baseURL + "login/register/", data);
  const result = await request;
  return result.data;
};

const registerUser = async (username: string, passwordhash: string) => {
  const data = { username, passwordhash };
  const request = axios.post(baseURL + "login/", data);
  const result = await request;
  return result.data;
};

export default { getUser, registerUser };
