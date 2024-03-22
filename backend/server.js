const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session)
const path = require('path');

const AccountRouter = require('./routes/account');
const CategoryRouter = require('./routes/category');

const app = express();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://xianhanchen:xianhan@cluster0.3uugri4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI);

app.use(cors({
    origin: 'http://localhost:1234', // Replace with your client's origin
    credentials: true,
}));

app.use(express.urlencoded({extended: true}))

app.use(express.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use('/account', AccountRouter);
app.use('/category', CategoryRouter);

app.listen(3000, () => {
    console.log('listening on 3000');
    console.log('mongoDB is connected');
});

// export for category.test.js
module.exports = {
    app,
}