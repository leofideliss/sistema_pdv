/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('pergunta_produtos',table=>{
      table.integer('id_produto').unsigned()
      table.integer('id_pergunta').unsigned()
      table.foreign('id_produto').references('id').inTable('produtos')
      table.foreign('id_pergunta').references('id').inTable('perguntas')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('pergunta_produtos')
  };
  