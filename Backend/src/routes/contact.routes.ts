import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controller';
import { validateContactInput } from '../middleware/validator.middleware';
import { contactRateLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

// Route: POST /api/contact
// Middleware pipeline: Rate limiting -> Input validation -> Request controller handler
router.post('/', contactRateLimiter, validateContactInput, submitContactForm);

export default router;
