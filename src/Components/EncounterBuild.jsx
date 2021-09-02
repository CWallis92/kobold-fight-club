const EncounterBuild = ({ children, encounterBuild }) => {
  return (
    <section>
      <h2>Encounter</h2>
      {encounterBuild.length > 0
        ? encounterBuild.map((monster) => {
            return (
              <div key={monster.slug} className="encounterMonster">
                <p>{monster.slug}</p>
                <p>{monster.name}</p>
                <p>{monster.count}</p>
              </div>
            );
          })
        : children}
    </section>
  );
};

export default EncounterBuild;
