import { useState } from "react";

import {
  EncounterParty,
  EncounterBuild,
  MonstersFilter,
  MonstersList,
} from "../Components";

const EncounterBuilder = () => {
  const [encounterBuild, setEncounterBuild] = useState([]);

  return (
    <main>
      <div id="leftCol" className="col">
        <EncounterParty />
        <EncounterBuild encounterBuild={encounterBuild}>
          <p>Start adding some monsters</p>
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
