import { useState, useEffect } from "react";

import { thresholds } from "../utils/characterXPThresholds";

const useParty = () => {
  const [party, setParty] = useState([[1, 1]]);
  const [difficulty, setDifficulty] = useState({
    easy: 25,
    medium: 50,
    hard: 75,
    Deadly: 100,
  });

  useEffect(() => {
    const diffs = party.reduce(
      (prev, curr) => {
        prev.easy += thresholds[curr[0]].easy * curr[1];
        prev.medium += thresholds[curr[0]].medium * curr[1];
        prev.hard += thresholds[curr[0]].hard * curr[1];
        prev.deadly += thresholds[curr[0]].deadly * curr[1];
        return prev;
      },
      { easy: 0, medium: 0, hard: 0, deadly: 0 }
    );
    setDifficulty(diffs);
  }, [party]);

  return { party, setParty, difficulty };
};

export default useParty;
