import bcrypt from 'bcrypt'

import knex from '../../database'

import generateToken from '../../utils/generateToken'

class AuthController {
	static async store(req, res) {
		const {
			username,
			password
		} = req.body;

		const user = await knex('user').where({
			username
		}).first()

		if (!user) {
			res.status(401).json({
				"statusCode": 401,
				"validation": {
				  "body": {
					"message": "O usuário não existe."
				  }
				}
			})
		} else {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result && !err) {
					const token = generateToken({
						user_id: user.id
					})

					delete user.password

					res.json({
						token,
						user,
					})
				} else {
					res.status(401).json({
						"statusCode": 401,
						"validation": {
						  "body": {
							"message": "Senha digitada incorretamente."
						  }
						}
					})
				}
			});
		}
	}
}

export default AuthController;
