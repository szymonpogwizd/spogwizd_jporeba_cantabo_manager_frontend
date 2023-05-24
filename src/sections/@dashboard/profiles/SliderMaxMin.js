import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SliderMaxMin({ setMaxMinValue, maxMinValue }) {
  const [sliderValue, setSliderValue] = useState(maxMinValue);

  useEffect(() => {
    setSliderValue(maxMinValue);
  }, [maxMinValue]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setMaxMinValue(newValue);
  };
  return (
    <FormControl sx={{ marginBottom: 1}}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Nie mniejsze niż (dot. dopasowania)
      </FormLabel>
      <Box width={340} sx={{ marginLeft: 1 }}>
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={25}
        />
      </Box>
    </FormControl>
  );
}
