import bcrypt from 'bcrypt'

import knex from '../../database'

import generateToken from '../../utils/generateToken'

class UserController {

	static async store(req, res) {
		const {
			username,
			password
		} = req.body;

		const user = await knex('user').where({
			username
		}).first()

		if (!user) {
			bcrypt.genSalt(12, (err, salt) => {
				bcrypt.hash(password, salt, async (err, hash) => {
					try {
						const mount_user = {
							username,
							avatar_url: 'https://smcodes.tk/favicon.jpg'
						}
						await knex('user').insert({
							...mount_user,
							password: hash,
						})
						const response = await knex('user').where({
							username,
						}).first()
						const token = generateToken({
							user_id: response.id
						})

						mount_user.id = response.id

						return res.json({
							token,
							user: mount_user
						})
					} catch (error) {
						console.log(error)
						return res.status(500).send(error)
					}
				});
			});
		} else {
			res.status(401).json({
				"statusCode": 401,
				"validation": {
				  "body": {
					"message": "O usuário já existe."
				  }
				}
			})
		}
	}

}

export default UserController
