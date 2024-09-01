import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'Sumit@2003', 
    database: 'pc' ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testDbConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('DB is connected');
        connection.release();
    } catch (err) {
        console.error('Error connecting to the DB:', err);
    }
};

export { pool, testDbConnection };