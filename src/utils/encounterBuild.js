export const updateEncounterBuild = (newMonster, setEncounterBuild) => {
  setEncounterBuild((currEncounterBuild) => {
    const newEncounterBuild = [];

    currEncounterBuild.forEach((currMonster) => {
      let newCount = currMonster.count;
      if (newMonster.slug === currMonster.slug) newCount++;
      newEncounterBuild.push({
        slug: currMonster.slug,
        name: currMonster.name,
        count: newCount,
      });
    });

    if (
      !currEncounterBuild.find(
        (currMonster) => currMonster.slug === newMonster.slug
      )
    ) {
      newEncounterBuild.push({
        slug: newMonster.slug,
        name: newMonster.name,
        count: 1,
      });
    }

    return newEncounterBuild;
  });
};
