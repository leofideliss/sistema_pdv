/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('pergunta_complemento',table=>{
      table.integer('id_complemento').unsigned()
      table.integer('id_pergunta').unsigned()
      table.foreign('id_complemento').references('id').inTable('complemento').onUpdate('CASCADE').onDelete('CASCADE')
      table.foreign('id_pergunta').references('id').inTable('perguntas').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('qtdPermitida')
      table.string('preco_promo')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('pergunta_complemento')
  };
  