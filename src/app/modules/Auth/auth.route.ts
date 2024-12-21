import express from 'express'
import { AuthValidations } from './auth.validation'
import validateRequest from '../../middlewares/validateRequest'
import { AuthControllers } from './auth.controller'

const router = express.Router()

router.post(
    '/register',
    validateRequest(AuthValidations.registerUserValidationSchema),
    AuthControllers.registerUser,
)

router.post(
    '/login',
    validateRequest(AuthValidations.loginUserValidationSchema),
    AuthControllers.loginUser,
)

export const AuthRoutes = router
