import {Router} from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import TaskController from './controllers/TaskController'
import TasksController from './controllers/TasksController'

import auth from './middlewares/auth'

const router = Router()

router.post('/user', celebrate({
	[Segments.BODY]: Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().min(6).required(),
		confirm_password: Joi.valid(Joi.ref('password')),
	}).messages({
		'any.min': `Sua {#key} deve conter no mínimo {#limit} caractéres.`,
		'any.required': `Você deve obrigatóriamente enviar seu {#key}.`
	})
}), UserController.store)

router.post('/session', SessionController.store)

router.post('/task', auth, TaskController.store)

router.get('/tasks', auth, TasksController.index)

export default router
