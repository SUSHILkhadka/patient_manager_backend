import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('patient', (table) => {
    table.increments('patientId');
    table.string('name').notNullable();
    table.string('email');
    table.string('contact');
    table.date('dob');
    table.string('address');
    table.string('photoUrl');
    table.boolean('specialAttention').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('patient');
}
