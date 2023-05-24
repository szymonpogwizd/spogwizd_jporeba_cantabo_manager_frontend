import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ColorPickerText({ setTextColorValue, textColorValue}) {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(textColorValue);
  const pickerRef = useRef(null);

    useEffect(() => {
      setColor(textColorValue);
    }, [textColorValue]);

  const handleClick = () => {
    setShowPicker(!showPicker);
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
    setTextColorValue(selectedColor.hex);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Kolor czcionki
      </FormLabel>
      <Box
        sx={{
          backgroundColor: color,
          width: "50px",
          height: "50px",
          cursor: "pointer",
          border: "1px solid black"
        }}
        onClick={handleClick}
      />
      {showPicker && (
        <Box
              ref={pickerRef}
              sx={{
                position: "absolute",
                top: "60px",
                left: "0",
                zIndex: "999",
              }}
            >
          <ChromePicker color={color} onChange={handleColorChange} value={textColorValue}/>
        </Box>
      )}
    </FormControl>
  );
}
