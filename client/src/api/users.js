import axios from 'axios';

const baseURL = 'http://localhost:3000';

const setHeaders = () => {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('app-token');
}

export const loginUser = async (userObject) => {
    try {
        const response = await axios.post(`${baseURL}/account/login`, {
            username: userObject.username,
            password: userObject.password,
        })
        return response.data.apptoken;
    } catch (err) {
        console.log('error', err.message);
    }
}

export const createUser = async (userObject) => {
    // console.log('atapi');
    try {
        if (userObject.username === '' || userObject.password === '') {
            throw new Error('invalid username or password');
        }
        const response = await axios.post(`${baseURL}/account/signup`, {
            username: userObject.username,
            password: userObject.password,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${baseURL}/account/isLogged`);
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getProfileById = async (username) => {
    try {
        console.log(username);
        const response = await axios.get(`${baseURL}/account/profile`, {
            params: { username },
        });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getAchievementsById = async (username) => {
    try {
        const response = await axios.get(`${baseURL}/account/achievements`, {
            params: { username },
        });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getAllAchievements = async () => {
    try {
        const response = await axios.get(`${baseURL}/account/allAchievements`);
        return response.data;
    } catch (err) {
        return err;
    }
};



export const getLeaderboards = async () => {
    try {
        const response = await axios.get(`${baseURL}/account/leaderboards`);
        return response.data;
    } catch (err) {
        return err;
    }
};
