import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import path from 'path'
import fs from 'fs'
const app: Application = express()

// Parsers
app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api', router)

// Homepage Route
app.get('/', (req: Request, res: Response) => {
    const filePath = path.join(__dirname, 'app/config', 'homepage.json')

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: 'Error loading homepage data',
                success: false,
                error: err.message,
            })
        }

        const jsonData = JSON.parse(data)
        res.status(200).json(jsonData)
    })
})

// Global Error Handler
app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
