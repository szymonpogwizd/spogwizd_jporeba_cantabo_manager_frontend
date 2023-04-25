import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Save';

export default function FloatingActionButtonsAdd() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Fab color="primary" aria-label="save" sx={{ marginTop: 4 }}>
        <AddIcon />
      </Fab>
    </div>
  );
}
