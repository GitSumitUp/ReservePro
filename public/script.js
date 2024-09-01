document.addEventListener('DOMContentLoaded', () => {
    const bookingsTable = document.getElementById('bookingsTable');
    const addBookingButton = document.getElementById('addBookingButton');
    const bookingFormModal = document.getElementById('bookingFormModal');
    const bookingForm = document.getElementById('bookingForm');
    const formTitle = document.getElementById('formTitle');
    const cancelButton = document.getElementById('cancelButton');
    const closeDetailsButton = document.getElementById('closeDetailsButton');
    const bookingDetailsModal = document.getElementById('bookingDetailsModal');
    const bookingDetails = document.getElementById('bookingDetails');

    const apiUrl = 'http://localhost:8080/api/books';
    let editingBookingId = null;

    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    async function fetchBookings() {
        try {
            const response = await fetch(apiUrl);
            const bookings = await response.json();
            displayBookings(bookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    }

    function displayBookings(bookings) {
        bookingsTable.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Payment Method</th>
                        <th>Duration (minutes)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${bookings.map(booking => `
                        <tr data-id="${booking.id}">
                            <td>${booking.customer_name}</td>
                            <td>${formatDate(booking.booking_date)}</td>
                            <td>${booking.booking_time}</td>
                            <td>${booking.total_amount}</td>
                            <td>${booking.status}</td>
                            <td>${booking.payment_method}</td>
                            <td>${booking.duration_minutes}</td>
                            <td class="actions">
                                <button class="viewButton">View</button>
                                <button class="editButton">Edit</button>
                                <button class="deleteButton">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        bookingsTable.querySelectorAll('.editButton').forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        bookingsTable.querySelectorAll('.deleteButton').forEach(button => {
            button.addEventListener('click', handleDelete);
        });

        bookingsTable.querySelectorAll('.viewButton').forEach(button => {
            button.addEventListener('click', handleView);
        });
    }

    addBookingButton.addEventListener('click', () => {
        editingBookingId = null;
        formTitle.textContent = 'Add New Booking';
        bookingForm.reset();
        bookingFormModal.classList.add('visible');
    });

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const bookingData = {
            customer_name: document.getElementById('customerName').value,
            booking_date: document.getElementById('bookingDate').value,
            booking_time: document.getElementById('bookingTime').value,
            total_amount: document.getElementById('totalAmount').value,
            status: document.getElementById('status').value,
            payment_method: document.getElementById('paymentMethod').value,
            duration_minutes: document.getElementById('durationMinutes').value
        };

        try {
            if (editingBookingId) {
                await fetch(`${apiUrl}/${editingBookingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                });
            } else {
                await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                });
            }

            bookingFormModal.classList.remove('visible');
            fetchBookings();
        } catch (error) {
            console.error('Failed to save booking:', error);
        }
    });

    async function handleEdit(e) {
        const id = e.target.closest('tr').dataset.id;
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            const booking = await response.json();

            editingBookingId = id;
            formTitle.textContent = 'Edit Booking';
            document.getElementById('customerName').value = booking.customer_name;
            document.getElementById('bookingDate').value = booking.booking_date;
            document.getElementById('bookingTime').value = booking.booking_time;
            document.getElementById('totalAmount').value = booking.total_amount;
            document.getElementById('status').value = booking.status;
            document.getElementById('paymentMethod').value = booking.payment_method;
            document.getElementById('durationMinutes').value = booking.duration_minutes;
            bookingFormModal.classList.add('visible');
        } catch (error) {
            console.error('Failed to fetch booking for editing:', error);
        }
    }

    async function handleDelete(e) {
        const id = e.target.closest('tr').dataset.id;
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            fetchBookings();
        } catch (error) {
            console.error('Failed to delete booking:', error);
        }
    }

    async function handleView(e) {
        const id = e.target.closest('tr').dataset.id;
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            const booking = await response.json();

            bookingDetails.innerHTML = `
                <p><strong>Customer Name:</strong> ${booking.customer_name}</p>
                <p><strong>Booking Date:</strong> ${formatDate(booking.booking_date)}</p>
                <p><strong>Booking Time:</strong> ${booking.booking_time}</p>
                <p><strong>Total Amount:</strong> ${booking.total_amount}</p>
                <p><strong>Status:</strong> ${booking.status}</p>
                <p><strong>Payment Method:</strong> ${booking.payment_method}</p>
                <p><strong>Duration (minutes):</strong> ${booking.duration_minutes}</p>
            `;

            bookingDetailsModal.classList.add('visible');
        } catch (error) {
            console.error('Failed to fetch booking details:', error);
        }
    }

    cancelButton.addEventListener('click', () => {
        bookingFormModal.classList.remove('visible');
        bookingForm.reset();
    });

    closeDetailsButton.addEventListener('click', () => {
        bookingDetailsModal.classList.remove('visible');
    });

    fetchBookings();
});
