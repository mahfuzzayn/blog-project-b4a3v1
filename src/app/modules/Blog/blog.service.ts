import { JwtPayload } from 'jsonwebtoken'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { blogSearchableFields } from './blog.const'

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
        .select('-__v -isPublished -createdAt -updatedAt')

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
        .select('-__v -isPublished -createdAt -updatedAt')

    return result
}

const deleteBlogFromDB = async (id: string, userData: JwtPayload) => {
    const blog = await Blog.isBlogExistsById(id)

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!')
    }

    if (blog?.author.toString() !== userData?.userId) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    await Blog.findByIdAndDelete(id)
}

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(
        Blog.find()
            .populate('author', '-__v -isBlocked -role -createdAt -updatedAt')
            .select('-__v -isPublished'),
        query,
    )
        .search(blogSearchableFields)
        .filter()
        .sortBy()
        .sortOrder()

    const result = await blogQuery.modelQuery

    return result
}

export const BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getAllBlogsFromDB,
}
