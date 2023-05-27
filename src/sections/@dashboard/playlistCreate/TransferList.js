import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import SearchField from '../songs/SearchField';
import SelectCategory from '../songs/SelectCategory';
import TextFieldName from './TextFieldName';
import CheckboxCategories from './CheckboxCategories';
import FloatingActionButtonsSave from '../common/FloatingActionButtonsSave';
import AlertMessage from '../common/AlertMessage';
import FloatingActionButtonsClean from '../common/FloatingActionButtonsClean';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [searchText, setSearchText] = useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [nameValue, setNameValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

const handleToggle = (value) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
};

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const fetchData = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    return fetch("http://localhost:8080/dashboard/songs", { headers })
      .then((response) => response.json())
      .then((data) => {
        setLeft(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

   const handleSaveClick = () => {

        const resetForm = () => {
          setNameValue("");
          setSelectedCategories([]);
          setRight([]);
        };

        const data = {
          name: nameValue,
          playlistCategories: selectedCategories,
          songs: right,
        };

          fetch("http://localhost:8080/dashboard/playlistCreate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (!response.ok) {
                return response.text().then((errorText) => {
                  throw new Error(errorText);
                });
              }
              handleCloseAlert();
              setSuccessAlertMessage(`Pomyślnie utworzono playliste ${nameValue}`);
              setShowSuccessAlert(true);
              resetForm();
              fetchData().then(() => {
                setRefreshKey(prevKey => prevKey + 1);
              });
              return response.json();
            })
            .catch((error) => {
              handleCloseSuccessAlert();
              setErrorCount(prevCount => prevCount + 1);
              setAlertMessage(`[${errorCount}] ${error.message}`);
              setShowAlert(true);
            });
        };

    const handleNameChange = (event) => {
      const value = event.target.value;
      setNameValue(value);
    }

    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    const handleCloseSuccessAlert = () => {
      setShowSuccessAlert(false);
    };

    const resetAlert = () => {
      setAlertMessage("");
    };

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const handleCategoryChange = (newCategories) => {
    setSelectedCategories(newCategories);
  };

  const filteredList = left.filter((value) =>
    searchText !== ""
      ? value.toLowerCase().includes(searchText.toLowerCase())
      : true
  );

  const customList = (items) => (
    <Paper sx={{ width: "100%", height: 640, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${index}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {showAlert && (
      <AlertMessage
        severity="error"
        title="Błąd"
        message={alertMessage}
        onClose={handleCloseAlert}
        resetAlert={resetAlert}
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
      <Grid item xs={12} md={5.5}>
        <SearchField handleSearch={handleSearch} />
        <SelectCategory />
        {customList(filteredList)}
      </Grid>
      <Grid item xs={12} md={1} sx={{ textAlign: "center" }}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5.5}>
        <TextFieldName onChange={handleNameChange} value={nameValue} />
        <CheckboxCategories onChange={handleCategoryChange} value={selectedCategories} />
        {customList(right)}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
           <FloatingActionButtonsSave onClick={handleSaveClick}/>
        </Grid>
      </Grid>
    </Grid>
  );
}
