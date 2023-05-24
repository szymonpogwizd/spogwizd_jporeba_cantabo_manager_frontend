import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
// sections
import {
  ProfileList,
  FloatingActionButtonsAdd,
  FloatingActionButtonsSave,
  TextFieldName,
  SwitchActive,
  SwitchSortByUsed,
  SwitchShowTitle,
  SwitchAllBig,
  SwitchShowEmptySlide,
  SwitchInvertColors,
  SwitchExpandedList,
  RadioGroupAlign,
  SliderMargin,
  SliderMaxFont,
  SliderMaxMin,
  ColorPickerBackground,
  ColorPickerText,
  ColorPickerStop,
  AlertMessage,
} from '../sections/@dashboard/profiles';

// ----------------------------------------------------------------------

export default function Profiles() {
    const theme = useTheme();
    const [nameValue, setNameValue] = useState("");
    const [activeValue, setActiveValue] = useState(false);
    const [sortByUsedValue, setSortByUsedValue] = useState(false);
    const [showTitleValue, setShowTitleValue] = useState(false);
    const [allBigValue, setAllBigValue] = useState(false);
    const [showEmptySlideValue, setShowEmptySlideValue] = useState(true);
    const [invertColorsValue, setInvertColorsValue] = useState(false);
    const [expandedListValue, setExpandedListValue] = useState(false);
    const [maxFontValue, setMaxFontValue] = useState(20);
    const [marginValue, setMarginValue] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    const handleSaveClick = () => {

      const resetForm = () => {
        setNameValue("");
        setActiveValue(false);
        setSortByUsedValue(false);
        setShowTitleValue(false);
        setAllBigValue(false);
        setShowEmptySlideValue(true);
        setInvertColorsValue(false);
        setExpandedListValue(false);
        setMaxFontValue(20);
        setMarginValue(1);
      };

      const data = {
        name: nameValue,
        active: activeValue,
        sortByUsed: sortByUsedValue,
        showTitle: showTitleValue,
        allBig: allBigValue,
        showEmptySlide: showEmptySlideValue,
        invertColors: invertColorsValue,
        expandedList: expandedListValue,
        maxFont: maxFontValue,
        margin: marginValue,
      };

        fetch("http://localhost:8080/dashboard/profiles", {
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
              setSuccessAlertMessage(`Pomyślnie utworzono profil ${nameValue}`);
              setShowSuccessAlert(true);
              resetForm();
              setRefreshKey(prevKey => prevKey + 1);
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

      const handleSwitchChange = (value) => {
        setActiveValue(value);
      };

      const handleSortByUsedChange = (value) => {
        setSortByUsedValue(value);
      };

      const handleShowTitle = (value) => {
        setShowTitleValue(value);
      };

      const handleAllBig = (value) => {
        setAllBigValue(value);
      }

      const handleShowEmptySlide = (value) => {
        setShowEmptySlideValue(value);
      }

      const handleInvertColors = (value) => {
        setInvertColorsValue(value);
      }

      const handleExpandedList = (value) => {
        setExpandedListValue(value);
      }

      const handleMaxFont = (value) => {
        setMaxFontValue(value);
      }

      const handleMargin = (value) => {
        setMarginValue(value);
      }

  return (
    <>
      <Helmet>
        <title> Profile | Cantabo Manager </title>
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
          Profile
        </Typography>

         <Grid container spacing={10}>

          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                <ProfileList refreshKey={refreshKey} />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsAdd />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Box
              sx={{
                width: "100%",
                height: "61.4vh",
                overflow: "auto",
              }}
            >
            <Grid>
              <Grid item xs={12}>
                <TextFieldName onChange={handleNameChange} value={nameValue} />
              </Grid>
              <Grid item xs={12}>
                <SwitchActive onSwitchChange={handleSwitchChange} activeValue={activeValue}/>
              </Grid>
              <Grid item xs={12}>
                <SwitchSortByUsed onSwitchChange={handleSortByUsedChange} sortByUsedValue={sortByUsedValue} />
              </Grid>
              <Grid item xs={12}>
                <RadioGroupAlign />
              </Grid>
              <Grid item xs={12}>
                <SliderMaxFont setMaxFontValue={setMaxFontValue} maxFontValue={maxFontValue} />
              </Grid>
              <Grid item xs={12}>
                <SliderMargin setMarginValue={setMarginValue} marginValue={marginValue}/>
              </Grid>
              <Grid item xs={12}>
                <SliderMaxMin />
              </Grid>
              <Grid item xs={12}>
                <ColorPickerBackground />
              </Grid>
              <Grid item xs={12}>
                <ColorPickerText />
              </Grid>
              <Grid item xs={12}>
                <ColorPickerStop />
              </Grid>
              <Grid item xs={12}>
                <SwitchShowTitle onSwitchChange={handleShowTitle} showTitleValue={showTitleValue} />
              </Grid>
              <Grid item xs={12}>
                <SwitchAllBig onSwitchChange={handleAllBig} allBigValue={allBigValue}/>
              </Grid>
              <Grid item xs={12}>
                <SwitchShowEmptySlide onSwitchChange={handleShowEmptySlide} showEmptySlideValue={showEmptySlideValue}/>
              </Grid>
              <Grid item xs={12}>
                <SwitchInvertColors onSwitchChange={handleInvertColors} invertColorsValue={invertColorsValue}/>
              </Grid>
              <Grid item xs={12}>
                <SwitchExpandedList onSwitchChange={handleExpandedList} expandedListValue={expandedListValue}/>
              </Grid>
            </Grid>
            </Box>
            <Grid item xs={12}>
             <FloatingActionButtonsSave onClick={handleSaveClick}/>
           </Grid>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}
