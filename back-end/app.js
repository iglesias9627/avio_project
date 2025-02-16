import express, { json } from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import flightRoutes from './routes/flights.js';
import cors from 'cors';
import swaggerSetup from './swagger.js';

const app = express();
connectDB();

app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/flights', flightRoutes);
// Set up Swagger documentation
swaggerSetup(app);

export default app;
