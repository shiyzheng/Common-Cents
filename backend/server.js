const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const AccountRouter = require('./routes/account');
const CategoryRouter = require('./routes/category');

const app = express();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://xianhanchen:xianhan@cluster0.3uugri4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(express.static('dist'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/account', AccountRouter);
app.use('/category', CategoryRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

app.listen(3000, () => {
    console.log('listening on 3000');
    console.log('mongoDB is connected');
});