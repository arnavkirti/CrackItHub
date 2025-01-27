class ApiError extends Error {
  statusCode: number;
  data: any; 
  success: boolean;
  errors: any[]; // Replace `any[]` with a more specific type if applicable

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [], 
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null; // Update type based on API documentation
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
