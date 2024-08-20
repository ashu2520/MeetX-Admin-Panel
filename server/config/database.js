const mysql = require('mysql2/promise');
require("dotenv").config();

// Create the connection to the database using environment variables
const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.message);
//         return;
//     }
//     console.log('Connected to the MySQL database.');
// });

// Promisify the query function
// const query = (sql) => {
//     return new Promise((resolve, reject) => {
//         db.query(sql, (error, results) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// };
module.exports = db;
