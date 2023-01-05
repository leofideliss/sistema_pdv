/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('produtosTamanho', table => {
        table.increments('id').primary()
        table.string('tamanho')
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
