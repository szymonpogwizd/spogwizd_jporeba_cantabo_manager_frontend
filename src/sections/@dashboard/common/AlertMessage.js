import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/system';

const StyledAlert = styled(Alert)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10000,
});

export default function AlertMessage({ severity, title, message, onClose }) {
  return (
    <Slide direction="down" in mountOnEnter unmountOnExit>
      <StyledAlert severity={severity} onClose={onClose} variant="filled">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </StyledAlert>
    </Slide>
  );
}
