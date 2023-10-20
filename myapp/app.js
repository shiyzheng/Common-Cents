const express = require('express')
const app = express()

const port = 8080

app.get('/', (req, res) => { 
    res.send('Root path')
})

app.listen(port, () => {
    console.log("Application listening on port ${ 8080}")
})