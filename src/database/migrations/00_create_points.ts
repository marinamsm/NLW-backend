import Knex from 'knex';

// creates the table
export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('image').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    })
}

// drops the table
export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}