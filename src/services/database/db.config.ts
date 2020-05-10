import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize('node-type', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    port:5432,
    models:[__dirname+'./../../models']
})