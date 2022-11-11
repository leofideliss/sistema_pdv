/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('observacao',table=>{
    table.string('descricao')
    table.integer('id_categoria_prod').unsigned()
    table.foreign('id_categoria_prod').references('id').inTable('categoriaProduto')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('observacao')
};
