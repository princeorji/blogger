const Blogs = require('../models/blogs')
const logger = require('../logs/logger')

const getBlogs = async (req, res) => {
    try {
        const query = await Blogs.find({
            // author: +req.query.author,
            // title: +req.query.title,
            // tag: +req.query.tag
        })

        // const page = req.query.page * 1 || 1
        // const limit = req.query.limit * 1 || 20
        // const skip = (page - 1) * limit
        // query = query.skip(skip).limit(limit)

        // query = query.sort('-read_time', '-read_count', '-timestamp')

        // result = await query.exec()

        res.status(200).json({
            status: 'success',
            blogs: query
        })

    } catch (error) {
        logger.error('Error fetching blogs', error)
        res.status(404).json({ message: 'Page not found' })
    }
}

const getBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blogs.findById(id)

        if (!blog) {
            res.status(404).json({ error: 'Blog not found' })
        } else {
            blog.read_count += 1
            await blog.save()
            res.status(200).json(blog)
        }

    } catch (error) {
        logger.error('Error fetching blog', error)
        res.status(404).json({ message: 'Page not found' })
    }
}

const addBlog = async (req, res) => {
    try {
        const blog = new Blogs(req.body)
        await blog.save()
        logger.info('Blog created successfully', blog)
        res.status(201).json(blog)

    } catch (error) {
        logger.error('Error creating blog', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const editBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = req.body
        const query = await Blogs.findByIdAndUpdate(id, blog, { new: true })

        if (!query) {
            res.status(404).json({ error: `Blog with id: ${id} not found` })
        } else {
            logger.info('Blog updated sucessfully', query)
            res.status(200).json(query)
        }

    } catch (error) {
        logger.error('Error updating post', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id
        const query = await Blogs.findByIdAndRemove(id)

        if (!query) {
            res.status(404).json({ error: `Blog with id: ${id} not found` })
        } else {
            logger.info('Blog deleted successfully', query)
            res.status(200).send(query)
        }

    } catch (error) {
        logger.error('Error deleting post', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


module.exports = {
    getBlogs,
    getBlog,
    addBlog,
    editBlog,
    deleteBlog
}