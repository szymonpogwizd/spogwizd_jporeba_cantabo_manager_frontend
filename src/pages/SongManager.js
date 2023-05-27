import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import {
  FloatingActionButtonsSave,
  FloatingActionButtonsAccept,
  FloatingActionButtonsClean,
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
  const [idValue, setIdValue] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [previewHtml, setPreviewHtml] = useState('');

    useEffect(() => {
        if (nameValue === "") {
        if (localStorage.getItem("selectedSongId")) {
          setIsUpdateMode(true);
        }
          const initialIdValue = localStorage.getItem("selectedSongId");
          const initialNameValue = localStorage.getItem("selectedSongName");
          const initialMusicAuthorValue = localStorage.getItem("selectedSongMusicAuthor");
          const initialWordsAuthorValue = localStorage.getItem("selectedSongWordsAuthor");
          setNameValue(initialNameValue || "");
          setMusicAuthorValue(initialMusicAuthorValue || "");
          setWordsAuthorValue(initialWordsAuthorValue || "");
          setIdValue(initialIdValue || "");
        }
    }, [nameValue]);

    useEffect(() => {
      return () => {
        localStorage.removeItem("selectedSongId");
        localStorage.removeItem("selectedSongName");
        localStorage.removeItem("selectedSongMusicAuthor");
        localStorage.removeItem("selectedSongWordsAuthor");
        setIsUpdateMode(false);
      };
    }, []);

  const handlePreviewChange = (html) => {
    setPreviewHtml(html);
  };

      const resetForm = () => {
        setNameValue("");
        setMusicAuthorValue("");
        setWordsAuthorValue("");
        setSelectedCategories([]);
        setPreviewHtml('');
        setIdValue("");
        localStorage.removeItem("selectedSongId");
        localStorage.removeItem("selectedSongName");
        localStorage.removeItem("selectedSongMusicAuthor");
        localStorage.removeItem("selectedSongWordsAuthor");
        setRefreshKey(prevKey => prevKey + 1);
        setIsUpdateMode(false);
        setItems([]);
      };

  const handleSaveClick = () => {
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
        resetEditor();
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

  const handleCategoriesChange = (newValue) => {
    setSelectedCategories(newValue);
  }

    const handleUpdateClick = () => {
        const slides = items.map((item) => {
          return { body: item.body ? item.body : item.previewHtml };
        });

          const data = {
            song: {
              name: nameValue,
              musicAuthor: musicAuthorValue,
              wordsAuthor: wordsAuthorValue,
              songCategories: selectedCategories,
            },
            slides,
          };
          fetch(`http://localhost:8080/dashboard/songManager/${idValue}`, {
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
              setSuccessAlertMessage(`Pomyślnie zaktualizowano pieśń ${nameValue}`);
              handleCloseAlert();
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
                    setSelectedCategories={setSelectedCategories}
                    idValue={idValue}
                    refreshKey={refreshKey}
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
                <SlideList
                    initialItems={items}
                    onDeleteItem={handleDeleteItem}
                    idValue={idValue}
                    onItemsChange={setItems}
                    refreshKey={refreshKey}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <FloatingActionButtonsClean onClick={resetForm} />
                    </Grid>
                    <Grid item>
                      <FloatingActionButtonsSave
                           onClick={isUpdateMode ? handleUpdateClick : handleSaveClick}
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
