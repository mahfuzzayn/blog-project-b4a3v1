import { Response } from 'express'

type TResponse<T> = {
    statusCode: number
    success: boolean
    message?: string
    data?: T
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    const response: Partial<TResponse<T>> = {
        success: data?.success,
        message: data?.message,
        statusCode: data?.statusCode,
    }

    if (data?.data !== undefined) {
        response.data = data?.data
    }

    res.status(data?.statusCode).json(response)
}

export default sendResponse
