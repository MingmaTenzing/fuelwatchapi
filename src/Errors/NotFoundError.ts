export class BASE_ERROR {
  name: string;
  statusCode: number;
  message: string;
  constructor(message: string) {
    this.name = "INTERNAL SERVER ERROR";
    this.statusCode = 500;
    this.message = message;
  }
}
export class NotFoundError extends BASE_ERROR {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}
