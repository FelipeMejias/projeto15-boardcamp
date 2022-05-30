import {Router} from 'express'
import {postGame,getGame} from '../controllers/GameController.js'

const gameRouter=Router()

gameRouter.post('/games',postGame)
gameRouter.get('/games',getGame)


export default gameRouter