export class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = "") {
    super(message);
    ((this.data = null), (this.statusCode = statusCode));
    this.success = false;
    this.Error = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
