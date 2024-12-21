import { Model } from 'mongoose'
import { UserRoles } from './user.const'

export interface TUser {
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
    isBlocked: boolean
}

export type TUserRole = keyof typeof UserRoles

export interface UserModel extends Model<TUser> {
    isUserExistsById(id: string): Promise<TUser>
    isUserExistsByEmail(email: string): Promise<TUser>
    isPasswordMatched(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean>
}
