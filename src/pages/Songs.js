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
  FloatingActionButtons,
} from '../sections/@dashboard/songs';

// ----------------------------------------------------------------------

export default function Songs() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Pieśni | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Pieśni
        </Typography>

        <SongList />
        <FloatingActionButtons />

      </Container>
    </>
  );
}
