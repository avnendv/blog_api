class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.name = 'ApiError';

    // Assign our http status code here
    this.statusCode = statusCode;

    // Record the Stack Trace to facilitate debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
