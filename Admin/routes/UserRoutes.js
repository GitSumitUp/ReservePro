import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController.js';
//import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);  
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser); 


//router.post('/', roleMiddleware(['admin', 'user']), createBook);  
//router.put('/:id', roleMiddleware(['admin', 'user']), updateBook); 
//router.delete('/:id', roleMiddleware(['admin']), deleteBook); 

export default router;
