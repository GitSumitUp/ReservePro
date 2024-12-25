// controllers/bookOverviewController.js
import { pool } from '../../dbConnection.js';

// Get all books
export const getBooks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM BookOverview');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new book
export const addBook = async (req, res) => {
    const { title, author, total_copies, available_copies, price, pending_requests } = req.body;
    try {
        await pool.query('INSERT INTO BookOverview (title, author, total_copies, available_copies) VALUES (?, ?, ?, ?)', [title, author, total_copies, available_copies, price, pending_requests]);
        res.status(201).json({ message: 'Book added successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update book details
export const updateBook = async (req, res) => {
    const { book_id } = req.params;
    const { title, author, total_copies, available_copies, price, pending_requests } = req.body;
    try {
        await pool.query('UPDATE BookOverview SET title = ?, author = ?, total_copies = ?, available_copies = ?, price = ?, pending_requests = ? WHERE book_id = ?', [title, author, total_copies, available_copies, price, pending_requests, book_id]);
        res.json({ message: 'Book updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    const { book_id } = req.params;
    try {
        await pool.query('DELETE FROM BookOverview WHERE book_id = ?', [book_id]);
        res.json({ message: 'Book deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
    const { book_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM BookOverview WHERE book_id = ?', [book_id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

