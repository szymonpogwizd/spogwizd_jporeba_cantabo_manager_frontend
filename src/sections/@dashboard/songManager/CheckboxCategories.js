import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxCategories({ onChange }) {
  const [options, setOptions] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

    React.useEffect(() => {
      const storedCategories = JSON.parse(localStorage.getItem("selectedSongCategories"));
      if (storedCategories) {
        setSelectedOptions(storedCategories);
      }
      fetchOptions();
    }, []);

  const fetchOptions = () => {
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
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected ? selectedOptions.includes(option.id) : false}
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
        const newSelectedIds = newValue.map((item) => item.id);
        setSelectedOptions(newSelectedIds);
        onChange(newValue);
      }}
      value={options.filter((option) => selectedOptions.includes(option.id))}
    />
  );
}