import * as axios from "axios";

const endpoint = axios.create({
  baseURL: "https://www.dnd5eapi.co/api/",
  timeout: 5000,
});

export const getMonsters = () => {
  return endpoint.get("/monsters");
};

export const getMonsterData = (monster_id) => {
  return endpoint.get(`/monsters/${monster_id}`);
};
