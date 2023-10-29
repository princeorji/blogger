const express = require('express')
const passport = require('passport')
const connectdb = require('./db/blogger')
const auth_routes = require('./routes/auth.routes')
const blogs_routes = require('./routes/blogs.routes')
const users_routes = require('./routes/users.routes')
const logger = require('./logs/logger')
const bodyParser = require('body-parser')

require('dotenv').config()
require('./auth/passport')

const app = express()
const port = process.env.port

connectdb()

app.use(bodyParser.json())

app.use('/', auth_routes)
app.use('/blogs', blogs_routes)
app.use('/users', passport.authenticate('jwt', { session: false }), users_routes)

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('*', (req, res) => {
    res.status(404).json({
        data: null,
        message: 'Page not found'
    })
})

app.listen(port, () => {
    logger.info(`server listening at http://localhost:${port}`)
})