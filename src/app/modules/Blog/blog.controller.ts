import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BlogServices } from './blog.service'
import httpStatus from 'http-status'

const createBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.createBlogIntoDB(req.body)

    sendResponse(res, {
        success: true,
        message: 'Blog created successful',
        statusCode: httpStatus.CREATED,
        data: result,
    })
})

export const BlogControllers = {
    createBlog,
}
