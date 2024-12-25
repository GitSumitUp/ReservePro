import { pool } from '../../dbConnection.js';

export const getUserBookshelf = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT bs.bookshelf_id, bo.book_id, bo.title, bo.author, bs.added_at FROM BookShelf bs JOIN BookOverview bo ON bs.book_id = bo.book_id WHERE bs.user_id = ?',
      [user_id]
    );

    if (rows.length === 0) {
      return res.json({ message: 'No books found in the bookshelf.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Error fetching bookshelf:', err);
    res.status(500).json({ error: 'Internal server error' }); // Generic error message for security
  }
};

export const addBookToShelf = async (req, res) => {
  const { user_id, book_id } = req.body;

  try {
    await pool.query(
      'INSERT INTO BookShelf (user_id, book_id) VALUES (?, ?)',
      [user_id, book_id]
    );

    res.status(201).json({ message: 'Book added to bookshelf successfully!' });
  } catch (err) {
    console.error('Error adding book to bookshelf:', err);

    // Handle potential errors (e.g., unique constraint violation)
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Book already exists in the bookshelf.' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const removeBookFromShelf = async (req, res) => {
  const { bookshelf_id } = req.params;

  try {
    await pool.query('DELETE FROM BookShelf WHERE bookshelf_id = ?', [bookshelf_id]);
    res.json({ message: 'Book removed from bookshelf successfully!' });
  } catch (err) {
    console.error('Error removing book from bookshelf:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};