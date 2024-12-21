import config from '../config'
import AppError from '../errors/AppError'
import { TUserRole } from '../modules/User/user.interface'
import catchAsync from '../utils/catchAsync'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../modules/User/user.model'

const auth = (...roles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized!',
            )
        }

        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload

        const { userEmail, role } = decoded

        const user = await User.isUserExistsByEmail(userEmail)

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
        }

        const isBlocked = user?.isBlocked

        if (isBlocked) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!')
        }

        if (roles && !roles.includes(role)) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized!',
            )
        }

        next()
        console.log(token, roles)
    })
}

export default auth
