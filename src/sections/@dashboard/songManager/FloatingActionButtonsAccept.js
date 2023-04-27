import * as React from 'react';
import Fab from '@mui/material/Fab';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';

export default function FloatingActionButtonsAdd() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Fab color="primary" aria-label="swipeRightAlt" sx={{ marginTop: 4 }}>
        <SwipeRightAltIcon />
      </Fab>
    </div>
  );
}
