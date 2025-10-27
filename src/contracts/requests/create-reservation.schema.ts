import { z } from 'zod';

export const createReservationSchema = z.object({
  restaurantId: z.string().uuid(),
  userId: z.string().uuid(),
  date: z.string().datetime(), // ISO 8601 date string
  partySize: z.number().int().positive(),
});

export type CreateReservationRequest = z.infer<typeof createReservationSchema>;
