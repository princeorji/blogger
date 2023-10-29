const express = require('express')
const controller = require('../controllers/blogs')
const middleware = require('../middleware/auth-middleware')

const routes = express.Router()

routes.get('/', controller.getBlogs) // get all

routes.get('/:id', controller.getBlog) // get one

routes.post('/', middleware.bearerTokenAuth, controller.addBlog)

routes.patch('/:id', middleware.bearerTokenAuth, middleware.checkUser, controller.editBlog)

routes.delete('/:id', middleware.bearerTokenAuth, middleware.checkUser, controller.deleteBlog)


module.exports = routes