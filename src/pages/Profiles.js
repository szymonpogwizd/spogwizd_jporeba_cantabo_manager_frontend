import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
// sections
import {
  ProfileList,
  FloatingActionButtonsAdd,
  FloatingActionButtonsSave,
  TextFieldName,
  SwitchActive,
  SwitchSortByUsed,
  SwitchShowTitle,
  SwitchAllBig,
  SwitchShowEmptySlide,
  SwitchInvertColors,
  SwitchExpandedList,
  RadioGroupAlign,
  SliderMargin,
  SliderMaxFont,
  SliderMaxMin,
  ColorPickerBackground,
  ColorPickerText,
  ColorPickerStop,
} from '../sections/@dashboard/profiles';

// ----------------------------------------------------------------------

export default function Profiles() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Profile | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>

         <Grid container spacing={10}>

          <Grid item xs={12} sm={6}>
            {/* Lewa strona */}
            <Grid>
              <Grid item xs={12}>
                {/* Pierwszy element */}
                 <ProfileList />
              </Grid>
              <Grid item xs={12}>
                {/* Drugi element */}
                <FloatingActionButtonsAdd />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Prawa strona */}
            <Box
              sx={{
                width: "100%",
                height: "61.4vh",
                overflow: "auto",
              }}
            >
            <Grid>
              <Grid item xs={12}>
                <TextFieldName />
              </Grid>
              <Grid item xs={12}>
                <SwitchActive />
              </Grid>
              <Grid item xs={12}>
                <SwitchSortByUsed />
              </Grid>
              <Grid item xs={12}>
                <RadioGroupAlign />
              </Grid>
              <Grid item xs={12}>
                <SliderMaxFont />
              </Grid>
              <Grid item xs={12}>
                <SliderMargin />
              </Grid>
              <Grid item xs={12}>
                <SliderMaxMin />
              </Grid>
              <Grid item xs={12}>
                <ColorPickerBackground />
              </Grid>
              <Grid item xs={12}>
                <ColorPickerText />
              </Grid>
              <Grid item xs={12}>
                <ColorPickerStop />
              </Grid>
              <Grid item xs={12}>
                <SwitchShowTitle />
              </Grid>
              <Grid item xs={12}>
                <SwitchAllBig />
              </Grid>
              <Grid item xs={12}>
                <SwitchShowEmptySlide />
              </Grid>
              <Grid item xs={12}>
                <SwitchInvertColors />
              </Grid>
              <Grid item xs={12}>
                <SwitchExpandedList />
              </Grid>
            </Grid>
            </Box>
            <Grid item xs={12}>
             <FloatingActionButtonsSave />
           </Grid>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}
