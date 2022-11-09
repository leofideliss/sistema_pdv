/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tamanhos', table => {
        table.increments('id').primary()
        table.integer('id_tipo').unsigned()
        table.foreign('id_tipo').references('id').inTable('tiposProduto')
        table.string('descricao').notNullable()
        table.string('sigla').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('tamanhos')

};
