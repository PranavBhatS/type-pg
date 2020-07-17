// import { Sequelize } from 'sequelize';
var Sequelize = require('sequelize')
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'ec2-50-17-90-177.compute-1.amazonaws.com',
    dialect: 'postgres',
    port:5432,
    ssl:true,
    models:[__dirname+'./../../models']
})



// export const sequelize = new Sequelize('node-type', 'postgres', '', {
//     host: 'ec2-50-17-90-177.compute-1.amazonaws.com',
//     dialect: 'postgres',
//     port:5432,
//     models:[__dirname+'./../../models']
// })

// {
//     host: 'localhost',
//     dialect: 'postgres',
//     port:5432,
//     models:[__dirname+'./../../models']
// }