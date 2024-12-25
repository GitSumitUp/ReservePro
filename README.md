# ReservePro

ReservePro is a booking management web application designed to simplify the process of managing bookings. It allows users to add, update, and delete bookings while ensuring secure access through JWT authentication.

## Features
- Add, update, and delete bookings.
- User-friendly interface for managing bookings efficiently.
- Secure authentication with JSON Web Tokens (JWT).
- Backend powered by Node.js and Express.js.
- Database integration using MySQL.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ReservePro.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ReservePro
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   - Create a MySQL database.
   - Import the provided SQL schema.
   - Update database credentials in `config.js`.

5. Start the server:
   ```bash
   npm start
   ```

6. Access the application at `http://localhost:8080`.

## Impact
ReservePro enhances booking management by automating operations, reducing manual errors, and improving user experience with a streamlined interface.

## Challenges & Learning
- Implementing JWT for secure authentication strengthened my understanding of security practices.
- Managing database connections taught me how to optimize API performance for scalability.

## Future Enhancements
- Add role-based access control.
- Implement real-time notifications for bookings.

## License
This project is open-source and available under the [MIT License](LICENSE).
