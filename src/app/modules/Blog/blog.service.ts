import { JwtPayload } from 'jsonwebtoken'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createBlogIntoDB = async (userData: JwtPayload, payload: TBlog) => {
    const blog = await Blog.create({
        ...payload,
        author: userData?.userId,
    })

    if (!blog) {
        throw new AppError(httpStatus.FORBIDDEN, 'Failed to create a blog')
    }

    const result = await Blog.findById(blog?._id)
        .populate('author', '-__v -isBlocked -role -createdAt -updatedAt')
        .select('-__v -isPublished')

    return result
}

const updateBlogIntoDB = async (
    id: string,
    userData: JwtPayload,
    payload: Partial<TBlog>,
) => {
    const blog = await Blog.isBlogExistsById(id)

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!')
    }

    if (blog?.author.toString() !== userData?.userId) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    const result = await Blog.findByIdAndUpdate(id, payload, {
        upsert: true,
    })
        .populate('author', '-__v -isBlocked -role -createdAt -updatedAt')
        .select('-__v -isPublished')

    return result
}

export const BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
}
