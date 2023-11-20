import express from 'express'
const app = express()
const port = 3000

import * as routes from './routes.js'

export {
    app,
};

app.get('/', routes.home);

// returns a list of admin console topics
app.get('/admin/console/topics', routes.getAdminConsoleTopics);

// places topic from admin console
app.put('/admin/console/topics/:topic', routes.putAdminConsoleTopic);

app.listen(port, () => {
    console.log(`Server Application listening on port ${port}`)
})