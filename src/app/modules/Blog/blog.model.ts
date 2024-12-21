import { model, Schema } from 'mongoose'
import { BlogModel, TBlog } from './blog.interface'

const blogSchema = new Schema<TBlog, BlogModel>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
})

// Blog Methods
blogSchema.statics.isBlogExistsById = (id: string) => {
    return Blog.findById(id)
}

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema)
