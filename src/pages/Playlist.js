import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
   SearchField,
   SelectCategory,
   TextFieldName,
   PlaylistEditList,
   FloatingActionButtonsSave,
   FloatingActionButtonsAdd,
   PlaylistList,
   CheckboxCategories,
} from '../sections/@dashboard/playlists';


export default function Playlist() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (newCategories) => {
    setSelectedCategories(newCategories);
  };

return (
    <>
      <Helmet>
        <title> Playlisty | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
           <Typography variant="h4" sx={{ mb: 5 }}>
            Playlisty
            </Typography>
            <Grid container spacing ={10}>
                <Grid item xs ={12} sm={6}>
                     {/* Lewa strona */}
                    <Grid>
                        <PlaylistList/>
                    </Grid>
                    <Grid>
                        <FloatingActionButtonsAdd />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                     {/* Prawa strona */}
                    <Grid>
                        <Grid item xs={12}>
                            <TextFieldName />
                            <CheckboxCategories onChange={handleCategoryChange} value={selectedCategories} />
                            <PlaylistEditList />
                        </Grid>
                        <Grid>
                            <FloatingActionButtonsSave />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
      </Container>
    </>
  );
}
