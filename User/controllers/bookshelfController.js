import { addBookToShelf, removeBookFromShelf, getUserBookshelf } from '../models/Bookshelf.js';

export const addBook = async (req, res) => {
    const { userId } = req.user;
    const { bookId } = req.body;

    try {
        await addBookToShelf(userId, bookId);
        res.status(201).json({ message: 'Book added to shelf' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeBook = async (req, res) => {
    const { userId } = req.user;
    const { bookId } = req.body;

    try {
        await removeBookFromShelf(userId, bookId);
        res.status(200).json({ message: 'Book removed from shelf' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBookshelf = async (req, res) => {
    const { userId } = req.user;

    try {
        const books = await getUserBookshelf(userId);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
