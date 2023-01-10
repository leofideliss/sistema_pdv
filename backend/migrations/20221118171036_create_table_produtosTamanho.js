/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('produtosTamanho', table => {
        table.increments('id').primary()
        table.integer('id_produto')
        table.foreign('id_produto').references('id').inTable('produtos').onUpdate('CASCADE').onDelete('CASCADE')
        table.string('tamanho')
        table.string('sigla')
        table.float('preco_venda')
        table.float('preco_custo')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('produtosTamanho')
};
