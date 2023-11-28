import axios from "axios";
const baseURL = "http://127.0.0.1:3000/";

const logIn = async (username: string, password: string) => {
  const data = { username: username, password: password };
  const request = axios.post(baseURL + "login/login/", data);
  const result = await request;
  return result.data;
};

const registerUser = async (username: string, password: string) => {
  const data = { username: username, password: password };
  const request = axios.post(baseURL + "login/register/", data);
  const result = await request;
  return result.data;
};

export default { logIn, registerUser };
