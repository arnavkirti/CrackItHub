class ApiResponse extends Response {
  statusCode: number;
  data: any; // Replace `any` with a more specific type if possible
  message: string;
  success: boolean;

  constructor(statusCode: number, message: string = "Success", data: any) {
    super(); // Call the constructor of the `Response` class
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // Success is true if the status code is less than 400
  }
}

export { ApiResponse };
