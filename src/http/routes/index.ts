import { Router } from 'express';
import { reservationRouter } from './reservation.routes';

const router = Router();

router.use('/reservations', reservationRouter);

export { router };
