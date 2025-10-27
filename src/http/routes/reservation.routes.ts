import { Router } from 'express';
import { ReservationController } from '@/http/controllers/reservation.controller';

const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/', (req, res) => reservationController.create(req, res));

export { reservationRouter };
