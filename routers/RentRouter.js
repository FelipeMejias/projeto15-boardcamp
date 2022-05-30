import {Router} from 'express'
import {postRent,getRent,endRent,deleteRent} from '../controllers/RentController.js'

const rentRouter=Router()

rentRouter.post('/rentals',postRent)
rentRouter.get('/rentals',getRent)
rentRouter.post('/rentals/:id/return',endRent)
rentRouter.delete('/rentals/:id',deleteRent)

export default rentRouter