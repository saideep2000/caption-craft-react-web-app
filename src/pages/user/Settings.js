import React, { useState } from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DisplayMessage from '../components/DisplayMessage';

function Settings() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [saved, setSaved] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSave = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    setSaved(true);
  };

  return (
    <div style={{ overflow: 'hidden', width: '100%', textAlign: 'center', paddingTop: '64px', paddingBottom: '32px' }}>
      <Header activeTab="Settings" />

      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Email ID"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
          {saved && <Typography style={{ marginTop: '16px', color: 'green' }}>Changes saved successfully!</Typography>}
          {}
          <div style={{ height: '32px' }}></div>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default Settings;
