
exports.up = async (knex) => {
	await knex.schema.createTable('user', (table) => {
		table.increments('id').primary().notNullable()
		table.string('username', 64).unique().notNullable()
		table.string('password').notNullable()
		table.string('avatar_url').notNullable()

		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
	return knex.schema.createTable('task', (table) => {
		table.increments('id').primary().notNullable()
		table.integer('user_id', 11).notNullable().unsigned()
		table.string('matter_title').notNullable()
		table.string('task_title').notNullable()
		table.text('description').notNullable()
		table.boolean('completed').default(false)
		table.timestamp('due_timestamp').notNullable()

		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())

    	table.foreign('user_id').references('user.id');
	})
}

exports.down = (knex) => knex.schema.dropTable('task').then(() => knex.schema.dropTable('user'))
