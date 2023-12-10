import React from 'react';
import { Grid, Typography, Avatar, Card, CardContent, CardMedia } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserInfo({ user }) {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <img
          src={user.profilePicture}
          alt={user.name}
          style={{ width: '150px', height: '150px', borderRadius: '50%', marginTop: '20px', marginLeft: '20px' }}
        />
      </Grid>
      <Grid item>
        {}
        <Typography variant="h4" style={{ marginBottom: '16px' }}>{user.name}</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Typography variant="body1" align="center">Following</Typography>
            <Typography variant="h6" align="center">{user.following}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">Followers</Typography>
            <Typography variant="h6" align="center">{user.followers}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">Posts</Typography>
            <Typography variant="h6" align="center">{user.posts}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function UserPosts({ posts }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      {posts.map((post, index) => (
        <Card key={index} style={{ width: '200px', margin: '10px' }}>
          {post.image && (
            <CardMedia
              component="img"
              alt="Post Image"
              height="140"
              image={post.image}

            />
          )}
          <CardContent>
            <Typography>{post.caption}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Profile() {
  const user = {
    name: 'John Doe',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoa9dqZfjjzrsn6kSj8CYC7HmRhbhuzAo4Bw&usqp=CAU',
    followers: 500,
    following: 200,
    posts: 3,
  };

  const userPosts = [
    { image: 'https://lh5.googleusercontent.com/p/AF1QipMWW7UPJPT0ARPXMXIw2VzHBkqHPGLWMzps_uTF=w1080-h624-n-k-no', caption: 'Enjoying the view!!!' },
    { image: 'https://lh5.googleusercontent.com/p/AF1QipNIBSvmCqm3tphLvc3CXtSdVrpQtyCg3x4zpEKo=w1080-h624-n-k-no', caption: 'Snow day :)' },
    { image: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT6fGRB6BWpBGBaSpUqJ60B6W5zKosWtyTw0z2650XrzkCzZ299-EIS1LSDhXPOA8HR8KbbzMj511XWDFCIZE8lARzFSGZQH7bO4K0S8g', caption: 'Beautiful Vermont!' },
  ];

  return (
      <div style={{ overflow: 'hidden', width: '100%', textAlign: 'center' }}>
        <Header activeTab="Profile" />
        <Grid container direction="column" spacing={8} alignItems="center" style={{ marginTop: '25px' }}>
          {}
          <Grid item>
            {}
            <UserInfo user={user} />
          </Grid>
          <Grid item>
                    {}
                    <Typography variant="h6">Posts</Typography>
                  </Grid>
          <Grid item>
            {}
            <UserPosts posts={userPosts} />
          </Grid>

        </Grid>
        <Footer />
      </div>
    );
  }

  export default Profile;
