import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookingController.js';
//import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);  
router.put('/:id', updateBook); 
router.delete('/:id', deleteBook); 


//router.post('/', roleMiddleware(['admin', 'user']), createBook);  
//router.put('/:id', roleMiddleware(['admin', 'user']), updateBook); 
//router.delete('/:id', roleMiddleware(['admin']), deleteBook); 

export default router;
