import React, { useState , useEffect} from 'react'
import { Button, TextField, Grid, Paper, Typography, Chip, Card,CardMedia, CircularProgress} from '@mui/material';
// import * as client from "./client";
// import {useDispatch, useSelector} from "react-redux";
// import {setPosts} from "../user/userReducer";

function SearchTags({user}) {
    const isUser = (user !== undefined);
    const [text, setText] = useState('');

    const images = [
        "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=800",
      ];

    // const dispatch = useDispatch();
    const handleTextChange = (event) => {
        setText(event.target.value);
      };
      const searchTag = (event) => {
        setText(event.target.value);
      };
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ padding: '20px' }}>
        <Grid item xs={11}>
        <TextField
          fullWidth
          label="Search Tag"
          variant="outlined"
          value={text}
          onChange={handleTextChange}
        />
      </Grid>
      <Grid item xs={11} direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={searchTag} sx = {{bgcolor : "black" , margin: 2,
            '&:hover': {
                color : "white",
                backgroundColor: 'green',
              }
            }}>
            Generate
          </Button>
          {isUser ? <Button variant="contained" color="primary" onClick={searchTag} sx = {{bgcolor : "green" ,
              margin: 2,
            '&:hover': {
                color : "white",
                backgroundColor: 'black',
              }
            }}>
            Save
          </Button> : ""}
      </Grid>
      {/* Image Grid */}
        <Grid item xs={11} container spacing={2}>
        {images.map((image, index) => (
            <Grid item xs={11 / 4} key={index}>
            <Card>
                <CardMedia
                component="img"
                height="140"
                image={image}
                alt={`Image ${index}`}
                />
            </Card>
            </Grid>
        ))}
        </Grid>
    </Grid>
  )
}

export default SearchTags