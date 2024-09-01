import express from 'express';
import { addBook, removeBook, getBookshelf } from '../controllers/bookshelfController.js';
import { authMiddleware } from '../middleware/authMiddlerware.js';

const router = express.Router();

// Get the user's bookshelf
router.get('/', authMiddleware, getBookshelf);

// Add a book to the user's bookshelf
router.post('/add', authMiddleware, addBook);

// Remove a book from the user's bookshelf
router.post('/remove', authMiddleware, removeBook);

export default router;
