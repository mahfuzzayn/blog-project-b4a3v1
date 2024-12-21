import AppError from '../../errors/AppError'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'
import httpStatus from 'http-status'

const registerUserIntoDB = async (payload: TUser) => {
    const isUserExists = await User.findOne({ email: payload?.email })

    if (isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User already exists')
    }

    const newUser = await User.create(payload)

    const { _id, name, email } = newUser

    return {
        _id,
        name,
        email,
    }
}

export const UserServices = {
    registerUserIntoDB,
}
