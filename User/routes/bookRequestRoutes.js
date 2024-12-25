
import express from 'express';
import { getUserRequests, requestBook, updateRequestStatus, deleteBookRequest } from '../../Admin/controllers/bookRequestController.js';

const router = express.Router();

router.get('/requests/:user_id', getUserRequests);
router.post('/requests', requestBook);
router.put('/requests/:request_id', updateRequestStatus);
router.delete('/requests/:request_id', deleteBookRequest);

export default router;
