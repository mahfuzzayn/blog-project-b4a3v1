import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// homepage routes
app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Welcome to the Blog API',
    })
})

export default app
