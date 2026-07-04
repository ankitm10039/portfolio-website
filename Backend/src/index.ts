import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes';
import { requestLogger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import { initDatabase } from './config/turso';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Track database initialization state
let isDbInitialized = false;

// 1. Database lazy initialization middleware (Vercel serverless friendly)
app.use(async (req, res, next) => {
  if (!isDbInitialized) {
    try {
      await initDatabase();
      isDbInitialized = true;
    } catch (err) {
      console.error('[Server] Lazy database initialization failed:', err);
      // Pass critical connection errors to error handler
      return next(err);
    }
  }
  next();
});

// 2. Request logging middleware
app.use(requestLogger);

// 3. CORS configuration middleware
app.use(
  cors({
    origin: '*', // For development. Change to specific domain for production
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 4. Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. API Routes
app.use('/api/contact', contactRoutes);

// 6. Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date(),
    message: 'Portfolio Backend is running smoothly and connected to Turso DB.',
  });
});

// 7. Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Portfolio API Server.');
});

// 8. Global Error Handler middleware (registered last)
app.use(errorHandler);

// Start listening ONLY in local environments (Vercel handles routing serverlessly)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Server] Express server running locally on http://localhost:${PORT}`);
  });
}

// Export the app instance for Vercel's serverless handler
export default app;
