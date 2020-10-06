import {Router} from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import TaskController from './controllers/TaskController'
import TasksController from './controllers/TasksController'
import AvatarController from './controllers/AvatarController'

import auth from './middlewares/auth'
import upload from './middlewares/upload'

const router = Router()

router.get('/', (req, res) => res.send('Ok'))

router.put('/task/:id', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		status: Joi.boolean().required()
	}).messages({
		'any.required': 'Você deve obrigatóriamente enviar o {#key} da task.'
	})
}), auth, TaskController.update)

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

router.put('/avatar', auth, upload.single('avatar_img'), AvatarController.update)

router.post('/session', SessionController.store)

router.post('/task', auth, TaskController.store)

router.get('/tasks', auth, TasksController.index)

export default router
