class TaskController {
	static async store(req, res) {
		const {
			matter_title,
			task_title,
			description,
			due_timestamp,
		} = req.body

		console.log(req.body)
	}
}

export default TaskController
