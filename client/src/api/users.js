import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const createUser = async (userObject) => {
    // console.log('atapi');
    try {
        if (userObject.username === '' || userObject.password === '') {
            throw new Error('invalid username or password');
        }
        const response = await axios.post('/account/signup', {
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
        const response = await axios.get('/account/isLogged');
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
