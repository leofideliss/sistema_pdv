/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('obs_catProd',table=>{
    table.integer('id_obs').unsigned()
    table.integer('id_catProd').unsigned()
    table.foreign('id_obs').references('id').inTable('observacao')
    table.foreign('id_catProd').references('id').inTable('categoriaProduto')

  })

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
