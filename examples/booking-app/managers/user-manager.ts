// @ts-ignore
import { data, params } from '@serverless/cloud'
import { v4 } from 'uuid'
import { omit } from 'ramda'
import { Auth } from '../auth'
import bcrypt from 'bcryptjs'


type HashedString = string

export enum UserErrors {
    USER_EXISTS = 'USER_EXISTS'
}

export type User = {
    id: string,
    email: string,
    firstName: string,
    lastName: string
    password: HashedString
}

export type ReadableUser = Omit<User, 'password'>

type CreateUserResponse = {
    user: ReadableUser,
    token: string
}

const createUser = async (params: any): Promise<CreateUserResponse> => {
    const existingUser = await data.getByLabel('label1', `email:${params.email}`)
    if (existingUser.items && existingUser.items.length) {
        throw new Error(UserErrors.USER_EXISTS)
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(params.password, salt)
    const userId = v4()
    const user = omit(['password'], await data.set(`user:${userId}`, {
        id: userId,
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: hashedPassword
    }, {
        label1: `email:${params.email}`
    })) as ReadableUser
    const token = Auth.createToken(user)
    return {
        user,
        token
    }
}

const loginUser = async ({ email, password }): Promise<string | undefined> => {
    const userQuery = await data.getByLabel('label1', `email:${email}`)

    if (!userQuery.items || !userQuery.items.length) {
        throw new Error('User not found')
    }

    const user = userQuery.items[0].value
    const validPassword = bcrypt.compareSync(password, user.password)
    if (validPassword) {
        return Auth.createToken(omit(['password'], user) as ReadableUser)
    } else {
        throw new Error('Incorrect password')
    }
}

export const UserManager = {
    createUser,
    loginUser
}
