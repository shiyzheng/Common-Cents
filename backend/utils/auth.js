const jwt = require('jsonwebtoken');
const { getUserByName } = require('../../client/src/api/users');


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
        console.log('token', token);
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
        console.log('payload', decoded);
        // check that the payload contains a valid user
        const user = await getUserByName(decoded.username, decoded.password);
        if(!user){
            // user is undefined
            return false;
        }
        return true;
    }catch(err){
        // invalid token
        console.log('error', err.message);
        return false;
        
    }
}

module.exports = { authenticateUser, verifyUser }