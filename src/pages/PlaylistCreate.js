import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  SongList,
} from '../sections/@dashboard/songs';
import {
  TransferList,
  FloatingActionButtonsSave,
} from '../sections/@dashboard/playlistCreate';

// ----------------------------------------------------------------------

export default function PlaylistCreate() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Tworzenie playlist | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Tworzenie playlist
        </Typography>

        <TransferList />
        <FloatingActionButtonsSave />

      </Container>
    </>
  );
}
