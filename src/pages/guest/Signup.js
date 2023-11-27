import React from 'react'


import Icon from '../components/Icon';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

 function Signup() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    try {
    navigate('/Login');
    } catch (error) {
    console.error('Login failed:', error);
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Icon/>

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: 'black', // Normal state background color
                '&:hover': { // Hover state
                  backgroundColor: 'green', // Background color on hover
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
            <Grid item>
              <Link href="/Login" variant="body2" sx={{ textDecoration: 'none', color: '#3c3c3c' }}>
                Have an account? Login In
              </Link>
            </Grid>
          </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
export default Signup