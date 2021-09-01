import { useState } from "react";

import {
  EncounterParty,
  EncounterBuild,
  MonstersFilter,
  MonstersList,
} from ".";

const EncounterBuilder = () => {
  const [encounterBuild, setEncounterBuild] = useState([]);

  return (
    <main>
      <div id="leftCol" className="col">
        <EncounterParty />
        <EncounterBuild encounterBuild={encounterBuild}>
          <h2>Start adding some monsters</h2>
        </EncounterBuild>
      </div>
      <div id="rightCol" className="col">
        <MonstersFilter />
        <MonstersList setEncounterBuild={setEncounterBuild} />
      </div>
    </main>
  );
};

export default EncounterBuilder;
