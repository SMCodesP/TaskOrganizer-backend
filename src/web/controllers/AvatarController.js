import knex from '../../database'

class UserController {

	static async update(req, res) {
		try {
			if (!req.file)
				return res.status(400).json({
					"statusCode": 401,
					"validation": {
						"body": {
							"message": "Nenhum arquivo enviado."
						}
					}
				})

			const {
				user_id
			} = req.user;

			const user = await knex('user').where({
				id: user_id
			}).first()

			if (!user)
				return res.status(401).json({
					"statusCode": 401,
					"validation": {
						"body": {
							"message": "O usuário não existe."
						}
					}
				})

			await knex('user').update({
				avatar_url: process.env.BASE_URL + '/images/' + req.file.filename
			}).where({
				id: user_id
			})

			res.status(201).send()
		} catch (error) {
			console.log(error)
			res.status(500).json({
				"statusCode": 500,
				"validation": {
					"body": {
						"message": "Houve algum erro interno."
					}
				}
			})
		}
	}

}

export default UserController
