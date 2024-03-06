import { EndpointFactory } from '@social-server/server/shared';
import { Request } from 'express';
export async function createContext(req: Request) {
  console.log('createContext');
  return 'context';
}
export default new EndpointFactory({
  createContext,
  onSuccess: (req, res, data) => res.status(200).json(data),
});
