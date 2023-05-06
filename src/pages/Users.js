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
                <TextFieldName />
              </Grid>
              <Grid item xs={12}>
                <TextFieldEmail />
              </Grid>
              <Grid item xs={12}>
                <SelectRole />
              </Grid>
              <Grid item xs={12}>
                <SelectGroup />
              </Grid>
              <Grid item xs={12}>
                <SwitchActive />
              </Grid>
              <Grid item xs={12}>
                <SetPassword />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsSave />
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}
