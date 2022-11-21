/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('produto_insumo',table=>{
    table.integer('id_produto').unsigned()
    table.integer('id_insumo').unsigned()
    table.foreign('id_produto').references('id').inTable('produtos')
    table.foreign('id_insumo').references('id').inTable('insumo')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('produto_insumo')
};
