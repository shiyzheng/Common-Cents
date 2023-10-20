const express = require('express')
const app = express()

const port = 8080

app.get('/', (req, res) => { 
    res.send('Home page')
})

app.get('/login', (req, res) => { 
    res.send('Login page here')
    res.sendFile()
})

app.get('/lessons', (req, res) => { 
    res.send('lessons')
})

app.get('/questions-index', (req, res) => { 
    res.send('questions index')
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`)
})