import { Reservation } from '@/domain/reservation/reservation.entity';

export interface IReservationRepository {
  save(reservation: Reservation): Promise<void>;
  findByDate(restaurantId: string, date: Date): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
}

// We use a token for dependency injection
export const IReservationRepository = Symbol('IReservationRepository');
