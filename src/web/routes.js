import {Router} from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import rateLimit from 'express-rate-limit'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import TaskController from './controllers/TaskController'
import TasksController from './controllers/TasksController'
import AvatarController from './controllers/AvatarController'
import PodiumController from './controllers/PodiumController'

import auth from './middlewares/auth'
import upload from './middlewares/upload'

const router = Router()

const apiLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 50,
	message: "Você antigiu o máximo de request por 5 minutos, por favor espere 5 minutos."
});

const accountLimiter = rateLimit({
	windowMs: 24 * (60 * (60 * 1000)), // 15 minutes
	max: 1,
	message: "Você atingiu o máximo de contas por IP."
});

router.use(apiLimiter)

router.get('/', (req, res) => res.send('Ok'))

router.put('/task/:id', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		status: Joi.boolean().required()
	}).messages({
		'any.required': 'Você deve obrigatóriamente enviar o {#key} da task.'
	})
}), auth, TaskController.update)

router.post('/user', accountLimiter, celebrate({
	[Segments.BODY]: Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().min(6).required(),
		confirm_password: Joi.valid(Joi.ref('password')),
	}).messages({
		'any.min': `Sua {#key} deve conter no mínimo {#limit} caractéres.`,
		'any.required': `Você deve obrigatóriamente enviar seu {#key}.`
	})
}), UserController.store)


router.get('/user', auth, UserController.index)

router.get('/podium', PodiumController.index)

router.put('/avatar', auth, upload.single('avatar_img'), AvatarController.update)

router.post('/session', SessionController.store)

router.post('/task', auth, TaskController.store)

router.get('/tasks', auth, TasksController.index)

export default router
