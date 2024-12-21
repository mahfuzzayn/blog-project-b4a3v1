import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api', router)

// homepage routes
app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Welcome to the Blog API',
    })
})

export default app
