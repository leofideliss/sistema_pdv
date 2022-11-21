/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('produto_complemento',table=>{
      table.integer('id_produto').unsigned()
      table.integer('id_complemento').unsigned()
      table.foreign('id_produto').references('id').inTable('produtos')
      table.foreign('id_complemento').references('id').inTable('complemento')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('produto_complemento')
  };
  