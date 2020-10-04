import {Router} from 'express'
import multer from 'multer'
import { celebrate, Joi, errors, Segments } from 'celebrate'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import TaskController from './controllers/TaskController'
import TasksController from './controllers/TasksController'

import auth from './middlewares/auth'

const router = Router()
const upload = multer()

router.post('/user', upload.single('avatar_img'), UserController.store)

router.post('/session', SessionController.store)

router.post('/task', auth, TaskController.store)

router.get('/tasks', auth, TasksController.index)

export default router
