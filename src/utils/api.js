import * as axios from "axios";

const endpoint = axios.create({
  baseURL: "https://api.open5e.com/",
  timeout: 10000,
});

export const getMonsters = (limit = 1) => {
  return endpoint.get(`/monsters?limit=${limit}`);
};
