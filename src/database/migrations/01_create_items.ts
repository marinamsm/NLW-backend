import Knex from 'knex';

// creates the table
export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').notNullable();
    })
}

// drops the table
export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}