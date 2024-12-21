/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

const notFound = (req: Request, res: Response, next: NextFunction): any => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'API Not Found!',
    })
}

export default notFound
