import { IncomingMessage } from "http";

export const getUserId = (req: IncomingMessage): string => {
  const params = req.url?.substring(1).split('/') || [];
  return params[2] || '';
}

export const getRoute = (req: IncomingMessage): string => {
  return req.url?.split('/').slice(0, 3).join('/') || ''
}