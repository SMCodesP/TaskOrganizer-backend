import {Router} from 'express'

import SessionController from './controllers/SessionController'
import TaskController from './controllers/TaskController'
import TasksController from './controllers/TasksController'

import auth from './middlewares/auth'

const router = Router()

router.post('/session', SessionController.store)

router.post('/task', auth, TaskController.store)

router.get('/tasks', auth, TasksController.index)

export default router
