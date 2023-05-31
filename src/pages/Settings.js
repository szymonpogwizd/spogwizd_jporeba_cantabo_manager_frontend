import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
TextFieldName,
FloatingActionButtonsSave,
SwitchActive,
SetPassword,
SliderFontSize,
} from '../sections/@dashboard/settings';


export default function Ustawienia() {
return (
    <>
      <Helmet>
        <title> Ustawienia | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
           <Typography variant="h4" sx={{ mb: 5 }}>
            Ustawienia
            </Typography>

            <Grid container spacing ={10}>

                <Grid item xs ={12} sm={6}>
                 {/* Lewa strona */}
                 <Grid>
                        <Grid item xs={12}>
                        <SwitchActive />
                        </Grid>
                        <Grid item xs={12}>
                        <SliderFontSize />
                        </Grid>
                        <Grid>
                        <FloatingActionButtonsSave />
                        </Grid>

                    </Grid>
                 </Grid>

                  <Grid item xs={12} sm={6}>
                  {/* Prawa strona */}

                  </Grid>


            </Grid>

      </Container>
    </>
  );
}
