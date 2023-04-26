import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SwitchLabels() {
  return (
    <FormGroup>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%", marginLeft: 0, marginBottom: 2 }}>
        <Typography>Domyślnie rozwinięta lista</Typography>
        <FormControlLabel
        sx={{ marginRight: 0 }}
          control={<Switch />}
          labelPlacement="end"
        />
      </Box>
    </FormGroup>
  );
}
