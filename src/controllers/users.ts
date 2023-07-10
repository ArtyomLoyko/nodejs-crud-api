import { IncomingMessage, ServerResponse } from 'http';
import { v4, validate } from 'uuid';
import { usersDB } from '../db';
import { HTTP_METHODS, STATUS_CODES, ERROR_MESSAGES } from '../constants';
import { getUserId, isUserValid, getBody } from '../utils';
import { UserI } from './../types'

export const usersController = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const userId = getUserId(req);
  let user;
  if (userId) {
    if (!validate(userId)) {
      res.statusCode = STATUS_CODES.BAD_REQUEST;
      res.end(ERROR_MESSAGES.INVALID_USER_ID);
      return;
    }

    user = usersDB.getUserById(userId);
    if (!user) {
      res.statusCode = STATUS_CODES.NOT_FOUND;
      res.end(ERROR_MESSAGES.USER_NOT_FOUND);
      return;
    }
  }

  let body = await getBody(req);
  if (body && !isUserValid(body as UserI)) {
    res.statusCode = STATUS_CODES.BAD_REQUEST;
    res.end(ERROR_MESSAGES.MISSED_REQUIRED_FIELDS);
    return;
  }

  switch (req.method) {
    case HTTP_METHODS.GET: {
      if (!userId) {
        const users = usersDB.getAllUsers();
        const dataToSend = JSON.stringify(users);
        res.statusCode = STATUS_CODES.OK;
        res.end(dataToSend);
        break;
      }

      const dataToSend = JSON.stringify(user);
      res.statusCode = STATUS_CODES.OK;
      res.end(dataToSend);
      break;
    }
    case HTTP_METHODS.POST: {
      const user = usersDB.addUser({ ...body as UserI, id: v4() });
      const dataToSend = JSON.stringify(user);
      res.statusCode = STATUS_CODES.CREATED;
      res.end(dataToSend);
      break;
    }
    case HTTP_METHODS.PUT: {
      const updatedUser = usersDB.updateUser(body as UserI);
      const dataToSend = JSON.stringify(updatedUser);
      res.statusCode = STATUS_CODES.OK;
      res.end(dataToSend);
      break;
    }
    case HTTP_METHODS.DELETE: {
      usersDB.deleteUser(userId);
      res.statusCode = STATUS_CODES.NO_CONTENT;
      res.end();
      break;
    }
  }
}