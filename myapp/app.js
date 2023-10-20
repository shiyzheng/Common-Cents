const express = require('express')
const app = express()

const path = require('path')

const port = 8080

app.get('/', (req, res) => { 
    res.send('Home page')
})

app.get('/login', (req, res) => { 
    var options = {
        root: path.join(__dirname, 'html-docs'),
        dotfiles: 'deny'
    }
    var fileName = "login.html"
    res.sendFile(fileName, options)
})

app.get('/lessons/:topic1/:topic2/:topic3', (req, res) => { 
    res.send(req.params)
})

app.get('/questions', (req, res) => { 
    res.send('questions')
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`)
})