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
} from '../sections/@dashboard/songManager';

export default function SongManager() {
  const theme = useTheme();
  const [previewHtml, setPreviewHtml] = useState('');

  const handlePreviewChange = (html) => {
    setPreviewHtml(html);
  };

  return (
    <>
      <Helmet>
        <title> Zarządzanie pieśniami | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Zarządzanie pieśniami
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={7}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                <TextFieldName />
              </Grid>
              <Grid item xs={12}>
                <CheckboxCategories />
              </Grid>
              <Grid item xs={12} container spacing={8}>
                <Grid item xs={6}>
                  <TextFieldWordsAuthor />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldMusicAuthor />
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
            {/* Prawa strona */}
            <Grid>
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
