/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express'
import { TErrorResources } from '../interface/error'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import mongoose from 'mongoose'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import AppError from '../errors/AppError'
import config from '../config'

const globalErrorHandler: ErrorRequestHandler = (
    error,
    req,
    res,
    next,
): any => {
    let statusCode = 500
    let message = 'Something went wrong'

    let errorResources: TErrorResources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ]

    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorResources = simplifiedError.errorSources
    } else if (error instanceof mongoose.Error.ValidationError) {
        const simplifiedError = handleValidationError(error)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorResources = simplifiedError.errorSources
    } else if (error instanceof mongoose.Error.CastError) {
        const simplifiedError = handleCastError(error)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorResources = simplifiedError.errorSources
    } else if (error?.code === 11000) {
        const simplifiedError = handleDuplicateError(error)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorResources = simplifiedError.errorSources
    } else if (error instanceof AppError) {
        statusCode = error?.statusCode
        message = error?.message
        errorResources = [
            {
                path: '',
                message: error?.message,
            },
        ]
    } else if (error instanceof Error) {
        message = error?.message
        errorResources = [
            {
                path: '',
                message: error?.message,
            },
        ]
    }

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: errorResources,
        stack: config.NODE_ENV === 'development' ? error?.stack : null,
    })
}

export default globalErrorHandler
