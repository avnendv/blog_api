class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.name = 'ApiError';

    // Assign our http status code here
    this.statusCode = statusCode || 200;

    // Record the Stack Trace to facilitate debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
