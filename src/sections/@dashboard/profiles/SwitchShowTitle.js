import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SwitchShowTitle({ onSwitchChange, showTitleValue }) {
  const [isChecked, setIsChecked] = useState(showTitleValue);

  useEffect(() => {
    setIsChecked(showTitleValue);
  }, [showTitleValue]);

  const handleSwitchChange = (event) => {
    const value = event.target.checked;
    setIsChecked(value);
    onSwitchChange(value);
  };
  return (
    <FormGroup>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%", marginLeft: 0, marginBottom: 2 }}>
        <Typography>Pokazuj tytuł przed pierwszym utworem</Typography>
        <FormControlLabel
        sx={{ marginRight: 0 }}
          control={<Switch checked={isChecked} onChange={handleSwitchChange} />}
          labelPlacement="end"
        />
      </Box>
    </FormGroup>
  );
}
