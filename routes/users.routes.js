const express = require('express')
const controller = require('../controllers/users')

const routes = express.Router()

routes.get('/', controller.getUsers) // get all

routes.get('/:id', controller.getUser) // get one

routes.post('/', controller.addUser)

routes.patch('/:id', controller.editUser)

routes.delete('/:id', controller.deleteUser)


module.exports = routes