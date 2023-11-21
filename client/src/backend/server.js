const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const AccountRouter = require('./routes/account');
const CategoryRouter = require('./routes/category');

const app = express();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://xianhanc:Bhz8QFdkNagqhgMm@cluster0.3uugri4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.static('dist'));

app.use('api/account', AccountRouter);
app.use('api/category', CategoryRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

app.listen(3000, () => {
    console.log('listening on 3000');
    console.log('mongoDB is connected');
});