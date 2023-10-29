const passport = require('passport')
const Users = require('../models/users')
require('dotenv').config()

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt


passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.jwt_secret,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
)
