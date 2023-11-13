import { Router } from 'express';
import { route as userRoutes } from './user.route';

export const router = Router();

router.use('/users', userRoutes);
