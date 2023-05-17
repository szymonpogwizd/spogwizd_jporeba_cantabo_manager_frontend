import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldName({ onChange, value }) {
  return (
      <TextField
        id="outlined-basic"
        label="Autor muzyki"
        variant="outlined"
        fullWidth sx={{ marginBottom: 2 }}
        onChange={onChange}
        value={value}/>
  );
}
