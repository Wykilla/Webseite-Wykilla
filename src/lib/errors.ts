/**
 * Custom error classes for the application
 */

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403)
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429)
  }
}

export class UsageLimitError extends AppError {
  constructor(message: string = 'Usage limit exceeded') {
    super(message, 429)
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'External service error', public service: string) {
    super(message, 502)
  }
}

/**
 * Error handler for API routes
 */
export function handleApiError(error: unknown): {
  error: string
  statusCode: number
} {
  if (error instanceof AppError) {
    return {
      error: error.message,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      statusCode: 500,
    }
  }

  return {
    error: 'An unexpected error occurred',
    statusCode: 500,
  }
}
