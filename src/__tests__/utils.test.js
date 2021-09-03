import { updateEncounterBuild } from "../utils/encounterBuild";

describe("encounterBuild()", () => {
  test("works", () => {
    expect(updateEncounterBuild(1)).toBe(0);
  });
});
