import { useState } from "react";

import { EncounterCol, MonstersCol } from "../Components";
import { EncounterContext } from "../utils/Context";

const EncounterBuilder = () => {
  const [encounterBuild, setEncounterBuild] = useState([]);

  return (
    <EncounterContext.Provider value={{ encounterBuild, setEncounterBuild }}>
      <main>
        <EncounterCol />
        <MonstersCol />
      </main>
    </EncounterContext.Provider>
  );
};

export default EncounterBuilder;
