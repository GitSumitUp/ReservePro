import {pool} from '../../dbConnection.js';

export const getAllBooks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Bookings');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Bookings WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createBook = async (req, res) => {
    const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = req.body;
    try {
        const [result] = await sequelize.query('INSERT INTO Bookings (customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes) VALUES (?, ?, ?, ?, ?, ?, ?)', [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes]);
        res.status(201).json({ id: result.insertId, customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = req.body;
    try {
        const [result] = await sequelize.query('UPDATE Bookings SET customer_name = ?, booking_date = ?, booking_time = ?, total_amount = ?, status = ?, payment_method = ?, duration_minutes = ? WHERE id = ?', [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ id, customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await sequelize.query('DELETE FROM Bookings WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
