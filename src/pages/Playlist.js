import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
   SearchField,
   SelectCategory,
   TextFieldName,
   PlaylistEditList,
   FloatingActionButtonsSave,
   FloatingActionButtonsAdd,
   PlaylistList,
   CheckboxCategories,
} from '../sections/@dashboard/playlists';
import AlertMessage from '../sections/@dashboard/common/AlertMessage';

export default function Playlist() {
  const [nameValue, setNameValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [songsValue, setSongsValue] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [idValue, setIdValue] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleCategoryChange = (newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handleUpdateClick = () => {
    const resetForm = () => {
      setIdValue("");
      setNameValue("");
      setSelectedCategories([]);
      setSongsValue([]);
    };

    const data = {
      name: nameValue,
      playlistCategories: selectedCategories,
      songs: songsValue,
    };

    fetch(`http://localhost:8080/dashboard/playlist/${idValue}`, {
      method: "PUT",
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
        setSuccessAlertMessage(`Pomyślnie zaktualizowano playliste ${nameValue}`);
        handleCloseAlert();
        setShowSuccessAlert(true);
        resetForm();
        setRefreshKey(prevKey => prevKey + 1);
        setIsUpdateMode(false);
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

  return (
    <>
      <Helmet>
        <title> Playlisty | Cantabo Manager </title>
      </Helmet>

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

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Playlisty
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <PlaylistList
                refreshKey={refreshKey}
                setNameValue={setNameValue}
                setIsUpdateMode={setIsUpdateMode}
                setIdValue={setIdValue}
                setSelectedCategories={setSelectedCategories}
              />
            </Grid>
            <Grid>
              <FloatingActionButtonsAdd />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Grid>
              <Grid item xs={12}>
                <TextFieldName onChange={handleNameChange} value={nameValue} />
                <CheckboxCategories
                  onChange={handleCategoryChange}
                  setSelectedCategories={setSelectedCategories}
                  idValue={idValue}
                />
                <PlaylistEditList idValue={idValue} setSongsValue={setSongsValue} />
              </Grid>
              <Grid>
                <FloatingActionButtonsSave onClick={handleUpdateClick} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
