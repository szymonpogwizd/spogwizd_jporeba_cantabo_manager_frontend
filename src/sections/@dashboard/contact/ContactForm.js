import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const handleOpenMailAppSzymon = (email) => {
  window.location.href = `mailto:${email}`;
};

const handleOpenMailAppJakub = (email) => {
  window.location.href = `mailto:${email}`;
};

export default function ContactEmails() {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Napisz na wybrany e-mail:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            Szymon:
          </Typography>
          <Typography variant="body1">szymonpogwizd12@gmail.com</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleOpenMailAppSzymon("szymon@gmail.com")}
            >
              Otwórz aplikację poczty
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            Jakub:
          </Typography>
          <Typography variant="body1">jakubporeba8@gmail.com</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleOpenMailAppJakub("jakubporeba8@gmail.com")}
            >
              Otwórz aplikację poczty
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}