import { useState, useEffect } from "react";
import { getMonsters } from "../utils/api";

export const useMonsters = () => {
  const [fullMonsters, setFullMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [monstersSort, setMonstersSort] = useState({
    column: "name",
    order: "asc",
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    getMonsters()
      .then(({ data: { count } }) => {
        // Assumes 50 items per page, as per docs https://api.open5e.com/
        return getMonsters(count);
      })
      .then(({ data: { results } }) => {
        setFullMonsters(
          results.map((monster) => {
            monster.id = monster.slug;
            return monster;
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredMonsters(fullMonsters);
  }, [fullMonsters]);

  return {
    fullMonsters,
    filteredMonsters,
    setFilteredMonsters,
    isLoading,
    monstersSort,
    setMonstersSort,
    error,
  };
};
