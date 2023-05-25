import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleGoToSongManager = () => {
    navigate('/dashboard/songManager');
  };

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
        <FloatingActionButtonsAdd onClick={handleGoToSongManager}/>
      </Container>
    </>
  );
}
