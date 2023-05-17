import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxCategories({ onChange, value }) {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = () => {
    fetch("http://localhost:8080/dashboard/songCategories")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
  };

  return (
    <Autocomplete
      sx={{ marginBottom: 2, marginTop: 2 }}
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Wybierz kategorie"
        />
      )}
      onChange={(event, newValue) => onChange(newValue)} // Dodane
      value={value} // Dodane
    />
  );
}