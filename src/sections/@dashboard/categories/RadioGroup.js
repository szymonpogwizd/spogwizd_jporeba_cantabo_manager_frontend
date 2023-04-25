import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup() {
  return (
    <FormControl sx={{ marginBottom: 1 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Rodzaj kategorii
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        defaultValue="songCategory"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="songCategory"
          control={<Radio />}
          label="Pieśni"
        />
        <FormControlLabel
          value="playlistCategory"
          control={<Radio />}
          label="Playlisty"
        />
      </RadioGroup>
    </FormControl>
  );
}
