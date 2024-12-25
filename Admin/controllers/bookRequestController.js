// controllers/bookRequestController.js
import { pool } from '../../dbConnection.js';

// Get all requests for a specific user
export const getUserRequests = async (req, res) => {
    const { user_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT br.*, bo.title FROM BookRequest br JOIN BookOverview bo ON br.book_id = bo.book_id WHERE br.user_id = ?', [user_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Request a book
export const requestBook = async (req, res) => {
    const { user_id, book_id } = req.body;
    try {
        await pool.query('INSERT INTO BookRequest (user_id, book_id) VALUES (?, ?)', [user_id, book_id]);
        res.status(201).json({ message: 'Book request sent!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update request status
export const updateRequestStatus = async (req, res) => {
    const { request_id } = req.params;
    const { status } = req.body;
    try {
        await pool.query('UPDATE BookRequest SET status = ? WHERE request_id = ?', [status, request_id]);
        res.json({ message: 'Request status updated!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a book request
export const deleteBookRequest = async (req, res) => {
    const { request_id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM BookRequest WHERE request_id = ?', [request_id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Book request deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Book request not found!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};