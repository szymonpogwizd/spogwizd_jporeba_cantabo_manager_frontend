import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EmptyList({ idValue, setSongsValue, refreshKey }) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (idValue !== "") {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };

      fetch(`http://localhost:8080/dashboard/playlist/songsForPlaylist/${idValue}`, { headers })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else {
      setData([]);
    }
  }, [idValue, refreshKey]);

  const handleDelete = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  useEffect(() => {
    setSongsValue(data);
  }, [data, setSongsValue]);

  return (
    <div>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "46vh",
          overflow: "auto",
        }}
      >
        {data.map((value, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ p: 0 }}
            >
              <ListItemButton role={undefined} >
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
