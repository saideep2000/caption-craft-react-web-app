import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/users`;
export const PICTURES_API = `${BASE_API}/pictures`;

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


export const accSignOut = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
};
