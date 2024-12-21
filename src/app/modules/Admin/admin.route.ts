import express from 'express'
import auth from '../../middlewares/auth'
import { UserRoles } from '../User/user.const'
import { AdminControllers } from './admin.controller'

const router = express.Router()

router.patch(
    '/users/:userId/block',
    auth(UserRoles.admin),
    AdminControllers.blockUser,
)

router.delete(
    '/blogs/:id',
    auth(UserRoles.admin),
    AdminControllers.deleteBlog,
)

export const AdminRoutes = router
