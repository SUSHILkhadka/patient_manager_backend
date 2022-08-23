import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('patient', (table) => {
    table.increments('patientId');
    // table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('email');
    table.string('contact');
    table.string('dob');
    table.string('address');
    table.string('photoUrl');
    table.string('allergies');
    table.boolean('specialAttention').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('patient');
}
