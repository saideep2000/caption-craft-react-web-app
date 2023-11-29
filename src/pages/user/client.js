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

export const fetchFeed = async (userId) => {
    const response = await request.get( `${PICTURES_API}/UserFeed`, userId );
    return response.data;
};

