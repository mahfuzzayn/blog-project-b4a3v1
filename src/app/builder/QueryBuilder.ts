import mongoose, { FilterQuery, Query } from 'mongoose'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery
        this.query = query
    }

    search(searchableFields: string[]) {
        const search = this?.query?.search

        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    field =>
                        ({
                            [field]: { $regex: search, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            })
        }

        return this
    }

    sortBy() {
        const sortBy = this?.query?.sortBy || 'createdAt'

        this.modelQuery = this.modelQuery.sort(sortBy as string)

        return this
    }

    sortOrder() {
        const sortOrder = this?.query?.sortOrder || 'asc'
        const order = sortOrder === 'desc' ? -1 : 1

        this.modelQuery = this.modelQuery.sort({ createdAt: order })

        return this
    }

    filter() {
        const authorId = this?.query?.filter

        if (authorId && mongoose.Types.ObjectId.isValid(authorId as string)) {
            this.modelQuery = this.modelQuery.find({
                author: new mongoose.Types.ObjectId(authorId as string),
            })
        } else if (authorId) {
            throw new AppError(httpStatus.FORBIDDEN, 'Invalid author ID')
        }

        return this
    }
}

export default QueryBuilder
