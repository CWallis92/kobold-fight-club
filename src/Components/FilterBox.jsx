import {
  Select,
  Input,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { useStyles } from "../utils/makeStyles";

import { updateCategory } from "../utils/monsterListFilters";

const FilterBox = ({ category, fullCat, setCategory, allSelected }) => {
  const classes = useStyles();

  return (
    <fieldset>
      <legend>Size</legend>
      <Select
        labelId={`${category}MultiSelect`}
        id={`${category}MultiSelect`}
        multiple
        value={category}
        onChange={(event) =>
          updateCategory(event, category, fullCat, setCategory)
        }
        input={<Input />}
        renderValue={(() => {
          return (selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value[0].toUpperCase() + value.slice(1)}
                  className={classes.chip}
                />
              ))}
            </div>
          );
        })()}
      >
        {allSelected !== null && (
          <MenuItem
            value="all"
            classes={{
              root: allSelected ? classes.selectedAll : "",
            }}
          >
            <Checkbox
              checked={allSelected}
              indeterminate={
                category.length > 0 && category.length < fullCat.length
              }
            />
            <ListItemText
              primary="Select All"
              classes={{ primary: classes.selectAllText }}
            />
          </MenuItem>
        )}
        {fullCat.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={category.indexOf(item) > -1} />
            <ListItemText primary={item[0].toUpperCase() + item.slice(1)} />
          </MenuItem>
        ))}
      </Select>
    </fieldset>
  );
};

export default FilterBox;
