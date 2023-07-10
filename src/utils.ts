import { IncomingMessage } from "http";
import { UserI } from "./types";

export const getUserId = (req: IncomingMessage): string => {
  const params = req.url?.substring(1).split('/') || [];
  return params[2] || '';
}

export const getRoute = (req: IncomingMessage): string => {
  return req.url?.split('/').slice(0, 3).join('/') || ''
}

export const isUserValid = (user: UserI): boolean => {
  return typeof user.username === 'string' && 
    typeof user.age === 'number' && 
    Array.isArray(user.hobbies)
}

export const getBody = (req: IncomingMessage): Promise<unknown> => {
  return new Promise((res) => {
    const data: Buffer[] = []
  
    req.on("data", chunk => {
      data.push(chunk)
    })
  
    req.on("end", () => {
      const string = Buffer.concat(data).toString()
      res(JSON.parse(string))
    })
  }) 
}