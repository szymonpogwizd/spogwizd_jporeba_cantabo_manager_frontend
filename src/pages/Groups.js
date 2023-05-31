import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {
    GroupList,
    TextFieldName,
    FloatingActionButtonsSave,
    SwitchActive,
    AdminList,
    UserList,
} from '../sections/@dashboard/groups';

export default function Groups() {
    return (
        <>
            <Helmet>
                <title> Grupy | Cantabo Manager </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Grupy
                </Typography>

                <Stack sx={{ mb: 5 }}>
                    <Alert variant="filled" severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Ta funkcja jest w fazie rozwoju i nie jest jeszcze dostępna.
                    </Alert>
                </Stack>

                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6}>
                        {/* Lewa strona */}
                        <Grid>
                            <GroupList />
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

                            <Grid item xs={12}>
                                <FloatingActionButtonsSave />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
