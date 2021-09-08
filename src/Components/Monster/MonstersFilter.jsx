import { Slider } from "@material-ui/core";
import { memo, useContext } from "react";

import { FilterBox } from "..";
import { useFilter } from "../../hooks/useFilter";
import { MonstersContext } from "../../utils/contexts";
import {
  allSizes,
  allTypes,
  allAlignments,
  allLegendary,
  valueLabelFormat,
  descale,
  scale,
} from "../../utils/monsterListFunctions";

const MonstersFilter = () => {
  const { fullMonsters, filteredMonsters, setFilteredMonsters } =
    useContext(MonstersContext);

  const {
    searchTerm,
    setSearchTerm,
    sizes,
    setSizes,
    allSizesSelected,
    types,
    setTypes,
    allTypesSelected,
    alignments,
    setAlignments,
    allAlignmentsSelected,
    legendary,
    setLegendary,
    crRange,
    setCrRange,
  } = useFilter(fullMonsters, setFilteredMonsters);

  return (
    <div id="monstersFilter">
      <fieldset>
        <legend>Search</legend>
        <input
          id="search"
          type="text"
          val={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </fieldset>
      <FilterBox
        category={sizes}
        fullCat={allSizes}
        setCategory={setSizes}
        allSelected={allSizesSelected}
      />
      <FilterBox
        category={types}
        fullCat={allTypes}
        setCategory={setTypes}
        allSelected={allTypesSelected}
      />
      <FilterBox
        category={alignments}
        fullCat={allAlignments}
        setCategory={setAlignments}
        allSelected={allAlignmentsSelected}
      />
      <FilterBox
        category={legendary}
        fullCat={allLegendary}
        setCategory={setLegendary}
        allSelected={null}
      />
      <fieldset>
        <legend>Challenge Rating</legend>
        <Slider
          value={[descale(crRange[0]), descale(crRange[1])]}
          onChange={(e, value) => {
            setCrRange([scale(value[0]), scale(value[1])]);
          }}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
          aria-labelledby="cr-slider"
          min={0}
          max={33}
          scale={scale}
          marks
        />
      </fieldset>
      <p>Total Results: {filteredMonsters.length}</p>
    </div>
  );
};

export default memo(MonstersFilter);
