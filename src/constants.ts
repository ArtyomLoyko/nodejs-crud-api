export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE' 
}

export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export enum ERROR_MESSAGES {
  INVALID_USER_ID = "userId is invalid",
  USER_NOT_FOUND = "user doesn't exist",
  MISSED_REQUIRED_FIELDS = "missed required fields",
  NON_EXISTING_ENDPOINT = "non-existing endpoint"
}

export enum ROUTES {
  USERS = '/api/users'
}