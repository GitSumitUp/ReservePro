import { pool } from '../../config/dbConnection.js';

export class Booking {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Bookings');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Bookings WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = data;
        const [result] = await pool.query(
            'INSERT INTO Bookings (customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = data;
        const [result] = await pool.query(
            'UPDATE Bookings SET customer_name = ?, booking_date = ?, booking_time = ?, total_amount = ?, status = ?, payment_method = ?, duration_minutes = ? WHERE id = ?',
            [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Bookings WHERE id = ?', [id]);
        return result.affectedRows;
    }
}
