/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('insumo',table=>{
    table.increments('id').primary()
    table.integer('id_categoria').unsigned()
    table.foreign('id_categoria').references('id').inTable('categoriaInsumo')
    table.string('nome').notNullable()
    table.string('medida').notNullable()
    table.float('preco').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('insumo')
};
