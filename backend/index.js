const app = require('./server.js').app

app.listen(3000, () => {
    console.log('listening on 3000');
    console.log('mongoDB is connected');
});