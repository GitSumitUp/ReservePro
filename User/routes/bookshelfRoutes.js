// routes/bookShelfRoutes.js
import express from 'express';
import { getUserBookshelf, addBookToShelf, removeBookFromShelf } from '../controllers/bookShelfController.js';

const router = express.Router();

// Get all books in user's bookshelf
router.get('/:user_id', getUserBookshelf);

// Add book to bookshelf
router.post('/', addBookToShelf);

// Remove book from bookshelf
router.delete('/:shelf_id', removeBookFromShelf);

export default router;
