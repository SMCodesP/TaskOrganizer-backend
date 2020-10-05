import knex from '../../database'

class TasksController {

	static async index(req, res) {
		const {
			user_id
		} = req.user;

		const {
			status
		} = req.query

		try {
			let tasks;
			if (status != undefined) {
				tasks = await knex('task').where({
					user_id,
					completed: status
				});
			} else {
				tasks = await knex('task').where({
					user_id,
				});
			}

			return res.json(tasks)
		} catch (error) {
			console.log(error)
			return res.status(500).send(error)
		}
	}

}

export default TasksController
