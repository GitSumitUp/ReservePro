import { sequelize } from '../../config/dbConnection.js';

export const addBookToShelf = async (userId, bookId) => {
    const [result] = await sequelize.query(
        'INSERT INTO Bookshelf (user_id, book_id) VALUES (?, ?)',
        [userId, bookId]
    );
    return result;
};

export const removeBookFromShelf = async (userId, bookId) => {
    const [result] = await sequelize.query(
        'DELETE FROM Bookshelf WHERE user_id = ? AND book_id = ?',
        [userId, bookId]
    );
    return result;
};

export const getUserBookshelf = async (userId) => {
    const [rows] = await sequelize.query(
        'SELECT Books.* FROM Books INNER JOIN Bookshelf ON Books.id = Bookshelf.book_id WHERE Bookshelf.user_id = ?',
        [userId]
    );
    return rows;
};
