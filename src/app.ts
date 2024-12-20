import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import cookieParser from 'cookie-parser'

// parser
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const test = async (req: Request, res: Response) => {
    const message = 'Blog Project Test route Responding well...'
    res.send(message)
}

app.get('/', test)

export default app
