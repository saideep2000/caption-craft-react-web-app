import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, IconButton, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideoIcon from '@mui/icons-material/Videocam';
import * as client from "./client";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Caller from '../components/Caller';

function UserMessages() {
  const [list, setList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const { currUser } = useSelector((state) => state.userReducer);
  const { frndId } = useParams();
  const [showCaller, setShowCaller] = useState(false);
  const [video, setVideo] = useState(false);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedUser]); // Scroll to bottom when messages or selectedUser changes

  const chattedUsers = useCallback(async () => {
    try {
      const Id = { "userId": currUser._id };
      const chattedList = await client.fetchFriendMessagesList(Id);
      setList(chattedList);
      if (frndId) {
        handleUserClick(frndId);
      }

    } catch (error) {
      console.error("error in retrieving friends list!", error);
    }
  }, [currUser]);

  useEffect(() => {
    chattedUsers();
  }, [chattedUsers]);

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

  const handleSendMessage = async () => {
    if (selectedUser && newMessage.trim()) {
      const messageToSend = {
        senderId: currUser._id,
        receiverId: selectedUser,
        messageContent: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedUser]: [...(prevMessages[selectedUser] || []), messageToSend],
      }));

      setNewMessage('');

      try {
        await addMessage(selectedUser, newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
    await fetchFriendMessages(userId);
  };

  const fetchFriendMessages = async (friendId) => {
    try {
      const Ids = {
        "userId": currUser._id,
        "friendId": friendId
      };
      const messagesFromFriend = await client.fetchMessages(Ids);
      setMessages({ ...messages, [friendId]: messagesFromFriend });
    } catch (error) {
      console.error("error in retrieving messages!", error);
    }
  };

  const addMessage = async (friendId, message) => {
    try {
      const info = {
        "userId": currUser._id,
        "friendId": friendId,
        "message": message
      };
      await client.addMessageToUser(info);
    } catch (error) {
      console.error("error in adding message!", error);
    }
  };
  const handleCall = async (friendId) => {
    console.log("Calling friend")
    try {
      const info = {
        "userId": currUser._id,
        "friendId": friendId
      };
      var message = await client.audioCall(info);
      console.log(message)
      setShowCaller(true)
      setVideo(false);
    } catch (error) {
      console.error("error in calling!", error);
    }
  };
  const handleVideo = async (friendId) => {
    try {
      const info = {
        "userId": currUser._id,
        "friendId": friendId
      };
      var message = await client.videoCall(info);
      console.log(message)
      setVideo(true);
      setShowCaller(true);
    } catch (error) {
      console.error("error in video calling!", error);
    }
  };

  return (
    <div>
      <RelativeContainer>
      {showCaller && (
        <ForegroundContainer>
          <Caller onClose={() => setShowCaller(false)} video = {video} setVideo={setVideo}/>
        </ForegroundContainer>
      )}
      <BlurredGrid container direction="column" spacing={9} shouldBlur={showCaller}>
          <Header activeTab="Messages" />
          <Grid container sx={{ height: '91vh', mt: 18 }}>
            <Grid item xs={4} sx={{ borderLeft: 70, borderRight: 1, borderColor: 'divider', overflowY: 'auto' }}>
              <List>
                {list.map((user) => (
                  <ListItem button key={user._id} selected={selectedUser === user._id} onClick={() => handleUserClick(user._id)}>
                    <ListItemAvatar>
                      <Avatar alt={user.firstname} src={user.profilePicture} />
                    </ListItemAvatar>
                    <ListItemText primary={`${user.firstname} ${user.lastname}`} />
                    <IconButton color="primary" onClick={() => handleCall(user._id)}>
                      <CallIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleVideo(user._id)}>
                      <VideoIcon />
                    </IconButton>
                  </ListItem>
                  
                ))}
              </List>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box ref={chatContainerRef} flex={1} sx={{ overflowY: 'auto', padding: 2 }}>
              {selectedUser && messages[selectedUser] && messages[selectedUser].map((message, index) => (
                <Box key={message._id} sx={{ display: 'flex', justifyContent: message.senderId === currUser._id ? 'flex-end' : 'flex-start', mb: 1 }}>
                  <Paper elevation={1} sx={{ padding: '6px 12px', borderRadius: '16px', maxWidth: '75%', wordBreak: 'break-word' }}>
                    {/* Here we assume you have a messageContent property that you want to display */}
                    <ListItemText primary={message.messageContent} secondary={message.senderId === currUser._id ? 'You' : 'Friend'} />
                  </Paper>
                </Box>
              ))}
            </Box>
              <Box sx={{ borderTop: 1, borderColor: 'divider', padding: 1, backgroundColor: 'background.paper', display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </BlurredGrid>
      </RelativeContainer>
    </div>
  );
}

export default UserMessages;
