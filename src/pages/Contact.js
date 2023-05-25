import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, } from '@mui/material';
import {
RadioGroupAlign,
ContactForm,
FloatingActionButtonsSend,

} from '../sections/@dashboard/contact';

export default function Contact() {


return (
    <>
      <Helmet>
        <title> Kontakt | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
           <Typography variant="h4" sx={{ mb: 5 }}>
            Kontakt
            </Typography>

            <Grid container spacing ={10}>

                <Grid item xs ={12} sm={6}>
                 {/* Lewa strona */}
                 <Grid>
                        <Grid item xs={12}>
                         <RadioGroupAlign />
                        </Grid>
                    </Grid>
                 </Grid>

                  <Grid item xs={12} sm={6}>
                  {/* Prawa strona */}
                  <Grid>
                    <Grid item xs={12}>
                     <ContactForm/>
                    </Grid>
                     <Grid item xs={12}>
                       <FloatingActionButtonsSend />
                    </Grid>
                    </Grid>

                  </Grid>


            </Grid>

      </Container>
    </>
  );
}