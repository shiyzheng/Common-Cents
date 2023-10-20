const express = require('express')
const app = express()
const port = 8080
const path = require('path')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const dataStorage = require('./data-storage')



app.get('/', (req, res) => {
    res.contentType('application/json')
    res.send('Home page')
    dataStorage.testExport()
    res.status(200)
});

app.post('/', (req, res) => {
    res.json(req.body)
});



app.get('/login', (req, res) => {
    var options = {
        root: path.join(__dirname, 'html-docs'),
        dotfiles: 'deny'
    }
    var fileName = "login.html"
    res.sendFile(fileName, options)
});


// retrieves a lesson
app.get('/lessons', (req, res) => {
    const lessons = [];
    res.json(lessons);
});

// adds a lesson
app.post('/lessons', (req, res) => {
    res.json(req.body);
});

// updates a lesson
app.put('/lessons/:id', (req, res) => {
    const { id } = req.params;
    res.json(req.body);
});

app.delete('/lessons/:id', (req, res) => {
    const { id } = req.params;
    res.json({ deleted: id });
});

app.get('/lessons/:topic1/:topic2/:topic3', (req, res) => {
    res.send(req.params)
});

app.listen(port, () => {
    console.log(`Application listening on port ${port}`)
}) 