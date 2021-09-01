const EncounterBuild = ({ encounterBuild }) => {
  return (
    <section>
      <h2>Encounter</h2>
      {encounterBuild.map((monster) => {
        return (
          <div key={monster.index} className="encounterMonster">
            <p>{monster.index}</p>
            <p>{monster.name}</p>
            <p>{monster.count}</p>
          </div>
        );
      })}
    </section>
  );
};

export default EncounterBuild;
