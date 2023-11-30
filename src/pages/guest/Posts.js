import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {Grid, styled, Typography} from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PostCards from "../PostCards";
import * as client from "./client";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
      try {
        const response = await client.fetchPosts();
        console.log(response);
        const transformedPosts = response.map(post => ({
          key: post._id,
          username: post.username, // Assuming you have a way to get the username from the ID
          userAvatar: post.profilePicture, // You might need to map the user ID to an avatar path
          date: new Date(post.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Format the date
          imageUrl: post.url,
          description: post.description,
          likes: post.likes,
          public: post.public,
          comments: post.comments,
        }));
        setPosts(transformedPosts);
      } catch (error){
        console.error("error in retrieving account!", error);
      }
  };
  useEffect(() => {
    fetchPosts();
    }, []);

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
                  {posts.map((p) => (<PostCards post={p}/>) )}
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