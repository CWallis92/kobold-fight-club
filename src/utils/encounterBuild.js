const cr_to_xp = {
  0: 10,
  "1/8": 25,
  "1/4": 50,
  "1/2": 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
};

export const addToEncounter = (increment, newMonster, encounterBuild) => {
  const newEncounterBuild = [];

  let inEncounter = false;

  encounterBuild.forEach((currMonster) => {
    let newCount = currMonster.count;
    if (currMonster.slug === newMonster.slug) {
      inEncounter = true;
      newCount += increment;
    }

    if (newCount > 0) {
      newEncounterBuild.push({
        slug: currMonster.slug,
        name: currMonster.name,
        challenge_rating: currMonster.challenge_rating,
        xp: cr_to_xp[currMonster.challenge_rating],
        count: newCount,
      });
    }
  });

  if (!inEncounter) {
    newEncounterBuild.push({
      slug: newMonster.slug,
      name: newMonster.name,
      challenge_rating: newMonster.challenge_rating,
      xp: cr_to_xp[newMonster.challenge_rating],
      count: 1,
    });
  }

  return newEncounterBuild;
};

export const resetEncounterMonster = (newValue, newMonster, encounterBuild) => {
  const newEncounterBuild = [];

  encounterBuild.forEach((currMonster) => {
    const newCount =
      currMonster.slug === newMonster.slug
        ? parseInt(newValue)
        : currMonster.count;
    newEncounterBuild.push({
      slug: currMonster.slug,
      name: currMonster.name,
      challenge_rating: currMonster.challenge_rating,
      xp: cr_to_xp[currMonster.challenge_rating],
      count: newCount,
    });
  });

  return newEncounterBuild;
};
