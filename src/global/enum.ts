export enum ResponseStatus {
  //

  SUCCESS = 1,
  CREATED = 1,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = -1,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessage {
  SUCCESS = 'Success',
  CREATED = 'Created',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}
