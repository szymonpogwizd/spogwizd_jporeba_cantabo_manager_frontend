import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButtonsAdd() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Fab color="primary" aria-label="add" sx={{ marginTop: 4 }}>
        <AddIcon />
      </Fab>
    </div>
  );
}
