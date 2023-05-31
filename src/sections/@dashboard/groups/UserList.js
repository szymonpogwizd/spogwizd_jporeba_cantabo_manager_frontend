import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchField from "./SearchField";
import SelectType from "./SelectUser";

export default function CheckboxList() {
  const [searchText, setSearchText] = useState("");
  const handleToggle = (value) => () => {
    // logika
  };

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

return (
    <div>

      <SelectType />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "9vh",
          overflow: "auto",
        }}
      >
        {[0, 1].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          if (searchText && !(`Line item ${value + 1}`.toLowerCase().includes(searchText.toLowerCase()))) {
            return null;
          }

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ p: 0 }}
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)}>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}