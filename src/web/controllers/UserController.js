import { Joi } from 'celebrate'
import upload from '../../utils/upload'

class UserController {

	static async store(req, res) {
		console.log(req.body)
	}

}

export default UserController
