import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchField from "./SearchField";
import SelectType from "./SelectType";
import AlertMessage from '../common/AlertMessage';

export default function UserList({ refreshKey }) {
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState("");

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/users", { headers })
      .then((response) => response.json())
      .then((data) => {
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
  }, [itemToDelete, refreshKey]);

    const handleDelete = (id) => () => {
      const item = data.find((item) => item.id === id);
      if (!item) {
        return;
      }

      fetch(`http://localhost:8080/dashboard/users/${id}`, {
         method: "DELETE",
         headers
       })
        .then(() => {
          setItemToDelete(id);
          setSuccessAlertMessage(`Pomyślnie usunięto kategorię pieśni ${item.name}`);
          setShowSuccessAlert(true);
        })
        .catch((error) => {
          setAlertMessage(`${error.message}`);
          setShowAlert(true);
        });
    };

    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    const handleCloseSuccessAlert = () => {
      setShowSuccessAlert(false);
    };

    const resetAlert = () => {
      setAlertMessage("");
    };

  const handleToggle = (value) => () => {
    // logika do zrobienia
  }

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

return (
    <div>
      <SearchField handleSearch={handleSearch} />

      {showAlert && (
        <AlertMessage
          severity="error"
          title="Błąd"
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}

        {showSuccessAlert && (
          <AlertMessage
            severity="success"
            title="Sukces"
            message={successAlertMessage}
            onClose={handleCloseSuccessAlert}
            resetAlert={resetAlert}
          />
        )}

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