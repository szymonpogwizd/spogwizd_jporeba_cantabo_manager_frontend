import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxCategories({ onChange, setSelectedCategories, idValue, refreshKey }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
const [options, setOptions] = useState([]);
const [optionMap, setOptionMap] = useState({});

useEffect(() => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  fetch("http://localhost:8080/dashboard/playlistCategories", { headers })
    .then((response) => response.json())
    .then((data) => {
      const map = data.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
      setOptions(data);
      setOptionMap(map);
    });
}, []);

useEffect(() => {
  if (idValue !== "") {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch(
      `http://localhost:8080/dashboard/playlist/getPlaylistCategoriesForPlaylist/${idValue}`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => {
        const selected = data.map((item) => optionMap[item.id]);
        setSelectedOptions(selected);
        setSelectedCategories(selected);
      });
  } else {
    setSelectedOptions([]);
    setSelectedCategories([]);
  }
}, [idValue, setSelectedCategories, refreshKey, optionMap]);


  return (
    <Autocomplete
      sx={{ marginBottom: 2 }}
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const isChecked = selectedOptions.some((item) => item.id === option.id);
        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={isChecked}
            />
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Wybierz kategorie" />}
      onChange={(event, newValue) => {
        setSelectedOptions(newValue);
        onChange(newValue);
        setSelectedCategories(newValue);
      }}
      value={selectedOptions}
    />
  );
}
