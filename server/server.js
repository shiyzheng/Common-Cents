import express from 'express'
const app = express()
const port = 3000

import * as routes from './routes.js'

app.get('/', routes.home);

app.get('/admin/console/topics', routes.getAdminConsoleTopics);

app.listen(port, () => {
    console.log(`Server Application listening on port ${port}`)
})