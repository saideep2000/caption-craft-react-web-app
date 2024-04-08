import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

function NewPost({ file, onClose }) {
  // Display the image if a file is provided
  const renderImagePreview = () => {
    if (file) {
      return (
        <Box
          component="img"
          src={URL.createObjectURL(file)}
          alt="Preview"
          sx={{ maxWidth: '100%', maxHeight: '300px', marginBottom: 2 }}
        />
      );
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the post submission logic here
    console.log('Post submitted');
    onClose(); // Close the modal after submission
  };

  return (
    <Box sx={{ padding: 3, textAlign: 'center', maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>New Post</Typography>
      {renderImagePreview()}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a caption..."
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          variant = "outlined"
          placeholder="Add Tags... #Sample"
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="dark" fullWidth sx = {{color : "white", bgcolor : "black" , marginBottom: 1,
            '&:hover': {
                color : "white",
                backgroundColor: 'green',
              }
            }}>
          Post
        </Button>
      </form>
      <Button variant="text" fullWidth onClick={onClose} sx = {{color : "black", '&:hover': {color : "red"}}}>Cancel</Button>
    </Box>
  );
}

export default NewPost;
