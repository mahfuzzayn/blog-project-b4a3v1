import { Model } from 'mongoose'

export interface TUser {
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
    isBlocked: boolean
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>
    isPasswordMatched(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean>
}
