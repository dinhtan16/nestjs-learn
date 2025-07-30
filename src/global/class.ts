export class ResponseData<T> {
  statusCode: number;
  message: string;
  data: T | T[] | null;

  constructor(data: T | T[] | null, status: number, message: string) {
    this.statusCode = status;
    this.message = message;
    this.data = data;

    return this;
  }
}
