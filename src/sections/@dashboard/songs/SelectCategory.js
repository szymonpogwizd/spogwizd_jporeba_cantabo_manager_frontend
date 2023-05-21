import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels() {
    const [songCategory, setSongCategory] = React.useState('');
    const [data, setData] = useState([]);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    useEffect(() => {
      fetch("http://localhost:8080/dashboard/songCategories", { headers })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSongCategory(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", marginBottom: 2 }}>
        <InputLabel id="demo-simple-select-helper-label">Wybierz kategorie</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={songCategory}
          label="SongCategory"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}