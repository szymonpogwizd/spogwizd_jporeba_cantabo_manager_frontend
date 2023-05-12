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
} from '../sections/@dashboard/users';

// ----------------------------------------------------------------------   

export default function Users() {
  const theme = useTheme();
    const [nameValue, setTextValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [activeValue, setActive] = useState(false);


    const handleSaveClick = () => {
      const data = {
        name: nameValue,
        email: emailValue,
        active: activeValue,
      };

      fetch("http://localhost:8080/dashboard/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Odpowiedź z serwera:", data);
        });
    };

    const handleTextChange = (event) => {
    const value = event.target.value;
      setTextValue(value);
    }

    const handleEmailChange = (event) => {
      const value = event.target.value;
      setEmailValue(value);
    }

    const handleSwitchChange = (value) => {
      setActive(value);
    };

  return (
    <>
      <Helmet>
        <title> Użytkownicy | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Użytkownicy
        </Typography>

         <Grid container spacing={10}>

          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                {/* Pierwszy element */}
                 <UserList />
              </Grid>
              <Grid item xs={12}>
                {/* Drugi element */}
                <FloatingActionButtonsAdd />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Grid>
              <Grid item xs={12}>
                <TextFieldName onChange={handleTextChange}/>
              </Grid>
              <Grid item xs={12}>
                <TextFieldEmail onChange={handleEmailChange} />
              </Grid>
              <Grid item xs={12}>
                <SelectRole />
              </Grid>
              <Grid item xs={12}>
                <SelectGroup />
              </Grid>
              <Grid item xs={12}>
                <SwitchActive onSwitchChange={handleSwitchChange} />
              </Grid>
              <Grid item xs={12}>
                <SetPassword onSwitchChange={handleSwitchChange}/>
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
