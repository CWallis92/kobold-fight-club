import {
  Select,
  Input,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { useStyles } from "../../styles/makeStyles";

import { updateCategory } from "../../utils/monsterListFunctions";

const FilterBox = ({
  categoryName,
  categoryList,
  fullCat,
  setCategory,
  allSelected,
}) => {
  const classes = useStyles();

  return (
    <fieldset>
      <legend>{categoryName}</legend>
      <Select
        labelId={`${categoryName.toLowerCase().replace(" ", "")}MultiSelect`}
        id={`${categoryName.toLowerCase().replace(" ", "")}MultiSelect`}
        multiple
        value={categoryList}
        onChange={(event) =>
          updateCategory(event, categoryList, fullCat, setCategory)
        }
        input={<Input />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => {
              if (selected.indexOf(value) === 3)
                return (
                  <Chip
                    key={value}
                    label={`...${selected.length - 3} more`}
                    className={classes.chip}
                  />
                );
              if (selected.indexOf(value) > 3) return "";
              return (
                <Chip
                  key={value}
                  label={value[0].toUpperCase() + value.slice(1)}
                  className={classes.chip}
                />
              );
            })}
          </div>
        )}
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
                categoryList.length > 0 && categoryList.length < fullCat.length
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
            <Checkbox checked={categoryList.indexOf(item) > -1} />
            <ListItemText primary={item[0].toUpperCase() + item.slice(1)} />
          </MenuItem>
        ))}
      </Select>
    </fieldset>
  );
};

export default FilterBox;
