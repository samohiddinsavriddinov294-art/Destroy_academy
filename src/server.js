import express from 'express'
import { config } from 'dotenv'
import appRouter from './routers/index.js'
config()



const app = express()
app.use(express.json())
app.use(appRouter.adminRoter)
app.use(appRouter.teacherRouter)


app.listen(process.env.PORT, () => console.log('Server is running on ' + process.env.PORT))