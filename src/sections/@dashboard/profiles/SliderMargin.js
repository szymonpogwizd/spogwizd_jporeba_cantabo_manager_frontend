import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SliderMargin({ setMarginValue, marginValue }) {
  const [sliderValue, setSliderValue] = useState(marginValue);

  useEffect(() => {
    setSliderValue(marginValue);
  }, [marginValue]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setMarginValue(newValue);
  };  return (
    <FormControl sx={{ marginBottom: 1}}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Margines
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
