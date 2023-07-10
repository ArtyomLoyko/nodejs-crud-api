import http, { IncomingMessage, ServerResponse } from 'http';
import { STATUS_CODES, ROUTES, ERROR_MESSAGES } from './constants';
import { usersController } from './controllers/users';
import { getRoute } from './utils';

const PORT = process.env.PORT || 4000

const app = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
  try {
    res.setHeader("Content-Type", "application/json");
    const route = getRoute(req);

    switch (route) {
      case ROUTES.USERS:
        usersController(req, res);
        break;
      default:
        res.statusCode = STATUS_CODES.NOT_FOUND;
        res.end(ERROR_MESSAGES.NON_EXISTING_ENDPOINT);
    }
  } catch (err) {
    res.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    res.end(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})