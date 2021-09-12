import { Grid, Slider, TextField, Typography } from "@material-ui/core";
import { memo, useContext } from "react";

import { FilterBox } from "..";
import { useFilter } from "../../hooks/useFilter";
import { useStyles } from "../../styles/MonsterFilter";
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
  const classes = useStyles();

  const { fullMonsters, filteredMonsters, setFilteredMonsters, monstersSort } =
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
  } = useFilter(fullMonsters, setFilteredMonsters, monstersSort);

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={6}>
        <TextField
          label="Search"
          val={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className={classes.fields}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterBox
          categoryName={"Size"}
          categoryList={sizes}
          fullCat={allSizes}
          setCategory={setSizes}
          allSelected={allSizesSelected}
        />
      </Grid>
      <Grid item xs={3}>
        <FilterBox
          categoryName={"Type"}
          categoryList={types}
          fullCat={allTypes}
          setCategory={setTypes}
          allSelected={allTypesSelected}
        />
      </Grid>
      <Grid item xs={6}>
        <FilterBox
          categoryName={"Alignment"}
          categoryList={alignments}
          fullCat={allAlignments}
          setCategory={setAlignments}
          allSelected={allAlignmentsSelected}
        />
      </Grid>
      <Grid item xs={6}>
        <FilterBox
          categoryName={"Legendary Status"}
          categoryList={legendary}
          fullCat={allLegendary}
          setCategory={setLegendary}
          allSelected={null}
        />
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
      <Typography variant="body1">
        Total Results: {filteredMonsters.length}
      </Typography>
    </Grid>
  );
};

export default memo(MonstersFilter);
