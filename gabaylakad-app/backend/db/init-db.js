// Node.js script to initialize MySQL database and show tables
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const config = require('./db.config');

async function runSchema() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        multipleStatements: true
    });
    try {
        await connection.query(schemaSQL);
        console.log('Database and tables created or verified.');
        await connection.changeUser({database: config.database});
        const [tables] = await connection.query('SHOW TABLES');
        console.log('Tables in', config.database + ':');
        tables.forEach(row => {
            console.log('- ' + Object.values(row)[0]);
        });
    } catch (err) {
        console.error('Error running schema:', err.message || err);
    } finally {
        await connection.end();
    }
}

runSchema();
