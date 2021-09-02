import * as axios from "axios";

const endpoint = axios.create({
  baseURL: "https://api.open5e.com/",
  timeout: 5000,
});

export const getMonsters = (limit = 1) => {
  return endpoint.get(`/monsters?limit=${limit}`);
};

export const getMonsterData = (monster_id) => {
  return endpoint.get(`/monsters/${monster_id}`);
};
