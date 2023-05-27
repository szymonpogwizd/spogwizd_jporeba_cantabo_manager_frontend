import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  FloatingActionButtonsSave,
  FloatingActionButtonsClean,
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
    const [idPlaylistCategoryValue, setIdPlaylistCategoryValue] = useState("");
    const [idSongCategoryValue, setIdSongCategoryValue] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState("");
    const [refreshKeySongCategories, setRefreshKeySongCategories] = useState(0);
    const [refreshKeyPlaylistCategories, setRefreshKeyPlaylistCategories] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [isUpdateModeSongCategory, setIsUpdateModeSongCategory] = useState(false);

    const resetFormSongCategories = () => {
      setNameSongCategoryValue("");
      setIdSongCategoryValue("");
      setRefreshKeySongCategories(prevKey => prevKey + 1);
      setIsUpdateModeSongCategory(false);
    };

     const handleSaveSongCategoryClick = () => {
      const dataSongCategories = {
        name: nameSongCategoryValue,
      };

        fetch("http://localhost:8080/dashboard/songCategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
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
              handleCloseAlert();
              setShowSuccessAlert(true);
              resetFormSongCategories();
              return response.json();
          })
          .catch((error) => {
            handleCloseSuccessAlert();
            setErrorCount(prevCount => prevCount + 1);
            setAlertMessage(`[${errorCount}] ${error.message}`);
            setShowAlert(true);
          });
      };

      const handleUpdateSongCategoryClick = () => {
            const dataSongCategories = {
              name: nameSongCategoryValue,
            };

            fetch(`http://localhost:8080/dashboard/songCategories/${idSongCategoryValue}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(dataSongCategories),
            })
              .then((response) => {
                if (!response.ok) {
                  return response.text().then((errorText) => {
                    throw new Error(errorText);
                  });
                }
                setSuccessAlertMessage(`Pomyślnie zaktualizowano kategorię pieśni ${nameSongCategoryValue}`);
                handleCloseAlert();
                setShowSuccessAlert(true);
                resetFormSongCategories();
                return response.json();
              })
              .catch((error) => {
                handleCloseSuccessAlert();
                setErrorCount(prevCount => prevCount + 1);
                setAlertMessage(`[${errorCount}] ${error.message}`);
                setShowAlert(true);
              });
          };

          const resetFormPlaylistCategories = () => {
            setNamePlaylistCategoryValue("");
            setIdPlaylistCategoryValue("");
            setRefreshKeyPlaylistCategories(prevKey => prevKey + 1);
            setIsUpdateMode(false);
          };

      const handleSavePlaylistCategoryClick = () => {
        const dataPlaylistCategories = {
          name: namePlaylistCategoryValue,
        };

          fetch("http://localhost:8080/dashboard/playlistCategories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
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
                handleCloseAlert();
                setShowSuccessAlert(true);
                resetFormPlaylistCategories();
                return response.json();
            })
            .catch((error) => {
              handleCloseSuccessAlert();
              setErrorCount(prevCount => prevCount + 1);
              setAlertMessage(`[${errorCount}] ${error.message}`);
              setShowAlert(true);
            });
        };

        const handleUpdatePlaylistCategoryClick = () => {
          const dataPlaylistCategories = {
            name: namePlaylistCategoryValue,
          };

          fetch(`http://localhost:8080/dashboard/playlistCategories/${idPlaylistCategoryValue}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dataPlaylistCategories),
          })
            .then((response) => {
              if (!response.ok) {
                return response.text().then((errorText) => {
                  throw new Error(errorText);
                });
              }
              setSuccessAlertMessage(`Pomyślnie zaktualizowano kategorię playlisty ${namePlaylistCategoryValue}`);
              handleCloseAlert();
              setShowSuccessAlert(true);
              resetFormPlaylistCategories();
              return response.json();
            })
            .catch((error) => {
              handleCloseSuccessAlert();
              setErrorCount(prevCount => prevCount + 1);
              setAlertMessage(`[${errorCount}] ${error.message}`);
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
                <SongCategoryList
                    refreshKey={refreshKeySongCategories}
                    setNameSongCategoryValue={setNameSongCategoryValue}
                    setIdSongCategoryValue={setIdSongCategoryValue}
                    setIsUpdateModeSongCategory={setIsUpdateModeSongCategory}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldNameSongCategories onChange={handleSongCategoryNameChange} value={nameSongCategoryValue} />
              </Grid>
              <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <FloatingActionButtonsClean onClick={resetFormSongCategories} />
                    </Grid>
                    <Grid item>
                      <FloatingActionButtonsSave
                        onClick={isUpdateModeSongCategory ? handleUpdateSongCategoryClick : handleSaveSongCategoryClick}
                      />
                    </Grid>
                  </Grid>
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
                <PlaylistCategoryList
                    refreshKey={refreshKeyPlaylistCategories}
                    setNamePlaylistCategoryValue={setNamePlaylistCategoryValue}
                    setIdPlaylistCategoryValue={setIdPlaylistCategoryValue}
                    setIsUpdateMode={setIsUpdateMode}/>
              </Grid>
              <Grid item xs={12}>
                <TextFieldNamePlaylistCategories onChange={handlePlaylistCategoryNameChange} value={namePlaylistCategoryValue} />
              </Grid>
              <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <FloatingActionButtonsClean onClick={resetFormPlaylistCategories} />
                    </Grid>
                    <Grid item>
                      <FloatingActionButtonsSave
                        onClick={isUpdateMode ? handleUpdatePlaylistCategoryClick : handleSavePlaylistCategoryClick}
                      />
                    </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}
