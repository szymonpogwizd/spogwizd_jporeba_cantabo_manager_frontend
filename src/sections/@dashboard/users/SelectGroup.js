import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels({ onChange, value }) {
  const [group, setGroup] = React.useState('');
  const [data, setData] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8080/dashboard/users/groups")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", marginBottom: 2 }}>
        <InputLabel id="demo-simple-select-helper-label">Grupa</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="Groups"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((item) => (
            <MenuItem value={item} key={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}