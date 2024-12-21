import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

// Parsers
app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api', router)

// Homepage Route
app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Welcome to the Blog API',
    })
})

// Global Error Handler
app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
