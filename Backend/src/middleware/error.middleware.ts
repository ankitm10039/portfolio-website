import { Request, Response, NextFunction } from 'express';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  console.error('[Global Error Caught]:', err);

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'An unexpected server error occurred.';

  res.status(status).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
