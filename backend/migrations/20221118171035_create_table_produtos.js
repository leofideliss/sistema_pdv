/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('produtos',table =>{
    table.increments('id').primary()
    table.string('nome').notNullable()
    table.boolean('status')
    table.integer('id_categoria').unsigned()
    table.foreign('id_categoria').references('id').inTable('categoriaProduto')
    table.integer('id_tipo').unsigned()
    table.foreign('id_tipo').references('id').inTable('tiposProduto')
    table.string('medida').notNullable()
    table.float('preco_custo')
    table.float('preco_venda')
    table.string('descricao')
    table.binary('imagem_prod')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('produtos')
};
