import { randomBytes } from 'crypto'
import moment from 'moment'

import knex from '../../database'

class TaskController {
	static async update(req, res) {
		const {
			id
		} = req.params
		const {
			status
		} = req.query
		const {
			user_id
		} = req.user

		try {
			let task = await knex('task').where({
				id,
				user_id,
			}).first()

			if (!task)
				return res.status(404).json({
					"statusCode": 404,
					"validation": {
						"body": {
							"message": "A task indicada não existe ou você não tem permissão para gerencia-la."
						}
					}
				})

			if (task.completed === status)
				return res.status(404).json({
					"statusCode": 404,
					"validation": {
						"body": {
							"message": "A task indicada já tem o status indicado."
						}
					}
				})

			await knex('task').update({
				completed: status,
			}).where({
				id,
			})

			task.completed = status

			res.json({task})
		} catch (err) {
			console.log(err)
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
