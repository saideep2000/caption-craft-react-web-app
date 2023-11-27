import React from 'react';
import Header from './components/Header';
import Poster from './components/Poster';
import { Grid } from '@mui/material';
import Footer from './components/Footer';

function Craft() {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <Grid container direction="column" spacing={8}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Poster />
        </Grid>
        <Grid item style={{ marginBottom: '-24px' }}> 
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

export default Craft;
