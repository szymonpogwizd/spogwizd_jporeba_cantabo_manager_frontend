import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import CheckboxCategories from "./CheckboxCategories";
import TextFieldName from "./TextFieldName"

export default function CheckboxList() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/playlists")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);

        if (itemToDelete !== null) {
          setData((prevState) => {
            const index = prevState.findIndex((item) => item.id === itemToDelete);
            if (index !== -1) {
              prevState.splice(index, 1);
              return [...prevState];
            }
            return prevState;
          });
          setItemToDelete(null);
        }
      });
  }, [itemToDelete]);

  const handleDelete = (value) => () => {
    console.log(value);
    fetch(`http://localhost:8080/dashboard/playlists/${value}`, { method: "DELETE" })
      .then(() => {
        setItemToDelete(value);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggle = (value) => () => {
    // logika do zrobienia
  }

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const handleCategoryChange = (newCategories) => {
    setSelectedCategories(newCategories);
  };

return (
    <div>
      <TextFieldName handleSearch={handleSearch} />
        <CheckboxCategories onChange={handleCategoryChange} value={selectedCategories} />
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
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleDelete(item.id)}
                >
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