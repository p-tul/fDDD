import { Router } from 'express';
import { ReservationController } from '@/http/controllers/reservation.controller';

const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/', (req, res) =>
  reservationController.create(req, res)
);

reservationRouter.patch('/:id/confirm', (req, res) =>
  reservationController.confirm(req, res)
);

reservationRouter.patch('/:id/cancel', (req, res) =>
  reservationController.cancel(req, res)
);

export { reservationRouter };
