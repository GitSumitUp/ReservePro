import { sequelize } from '../../config/dbConnection.js';

export const createBookRequest = async (user_id, book_id) => {
    const query = `
        INSERT INTO BookRequests (user_id, book_id, request_status)
        VALUES (?, ?, 'Pending')
    `;
    const [result] = await sequelize.query(query, [user_id, book_id]);
    return result.insertId;
};

export const getAllBookRequests = async () => {
    const query = 'SELECT * FROM BookRequests';
    const [rows] = await sequelize.query(query);
    return rows;
};

export const getBookRequestById = async (id) => {
    const query = 'SELECT * FROM BookRequests WHERE id = ?';
    const [rows] = await sequelize.query(query, [id]);
    return rows[0];
};

export const updateBookRequestStatus = async (id, status) => {
    const query = 'UPDATE BookRequests SET request_status = ? WHERE id = ?';
    const [result] = await pool.query(query, [status, id]);
    return result.affectedRows;
};

export const deleteBookRequest = async (id) => {
    const query = 'DELETE FROM BookRequests WHERE id = ?';
    const [result] = await sequelize.query(query, [id]);
    return result.affectedRows;
};
