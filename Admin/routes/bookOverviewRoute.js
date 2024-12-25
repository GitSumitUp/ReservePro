import express from 'express';
import { getBooks, getBookById, addBook, updateBook, deleteBook } from '../controllers/bookOverviewController.js';

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:book_id', getBookById);  // New route for getting a single book
router.post('/books', addBook);
router.put('/books/:book_id', updateBook);
router.delete('/books/:book_id', deleteBook);

export default router;
