import React from 'react';
import Header from '../components/Header';
import {Grid, styled, Typography} from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PostCards from "../PostCards";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function Posts({ user }) {
  const post = {
    username: 'Username',
    userAvatar: 'path_to_avatar.jpg', // Replace with actual avatar URL
    date: 'September 14, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1639403169804-318fcb1d23ad?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
    description: 'Sand hues and tree in between',
    likes: 20,
    public: true,
  };
  // TODO - need to query a list of public posts that are displayed on dashboard
  const suggested_header = "Suggested for You";

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <Grid container direction="column" spacing={9}>
        <Grid item>
          <Header activeTab="Home" />
        </Grid>
        <Grid item>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="center" spacing={1}>
              <Grid item xs={12} md={8} lg={10}> {/* Adjust the size as needed */}
                <Item sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  spacing: 1,
                  alignItems: 'center',
                  justifyContent: 'center'}}
                  >
                  {/*<Typography variant="h4" textAlign="center">*/}
                  {/*  Posts*/}
                  {/*</Typography>*/}
                  {/*TODO - use map to display posts queried from server*/}
                  <PostCards post={post} />
                  <PostCards post={post} />
                </Item>
              </Grid>
              <Grid item lg={2}> {/* Adjust the size as needed */}
                <Item elevation={0}>
                  <Typography variant="h6" textAlign="center">
                    {(user!==undefined) && suggested_header}
                  </Typography>
                </Item>
              </Grid>
              {/* Other Grid items */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default Posts;