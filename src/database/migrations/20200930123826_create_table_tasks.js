
exports.up = (knex) => knex.schema.createTable('task', (table) => {
	table.increments('id')
	table.integer('user_id').notNullable()
	table.string('matter_title').notNullable()
	table.string('task_title').notNullable()
	table.text('description').notNullable()
	table.timestamp('due_timestamp').notNullable()

	table.timestamp('created_at').defaultTo(knex.fn.now())
	table.timestamp('updated_at').defaultTo(knex.fn.now())

	table.foreign('user_id').references('id').inTable('user');
})

exports.down = (knex) => knex.schema.dropTable('task')
