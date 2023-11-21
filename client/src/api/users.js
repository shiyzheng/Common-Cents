import axios from 'axios';

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
        const response = await axios.get('api/account/profile', {
            params: { username },
        });
        return response.data;
    } catch (err) {
        return err;
    }
};
