// controllers/bookRequestController.js
import {
    createBookRequest,
    getAllBookRequests,
    getBookRequestById,
    updateBookRequestStatus,
    deleteBookRequest
} from '../models/BookRequest.js';

export const createRequest = async (req, res) => {
    const { user_id, book_id } = req.body;
    try {
        const requestId = await createBookRequest(user_id, book_id);
        res.status(201).json({ id: requestId, user_id, book_id, request_status: 'Pending' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllRequests = async (req, res) => {
    try {
        const requests = await getAllBookRequests();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const request = await getBookRequestById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { request_status } = req.body;
    try {
        const rowsAffected = await updateBookRequestStatus(id, request_status);
        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ id, request_status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const rowsAffected = await deleteBookRequest(id);
        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
