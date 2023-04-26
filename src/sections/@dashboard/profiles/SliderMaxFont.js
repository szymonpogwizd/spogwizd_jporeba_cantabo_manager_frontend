import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SliderSizes() {
  return (
    <FormControl sx={{ marginBottom: 1}}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Maksymalna wielkość czcionki
      </FormLabel>
      <Box width={340} sx={{ marginLeft: 1 }}>
        <Slider defaultValue={20} aria-label="Default" valueLabelDisplay="auto" max={50} />
      </Box>
    </FormControl>
  );
}
