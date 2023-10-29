const mongoose = require('mongoose')
const app = require('../app')
const request = require('supertest')

require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.db_url)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe('POST /login', () => {
    it('should log in a user', async () => {
        request(app)
            .post('/login')
            .send({ email: 'brucewayne@gmail.com', password: '!notbatman' })
            .expect(200)
            .expect('Content-Type', 'application/json')
    })
})

describe('POST /signup', () => {
    it('should sign up a user', async () => {
        request(app)
            .post('/signup')
            .send({
                email: 'milesmorales@gmail.com', firstname: 'Miles',
                lastname: 'Morales', password: '!spiderman'
            })
            .expect(200)
            .expect('Content-Type', 'application/json')
    })
})