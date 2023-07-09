import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { usersDB } from '../db';
import { HTTP_METHODS, STATUS_CODES, ERROR_MESSAGES } from '../constants';
import { getUserId } from '../utils';

export const usersController = (req: IncomingMessage, res: ServerResponse): void => {
  switch (req.method) {
    case HTTP_METHODS.GET:
      const userId = getUserId(req);

      if (!userId) {
        const users = usersDB.getAllUsers();
        const dataToSend = JSON.stringify(users);
        res.statusCode = STATUS_CODES.OK;
        res.end(dataToSend);
        break;
      }

      if (!validate(userId)) {
        res.statusCode = STATUS_CODES.BAD_REQUEST;
        res.end(ERROR_MESSAGES.INVALID_USER_ID);
        break;
      }

      const user = usersDB.getUserById(userId);

      if (!user) {
        res.statusCode = STATUS_CODES.NOT_FOUND;
        res.end(ERROR_MESSAGES.USER_NOT_FOUND);
        break;
      }

      const dataToSend = JSON.stringify(user);
      res.statusCode = STATUS_CODES.OK;
      res.end(dataToSend);
      break;
    case HTTP_METHODS.POST:
      break;
    case HTTP_METHODS.PUT:
      break;
    case HTTP_METHODS.DELETE:
      break;
  }
}