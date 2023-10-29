const Blogs = require('../models/blogs')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')

const bearerTokenAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ message: 'You are not authenticated!' });
        }

        const token = authHeader.split(' ')[1]

        const decoded = await jwt.verify(token, process.env.jwt_secret)


        const user = await Users.findOne({ _id: decoded._id })

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            })
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
}

const checkUser = (req, res, next) => {
    // const id = req.params.id
    // const blog = Blogs.findOne(blog => blog.id == id)

    // if (!blog) {
    //     return res.status(404).json({ message: 'Blog not found' })
    // }

    if (Blogs.author !== req.user.id) {
        return res.status(403).json({ message: 'You are not the authorized' })
    }

    next()
}

module.exports = {
    bearerTokenAuth,
    checkUser
}