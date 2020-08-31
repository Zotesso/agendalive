import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('lives', table =>{
        table.increments('id').primary();
        table.string('liveName').notNullable();
        table.string('channelName').notNullable();
        table.dateTime('liveDate').notNullable();
        table.time('liveTime').notNullable();
        table.string('liveLink').notNullable();
        table.string('registrationDate').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('lives');
}