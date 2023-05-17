import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  FloatingActionButtonsSave,
  PlaylistCategoryList,
  SongCategoryList,
  TextFieldNamePlaylistCategories,
  TextFieldNameSongCategories,
  AlertMessage,
} from '../sections/@dashboard/categories';
// ----------------------------------------------------------------------

export default function Categories() {
  const theme = useTheme();
    const [nameSongCategoryValue, setNameSongCategoryValue] = useState("");
    const [namePlaylistCategoryValue, setNamePlaylistCategoryValue] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

     const handleSaveSongCategoryClick = () => {

    const resetFormSongCategories = () => {
      setNameSongCategoryValue("");
    };

      const dataSongCategories = {
        name: nameSongCategoryValue,
      };

        fetch("http://localhost:8080/dashboard/songCategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSongCategories),
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((errorText) => {
                throw new Error(errorText);
              });
            }
              setSuccessAlertMessage(`Pomyślnie utworzono kategorie pieśni ${nameSongCategoryValue}`);
              setShowSuccessAlert(true);
              resetFormSongCategories();
              setRefreshKey(prevKey => prevKey + 1);
              return response.json();
          })
          .catch((error) => {
            setAlertMessage(`${error.message}`);
            setShowAlert(true);
          });
      };

      const handleSavePlaylistCategoryClick = () => {

      const resetFormPlaylistCategories = () => {
        setNamePlaylistCategoryValue("");
      };

        const dataPlaylistCategories = {
          name: namePlaylistCategoryValue,
        };

          fetch("http://localhost:8080/dashboard/playlistCategories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPlaylistCategories),
          })
            .then((response) => {
              if (!response.ok) {
                return response.text().then((errorText) => {
                  throw new Error(errorText);
                });
              }
                setSuccessAlertMessage(`Pomyślnie utworzono kategorie playlisty ${namePlaylistCategoryValue}`);
                setShowSuccessAlert(true);
                resetFormPlaylistCategories();
                return response.json();
            })
            .catch((error) => {
              setAlertMessage(`${error.message}`);
              setShowAlert(true);
            });
        };


    const handleSongCategoryNameChange = (event) => {
      const value = event.target.value;
      setNameSongCategoryValue(value);
    }

    const handlePlaylistCategoryNameChange = (event) => {
      const value = event.target.value;
      setNamePlaylistCategoryValue(value);
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
        <title> Kategorie | Cantabo Manager </title>
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

        <Grid container spacing={10}>

          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Typography variant="h4" sx={{ mb: 5 }}>
              Kategorie pieśni
            </Typography>
            <Grid>
              <Grid item xs={12}>
                <SongCategoryList refreshKey={refreshKey} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldNameSongCategories onChange={handleSongCategoryNameChange} value={nameSongCategoryValue} />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsSave onClick={handleSaveSongCategoryClick} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Typography variant="h4" sx={{ mb: 5 }}>
              Kategorie playlist
            </Typography>
            <Grid>
              <Grid item xs={12}>
                <PlaylistCategoryList />
              </Grid>
              <Grid item xs={12}>
                <TextFieldNamePlaylistCategories onChange={handlePlaylistCategoryNameChange} value={namePlaylistCategoryValue} />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsSave onClick={handleSavePlaylistCategoryClick} />
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}
