import { Joi } from 'celebrate'
import upload from '../../utils/upload'

class UserController {

	static async store(req, res) {

		try {
			const userSchema = Joi.object({
				username: Joi.string().required(),
				password: Joi.string().min(6).required(),
				confirm_password: Joi.string().min(6).required().valid('password').error(() => new Error('A confirmação de senha deve ser igual a senha original.')),
			}).messages({
				'string.min': `Sua {#key} deve conter no mínimo {#limit} caractéres.`,
				'any.required': `Você deve obrigatóriamente enviar seu {#key}.`
			})

			const result = userSchema.validate({...req.body})
			if (result.error) {
				res.status(400).send(result.error.message)
			}
		} catch (error) {
			console.error(error)
		}

	}

}

export default UserController
