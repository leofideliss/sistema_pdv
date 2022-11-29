/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pergunta_observacao', table => {
    table.increments('id').primary()
    table.integer('id_pergunta').unsigned()
    table.foreign('id_pergunta').references('id').inTable('perguntas').onUpdate('CASCADE').onDelete('CASCADE')
    table.string('descricao')
    table.string('tipo')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('pergunta_observacao')
};
