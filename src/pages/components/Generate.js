import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Chip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Generate() {
  // State to hold the textarea value and selected styles
  const [text, setText] = useState('');
  const [styles, setStyles] = useState([]);

  // Handle change in text area
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Handle style addition
  const addStyle = (style) => {
    // Add the selected style to the styles array if it's not already included
    if (!styles.includes(style)) {
      setStyles((prevStyles) => [...prevStyles, style]);
    }
  };

  // Handle image generation
  const generateImage = () => {
    // Implement image generation logic here
    console.log('Generating image with the following text and styles:', text, styles);
  };

  // Example styles - replace with your actual styles
  const availableStyles = ['Art', 'Natural', 'Digital', 'Bokeh', 'moody', 'black-white', 'oil painting', 'cartoon', 'line art', 'wood carving', 'origami', 'colourful'];

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
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={generateImage} 
        sx = {{bgcolor : "black" , 
            '&:hover': {
                color : "white",
                backgroundColor: 'green',
              }
        }}>
          Generate
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Choose styles:</Typography>
        {availableStyles.map((style) => (
          <Button key={style} variant="outlined" onClick={() => addStyle(style)} startIcon={<AddCircleOutlineIcon />}
          sx = {{color : "black",  variant : "contained",
            '&:hover': {
                color : "white",
                backgroundColor: 'green',
              }

          }}
          >
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
    </Grid>
  );
}

export default Generate;
