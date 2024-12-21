import express from 'express'
import { BlogControllers } from './blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import { BlogValidations } from './blog.validation'
import auth from '../../middlewares/auth'
import { UserRoles } from '../User/user.const'

const router = express.Router()

router.post(
    '/',
    auth(UserRoles.user),
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createBlog,
)

export const BlogRoutes = router
