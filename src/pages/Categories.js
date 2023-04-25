import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  FloatingActionButtonsAdd,
  FloatingActionButtonsSave,
  CategoryList,
  TextFieldName,
} from '../sections/@dashboard/categories';
// ----------------------------------------------------------------------

export default function Categories() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Kategorie | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kategorie
        </Typography>

        <Grid container spacing={10}>

          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                {/* Pierwszy element */}
                <CategoryList />
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
                {/* Trzeci element */}
                <TextFieldName />
              </Grid>
              <Grid item xs={12}>
                {/* Czwarty element */}
                <FloatingActionButtonsSave />
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}
