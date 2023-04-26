import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup() {
  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Domyślne wyrównanie tekstu
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        defaultValue="CENTER"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="LEFT"
          control={<Radio />}
          label="Do lewej"
        />
        <FormControlLabel
          value="CENTER"
          control={<Radio />}
          label="Do środka"
        />
        <FormControlLabel
          value="RIGHT"
          control={<Radio />}
          label="Do prawej"
        />
      </RadioGroup>
    </FormControl>
  );
}
