import express from 'express'
import cors from 'cors'

import routes from './routes'

class Web {
	constructor() {
		this.app = express()

		this.login()
		this.config()
		this.routes()
	}

	routes() {
		this.app.use('/images', express.static('../../public/images/'));
		this.app.use(routes)
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
