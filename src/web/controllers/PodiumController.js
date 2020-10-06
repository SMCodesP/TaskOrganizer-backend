import knex from '../../database'

class PodiumController {
	static async index(req, res) {

		const users = await knex('user')
			.select('id', 'username', 'points', 'avatar_url')
			.orderBy('points', 'desc')
			.limit(10)

		res.json(users)

	}
}

export default PodiumController
