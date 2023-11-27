import React from 'react';
import { Typography } from '@mui/material';

function DisplayMessage({ message }) {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <Typography variant="h2" component="h2">
        I'm {message}, i need to be repaired !!!
      </Typography>
    </div>
  );
}
export default DisplayMessage;
