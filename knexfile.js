// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://qxjhzwicjigocn:d662cec981ed6ea15451afc398b3081d51f1e9b54d593b86830b7b9af5d3a11a@ec2-54-157-4-216.compute-1.amazonaws.com:5432/dia97ik0ukvvq?ssl=true',
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
