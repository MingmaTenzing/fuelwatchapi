import { StatusCodes } from "http-status-codes";

export class BASE_ERROR extends Error {
  name: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "Internal Server Error";
    this.statusCode = 500;
  }
}
export class NotFoundError extends BASE_ERROR {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends BASE_ERROR {
  constructor(messsage: string) {
    super(messsage);
    this.name = "Bad Request";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnAuthorizedError extends BASE_ERROR {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.name = "Unauthorized";
  }
}
