const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET
const expiration = '2h'

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user', {
        extentions: {
            code: 'UNAUTHENTICATED'
        }
    }),
    authMiddleware: function ({req}) {
        let token = req.body.token || req.query.token || req.headers.authorization

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim()
        }

        if (!token) {
            return req
        }

        try {
            const {data} = jwt.verify(token,secret,{maxAge: expiration})
            req.user = data
        }
        catch {
            console.log('invalid Token')
        }

        return req
    },
    signToken: function ({username,_id}) {
        const payload = {username,_id}
        return jwt.sign({data:payload},secret,{expiresIn: expiration})
    }
}