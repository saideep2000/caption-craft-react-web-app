import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Paper, styled, Typography, Button, Avatar } from '@mui/material';
import Header from '../components/Header';
import PostCards from '../PostCards';
import * as client from './client';
import { setCurrUser, setPosts } from './userReducer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NewPost from '../components/NewPost';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
  margin: theme.spacing(1),
}));

const ScrollableBox = styled(Box)({
  maxHeight: '300px',
  overflowY: 'auto'
});

const ActionButton = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.getContrastText(theme.palette.grey[900]), // assuming you want black text
  backgroundColor: theme.palette.grey[900], // black background
  '&:hover': {
    backgroundColor: theme.palette.success.main, // green background on hover
  },
}));

const UserCardContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const UserCard = ({ user, onActionClick, actionLabel }) => (
  <UserCardContainer>
    <Avatar src={user.profilePicture} />
    <Typography sx={{ marginLeft: 1, flexGrow: 1 }}>{user.name}</Typography>
    <ActionButton variant="contained" onClick={() => onActionClick(user._id)}>
      {actionLabel}
    </ActionButton>
  </UserCardContainer>
);

function UserPosts() {
  const { posts } = useSelector((state) => state.userReducer);
  const { currUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);

  const fetchAccount = async () => {
    try {
      const user = await client.fetchAccount();
      dispatch(setCurrUser(user));
    } catch (error) {
      console.error('error in retrieving account!', error);
    }
  };

  const PostsContainer = styled(Box)({
    maxHeight: 'calc(100vh - 60px)', // Adjust this value based on your layout needs
    overflowY: 'auto'
  });

  const fetchFollowFeed = async (user) => {
    try {
      const response = await client.fetchFollowFeed(user);
      const transformedPosts = response.map(post => ({
        key: post._id,
        username: post.posterName,
        userAvatar: post.posterProfilePicture,
        date: new Date(post.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        imageUrl: post.url,
        description: post.description,
        likes: post.likes,
        public: post.public,
        comments: post.comments,
      }));
      dispatch(setPosts(transformedPosts));
    } catch (error) {
      console.error('error in retrieving account!', error);
    }
  };

  const getSuggestedUsers = async (user) => {
    try {
      const response = await client.fetchSuggestedUsers(user);
      setSuggestedUsers(response);
    } catch (error) {
      console.error('error in retrieving suggested Users!', error);
    }
  };

  const getFollowingUsers = async (user) => {
    try {
      const response = await client.fetchFollowingUsers(user); // Replace with your actual function
      setFollowingUsers(response);
    } catch (error) {
      console.error('error in retrieving following Users!', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const Ids = {
        "_id" : currUser._id,
        "frndId" : userId
      }
      const response = await client.followUsers(Ids); // Replace with your actual function
      setFollowingUsers(response);

      setSuggestedUsers(prevSuggestedUsers => prevSuggestedUsers.filter(user => user._id !== userId));

    } catch (error) {
      console.error('error in following User!', error);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handlePost = (event) => {
    try{
      // <NewPost/>
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
        setShowNewPost(true);
      }
    }
    catch (error){
      console.error('error in following User!', error);
    }
  }

  const handleMessageButtonClick = (frndId) => {
    navigate(`/UserMessages/${frndId}`);
  };

  const ForegroundContainer = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white background
    backdropFilter: 'blur(5px)', // Apply blur effect to the background content
    // Add other styling as necessary
  });
  

  const RelativeContainer = styled('div')({
    position: 'relative',
    // Add other styling as necessary
  });

  const BlurredGrid = styled(Grid)(({ theme, shouldBlur }) => ({
    filter: shouldBlur ? 'blur(1px)' : 'none',
    transition: theme.transitions.create('filter', {
      duration: theme.transitions.duration.short,
    }),
    // Add other styling as necessary
  }));
  
  
  

  useEffect(() => {
    fetchAccount();
    getSuggestedUsers(currUser);
    getFollowingUsers(currUser);
  }, [currUser]);

  useEffect(() => {
    fetchFollowFeed(currUser);
  }, [currUser]);

  useEffect(() => {
    if (!currUser._id) {
      navigate('/Login');
    }
  }, [currUser, navigate]);

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <RelativeContainer>
      {showNewPost && (
        <ForegroundContainer>
          <NewPost file={selectedFile} onClose={() => setShowNewPost(false)} />
        </ForegroundContainer>
      )}
      <BlurredGrid container direction="column" spacing={9} shouldBlur={showNewPost}>
          <Grid container direction="column" spacing={18}>
            <Grid item>
              <Header activeTab="Home" />
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent="center" alignItems="column" spacing={10}>
                  <Grid item lg={2.1}>
                  <Item>
                      <Typography variant="h6" textAlign="center">Post</Typography>
                      <Button component="label" variant="primary" startIcon={<CloudUploadIcon />}>
                        Upload Image
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handlePost} />
                      </Button>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={7} lg={6}>
                    <Item sx={{ display: 'flex', flexDirection: 'column', spacing: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <PostsContainer>
                      {posts.map(p => (<PostCards key={p.key} post={p} />))}
                    </PostsContainer>
                    </Item>
                  </Grid>
                  <Grid item lg={2.7}>
                    <Item>
                      <Typography variant="h6" textAlign="center">Suggested for You</Typography>
                      <ScrollableBox>
                        {suggestedUsers.map(user => (
                          <UserCard key={user._id} user={user} onActionClick={() => handleFollow(user._id)} actionLabel="Follow" />
                        ))}
                      </ScrollableBox>
                    </Item>
                    <Item>
                      <Typography variant="h6" textAlign="center">Following</Typography>
                      <ScrollableBox>
                        {followingUsers.map(user => (
                          <UserCard key={user._id} user={user} onActionClick={() => handleMessageButtonClick(user._id)} actionLabel="Message" />
                        ))}
                      </ScrollableBox>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </BlurredGrid>
      </RelativeContainer>
    </div>
  );
}

export default UserPosts;
