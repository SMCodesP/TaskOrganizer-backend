import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
	const { CustomError } = req;
	const authHeader = req.headers.authorization;
	try {
		if (!authHeader)
			throw CustomError('Token de autorização não informado.', 401);
		const [, token] = authHeader.split(' ');

		const decoded = await promisify(jwt.verify)(token, process.env.JWT);

		req.user = decoded;
		req.token = token;

		return next();
	} catch(error) {
		console.log(error);
		next(error);
	}
}
