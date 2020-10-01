import moment from 'moment'

import knex from '../../database'

class TaskController {
	static async store(req, res) {
		const {
			matter_title,
			task_title,
			description,
			due_timestamp,
		} = req.body

		const {
			user_id
		} = req.user;

		const user = await knex('user').where({
			id: user_id
		}).first()

		if (!user)
			return res.status(404).send('Você não existe.')
		
		try {

			await knex('task').insert({
				matter_title,
				task_title,
				description,
				due_timestamp: moment(due_timestamp).format('YYYY-MM-DD HH:mm:ss'),
				user_id,
			})	

			return res.status(201).send()
		} catch (error) {
			console.log(error)
			return res.status(500).send(error)
		}
	}
}

export default TaskController
