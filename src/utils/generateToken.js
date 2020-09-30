import jwt from 'jsonwebtoken';

export default function generateToken(params) {
	return jwt.sign(params, process.env.JWT, {
		expiresIn: '7d'
	});
}
