const Users = require('../models/users')
const logger = require('../logs/logger')

const getUsers = async (req, res) => {
    try {
        const query = await Users.find({})

        res.status(200).json({
            status: 'success',
            users: query
        })

    } catch (error) {
        logger.error('Error fetching users', error)
        res.status(404).json({ message: 'Page not found' })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await Users.findById(id)

        if (!user) {
            res.status(404).json({ error: 'User not found' })
        } else {
            await user.save()
            res.status(200).json(user)
        }

    } catch (error) {
        logger.error('Error fetching user', error)
        res.status(404).json({ message: 'Page not found' })
    }
}

const addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        logger.info('User created successfully', user)
        res.status(201).json(user)

    } catch (error) {
        logger.error('Error creating user', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const editUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = req.body
        const query = await Users.findByIdAndUpdate(id, user, { new: true })

        if (!query) {
            res.status(404).json({ error: `User with id: ${id} not found` })
        } else {
            logger.info('User updated sucessfully', query)
            res.status(200).json(query)
        }

    } catch (error) {
        logger.error('Error updating post', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const query = await Users.findByIdAndRemove(id)

        if (!query) {
            res.status(404).json({ error: `User with id: ${id} not found` })
        } else {
            logger.info('User deleted successfully', query)
            res.status(200).send(query)
        }

    } catch (error) {
        logger.error('Error deleting user', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser
}