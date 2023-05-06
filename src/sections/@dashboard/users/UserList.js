import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchField from "./SearchField";
import SelectType from "./SelectType";

export default function CheckboxList() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const handleToggle = (value) => () => {
    // logika
  };

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

return (
    <div>
      <SearchField handleSearch={handleSearch} />
      <SelectType />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "50vh",
          overflow: "auto",
        }}
      >
        {data.map((item) => {
          const labelId = `checkbox-list-label-${item.id}`;

          if (
            searchText &&
            !item.name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return null;
          }

          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ p: 0 }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(item.id)}
              >
                <ListItemText id={labelId} primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}