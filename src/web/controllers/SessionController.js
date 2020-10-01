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

			bcrypt.genSalt(12, (err, salt) => {
				bcrypt.hash(password, salt, async (err, hash) => {
					try {
						const response = await knex('user').insert({
							username,
							password: hash,
							avatar_url: 'https://smcodes.tk/favicon.jpg'
						})
						const token = generateToken({
							user_id: response[0]
						})

						return res.json({
							token,
							user_id: response[0]
						})
					} catch (error) {
						console.log(error)
						return res.status(500).send(error)
					}
				});
			});
		} else {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result && !err) {
					const token = generateToken({
						user_id: user.id
					})

					res.json({
						token,
						user_id: user.id
					})
				} else {
					res.status(401).send('Senha digitada incorreta.')
				}
			});
		}
	}
}

export default AuthController;
