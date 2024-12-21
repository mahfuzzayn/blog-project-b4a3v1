import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { UserServices } from './auth.service'

const registerUser = catchAsync(async (req, res) => {
    const result = await UserServices.registerUserIntoDB(req.body)

    sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: httpStatus.CREATED,
        data: result,
    })
})

export const AuthControllers = {
    registerUser,
}
