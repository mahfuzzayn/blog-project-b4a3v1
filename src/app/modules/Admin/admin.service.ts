import AppError from '../../errors/AppError'
import { Blog } from '../Blog/blog.model'
import { User } from '../User/user.model'
import httpStatus from 'http-status'

const blockUserFromDB = async (userId: string) => {
    const isUserExists = await User.isUserExistsById(userId)

    if (!isUserExists) {
        throw new AppError(httpStatus.FORBIDDEN, 'User not found!')
    }

    const result = await User.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            isBlocked: true,
        },
    )

    return result
}

const deleteBlogFromDB = async (id: string) => {
    const isBlogExists = await Blog.isBlogExistsById(id)

    if (!isBlogExists) {
        throw new AppError(httpStatus.FORBIDDEN, 'Blog not found!')
    }

    const result = await Blog.findByIdAndDelete(id)

    return result
}

export const AdminServices = {
    blockUserFromDB,
    deleteBlogFromDB,
}
