import * as axios from "axios";

const endpoint = axios.create({
  baseURL: "https://api.open5e.com/",
  timeout: 5000,
});

export const getMonsters = (limit = 1) => {
  return endpoint.get(`/monsters?limit=${limit}`);
};
