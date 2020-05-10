import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize('d7u1gth52cks9o', 'gogninozxtxdjd', '0659fc0347e9d1c02b14af5c608c6eb9cd3cc78688dd53493eb914f3994842a5', {
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