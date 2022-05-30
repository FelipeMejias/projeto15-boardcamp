import express,{json} from "express";
import dotenv from 'dotenv'

dotenv.config()
const app=express()
app.use(json())
const port=process.env.PORT || 4000

import clientRouter from './routers/ClientRouter.js'
import gameRouter from './routers/GameRouter.js'
import rentRouter from './routers/RentRouter.js'
import categoryRouter from './routers/CategoryRouter.js'

app.use(clientRouter)
app.use(gameRouter)
app.use(rentRouter)
app.use(categoryRouter)

app.listen(port,console.log(`Servidor em pé na porta ${port}`))