// routes/bookRequestRoutes.js
import express from 'express';
import {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequestStatus,
    deleteRequest
} from '../controllers/bookRequestController.js';

const router = express.Router();

router.post('/', createRequest); // Create a new book request
router.get('/', getAllRequests); // Get all book requests
router.get('/:id', getRequestById); // Get a specific book request by ID
router.put('/:id', updateRequestStatus); // Update the status of a book request
router.delete('/:id', deleteRequest); // Delete a book request

export default router;
