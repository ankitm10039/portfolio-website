import rateLimit from 'express-rate-limit';

/**
 * Rate limiting middleware for contact form submission endpoint.
 * Limits an IP to 5 submissions per 15-minute window.
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
  message: {
    success: false,
    error: 'Too many contact messages sent from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false, // Disable legacy X-RateLimit headers
});
