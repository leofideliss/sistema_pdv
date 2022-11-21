/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('pergunta_observacao',table=>{
      table.integer('id_observacao').unsigned()
      table.integer('id_pergunta').unsigned()
      table.foreign('id_observacao').references('id').inTable('observacao')
      table.foreign('id_pergunta').references('id').inTable('perguntas')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('pergunta_observacao')
  };
  