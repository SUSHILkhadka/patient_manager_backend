import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('allergies', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('patientId').unsigned().notNullable();
    table.foreign('patientId').references('patientId').inTable('patient').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('allergies');
}
