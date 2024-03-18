import axios from 'axios';

const baseURL = 'http://localhost:3000/account';

const setAuthorizationHeaders = () => {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('app-token');
}

export const loginUser = async (userObject) => {
    try {
        const response = await axios.post(`${baseURL}/login`, {
            username: userObject.username,
            password: userObject.password,
        })
        return response.data.apptoken;
    } catch (err) {
        console.log('error', err.message);
    }
}

export const signupUser = async (userObject) => {
    try {
        if (userObject.username === '' || userObject.password === '') {
            throw new Error('invalid username or password');
        }
        const response = await axios.post(`${baseURL}/signup`, {
        username: userObject.username,
        password: userObject.password,
      });
      return response;
    } catch (err) {
        console.log('error', err.message);
    }
};

// export const getVerify = async () => {
//     try {
//         const response = await axios.get(`${baseURL}/account/verify`);
//         if (response.message == 'Successful Authentication') {
//             return True
//         } else {
//             return False
//         }
//     } catch (err) {
//         return err;
//     }
// };

// export const getCurrentUser = async () => {
//     try {
//         const response = await axios.get(`${baseURL}/account/isLogged`);
//         return response.data;
//     } catch (err) {
//         return err;
//     }
// };

export const getProfileById = async (username) => {
    try {
        console.log(username);
        const response = await axios.get(`${baseURL}/profile`, {
            params: { username },
        });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getAchievementsById = async (username) => {
    try {
        const response = await axios.get(`${baseURL}/achievements`, {
            params: { username },
        });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getCurrentUserAchievements = async () => {
    try {
        setAuthorizationHeaders();
        const response = await axios.post(`${baseURL}/my-achievements`, {
            username: sessionStorage.getItem('username'),
        });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getAllAchievements = async () => {
    try {
        const response = await axios.get(`${baseURL}/allAchievements`);
        return response.data;
    } catch (err) {
        return err;
    }
};



export const getLeaderboards = async () => {
    try {
        const response = await axios.get(`${baseURL}/leaderboards`);
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${baseURL}/users`);
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getAllUsersPoints = async () => {
    try {
        const response = await axios.get(`${baseURL}/users`);
        const points = [];
        const { data } = response;
        const { users } = data;
        for (let i = 0; i < users.length; i++) {
            points.push({
                username: users[i].username,
                points: users[i].points,
            });
        }
        return points;
    } catch (err) {
        return err;
    }
};

export const getUserProgress = async (lessonObject) => {
    try {
        setAuthorizationHeaders();
        const { lesson } = lessonObject;
        const username = sessionStorage.getItem('username');
        const response = await axios.post(`${baseURL}/user-progress`, {
            username,
            lesson, 
        });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const updateUserProgress = async (lessonObject) => {
    try {
        setAuthorizationHeaders();
        const { lesson } = lessonObject;
        const username = sessionStorage.getItem('username');
        const response = await axios.post(`${baseURL}/update-user-progress`, {
            username,
            lesson,
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export const addAchievementById = async (achievement) => {
    try {
        setAuthorizationHeaders();
        const username = sessionStorage.getItem('username');
        const response = await axios.post(`${baseURL}/add-achievement`, {
            username,
            achievement,
        });
        return response.data;
    } catch (err) {
        return err;
    }
}


export const checkAchievementByPoints = async (lessonObject, points) => {
    try {
        const response = await axios.post(`${baseURL}/achievement-by-lesson`, {
            lessonObject,
            points
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export const getUsersPointsTotal = async () => {
    try {
        const response = await axios.get(`${baseURL}/users`);
        const points = [];
        const { data } = response;
        const { users } = data;
        for (let i = 0; i < users.length; i++) {
            let pointTotal = 0
            for (const [key, value] of Object.entries(users[i].points)) {
                if (key != "_id") {
                    pointTotal += value;
                    // console.log(key);
                }
            }
            points.push({
                username: users[i].username,
                points: pointTotal,
            });
        }
        return points;
    } catch (err) {
        return err;
    }
};

export const addPointsToUser = async (lessonObject) => {
    try {
        setAuthorizationHeaders();
        const { lesson, points } = lessonObject;
        const username = sessionStorage.getItem('username');
        const response = await axios.post(`${baseURL}/add-points`, {
            username,
            lesson,
            points
        });
        return response.data;
    } catch (err) {
        return err;
    }
}