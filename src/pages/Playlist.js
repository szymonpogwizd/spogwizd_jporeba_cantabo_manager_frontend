import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
   SearchField,
   SelectCategory,
   CategoryList,
   TextFieldName,
   PlaylistList,
   FloatingActionButtonsSave,
   FloatingActionButtonsAdd,

} from '../sections/@dashboard/Playlists';


export default function Playlist() {
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
                            <CategoryList/>
                        </Grid>
                        <Grid>
                            <FloatingActionButtonsAdd />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                         {/* Prawa strona */}
                        <Grid>
                            <Grid item xs={12}>
                                <PlaylistList />
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
