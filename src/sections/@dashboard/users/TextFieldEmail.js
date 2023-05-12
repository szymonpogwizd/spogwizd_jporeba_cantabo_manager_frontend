import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldName({ onChange }) {
  return (
      <TextField id="outlined-basic" name="email" label="Email" variant="outlined" fullWidth sx={{ width: "100%", marginBottom: 2 }} onChange={onChange}/>
  );
}
