import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  UserList,
  FloatingActionButtonsAdd,
  FloatingActionButtonsSave,
  TextFieldName,
  SelectRole,
  SelectGroup,
  SwitchActive,
  TextFieldEmail,
  SetPassword,
  AlertMessage,
} from '../sections/@dashboard/users';

// ----------------------------------------------------------------------   

export default function Users() {
  const theme = useTheme();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [activeValue, setActiveValue] = useState(true);
  const [roleValue, setRoleValue] = useState('');
  const [groupValue, setGroupValue] = useState();
  const [passwordValue, setPasswordValue] = useState();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [resetPasswords, setResetPasswords] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

   const handleSaveClick = () => {

  const resetForm = () => {
    setNameValue("");
    setEmailValue("");
    setActiveValue(true);
    setRoleValue('USER');
    setGroupValue(null);
    setResetPasswords(true);
  };

    const data = {
      name: nameValue,
      email: emailValue,
      active: activeValue,
      userType: roleValue,
      group: groupValue,
      password: passwordValue,
    };

      fetch("http://localhost:8080/dashboard/users", {
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
            setSuccessAlertMessage(`Pomyślnie utworzono użytkownika ${nameValue}`);
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

    const handleEmailChange = (event) => {
      const value = event.target.value;
      setEmailValue(value);
    }

    const handleSwitchChange = (value) => {
      setActiveValue(value);
    };

    const handleRoleChange = (value) => {
      setRoleValue(value);
    };

    const handleGroupChange = (value) => {
        setGroupValue(value);
    };

    const handlePasswordChange = (value) => {
      setPasswordValue(value);
    };

    const handlePasswordsMatchChange = (value) => {
      setPasswordsMatch(value);
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

  return (
    <>
      <Helmet>
        <title> Użytkownicy | Cantabo Manager </title>
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
          Użytkownicy
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                <UserList refreshKey={refreshKey} />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsAdd />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Grid>
              <Grid item xs={12}>
                <TextFieldName onChange={handleNameChange} value={nameValue} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldEmail onChange={handleEmailChange} value={emailValue}/>
              </Grid>
              <Grid item xs={12}>
                <SelectRole onChange={handleRoleChange} value={roleValue} />
              </Grid>
              <Grid item xs={12}>
                <SelectGroup onChange={handleGroupChange} value={groupValue || ""} />
              </Grid>
              <Grid item xs={12}>
                <SwitchActive onSwitchChange={handleSwitchChange} activeValue={activeValue} />
              </Grid>
              <Grid item xs={12}>
                <SetPassword
                    onPasswordChange={handlePasswordChange}
                    onPasswordsMatchChange={handlePasswordsMatchChange}
                    resetPasswords={resetPasswords}
                    onReset={() => setResetPasswords(false)}
                />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsSave onClick={handleSaveClick} disabled={!passwordsMatch}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Container>
    </>
  );
}
