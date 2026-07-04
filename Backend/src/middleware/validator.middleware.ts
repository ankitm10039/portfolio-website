import { Request, Response, NextFunction } from 'express';

/**
 * Validation middleware for contact form inputs
 */
export const validateContactInput = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ success: false, error: 'Name is required and must be a valid string.' });
    return;
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ success: false, error: 'A valid email address is required.' });
    return;
  }

  if (!subject || typeof subject !== 'string' || subject.trim() === '') {
    res.status(400).json({ success: false, error: 'Subject is required and must be a valid string.' });
    return;
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    res.status(400).json({ success: false, error: 'Message content is required.' });
    return;
  }

  next();
};
