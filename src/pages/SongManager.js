import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import {
  FloatingActionButtonsSave,
  FloatingActionButtonsAccept,
  TextFieldName,
  TextFieldMusicAuthor,
  TextFieldWordsAuthor,
  CheckboxCategories,
  Editor,
  AlertMessage,
} from '../sections/@dashboard/songManager';

export default function SongManager() {
  const theme = useTheme();
    const [nameValue, setNameValue] = useState("");
    const [musicAuthorValue, setMusicAuthorValue] = useState("");
    const [wordsAuthorValue, setWordsAuthorValue] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [errorCount, setErrorCount] = useState(0);

  const [previewHtml, setPreviewHtml] = useState('');

  const handlePreviewChange = (html) => {
    setPreviewHtml(html);
  };

    const handleSaveClick = () => {

    const resetForm = () => {
      setNameValue("");
      setMusicAuthorValue("");
      setWordsAuthorValue("");
      setSelectedCategories([]);
    };

      const data = {
        name: nameValue,
        musicAuthor: musicAuthorValue,
        wordsAuthor: wordsAuthorValue,
        songCategories: selectedCategories,
      };

        fetch("http://localhost:8080/dashboard/songManager", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
              setSuccessAlertMessage(`Pomyślnie utworzono pieśń ${nameValue}`);
              setShowSuccessAlert(true);
              resetForm();
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

      const handleMusicAuthorChange = (event) => {
        const value = event.target.value;
        setMusicAuthorValue(value);
      }

      const handleWordsAuthorChange = (event) => {
        const value = event.target.value;
        setWordsAuthorValue(value);
      }

const handleCategoriesChange = (newValue) => {
    console.log(newValue);
    setSelectedCategories(newValue);
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
        <title> Zarządzanie pieśniami | Cantabo Manager </title>
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
          Zarządzanie pieśniami
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={7}>
            <Grid>
              <Grid item xs={12}>
                <TextFieldName onChange={handleNameChange} value={nameValue}/>
              </Grid>
              <Grid item xs={12}>
                <CheckboxCategories onChange={handleCategoriesChange} value={selectedCategories}/>
              </Grid>
              <Grid item xs={12} container spacing={8}>
                <Grid item xs={6}>
                  <TextFieldWordsAuthor onChange={handleMusicAuthorChange} value={musicAuthorValue}/>
                </Grid>
                <Grid item xs={6}>
                  <TextFieldMusicAuthor onChange={handleWordsAuthorChange} value={wordsAuthorValue}/>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Editor />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsAccept />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsSave onClick={handleSaveClick}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
