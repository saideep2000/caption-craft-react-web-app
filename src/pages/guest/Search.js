import React from 'react'
import Header from '../components/Header';
import { Grid } from '@mui/material';
import Footer from '../components/Footer';
import SearchTags from '../components/SearchTags'

function Search() {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <Grid container direction="column" spacing={8}>
        <Grid item>
          <Header activeTab="Search"/>
        </Grid>
        <Grid item>
          <SearchTags/>
        </Grid>
        <Grid item style={{ marginBottom: '-24px' }}> 
          <Footer />
        </Grid>
      </Grid>
    </div>
  )
}

export default Search