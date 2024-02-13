const jwt = require('jsonwebtoken');
const User = require('../models/user');

// import the env variables
require('dotenv').config();

/**
 * Create a JWT containing the username
 * @param {*} userid 
 * @returns the token
 */
const authenticateUser = (userid, password) => {

    try{
        const token = jwt.sign({username: userid, password: password}, process.env.KEY, {expiresIn: '12h'});
        return token;
    } catch(err) {
        console.log('error', err.message);
    }
}

/**
 * Verify a token. Check if the user is valid
 * @param {*} token 
 * @returns true if the user is valid
 */
const verifyUser = async (token) =>{
    try{
        // decoded contains the payload of the token
        const decoded = jwt.verify(token, process.env.KEY);
        const { username, password } = decoded;
        // check that the payload contains a valid user
        const user = await User.findOne({ username });
        if(user.password === password) {
            return true;
        }
        return false;
    }catch(err){
        // invalid token
        console.log('error', err.message);
        return false;
        
    }
}

const decode = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.KEY);
        const { username, password } = decoded;
        return username;
    } catch (err) {
        console.log('error', err.message);
        return null;
    }
}

module.exports = { authenticateUser, verifyUser, decode }