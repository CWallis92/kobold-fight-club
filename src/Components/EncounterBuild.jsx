import { EncounterMonsters } from ".";

const EncounterBuild = ({ children, encounterBuild, setEncounterBuild }) => {
  return (
    <section id="encounterBuild">
      {encounterBuild.map((monster) => {
        return (
          <EncounterMonsters
            monster={monster}
            setEncounterBuild={setEncounterBuild}
            key={monster.slug}
          />
        );
      })}
    </section>
  );
};

export default EncounterBuild;
