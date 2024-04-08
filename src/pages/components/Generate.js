import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Chip, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as client from "./client"; // Make sure this path matches where your client module is located

function Generate({ user }) {
  const isUser = user !== undefined;
  const [text, setText] = useState('');
  const [styles, setStyles] = useState([]);
  const [imageResponse, setImageResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const addStyle = (style) => {
    if (!styles.includes(style)) {
      setStyles(prevStyles => [...prevStyles, style]);
    }
  };

  const generateImage = async () => {
    setIsLoading(true);
    setError(''); // Clear any existing errors
    try {
      console.log('Generating image with the following text and styles:', text, styles);
      const response = await client.generateImage({ 'inputs': text });
      setImageResponse(response.image);
      console.log(response.image);
    } catch (err) {
      console.error("Failed to generate image:", err);
      setError('Failed to generate image. Please try again.'); // Set an error message
      setImageResponse(''); // Clear any existing image response
    } finally {
      setIsLoading(false);
    }
  };

  const availableStyles = [
    'Art', 'Natural', 'Digital', 'Bokeh', 'moody', 'black-white',
    'oil painting', 'cartoon', 'line art', 'wood carving', 'origami', 'colourful'
  ];

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Enter your text"
          variant="outlined"
          value={text}
          onChange={handleTextChange}
        />
      </Grid>

      <Grid item xs={12} container direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={generateImage} sx={{ bgcolor: "black", margin: 2, '&:hover': { backgroundColor: 'green' } }}>
          Generate
        </Button>
        {isUser && (
          <Button variant="contained" color="primary" onClick={generateImage} // Assuming this should have a different function or be disabled until implemented
            sx={{ bgcolor: "green", margin: 2, '&:hover': { backgroundColor: 'black' } }}>
            Save
          </Button>
        )}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Choose styles:</Typography>
        {availableStyles.map((style) => (
          <Button key={style} variant="outlined" onClick={() => addStyle(style)} startIcon={<AddCircleOutlineIcon />}
            sx={{ color: "black", margin: 1, '&:hover': { backgroundColor: 'green', color: 'white' } }}>
            {style}
          </Button>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Typography variant="subtitle1">Selected Styles:</Typography>
          {styles.map((style, index) => (
            <Chip
              key={index}
              label={style}
              onDelete={() => setStyles(styles.filter((s) => s !== style))}
              style={{ margin: '5px' }}
            />
          ))}
        </Paper>
      </Grid>

      {imageResponse && (
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <img src={imageResponse} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
        </Grid>
      )}

      {isLoading && <CircularProgress />}

      {error && <Typography color="error" style={{ textAlign: 'center' }}>{error}</Typography>}
    </Grid>
  );
}

export default Generate;
