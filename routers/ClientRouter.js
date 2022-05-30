import {Router} from 'express'
import {postClient,getClient,putClient,getClientById} from '../controllers/ClientController.js'

const clientRouter=Router()

clientRouter.post('/customers',postClient)
clientRouter.get('/customers',getClient)
clientRouter.get('/customers/:id',getClientById)
clientRouter.put('/customers/:id',putClient)


export default clientRouter