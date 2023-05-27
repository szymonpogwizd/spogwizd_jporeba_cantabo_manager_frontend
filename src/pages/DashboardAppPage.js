import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppCurrentVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [numSongs, setNumSongs] = useState(0);
  const [numPlaylists, setNumPlaylists] = useState(0);
  const [numGroups, setNumGroups] = useState(0);
  const [numUsers, setNumUsers] = useState(0);

const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
};

useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/users", { headers })
        .then((response) => response.json())
        .then((data) => setNumUsers(data || "0"));
}, []);

useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/songs", { headers })
        .then((response) => response.json())
        .then((data) => setNumSongs(data || "0"));
}, []);

useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/playlists", { headers })
        .then((response) => response.json())
        .then((data) => setNumPlaylists(data || "0"));
}, []);

useEffect(() => {
    fetch("http://localhost:8080/dashboard/app/groups", { headers })
        .then((response) => response.json())
        .then((data) => setNumGroups(data || "0"));
}, []);

  return (
    <>
      <Helmet>
        <title> Strona główna | Cantabo Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Witaj ponownie {localStorage.getItem('email')}!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Pieśni" total={numSongs} icon={'ant-design:play-circle-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Playlisty" total={numPlaylists} color="info" icon={'ant-design:play-square-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Użytkownicy" total={numUsers} color="warning" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Grupy" total={numGroups} color="error" icon={'ant-design:group-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Current Visits"
                chartData={[
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
              />
            </Grid>
        </Grid>
      </Container>
    </>
  );
}
