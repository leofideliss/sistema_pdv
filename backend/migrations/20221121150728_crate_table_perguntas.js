/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('perguntas', table => {
        table.increments('id').primary()
        table.string('pergunta')
        table.string('tipo')
        table.boolean('obrigatorio').defaultTo(false)
        table.integer('min')
        table.integer('max')

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('perguntas')
};
