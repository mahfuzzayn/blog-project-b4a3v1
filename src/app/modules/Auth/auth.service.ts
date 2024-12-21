import AppError from '../../errors/AppError'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'
import httpStatus from 'http-status'
import { TLoginUser } from './auth.interface'
import { createToken } from './auth.utils'
import config from '../../config'

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

const loginUserFromDB = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByEmail(payload?.email)

    if (!user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Invalid Credentials: User Not Found',
        )
    }

    const isBlocked = user?.isBlocked

    if (isBlocked) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'This user is blocked')
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Invalid Credentials: Password',
        )
    }

    const jwtPayload = {
        userEmail: user?.email,
        role: user?.role,
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    )

    return { token: accessToken }
}

export const UserServices = {
    registerUserIntoDB,
    loginUserFromDB,
}
