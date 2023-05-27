import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CheckboxList({ initialItems, onDeleteItem, idValue, onItemsChange, refreshKey }) {
  const [items, setItems] = useState(initialItems || []);

useEffect(() => {
  if (idValue !== "") {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    fetch(`http://localhost:8080/dashboard/songManager/slidesForSong/${idValue}`,
      { headers }
    )
    .then((response) => response.json())
    .then((data) => {
      const newItems = [...items];
      data.forEach(d => {
        if (!newItems.some(item => item.id === d.id)) {
          newItems.push(d);
        }
      });
      setItems(newItems);
      if (typeof onItemsChange === 'function') {
        onItemsChange(newItems);
      }
    });
  }
}, [idValue, onItemsChange, refreshKey]);

useEffect(() => {
  if (initialItems && initialItems.length > 0) {
    setItems(prevItems => {
      const newItems = [...prevItems];
      initialItems.forEach(d => {
        if (!newItems.some(item => item.id === d.id)) {
          newItems.push(d);
        }
      });
      return newItems;
    });
  }
}, [initialItems, refreshKey]);

useEffect(() => {
  if(refreshKey > 0) {
    setItems([]);
  }
}, [refreshKey]);

  const handleDelete = (value) => () => {
    const newItems = items.filter(item => item.id !== value.id);
    setItems(newItems);
    onDeleteItem(value);
  };

  return (
    <div>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "61vh",
          overflow: "auto",
        }}
      >
        {items.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleDelete(value)}>
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ p: 0 }}
            >
              <ListItemButton role={undefined}>
                <ListItemText id={labelId} primary={value.body ? value.body : value.previewHtml} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
