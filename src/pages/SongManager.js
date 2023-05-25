import { useEffect, useState, useRef } from 'react';
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
  SlideList,
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
  const [items, setItems] = useState([]);
  const editorRef = useRef(null);

  const [previewHtml, setPreviewHtml] = useState('');

    useEffect(() => {
        if (nameValue === "") {
          const initialIdValue = localStorage.getItem("selectedSongId");
          const initialNameValue = localStorage.getItem("selectedSongName");
          const initialMusicAuthorValue = localStorage.getItem("selectedSongMusicAuthor");
          const initialWordsAuthorValue = localStorage.getItem("selectedSongWordsAuthor");
          setNameValue(initialNameValue || "");
          setMusicAuthorValue(initialMusicAuthorValue || "");
          setWordsAuthorValue(initialWordsAuthorValue || "");
        }
    }, [nameValue]);

    useEffect(() => {
      return () => {
        localStorage.removeItem("selectedSongId");
        localStorage.removeItem("selectedSongName");
        localStorage.removeItem("selectedSongMusicAuthor");
        localStorage.removeItem("selectedSongWordsAuthor");
        localStorage.removeItem("selectedSongCategories");
      };
    }, []);

  const handlePreviewChange = (html) => {
    setPreviewHtml(html);
  };

  const handleSaveClick = () => {
    const resetForm = () => {
      setNameValue("");
      setMusicAuthorValue("");
      setWordsAuthorValue("");
      setSelectedCategories([]);
      setPreviewHtml('');
      setItems([]);
    };

    const slides = items.map((item) => ({
      body: item.previewHtml,
    }));

    const data = {
      song: {
          name: nameValue,
          musicAuthor: musicAuthorValue,
          wordsAuthor: wordsAuthorValue,
          songCategories: selectedCategories,
        },
          slides
    };

    fetch("http://localhost:8080/dashboard/songManager", {
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
        setSuccessAlertMessage(`Pomyślnie utworzono pieśń ${nameValue}`);
        setShowSuccessAlert(true);
        resetForm();
        resetEditor();
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

const handleAddClick = () => {
  const newItem = {
    id: items.length,
    previewHtml,
  };
  setItems(prevItems => [...prevItems, newItem]);
  setPreviewHtml('');

  resetEditor();
};

  const resetEditor = () => {
    if (editorRef.current) {
      editorRef.current.handleChange('');
    }
  }

  const handleDeleteItem = (item) => {
    const newItems = items.filter((i) => i.id !== item.id);
    setItems(newItems);
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
                <CheckboxCategories
                    onChange={handleCategoriesChange}
                    selectedCategories={selectedCategories}
                />
              </Grid>
              <Grid item xs={12} container spacing={8}>
                <Grid item xs={6}>
                  <TextFieldMusicAuthor onChange={handleMusicAuthorChange} value={musicAuthorValue}/>
                </Grid>
                <Grid item xs={6}>
                  <TextFieldWordsAuthor onChange={handleWordsAuthorChange} value={wordsAuthorValue}/>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Editor onChange={handlePreviewChange} ref={editorRef} />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsAccept onClick={handleAddClick} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Grid>
              <Grid item xs={12}>
                <SlideList initialItems={items} onDeleteItem={handleDeleteItem} />
              </Grid>
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
