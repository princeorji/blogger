const mongoose = require('mongoose')
const routes = require('../routes/blogs.routes')
const request = require('supertest')

require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.db_url)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe('GET  /', () => {
    it('should get all published blogs', async () => {
        request(routes)
            .get('/')
            .expect(200)
            .expect('Content-Type', 'application/json')
    })
})