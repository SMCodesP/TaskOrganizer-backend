// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
	connection: 'postgres://bwvbvkiewuoilm:4cc79d968881fffe1dfb8839794b3ba628e4398c11488e4bc0e938423b6cbe6c@ec2-34-232-212-164.compute-1.amazonaws.com:5432/d7n59ap9dugfbl?ssl=true',
  	migrations: {
  		directory: `${__dirname}/src/database/migrations`
  	},
  	seeds: {
  		directory: `${__dirname}/src/database/seeds`
  	}
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
