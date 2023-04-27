import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
  return (
      <TextField id="outlined-basic" label="Autor słów" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
  );
}
