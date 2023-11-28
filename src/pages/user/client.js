import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/users`;

const request = axios.create({
    withCredentials: true,
});

export const fetchAccount = async (credentials) => {
    const response = await request.get( `${USERS_API}/fetchAccount` );
    return response.data;
};

