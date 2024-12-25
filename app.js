import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './Admin/routes/UserRoutes.js';
import bookshelfRoutes from './User/routes/bookshelfRoutes.js'; 
import bookoverviewRoutes from './Admin/routes/bookOverviewRoute.js'; 
import authRoutes from './User/routes/authRoutes.js';
import bookRequestRoutes from './User/routes/bookRequestRoutes.js'; 
import { testDbConnection } from './dbConnection.js';
//import authMiddleware from './User/middleware/authMiddlerware.js'; 
//import authRoutes from './User/routes/authRoutes.js';
import cors from 'cors';

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/register');
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Auth', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Auth', 'login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin/bookOverview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/BookOverview', 'overview.html'));
});

app.get('/user/bookShelf', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/BookShelf', 'bookShelf.html'));
});

app.get('/user/bookRequest', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/BookRequest', 'bookRequest.html'));
});

app.use(express.static(path.join(__dirname, 'public')));
//app.use(authMiddleware);

app.use('/api/auth', authRoutes); 
app.use('/api/users',userRoutes);
app.use('/api/bookshelf', bookshelfRoutes); 
app.use('/api/bookoverview', bookoverviewRoutes); 
app.use('/api/bookrequests', bookRequestRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try {
        await testDbConnection();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
});
