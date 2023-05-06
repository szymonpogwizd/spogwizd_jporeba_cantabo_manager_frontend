import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
    GroupList,
    FloatingActionButtonsAdd,
    TextFieldName,
    FloatingActionButtonsSave,
    SwitchActive,
    AdminList,
    UserList,
} from '../sections/@dashboard/groups';


export default function Grupy() {
return (
    <>
      <Helmet>
        <title> Użytkownicy | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
           <Typography variant="h4" sx={{ mb: 5 }}>
            Grupy
            </Typography>

            <Grid container spacing ={10}>

                <Grid item xs ={12} sm={6}>
                 {/* Lewa strona */}
                    <Grid>
                         <GroupList/>
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
                        </Grid>

                        <Grid item xs={12}>
                        <SwitchActive />
                        </Grid>
                        <Grid item xs={12}>
                        <AdminList />
                        </Grid>
                        <Grid item xs={12}>
                        <UserList />
                        </Grid>




                    </Grid>
                  </Grid>


            </Grid>

      </Container>
    </>
  );
}
