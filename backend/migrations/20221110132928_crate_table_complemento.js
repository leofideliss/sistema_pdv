/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('complemento', table => {
        table.increments('id').primary()
        table.string('nome').notNullable()
        table.float('preco_custo').notNullable()
        table.float('preco_venda').notNullable()
        table.boolean('status').notNullable().defaultTo(true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('complemento')
};
