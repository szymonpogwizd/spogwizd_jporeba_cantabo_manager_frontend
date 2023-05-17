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

        <Grid container spacing={10}>

          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Typography variant="h4" sx={{ mb: 5 }}>
              Kategorie pieśni
            </Typography>
            <Grid>
              <Grid item xs={12}>
                <SongCategoryList />
              </Grid>
              <Grid item xs={12}>
                <TextFieldNameSongCategories />
              </Grid>
              <Grid item xs={12}>
                <FloatingActionButtonsSave />
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
                <TextFieldNamePlaylistCategories />
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
