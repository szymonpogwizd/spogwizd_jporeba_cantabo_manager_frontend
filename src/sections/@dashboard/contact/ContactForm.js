import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import SelectType from "./SelectType";
import TextFieldName from "./TextFieldName"
import TextFieldDescribe from "./TextFieldDescribe"

export default function CheckboxList() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/contact")
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
    fetch(`http://localhost:8080/dashboard/contact/${value}`, { method: "DELETE" })
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

return (
    <div>
      <TextFieldName handleSearch={handleSearch} />
      <SelectType />
      <TextFieldDescribe/>

    </div>
  );
}