// @ts-ignore
import { params } from '@serverless/cloud'
import jwt from 'jsonwebtoken'
import { ReadableUser } from './managers/user-manager'

const createToken = (user: ReadableUser) => {
    const jwtKey = params.TOKEN_SECRET

    if (!jwtKey) {
        throw new Error('TOKEN_SECRET not defined!')
    }

    return jwt.sign({
        ...user
    }, jwtKey)
}

const verifyToken = (token: string): string | undefined => {
    const jwtKey = params.TOKEN_SECRET

    if (!jwtKey) {
        throw new Error('TOKEN_SECRET not defined!')
    }

    try {
        return jwt.verify(token, jwtKey)
    } catch (e) {
    } finally {}
}

const middleware = ((req, res, next) => {
    const token = req.headers['Authorization'] || req.headers['authorization'] || req.query.authorization
    const validToken = Auth.verifyToken(token)
    if (!validToken) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }
    req.decoded = validToken
    return next()
})

export const Auth = {
    createToken,
    verifyToken,
    middleware
}
