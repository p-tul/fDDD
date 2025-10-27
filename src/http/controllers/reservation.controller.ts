import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ReservationService } from '@/services/reservation.service';
import { createReservationSchema } from '@/contracts/requests/create-reservation.schema';
import { ZodError } from 'zod';

export class ReservationController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      // 1. Validate input
      const createRequest = createReservationSchema.parse(req.body);

      // 2. Resolve service from DI container and execute
      const reservationService = container.resolve(ReservationService);
      const result = await reservationService.createReservation(createRequest);

      // 3. Handle result
      if (result.success) {
        return res.status(201).json(result.value.props);
      } else {
        // Specific error handling
        const error = result.error;
        if (error.name === 'ConflictingReservationError') {
          return res.status(409).json({ message: error.message });
        }
        if (error.name === 'PastDateError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(400).json({ message: 'An unknown error occurred.' });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      // Generic error for unexpected issues
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
