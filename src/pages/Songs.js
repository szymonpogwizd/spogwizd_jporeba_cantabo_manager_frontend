import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// sections
import {
  SongList,
  FloatingActionButtonsAdd,
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
        <FloatingActionButtonsAdd />

      </Container>
    </>
  );
}
