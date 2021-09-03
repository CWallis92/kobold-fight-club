import { useState } from "react";

import {
  EncounterParty,
  EncounterRandomizer,
  EncounterBuild,
  EncounterTotal,
  MonstersFilter,
  MonstersList,
} from "../Components";

const EncounterBuilder = () => {
  const [encounterBuild, setEncounterBuild] = useState([]);

  return (
    <main>
      <div id="leftCol" className="col">
        <EncounterParty />
        <h2>Encounter</h2>
        <EncounterRandomizer setEncounterBuild={setEncounterBuild} />
        {encounterBuild.length === 0 && <p>Start adding some monsters</p>}
        {encounterBuild.length > 0 && (
          <>
            <EncounterBuild
              encounterBuild={encounterBuild}
              setEncounterBuild={setEncounterBuild}
            />
            <EncounterTotal encounterBuild={encounterBuild} />
          </>
        )}
      </div>
      <div id="rightCol" className="col">
        <MonstersFilter />
        <MonstersList setEncounterBuild={setEncounterBuild} />
      </div>
    </main>
  );
};

export default EncounterBuilder;
