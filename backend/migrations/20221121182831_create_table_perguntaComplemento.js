/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('pergunta_complemento',table=>{
      table.integer('id_complemento').unsigned()
      table.integer('id_pergunta').unsigned()
      table.foreign('id_complemento').references('id').inTable('complemento')
      table.foreign('id_pergunta').references('id').inTable('perguntas')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('pergunta_complemento')
  };
  