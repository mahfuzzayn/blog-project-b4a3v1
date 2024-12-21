import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

// Document Middlewares
// Hashing the password
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    )

    next()
})

userSchema.post('save', function (doc, next) {
    doc.password = ''
    next()
})

export const User = model<TUser>('User', userSchema)
