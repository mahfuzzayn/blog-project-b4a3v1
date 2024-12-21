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

const updateBlogIntoDB = async (userData: JwtPayload, payload: Partial<TBlog>) => {
    
}

export const BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB
}
