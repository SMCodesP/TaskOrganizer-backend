import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import { resolve } from 'path'

import routes from './routes'

class Web {
	constructor() {
		this.app = express()

		this.login()
		this.config()
		this.routes()
	}

	routes() {
		this.app.use('/images', express.static(resolve(__dirname, '..', '..', 'public', 'images')));
		this.app.use(routes)
		this.app.use(errors())
	}

	config() {
		this.app.use(cors())
		this.app.use(express.json())
	}

	login() {
		this.app.listen(process.env.PORT || 3333, () => {
			console.log(`Foi iniciado um servidor http na porta ${process.env.PORT || 3333}`)
		})
	}
}

export default Web
