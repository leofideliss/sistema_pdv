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
    table.string('medida').notNullable()
    table.float('preco_custo').notNullable()
    table.float('preco_venda').notNullable()
    table.string('descricao')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
