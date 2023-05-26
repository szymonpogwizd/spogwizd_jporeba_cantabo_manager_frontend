import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxCategories({ onChange, selectedCategories }) {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    fetchOptions();
  }, []);

  React.useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("selectedSongCategories"));
    if (storedCategories) {
      onChange(storedCategories.map((item) => options.find((option) => option.id === item)));
    }
  }, [options]);

  const fetchOptions = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    fetch("http://localhost:8080/dashboard/songCategories", { headers })
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
      getOptionLabel={(option) => option ? option.name : ''}
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
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      value={selectedCategories}
    />
  );
}
