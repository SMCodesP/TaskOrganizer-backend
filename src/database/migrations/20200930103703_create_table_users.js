
exports.up = (knex) => knex.schema.createTable('user', (table) => {
	table.increments('id')
	table.string('username', 64).unique().notNullable()
	table.string('password').notNullable()
	table.float('avatar_url').notNullable()

	table.timestamp('created_at').defaultTo(knex.fn.now())
	table.timestamp('updated_at').defaultTo(knex.fn.now())
})

exports.down = (knex) => knex.schema.dropTable('user')
