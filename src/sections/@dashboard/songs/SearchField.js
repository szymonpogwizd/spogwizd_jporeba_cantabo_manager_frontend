import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchField = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    handleSearch(newSearchText);
  };

  return (
    <TextField
      label="Szukaj pieśni"
      fullWidth
      value={searchText}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchField;
