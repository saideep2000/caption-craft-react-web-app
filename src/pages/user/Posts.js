import React, {useEffect} from 'react';
import Header from '../components/Header';
import {Grid, styled, Typography} from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import * as client from "./client"
import PostCards from "../PostCards";
import {useDispatch, useSelector} from "react-redux";
import {setCurrUser, setPosts} from "./userReducer";
import {useNavigate} from "react-router-dom";

// Credentials:
// user101
// hashed_password1

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function UserPosts() {
  const {posts} = useSelector((state) => state.userReducer);
  const {currUser} = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const suggested_header = "Suggested for You";
  const fetchAccount = async () => {
    try {
      const user = await client.fetchAccount();
      dispatch(setCurrUser(user));
    } catch (error){
      console.error("error in retrieving account!", error);
    }
  };
  const fetchFollowFeed = async (user) => {
      try {
        const response = await client.fetchFollowFeed(user);
        const transformedPosts = response.map(post => ({
          key: post._id,
          username: post.posterName, // Assuming you have a way to get the username from the ID
          userAvatar: post.posterProfilePicture, // You might need to map the user ID to an avatar path
          date: new Date(post.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Format the date
          imageUrl: post.url,
          description: post.description,
          likes: post.likes,
          public: post.public,
          comments: post.comments,
        }));
        dispatch(setPosts(transformedPosts));
      } catch (error){
        console.error("error in retrieving account!", error);
      }
  };

  const redirectLogin = () => {
    if (currUser._id === undefined){
      navigate("/Login");
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    fetchFollowFeed(currUser);
    }, [currUser]);

  useEffect(() => {
    redirectLogin();
  }, [currUser]);

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <Grid container direction="column" spacing={9}>
        <Grid item>
          <Header activeTab="Home"/>
        </Grid>
        <Grid item>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="column" spacing={10}>
              <Grid item xs={12} md={8} lg={9}> {/* Adjust the size as needed */}
                <Item sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  spacing: 1,
                  alignItems: 'center',
                  justifyContent: 'center'}}
                  >
                  {posts.map((p) => (<PostCards post={p}/>) )}
                </Item>
              </Grid>
              <Grid item lg={2}> {/* Adjust the size as needed */}
                <Item>
                  <Typography variant="h6" textAlign="center">
                    {(currUser!==undefined) && suggested_header}
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default UserPosts;