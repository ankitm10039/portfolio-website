import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { client } from '../config/turso';
import { sendContactNotification } from '../services/email.service';

/**
 * Handle contact form submission, store in Turso DB, and dispatch email notification
 */
export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Generate UUID for SQLite primary key
    const id = crypto.randomUUID();

    // 1. Execute database insert
    await client.execute({
      sql: 'INSERT INTO contact_submissions (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)',
      args: [
        id,
        name.trim(),
        email.trim().toLowerCase(),
        subject.trim(),
        message.trim()
      ]
    });

    // 2. Dispatch email notification asynchronously (non-blocking)
    // Run in background so we can respond to the user immediately
    sendContactNotification({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    }).catch(err => {
      console.error('[Controller Error] Background email dispatch failed:', err);
    });

    // 3. Return successful response
    res.status(201).json({
      success: true,
      message: 'Message stored successfully and notification queued!',
      data: {
        id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim()
      },
    });
  } catch (err: any) {
    console.error('Turso DB Insert Error:', err);
    // Forward database or parsing errors to the global error handler middleware
    next(err); 
  }
};
