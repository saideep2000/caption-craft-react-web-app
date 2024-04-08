import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/users`;
export const PICTURES_API = `${BASE_API}/pictures`;
export const MESSAGES_API = `${BASE_API}/messages`;

export const AUDIO_API = `${BASE_API}/audiocall`;
export const VIDEO_API = `${BASE_API}/videocall`;

const request = axios.create({
    withCredentials: true,
});

export const fetchAccount = async () => {
    const response = await request.get( `${USERS_API}/fetchAccount` );
    return response.data;
};
export const fetchFollowFeed = async (user) => {
    const response = await request.post(`${PICTURES_API}/UserFeed`, user);
    return response.data;
};
export const fetchPosts = async () => {
    const response = await request.get(`${PICTURES_API}/all`);
    return response.data;
};

export const fetchSuggestedUsers = async (userId) => {
    const response = await request.post(`${USERS_API}/suggestedUsers`, userId);
    return response.data;
};

export const fetchFollowingUsers = async (userId) => {
    const response = await request.post(`${USERS_API}/followedUsers`, userId);
    return response.data;
};

export const followUsers = async (Ids) => {
    const response = await request.post(`${USERS_API}/followUser`, Ids);
    return response.data;
};





export const accSignOut = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
};


export const fetchFriendMessagesList = async (Id) => {
    const response = await request.post(`${MESSAGES_API}/UserFriendList`, Id);
    return response.data;
}
export const fetchMessages = async (Ids) => {
    const response = await request.post(`${MESSAGES_API}/UserMessages`, Ids);
    return response.data;
}

export const addMessageToUser = async (info) => {
    const response = await request.post(`${MESSAGES_API}/AddUserMessage`, info);
    return response.data;
}

export const audioCall = async (info) => {
    const response = await request.post(`${AUDIO_API}/audioCallUser`, info);
    return response.data;
}

export const videoCall = async (info) => {
    const response = await request.post(`${VIDEO_API}/videoCallUser`, info);
    return response.data;
}
