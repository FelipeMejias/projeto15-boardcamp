import {Router} from 'express'
import {postCategory,getCategory} from '../controllers/CategoryController.js'

const categoryRouter=Router()

categoryRouter.post('/categories',postCategory)
categoryRouter.get('/categories',getCategory)

export default categoryRouter