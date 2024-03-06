import { Router } from 'express';
import endpoint from '../lib/endpoint';
const router = Router();

router.get(
  '/',
  endpoint.create({
    resolve: async ({ ctx }) => {
      return 1;
    },
  })
);
export default router;
