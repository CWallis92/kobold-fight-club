import { EncounterMonsters } from "..";

const EncounterBuild = ({ encounterBuild, setEncounterBuild }) => {
  return (
    <>
      {encounterBuild.map((monster) => {
        return (
          <EncounterMonsters
            monster={monster}
            setEncounterBuild={setEncounterBuild}
            key={monster.slug}
          />
        );
      })}
    </>
  );
};

export default EncounterBuild;
